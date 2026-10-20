import { afterNextRender, DOCUMENT, inject, Injectable, Injector } from '@angular/core';
import { BuilderStore } from '../store/builder.store';
import { OutlineEntry } from '../store/outline';

/** Scrolls the canvas to a Section or Header widget, expanding a collapsed Section first. */
@Injectable()
export class BuilderNavigation {
  private readonly store = inject(BuilderStore);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  scrollTo(entry: OutlineEntry): void {
    const collapsed = this.store.collapsedSectionIds().includes(entry.sectionId);
    if (!collapsed) {
      this.scrollToElement(entry);
      return;
    }
    this.store.expandSection(entry.sectionId);
    // The Section's grid (and its Widgets) only exist once the expanded Section has rendered.
    afterNextRender(() => setTimeout(() => this.scrollToElement(entry)), {
      injector: this.injector,
    });
  }

  private scrollToElement(entry: OutlineEntry): void {
    const selector =
      entry.kind === 'section'
        ? `[data-section-id="${entry.id}"]`
        : `.grid-stack-item[gs-id="${entry.id}"]`;
    this.document.querySelector(selector)?.scrollIntoView({ block: 'start' });
  }
}
