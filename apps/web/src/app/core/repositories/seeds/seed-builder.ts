import { Section, Widget, WidgetLayout } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import {
  CalloutStyle,
  HeadingLevel,
  ImageFit,
  TableCell,
  TocDepth,
} from '@Core/models/widget-value.model';
import { plainToHtml } from '@Shared/utils/rich-text';

/**
 * Helpers to write long seed Documents as content instead of hand-placed grid positions: blocks
 * are stacked in reading order and their height is estimated from their content. Widgets with a
 * Content height correct themselves at runtime; the estimate only avoids a visible reflow.
 */
export interface SeedBlock {
  /** The Widget minus its id, which `seedSection` assigns. */
  widget: Omit<Widget, 'id'>;
  /** Estimated height in px at a given width in px. */
  heightPx: (widthPx: number) => number;
  /** Width in grid columns when the block is alone in its row (default: full width). */
  columns?: number;
}

/** A full-width block, or blocks side by side (two: 8 + 4 columns; more: equal widths). */
export type SeedRow = SeedBlock | readonly SeedBlock[];

/** Marks content the builder cannot represent yet; the first line names what is missing. */
export const UNSUPPORTED_MARKER = '⚠ Not supported yet';

const GRID_COLUMNS = 12;
const ROW_HEIGHT = 20;
/** Approximate width of a Section's grid in px, and the frame's padding around its content. */
const GRID_WIDTH_PX = 880;
const FRAME_PADDING_X = 48;
const FRAME_PADDING_Y = 28;

const BODY = { charWidthPx: 7.8, lineHeightPx: 26 };
const SMALL = { charWidthPx: 7.2, lineHeightPx: 22 };
const HEADING: Record<HeadingLevel, { charWidthPx: number; lineHeightPx: number }> = {
  1: { charWidthPx: 13, lineHeightPx: 30 },
  2: { charWidthPx: 11, lineHeightPx: 28 },
  3: { charWidthPx: 10, lineHeightPx: 26 },
};

