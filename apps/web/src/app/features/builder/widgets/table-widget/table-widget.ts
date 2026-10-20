import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Tooltip } from 'primeng/tooltip';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { TableCell } from '@Core/models/widget-value.model';
import { inputValue } from '@Shared/utils/dom';
import { BuilderStore } from '../../store/builder.store';
import {
  deleteColumn,
  deleteRow,
  insertColumn,
  insertRow,
  moveColumn,
  moveRow,
  resizeBorder,
  setCell,
  setColumnWidths,
  TableValue,
  toggleCellKind,
} from './table-ops';

interface CellPosition {
  row: number;
  column: number;
}

/**
 * A Table widget, edited inline: once the Table is selected (Edit mode), clicking a cell edits
 * it. Rows and columns get handle menus, `+ Row` / `+ Column` sit at the edges, and borders in
 * the first row can be dragged to resize columns.
 */
@Component({
  selector: 'app-table-widget',
  templateUrl: './table-widget.html',
  styleUrl: './table-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, TranslatePipe, FormField, ButtonModule, Menu, Tooltip],
  host: { class: 'block' },
})
export class TableWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Table>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  private readonly store = inject(BuilderStore);
  private readonly translate = inject(TranslateService);
  private readonly tableElement = viewChild<ElementRef<HTMLTableElement>>('table');

  protected readonly value = computed(() => this.widget().value);
  protected readonly rows = computed(() => this.value().content.rows);
  protected readonly columns = computed(() => this.rows()[0]?.map((_, c) => c) ?? []);
  protected readonly editable = computed(() => this.editMode() && this.selected());

  protected readonly editing = signal<CellPosition | null>(null);
  protected readonly menuItems = signal<MenuItem[]>([]);
  /** Widths while a border is being dragged, before they are stored. */
  private readonly liveWidths = signal<number[] | null>(null);
  protected readonly widths = computed(() => this.liveWidths() ?? this.value().config.columnWidths);

  private readonly cellModel = signal({ text: '', label: '', url: '' });
  protected readonly cellForm = form(this.cellModel);

  constructor() {
    effect(() => {
      if (!this.editable()) this.editing.set(null);
    });
  }

  protected isHeader(row: number, column: number): boolean {
    const { headerRow, headerColumn } = this.value().config;
    return (headerRow && row === 0) || (headerColumn && column === 0);
  }

  protected isEditing(row: number, column: number): boolean {
    const editing = this.editing();
    return editing?.row === row && editing.column === column;
  }

  protected onCellClick(row: number, column: number, event: Event): void {
    if (!this.editable()) return;
    event.preventDefault();
    if (!this.isEditing(row, column)) this.startEditing(row, column);
  }

  protected startEditing(row: number, column: number, focus: 'first' | 'last' = 'first'): void {
    const cell = this.rows()[row]?.[column];
    if (!cell) return;
    this.store.closeBurst();
    this.cellModel.set(
      cell.kind === 'text'
        ? { text: cell.text, label: '', url: '' }
        : { text: '', label: cell.link.label, url: cell.link.url },
    );
    this.editing.set({ row, column });
    setTimeout(() => {
      const inputs = this.tableElement()?.nativeElement.querySelectorAll<HTMLInputElement>(
        'td.is-editing input, th.is-editing input',
      );
      const target = focus === 'first' ? inputs?.[0] : inputs?.[inputs.length - 1];
      target?.focus();
      target?.select();
    });
  }

  protected stopEditing(): void {
    this.store.closeBurst();
    this.editing.set(null);
  }

  protected onCellInput(field: 'text' | 'label' | 'url', event: Event): void {
    const editing = this.editing();
    if (!editing) return;
    const typed = inputValue(event);
    this.cellModel.update((model) => ({ ...model, [field]: typed }));
    const { text, label, url } = this.cellModel();
    const cell: TableCell =
      field === 'text' ? { kind: 'text', text } : { kind: 'link', link: { label, url } };
    this.update(
      setCell(this.value(), editing.row, editing.column, cell),
      `${this.widget().id}:cell:${editing.row}:${editing.column}:${field}`,
    );
  }

  /** Tab/Shift+Tab move between cells (Tab in the last cell adds a row), Enter moves down. */
  protected onCellKeydown(event: KeyboardEvent, field: 'text' | 'label' | 'url'): void {
    const editing = this.editing();
    if (!editing) return;
    const { row, column } = editing;
    const lastRow = this.rows().length - 1;
    const lastColumn = this.columns().length - 1;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.stopEditing();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (row < lastRow) this.startEditing(row + 1, column);
      else this.stopEditing();
    } else if (event.key === 'Tab' && !event.shiftKey && field !== 'label') {
      event.preventDefault();
      if (column < lastColumn) this.startEditing(row, column + 1);
      else if (row < lastRow) this.startEditing(row + 1, 0);
      else {
        this.update(insertRow(this.value(), lastRow + 1));
        // The new row only exists once the updated value has reached this view.
        setTimeout(() => this.startEditing(lastRow + 1, 0));
      }
    } else if (event.key === 'Tab' && event.shiftKey && field !== 'url') {
      event.preventDefault();
      if (column > 0) this.startEditing(row, column - 1, 'last');
      else if (row > 0) this.startEditing(row - 1, lastColumn, 'last');
    }
  }

  protected toggleKind(): void {
    const editing = this.editing();
    if (!editing) return;
    this.update(toggleCellKind(this.value(), editing.row, editing.column));
    setTimeout(() => this.startEditing(editing.row, editing.column));
  }

  protected openRowMenu(event: Event, menu: Menu, row: number): void {
    event.stopPropagation();
    const t = (key: string) => this.translate.instant(`BUILDER.WIDGETS.TABLE.${key}`);
    const count = this.rows().length;
    this.menuItems.set([
      {
        label: t('INSERT_ABOVE'),
        icon: 'pi pi-arrow-up',
        command: () => this.structure(insertRow(this.value(), row)),
      },
      {
        label: t('INSERT_BELOW'),
        icon: 'pi pi-arrow-down',
        command: () => this.structure(insertRow(this.value(), row + 1)),
      },
      {
        label: t('MOVE_UP'),
        icon: 'pi pi-angle-up',
        disabled: row === 0,
        command: () => this.structure(moveRow(this.value(), row, -1)),
      },
      {
        label: t('MOVE_DOWN'),
        icon: 'pi pi-angle-down',
        disabled: row === count - 1,
        command: () => this.structure(moveRow(this.value(), row, 1)),
      },
      {
        label: t('DELETE_ROW'),
        icon: 'pi pi-trash',
        disabled: count <= 1,
        command: () => this.structure(deleteRow(this.value(), row)),
      },
    ]);
    menu.toggle(event);
  }

  protected openColumnMenu(event: Event, menu: Menu, column: number): void {
    event.stopPropagation();
    const t = (key: string) => this.translate.instant(`BUILDER.WIDGETS.TABLE.${key}`);
    const count = this.columns().length;
    this.menuItems.set([
      {
        label: t('INSERT_LEFT'),
        icon: 'pi pi-arrow-left',
        command: () => this.structure(insertColumn(this.value(), column)),
      },
      {
        label: t('INSERT_RIGHT'),
        icon: 'pi pi-arrow-right',
        command: () => this.structure(insertColumn(this.value(), column + 1)),
      },
      {
        label: t('MOVE_LEFT'),
        icon: 'pi pi-angle-left',
        disabled: column === 0,
        command: () => this.structure(moveColumn(this.value(), column, -1)),
      },
      {
        label: t('MOVE_RIGHT'),
        icon: 'pi pi-angle-right',
        disabled: column === count - 1,
        command: () => this.structure(moveColumn(this.value(), column, 1)),
      },
      {
        label: t('DELETE_COLUMN'),
        icon: 'pi pi-trash',
        disabled: count <= 1,
        command: () => this.structure(deleteColumn(this.value(), column)),
      },
    ]);
    menu.toggle(event);
  }

  protected addRow(): void {
    this.structure(insertRow(this.value(), this.rows().length));
  }

  protected addColumn(): void {
    this.structure(insertColumn(this.value(), this.columns().length));
  }

  /** Dragging the border right of `column`: live while dragging, one undo step on release. */
  protected startResize(event: PointerEvent, column: number): void {
    event.preventDefault();
    event.stopPropagation();
    const table = this.tableElement()?.nativeElement;
    if (!table) return;
    const tableWidth = table.getBoundingClientRect().width;
    const start = this.value().config.columnWidths ?? this.measuredWidths(table, tableWidth);
    const startX = event.clientX;
    const handle = event.target as HTMLElement;
    handle.setPointerCapture(event.pointerId);

    const onMove = (move: PointerEvent) =>
      this.liveWidths.set(
        resizeBorder(start, column, ((move.clientX - startX) / tableWidth) * 100),
      );
    const onUp = () => {
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onUp);
      const widths = this.liveWidths();
      this.liveWidths.set(null);
      if (widths) this.structure(setColumnWidths(this.value(), widths));
    };
    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
  }

  private measuredWidths(table: HTMLTableElement, tableWidth: number): number[] {
    const firstRow = table.querySelector('tr[data-row="0"]');
    const cells = firstRow
      ? Array.from(firstRow.querySelectorAll<HTMLElement>('[data-column]'))
      : [];
    return cells.map((cell) => (cell.getBoundingClientRect().width / tableWidth) * 100);
  }

  private structure(value: TableValue): void {
    this.stopEditing();
    this.update(value);
  }

  private update(value: TableValue, burstKey?: string): void {
    this.store.updateWidgetValue<WidgetType.Table>(this.widget().id, value, burstKey);
  }
}
