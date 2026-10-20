import { WidgetType } from './widget-type.enum';

/** Heading level of a Header widget, below its Section title. */
export type HeadingLevel = 1 | 2 | 3;

/** How deep a Table of contents goes: 0 lists Sections only, 3 lists every Header level. */
export type TocDepth = 0 | 1 | 2 | 3;

export type CalloutStyle = 'anecdote' | 'quote' | 'note';

export type ImageFit = 'contain' | 'cover';

/** A label and the URL it opens; an empty URL means the Link is incomplete. */
export interface Link {
  label: string;
  url: string;
}

export type TableCell = { kind: 'text'; text: string } | { kind: 'link'; link: Link };

export interface ProcessStep {
  id: string;
  title: string;
  /** Rich text (sanitized HTML). */
  html: string;
}

/** Per Widget type: `content` is what the reader sees, `config` is how it is shown. */
export interface WidgetValueByType {
  [WidgetType.Header]: {
    content: { text: string };
    config: { level: HeadingLevel; numbered: boolean };
  };
  [WidgetType.Text]: { content: { html: string } };
  [WidgetType.TableOfContents]: { content: { title: string }; config: { depth: TocDepth } };
  [WidgetType.Table]: {
    content: { caption: string; rows: TableCell[][] };
    config: {
      headerRow: boolean;
      headerColumn: boolean;
      striped: boolean;
      /** Percentages per column, or null while widths are automatic. */
      columnWidths: number[] | null;
    };
  };
  [WidgetType.Image]: {
    content: { src: string; caption: string; href: string };
    config: { fit: ImageFit };
  };
  [WidgetType.Callout]: {
    content: { title: string; html: string; source: string };
    config: { style: CalloutStyle };
  };
  [WidgetType.Process]: { content: { steps: ProcessStep[] } };
  [WidgetType.Link]: { content: { link: Link; description: string } };
  [WidgetType.Video]: { content: { url: string } };
}

export type WidgetValue<T extends WidgetType = WidgetType> = WidgetValueByType[T];
