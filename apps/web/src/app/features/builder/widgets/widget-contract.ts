import { WidgetType } from '@Core/models/widget-type.enum';
import { WidgetValue } from '@Core/models/widget-value.model';

/**
 * Contract every Widget type implements (see widget-registry.ts):
 *
 * - view — inputs `widget: WidgetOf<T>`, `editMode: boolean`, `selected: boolean`. May inject
 *   BuilderStore for what it renders (numbers, outline) or edits inline (Table).
 * - form — the sidebar form: input `widget: WidgetOf<T>`; outputs `valueChange:
 *   WidgetValueChange<T>` and `commit: void` (focus left a field: closes its typing burst).
 */
export interface WidgetValueChange<T extends WidgetType = WidgetType> {
  value: WidgetValue<T>;
  /** Set for typing, so keystrokes in the same field merge into one undo step. */
  burstKey?: string;
}
