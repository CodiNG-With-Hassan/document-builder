import { ComponentRef, inject, Injectable } from '@angular/core';
import { GridStack } from 'gridstack';
import { WidgetLayout } from '@Core/models/document.model';
import { BuilderStore } from '../store/builder.store';

/**
 * Builder-wide view of every Section grid, so one drag or resize (possibly from one Section
 * into another) can be read back from all grids at once and stored as a single undo step.
 * Also owns the Angular components hosted inside grid items: gridstack moves those elements
 * between grids on its own, so they cannot belong to any single Section.
 */
@Injectable()
export class GridRegistry {
  private readonly store = inject(BuilderStore);
  private readonly grids = new Map<string, GridStack>();
  private readonly hosts = new Map<HTMLElement, ComponentRef<unknown>>();
  private pending: 'gesture' | 'amend' | null = null;

  register(sectionId: string, grid: GridStack): void {
    this.grids.set(sectionId, grid);
  }

  unregister(sectionId: string): void {
    this.grids.delete(sectionId);
  }

  trackHost(el: HTMLElement, ref: ComponentRef<unknown>): void {
    this.hosts.set(el, ref);
  }

  destroyHost(el: HTMLElement | undefined): void {
    if (!el) return;
    this.hosts.get(el)?.destroy();
    this.hosts.delete(el);
  }

  /** After a user drag/resize: stored as one undo step once gridstack has settled. */
  commitGesture(): void {
    this.schedule('gesture');
  }

  /** After the grids reflowed around a change that is already an undo step. */
  amend(): void {
    this.schedule('amend');
  }

  static readLayouts(grid: GridStack): WidgetLayout[] {
    return grid.engine.nodes
      .filter((node): node is typeof node & { id: string } => !!node.id)
      .map((node) => ({
        id: node.id,
        x: node.x ?? 0,
        y: node.y ?? 0,
        w: node.w ?? 1,
        h: node.h ?? 1,
      }));
  }

  // gridstack fires its events mid-update (and a move across grids fires on both), so read
  // the final state of all grids once the current task is done.
  private schedule(kind: 'gesture' | 'amend'): void {
    const alreadyQueued = this.pending !== null;
    this.pending = kind === 'gesture' ? 'gesture' : (this.pending ?? 'amend');
    if (alreadyQueued) return;

    setTimeout(() => {
      const layouts = new Map(
        [...this.grids].map(([sectionId, grid]) => [sectionId, GridRegistry.readLayouts(grid)]),
      );
      const kindToApply = this.pending;
      this.pending = null;
      if (kindToApply === 'gesture') this.store.applyGridLayouts(layouts);
      else this.store.amendGridLayouts(layouts);
    });
  }
}
