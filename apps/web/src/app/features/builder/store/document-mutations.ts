import { Document, Section, Widget, WidgetLayout } from '@Core/models/document.model';

/** Pure, immutable edits of a Document. Each returns the same instance when nothing changed. */

export function updateSection(
  document: Document,
  sectionId: string,
  update: (section: Section) => Section,
): Document {
  let changed = false;
  const sections = document.sections.map((section) => {
    if (section.id !== sectionId) return section;
    const next = update(section);
    changed ||= next !== section;
    return next;
  });
  return changed ? { ...document, sections } : document;
}

export function findWidgetSection(document: Document, widgetId: string): Section | undefined {
  return document.sections.find((section) => section.widgets.some((w) => w.id === widgetId));
}

export function findWidget(document: Document, widgetId: string): Widget | undefined {
  return findWidgetSection(document, widgetId)?.widgets.find((w) => w.id === widgetId);
}

/** First free row below every Widget of a Section. */
export function bottomOf(section: Section): number {
  return section.layout.reduce((bottom, layout) => Math.max(bottom, layout.y + layout.h), 0);
}

export function addWidgetToSection(
  section: Section,
  widget: Widget,
  layout: WidgetLayout,
): Section {
  return {
    ...section,
    widgets: [...section.widgets, widget],
    layout: [...section.layout, layout],
  };
}

export function removeWidgetFromSection(section: Section, widgetId: string): Section {
  if (!section.widgets.some((w) => w.id === widgetId)) return section;
  return {
    ...section,
    widgets: section.widgets.filter((w) => w.id !== widgetId),
    layout: section.layout.filter((l) => l.id !== widgetId),
  };
}

export function sameLayouts(a: readonly WidgetLayout[], b: readonly WidgetLayout[]): boolean {
  if (a.length !== b.length) return false;
  const byId = new Map(b.map((layout) => [layout.id, layout]));
  return a.every((layout) => {
    const other = byId.get(layout.id);
    return (
      !!other &&
      other.x === layout.x &&
      other.y === layout.y &&
      other.w === layout.w &&
      other.h === layout.h
    );
  });
}

/**
 * Reconciles the Document with what the grids show after a drag or resize: positions, and
 * Widgets that were dragged from one Section into another. Sections missing from
 * `layoutsBySection` (e.g. collapsed ones) are left alone, as are Widgets no grid reports.
 */
export function applyGridLayouts(
  document: Document,
  layoutsBySection: ReadonlyMap<string, readonly WidgetLayout[]>,
): Document {
  const widgetsById = new Map(
    document.sections.flatMap((section) => section.widgets.map((w) => [w.id, w] as const)),
  );
  const reported = new Set(
    [...layoutsBySection.values()].flatMap((layouts) => layouts.map((l) => l.id)),
  );

  let changed = false;
  const sections = document.sections.map((section) => {
    const gridLayouts = layoutsBySection.get(section.id);
    if (!gridLayouts) return section;

    const known = gridLayouts.filter((layout) => widgetsById.has(layout.id));
    // Widgets of this Section that no grid reports stay where they are.
    const unreported = section.layout.filter((layout) => !reported.has(layout.id));
    const layout = [
      ...known.map((l) => ({ id: l.id, x: l.x, y: l.y, w: l.w, h: l.h })),
      ...unreported,
    ];

    const sameMembers =
      layout.length === section.layout.length &&
      layout.every((l) => section.widgets.some((w) => w.id === l.id));
    if (sameMembers && sameLayouts(layout, section.layout)) return section;

    changed = true;
    const ids = new Set(layout.map((l) => l.id));
    return {
      ...section,
      widgets: [
        ...section.widgets.filter((w) => ids.has(w.id)),
        ...layout
          .filter((l) => !section.widgets.some((w) => w.id === l.id))
          .map((l) => widgetsById.get(l.id) as Widget),
      ],
      layout,
    };
  });
  return changed ? { ...document, sections } : document;
}
