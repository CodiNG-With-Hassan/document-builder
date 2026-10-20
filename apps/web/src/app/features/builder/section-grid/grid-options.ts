import { GridStackOptions } from 'gridstack';

export const GRID_ROW_HEIGHT = 20;

/** gridstack's drag handle for grid items: the grip rendered by WidgetFrame. */
export const WIDGET_DRAG_HANDLE_CLASS = 'frame__handle';

/** The Section grid: 12 columns of 20px rows, packed upwards. */
export const GRID_OPTIONS: GridStackOptions = {
  column: 12,
  cellHeight: GRID_ROW_HEIGHT,
  margin: 0,
  mode: 'top',
  animate: true,
  acceptWidgets: true,
  minRow: 5,
  alwaysShowResizeHandle: false,
  // Widgets move by their grip only, so clicking a Widget to select it never starts a drag.
  draggable: { handle: `.${WIDGET_DRAG_HANDLE_CLASS}`, appendTo: 'body', scroll: true },
  resizable: { handles: 'e, se, s, sw, w' },
};
