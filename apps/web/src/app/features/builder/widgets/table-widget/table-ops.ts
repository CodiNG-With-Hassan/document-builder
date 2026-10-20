import { WidgetType } from '@Core/models/widget-type.enum';
import { TableCell, WidgetValue } from '@Core/models/widget-value.model';

/** Pure edits of a Table widget's value; each returns a new value. */
export type TableValue = WidgetValue<WidgetType.Table>;

const MIN_COLUMN_WIDTH = 5;

const emptyCell = (): TableCell => ({ kind: 'text', text: '' });

const columnCount = (value: TableValue): number => value.content.rows[0]?.length ?? 0;

function withRows(value: TableValue, rows: TableCell[][]): TableValue {
  return { ...value, content: { ...value.content, rows } };
}

function withWidths(value: TableValue, columnWidths: number[] | null): TableValue {
  return { ...value, config: { ...value.config, columnWidths } };
}

/** Scales widths so they add up to 100. */
function normalize(widths: number[]): number[] {
  const total = widths.reduce((sum, w) => sum + w, 0) || 1;
  return widths.map((w) => (w / total) * 100);
}

function move<T>(items: readonly T[], from: number, to: number): T[] {
  const result = [...items];
  result.splice(to, 0, ...result.splice(from, 1));
  return result;
}

export function setCell(
  value: TableValue,
  row: number,
  column: number,
  cell: TableCell,
): TableValue {
  return withRows(
    value,
    value.content.rows.map((cells, r) =>
      r === row ? cells.map((existing, c) => (c === column ? cell : existing)) : cells,
    ),
  );
}

export function toggleCellKind(value: TableValue, row: number, column: number): TableValue {
  const cell = value.content.rows[row]?.[column];
  if (!cell) return value;
  const next: TableCell =
    cell.kind === 'text'
      ? { kind: 'link', link: { label: cell.text, url: '' } }
      : { kind: 'text', text: cell.link.label };
  return setCell(value, row, column, next);
}

export function insertRow(value: TableValue, at: number): TableValue {
  const rows = [...value.content.rows];
  rows.splice(at, 0, Array.from({ length: columnCount(value) }, emptyCell));
  return withRows(value, rows);
}

export function deleteRow(value: TableValue, row: number): TableValue {
  if (value.content.rows.length <= 1) return value;
  return withRows(
    value,
    value.content.rows.filter((_, r) => r !== row),
  );
}

export function moveRow(value: TableValue, row: number, offset: -1 | 1): TableValue {
  const to = row + offset;
  if (to < 0 || to >= value.content.rows.length) return value;
  return withRows(value, move(value.content.rows, row, to));
}

/** A new column takes an equal share of the width from the others (when widths are stored). */
export function insertColumn(value: TableValue, at: number): TableValue {
  const rows = value.content.rows.map((cells) => {
    const next = [...cells];
    next.splice(at, 0, emptyCell());
    return next;
  });
  const widths = value.config.columnWidths;
  if (!widths) return withRows(value, rows);
  const share = 100 / (widths.length + 1);
  const scaled = widths.map((w) => (w * (100 - share)) / 100);
  scaled.splice(at, 0, share);
  return withWidths(withRows(value, rows), scaled);
}

export function deleteColumn(value: TableValue, column: number): TableValue {
  if (columnCount(value) <= 1) return value;
  const rows = value.content.rows.map((cells) => cells.filter((_, c) => c !== column));
  const widths = value.config.columnWidths;
  return withWidths(
    withRows(value, rows),
    widths ? normalize(widths.filter((_, c) => c !== column)) : null,
  );
}

export function moveColumn(value: TableValue, column: number, offset: -1 | 1): TableValue {
  const to = column + offset;
  if (to < 0 || to >= columnCount(value)) return value;
  const rows = value.content.rows.map((cells) => move(cells, column, to));
  const widths = value.config.columnWidths;
  return withWidths(withRows(value, rows), widths ? move(widths, column, to) : null);
}

/**
 * Moves the border between `column` and `column + 1` by `deltaPercent`, keeping both columns at
 * least MIN_COLUMN_WIDTH wide.
 */
export function resizeBorder(
  widths: readonly number[],
  column: number,
  deltaPercent: number,
): number[] {
  const left = widths[column];
  const right = widths[column + 1];
  if (left === undefined || right === undefined) return [...widths];
  const delta = Math.max(MIN_COLUMN_WIDTH - left, Math.min(right - MIN_COLUMN_WIDTH, deltaPercent));
  return widths.map((w, c) => (c === column ? w + delta : c === column + 1 ? w - delta : w));
}

export function setColumnWidths(value: TableValue, widths: number[] | null): TableValue {
  return withWidths(value, widths ? normalize(widths) : null);
}
