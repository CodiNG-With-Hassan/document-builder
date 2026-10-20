import { Document, Section, WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { HeadingLevel } from '@Core/models/widget-value.model';

/** One line of the Document's outline: a Section, or a Header widget inside one. */
export interface OutlineEntry {
  id: string;
  kind: 'section' | 'header';
  sectionId: string;
  /** 0 for a Section, otherwise the Heading level. */
  level: 0 | HeadingLevel;
  text: string;
  /** Heading number, e.g. "3.7.4"; null when unnumbered. */
  number: string | null;
  /** A Header whose level is more than one below the one before it in its Section. */
  skippedLevel: boolean;
}

/** Header widgets of a Section in reading order: top to bottom, then left to right. */
export function headersInReadingOrder(section: Section): WidgetOf<WidgetType.Header>[] {
  const position = new Map(section.layout.map((l) => [l.id, l]));
  return section.widgets
    .filter((w): w is WidgetOf<WidgetType.Header> => w.type === WidgetType.Header)
    .sort((a, b) => {
      const pa = position.get(a.id);
      const pb = position.get(b.id);
      return (pa?.y ?? 0) - (pb?.y ?? 0) || (pa?.x ?? 0) - (pb?.x ?? 0);
    });
}

/**
 * Derives Heading numbers: numbered Sections count 1, 2, 3, …; inside them a numbered H<n>
 * increments counter n and resets deeper ones. Counters that were never set show as 0 and mark
 * the Header as a Skipped level. Headers in unnumbered Sections, and unnumbered Headers, get no
 * number and leave the counters alone.
 */
export function buildOutline(document: Document): OutlineEntry[] {
  const entries: OutlineEntry[] = [];
  let sectionNumber = 0;

  for (const section of document.sections) {
    const numberedSection = section.numbered;
    if (numberedSection) sectionNumber++;
    entries.push({
      id: section.id,
      kind: 'section',
      sectionId: section.id,
      level: 0,
      text: section.title,
      number: numberedSection ? String(sectionNumber) : null,
      skippedLevel: false,
    });

    const counters = [0, 0, 0];
    for (const header of headersInReadingOrder(section)) {
      const { level, numbered } = header.value.config;
      const isNumbered = numberedSection && numbered;
      let skippedLevel = false;
      let number: string | null = null;
      if (isNumbered) {
        counters[level - 1]++;
        counters.fill(0, level);
        skippedLevel = counters.slice(0, level - 1).some((count) => count === 0);
        number = [sectionNumber, ...counters.slice(0, level)].join('.');
      }
      entries.push({
        id: header.id,
        kind: 'header',
        sectionId: section.id,
        level,
        text: header.value.content.text,
        number,
        skippedLevel,
      });
    }
  }
  return entries;
}