function textHeightPx(
  text: string,
  widthPx: number,
  style: { charWidthPx: number; lineHeightPx: number },
): number {
  const charsPerLine = Math.max(1, Math.floor(widthPx / style.charWidthPx));
  const lines = text
    .split('\n')
    .reduce((sum, line) => sum + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
  return lines * style.lineHeightPx;
}

/** `[[label]]` in seed text marks an inline Link whose URL is not known (empty href). */
const LINK_MARKER = /\[\[(.+?)\]\]/g;

function richText(plain: string): string {
  return plainToHtml(plain).replace(
    LINK_MARKER,
    (_match, label: string) => `<a href="">${label}</a>`,
  );
}

const stripMarkers = (plain: string): string => plain.replace(LINK_MARKER, '$1');

export const header = (text: string, level: HeadingLevel = 1, numbered = true): SeedBlock => ({
  widget: { type: WidgetType.Header, value: { content: { text }, config: { level, numbered } } },
  heightPx: (w) => textHeightPx(text, w, HEADING[level]),
});

/** One Text widget; each argument is a paragraph. `[[label]]` becomes an inline Link. */
export const text = (...paragraphs: string[]): SeedBlock => {
  const plain = paragraphs.join('\n\n');
  return {
    widget: { type: WidgetType.Text, value: { content: { html: richText(plain) } } },
    heightPx: (w) => textHeightPx(stripMarkers(plain), w, BODY),
  };
};

export const unsupported = (kind: string, ...lines: string[]): SeedBlock =>
  text([`${UNSUPPORTED_MARKER} — ${kind}`, ...lines].join('\n'));

/** `entries` only estimates the height; a Table of contents corrects it at runtime. */
export const tableOfContents = (
  title = 'Contents',
  depth: TocDepth = 3,
  entries = 10,
): SeedBlock => ({
  widget: { type: WidgetType.TableOfContents, value: { content: { title }, config: { depth } } },
  heightPx: () => 40 + entries * 24,
});

/** "Label (link)" in a cell becomes a Link with an unknown (empty) URL. */
function cell(value: string): TableCell {
  const link = /^(.*) \(link\)$/.exec(value);
  return link ? { kind: 'link', link: { label: link[1], url: '' } } : { kind: 'text', text: value };
}

export const table = (
  caption: string,
  columns: readonly string[],
  rows: readonly (readonly string[])[],
): SeedBlock => {
  const all = [columns, ...rows];
  return {
    widget: {
      type: WidgetType.Table,
      value: {
        content: { caption, rows: all.map((row) => row.map(cell)) },
        config: { headerRow: true, headerColumn: false, striped: false, columnWidths: null },
      },
    },
    heightPx: (w) => {
      const columnWidth = w / columns.length - 16;
      const rowsPx = all.reduce(
        (sum, row) =>
          sum + Math.max(...row.map((value) => textHeightPx(value, columnWidth, SMALL))) + 16,
        0,
      );
      return rowsPx + (caption ? 32 : 0);
    },
  };
};

/** The recurring "Meeting | Frequency | Location | Day | Time | Minutes" tables of the guide. */
export const meetings = (caption: string, rows: readonly (readonly string[])[]): SeedBlock =>
  table(caption, ['Meeting', 'Frequency', 'Location', 'Day', 'Time', 'Minutes'], rows);

/** `aspect` is height / width of the picture, used to size the box at seed time. */
export const image = (
  src: string,
  caption: string,
  aspect: number,
  { fit = 'contain', columns }: { fit?: ImageFit; columns?: number } = {},
): SeedBlock => ({
  widget: {
    type: WidgetType.Image,
    value: { content: { src, caption, href: '' }, config: { fit } },
  },
  heightPx: (w) => w * aspect + (caption ? textHeightPx(caption, w, SMALL) + 8 : 0),
  columns,
});

export const callout = (
  style: CalloutStyle,
  { title = '', body, source = '' }: { title?: string; body: string; source?: string },
): SeedBlock => ({
  widget: {
    type: WidgetType.Callout,
    value: { content: { title, html: richText(body), source }, config: { style } },
  },
  heightPx: (w) =>
    textHeightPx(stripMarkers(body), w - 48, BODY) + (title ? 36 : 0) + (source ? 30 : 0) + 32,
});

/** Steps as [title, description]. */
export const process = (steps: readonly (readonly [string, string])[]): SeedBlock => ({
  widget: {
    type: WidgetType.Process,
    value: {
      content: {
        steps: steps.map(([title, description], index) => ({
          id: `step-${index + 1}`,
          title,
          html: description ? richText(description) : '',
        })),
      },
    },
  },
  heightPx: (w) =>
    steps.reduce(
      (sum, [title, description]) =>
        sum +
        textHeightPx(title, w - 64, BODY) +
        (description ? textHeightPx(stripMarkers(description), w - 64, BODY) : 0) +
        20,
      0,
    ),
});

/** A Link card whose URL is not known yet. */
export const linkCard = (label: string, description = ''): SeedBlock => ({
  widget: { type: WidgetType.Link, value: { content: { link: { label, url: '' }, description } } },
  heightPx: (w) => 64 + (description ? textHeightPx(description, w - 32, SMALL) : 0),
});

export const beside = (main: SeedBlock, aside: SeedBlock): SeedRow => [main, aside];

export const row = (...blocks: SeedBlock[]): SeedRow => blocks;

function columnsFor(count: number, index: number): number {
  if (count === 2) return index === 0 ? 8 : 4;
  return Math.floor(GRID_COLUMNS / count);
}

function rowsFor(block: SeedBlock, columns: number): number {
  const widthPx = (GRID_WIDTH_PX * columns) / GRID_COLUMNS - FRAME_PADDING_X;
  return Math.ceil((block.heightPx(widthPx) + FRAME_PADDING_Y) / ROW_HEIGHT);
}

/** Builds a Section whose Widgets are stacked in reading order. Ids are `${id}-w1`, `${id}-w2`, … */
export function seedSection(
  id: string,
  title: string,
  numbered: boolean,
  rows: readonly SeedRow[],
): Section {
  const widgets: Widget[] = [];
  const layout: WidgetLayout[] = [];
  let y = 0;

  const place = (block: SeedBlock, x: number, w: number): number => {
    const widgetId = `${id}-w${widgets.length + 1}`;
    const h = rowsFor(block, w);
    widgets.push({ ...block.widget, id: widgetId } as Widget);
    layout.push({ id: widgetId, x, y, w, h });
    return h;
  };

  for (const entry of rows) {
    const blocks: readonly SeedBlock[] = Array.isArray(entry) ? entry : [entry as SeedBlock];
    let x = 0;
    let rowHeight = 0;
    blocks.forEach((block, index) => {
      const w =
        blocks.length === 1 ? (block.columns ?? GRID_COLUMNS) : columnsFor(blocks.length, index);
      rowHeight = Math.max(rowHeight, place(block, x, w));
      x += w;
    });
    y += rowHeight;
  }
  return { id, title, numbered, widgets, layout };
}
