import {
  afterNextRender,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  createComponent,
  DestroyRef,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GridStack, GridStackNode } from 'gridstack';
import { Section, Widget, WidgetLayout } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { BuilderStore } from '../store/builder.store';
import { sameLayouts } from '../store/document-mutations';
import { WidgetFrame } from '../widget-frame/widget-frame';
import { WIDGET_REGISTRY } from '../widgets/widget-registry';
import { GRID_OPTIONS } from './grid-options';
import { GridRegistry } from './grid-registry';

/**
 * One Section's gridstack grid, driven by the BuilderStore: the store is the source of truth
 * and this component makes the grid match it. User gestures are reported back through the
 * GridRegistry. Only gridstack's public API is used.
 */
@Component({
  selector: 'app-section-grid',
  templateUrl: './section-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: { class: 'relative block' },
})
export class SectionGrid {
  readonly section = input.required<Section>();

  protected readonly store = inject(BuilderStore);
  private readonly registry = inject(GridRegistry);
  private readonly appRef = inject(ApplicationRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly injector = inject(Injector);
  private readonly gridElement = viewChild.required<ElementRef<HTMLElement>>('grid');

  private grid: GridStack | null = null;
  /** Set while this component changes the grid, so its own updates are not taken as gestures. */
  private syncing = false;

  constructor() {
    afterNextRender(() => this.init());

    effect(() => {
      const section = this.section();
      const editMode = this.store.editMode();
      untracked(() => this.sync(section, editMode));
    });

    inject(DestroyRef).onDestroy(() => this.teardown());
  }

  private init(): void {
    const grid = GridStack.init(
      { ...GRID_OPTIONS, staticGrid: !this.store.editMode() },
      this.gridElement().nativeElement,
    );
    if (!grid) return;
    this.grid = grid;
    this.registry.register(this.section().id, grid);

    grid.on('dragstop', () => this.onGestureEnd());
    grid.on('resizestop', () => this.onGestureEnd());
    grid.on('dropped', (_event, previous, node) => this.onDropped(previous, node));

    this.sync(this.section(), this.store.editMode());
  }

  private onGestureEnd(): void {
    if (!this.syncing) this.registry.commitGesture();
  }

  private onDropped(previous: GridStackNode | undefined, node: GridStackNode): void {
    if (previous) {
      // Moved here from another Section's grid.
      this.registry.commitGesture();
      return;
    }

    // Dropped from the palette: swap gridstack's temporary item for a real Widget.
    const type = node.el?.dataset['widgetType'] as WidgetType | undefined;
    const position = { x: node.x ?? 0, y: node.y ?? 0 };
    if (node.el) this.grid?.removeWidget(node.el, true, false);
    if (type && type in WIDGET_REGISTRY) {
      this.store.addWidget(type, this.section().id, position);
    }
  }

  private sync(section: Section, editMode: boolean): void {
    const grid = this.grid;
    if (!grid) return;

    this.syncing = true;
    grid.setStatic(!editMode);
    grid.batchUpdate();

    const nodes = new Map(grid.engine.nodes.filter((n) => n.id).map((n) => [n.id as string, n]));
    const layoutIds = new Set(section.layout.map((l) => l.id));

    for (const [id, node] of nodes) {
      if (layoutIds.has(id)) continue;
      this.registry.destroyHost(node.el);
      if (node.el) grid.removeWidget(node.el, true, false);
    }

    /** Content height changes, applied after the batch (see below). */
    const heightChanges: { el: HTMLElement; widget: Widget; layout: WidgetLayout; oldH: number }[] =
      [];

    for (const layout of section.layout) {
      const node = nodes.get(layout.id);
      const widget = section.widgets.find((w) => w.id === layout.id);
      if (!widget) continue;

      if (!node) {
        this.addItem(grid, widget, layout);
      } else if (node.el) {
        const moved = node.x !== layout.x || node.y !== layout.y || node.w !== layout.w;
        const resized = node.h !== layout.h;
        if (resized && !moved && WIDGET_REGISTRY[widget.type].sizing === 'content') {
          heightChanges.push({ el: node.el, widget, layout, oldH: node.h ?? layout.h });
        } else if (moved || resized) {
          grid.update(node.el, { ...layout, ...this.sizeLimits(widget, layout) });
        }
      }
    }

    grid.batchUpdate(false);

    // A Content height Widget that grows must push the Widgets below it down. Inside a batch
    // gridstack re-packs overlapping items instead (moving the grown one to the end), so these
    // are applied one by one afterwards. gridstack clamps h against the current lock before it
    // applies a new one, so the lock is widened first.
    for (const { el, widget, layout, oldH } of heightChanges) {
      grid.update(el, { minH: Math.min(oldH, layout.h), maxH: Math.max(oldH, layout.h) });
      grid.update(el, { h: layout.h, ...this.sizeLimits(widget, layout) });
    }
    this.syncing = false;

    // The grid may have reflowed (pushed neighbours down, packed rows up): store what it shows.
    if (!sameLayouts(GridRegistry.readLayouts(grid), section.layout)) this.registry.amend();
  }

  private addItem(grid: GridStack, widget: Widget, layout: WidgetLayout): void {
    const item = document.createElement('div');
    item.className = 'grid-stack-item';
    const content = document.createElement('div');
    content.className = 'grid-stack-item-content';
    item.appendChild(content);

    const ref = createComponent(WidgetFrame, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector,
      hostElement: content,
    });
    ref.setInput('widgetId', widget.id);
    this.appRef.attachView(ref.hostView);
    // gridstack looks the drag handle up when it sets the item up, so render the frame first.
    ref.changeDetectorRef.detectChanges();
    this.registry.trackHost(item, ref);

    grid.makeWidget(item, { ...layout, ...this.sizeLimits(widget, layout) });
  }

  /** Min sizes from the registry; Content height Widgets are locked to their stored height. */
  private sizeLimits(
    widget: Widget,
    layout: WidgetLayout,
  ): { minW: number; minH: number; maxH?: number } {
    const { minSize, sizing } = WIDGET_REGISTRY[widget.type];
    return sizing === 'content'
      ? { minW: minSize.w, minH: layout.h, maxH: layout.h }
      : { minW: minSize.w, minH: minSize.h };
  }

  private teardown(): void {
    const grid = this.grid;
    if (!grid) return;
    for (const node of grid.engine.nodes) this.registry.destroyHost(node.el);
    this.registry.unregister(this.section().id);
    grid.destroy(false);
    this.grid = null;
  }
}
