import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChildren,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GridStack } from 'gridstack';
import { Tooltip } from 'primeng/tooltip';
import { WidgetType } from '@Core/models/widget-type.enum';
import { BuilderStore } from '../store/builder.store';
import { WIDGET_TYPES } from '../widgets/widget-registry';

/**
 * The Widget types to add: drag one into any Section, or click it to add it to the Active
 * Section. Types a Document already has the maximum of (Table of contents) are disabled.
 */
@Component({
  selector: 'app-widget-palette',
  templateUrl: './widget-palette.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, Tooltip],
})
export class WidgetPalette {
  protected readonly store = inject(BuilderStore);
  private readonly entries = viewChildren<ElementRef<HTMLElement>>('entry');
  private readonly draggable = new WeakSet<HTMLElement>();

  protected readonly types = WIDGET_TYPES;

  constructor() {
    // Entries are re-created when a type becomes (un)available, so set up each new one.
    effect(() => {
      const fresh = this.entries()
        .map((entry) => entry.nativeElement)
        .filter((element) => !this.draggable.has(element));
      if (!fresh.length) return;
      fresh.forEach((element) => this.draggable.add(element));
      GridStack.setupDragIn(fresh, {
        appendTo: 'body',
        helper: 'clone',
        handle: '.grid-stack-item-content',
      });
    });
  }

  protected add(type: WidgetType): void {
    this.store.addWidget(type);
  }
}
