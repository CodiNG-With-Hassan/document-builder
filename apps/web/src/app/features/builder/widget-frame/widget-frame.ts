import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { GRID_ROW_HEIGHT } from '../section-grid/grid-options';
import { BuilderStore } from '../store/builder.store';
import { WIDGET_REGISTRY } from '../widgets/widget-registry';

/** Vertical padding around a Widget's content: frame host (2 × 4px) + content (2 × 8px). */
const FRAME_VERTICAL_PADDING = 24;

/**
 * Content of one grid item: the Widget type's view plus, in Edit mode, the selection outline
 * and the duplicate/delete overlay. Created dynamically inside gridstack's item element.
 */
@Component({
  selector: 'app-widget-frame',
  templateUrl: './widget-frame.html',
  styleUrl: './widget-frame.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, TranslatePipe, ButtonModule, Tooltip],
})
export class WidgetFrame {
  readonly widgetId = input.required<string>();

  protected readonly store = inject(BuilderStore);
  private readonly confirmation = inject(ConfirmationService);
  private readonly translate = inject(TranslateService);

  protected readonly widget = computed(() => this.store.widgetsById().get(this.widgetId()) ?? null);
  protected readonly definition = computed(() => {
    const widget = this.widget();
    return widget ? WIDGET_REGISTRY[widget.type] : null;
  });
  protected readonly selected = computed(() => this.store.selectedWidgetId() === this.widgetId());
  protected readonly viewInputs = computed(() => ({
    widget: this.widget(),
    editMode: this.store.editMode(),
    selected: this.selected(),
  }));
  protected readonly contentSized = computed(() => this.definition()?.sizing === 'content');
  protected readonly canDuplicate = computed(() => {
    const widget = this.widget();
    return !!widget && this.store.canAdd(widget.type);
  });

  private readonly measure = viewChild<ElementRef<HTMLElement>>('measure');

  constructor() {
    // Content height: keep the stored rows equal to what the content needs.
    effect((onCleanup) => {
      const element = this.measure()?.nativeElement;
      if (!element) return;
      let frame = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => this.syncHeight(element));
      });
      observer.observe(element);
      onCleanup(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
      });
    });
  }

  private syncHeight(element: HTMLElement): void {
    if (!this.contentSized()) return;
    const rows = Math.max(
      1,
      Math.ceil(
        (element.getBoundingClientRect().height + FRAME_VERTICAL_PADDING) / GRID_ROW_HEIGHT,
      ),
    );
    if (this.store.layoutById().get(this.widgetId())?.h !== rows) {
      this.store.setWidgetHeight(this.widgetId(), rows);
    }
  }

  protected select(): void {
    if (this.store.editMode()) this.store.selectWidget(this.widgetId());
  }

  protected duplicate(): void {
    this.store.duplicateWidget(this.widgetId());
  }

  protected confirmDelete(): void {
    this.confirmation.confirm({
      header: this.translate.instant('BUILDER.WIDGET.DELETE_HEADER'),
      message: this.translate.instant('BUILDER.WIDGET.DELETE_MESSAGE'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('SHARED.ACTIONS.DELETE'),
      rejectLabel: this.translate.instant('SHARED.ACTIONS.CANCEL'),
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => this.store.deleteWidget(this.widgetId()),
    });
  }
}
