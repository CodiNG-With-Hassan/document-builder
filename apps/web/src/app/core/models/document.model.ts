import { WidgetType } from './widget-type.enum';
import { WidgetValueByType } from './widget-value.model';

/** Persisted shape. Content (`widgets`) and placement (`layout`) are joined by Widget id. */
export interface Document {
  id: string;
  title: string;
  sections: Section[];
  updatedAt: string;
}

export interface Section {
  id: string;
  title: string;
  /** Whether the Section takes part in Heading numbering. */
  numbered: boolean;
  widgets: Widget[];
  layout: WidgetLayout[];
}

/** A Widget of one specific type, with that type's value. */
export interface WidgetOf<T extends WidgetType> {
  id: string;
  type: T;
  value: WidgetValueByType[T];
}

/** Discriminated by `type`, so narrowing on it gives the matching `value`. */
export type Widget = { [T in WidgetType]: WidgetOf<T> }[WidgetType];

/** Position on a Section's 12-column grid of 20px rows. Min sizes are never persisted. */
export interface WidgetLayout {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DocumentSummary {
  id: string;
  title: string;
  updatedAt: string;
}
