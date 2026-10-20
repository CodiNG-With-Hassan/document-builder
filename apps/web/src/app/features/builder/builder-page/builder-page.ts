import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BuilderToolbar } from '../builder-toolbar/builder-toolbar';
import { BuilderNavigation } from './builder-navigation';
import { Section } from '../section/section';
import { GridRegistry } from '../section-grid/grid-registry';
import { BuilderStore } from '../store/builder.store';
import { WidgetSidebar } from '../widget-sidebar/widget-sidebar';

const EDITABLE_TARGET = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';

/** Route component of `documents/:id`. Owns the BuilderStore, so leaving clears the undo history. */
@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkDrag,
    CdkDragPlaceholder,
    CdkDragPreview,
    CdkDropList,
    TranslatePipe,
    ButtonModule,
    BuilderToolbar,
    Section,
    WidgetSidebar,
  ],
  providers: [BuilderStore, GridRegistry, BuilderNavigation],
  host: {
    class: 'flex h-full flex-col',
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class BuilderPage {
  /** Route parameter, bound by withComponentInputBinding. */
  readonly id = input.required<string>();

  protected readonly store = inject(BuilderStore);

  constructor() {
    effect(() => {
      const id = this.id();
      untracked(() => this.store.load(id));
    });
  }

  protected onSectionDropped(event: CdkDragDrop<unknown, unknown, string>): void {
    this.store.moveSectionTo(event.item.data, event.currentIndex);
  }

  /** Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z or Ctrl+Y redo. Text fields keep their native undo. */
  protected onKeydown(event: KeyboardEvent): void {
    if (!(event.ctrlKey || event.metaKey) || !this.store.editMode()) return;
    if (event.target instanceof Element && event.target.closest(EDITABLE_TARGET)) return;

    const key = event.key.toLowerCase();
    if (key === 'z' && !event.shiftKey) {
      event.preventDefault();
      this.store.undo();
    } else if ((key === 'z' && event.shiftKey) || (key === 'y' && event.ctrlKey)) {
      event.preventDefault();
      this.store.redo();
    }
  }
}
