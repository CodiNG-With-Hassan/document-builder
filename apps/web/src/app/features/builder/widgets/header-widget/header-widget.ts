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
import { TranslatePipe } from '@ngx-translate/core';
import { Tooltip } from 'primeng/tooltip';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { BuilderStore } from '../../store/builder.store';

/** A Header is a single line: line breaks typed or pasted become spaces. */
export function singleLine(text: string): string {
  return text.replace(/[\r\n]+/g, ' ');
}

/** Burst key of a Header's text, shared by inline editing and the form: both are one field. */
export function headerTextBurstKey(widgetId: string): string {
  return `${widgetId}:text`;
}

/**
 * A Header widget. In Edit mode its text is edited inline (a plain-text contenteditable, so the
 * heading keeps its layout); the sidebar form edits the same text.
 */
@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.html',
  styleUrl: './header-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, Tooltip],
  host: { class: 'block' },
})
export class HeaderWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Header>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  private readonly store = inject(BuilderStore);
  private readonly textElement = viewChild.required<ElementRef<HTMLElement>>('textElement');

  protected readonly outline = computed(() => this.store.outlineById().get(this.widget().id));
  protected readonly level = computed(() => this.widget().value.config.level);
  protected readonly text = computed(() => this.widget().value.content.text);

  constructor() {
    // Write outside changes (form, undo/redo) into the element; typed text already matches it,
    // so the caret stays where it is.
    effect(() => {
      const element = this.textElement().nativeElement;
      const text = this.text();
      if (element.textContent !== text) element.textContent = text;
    });
  }

  protected onFocus(): void {
    // Keyboard focus selects too, so the sidebar shows this Header's form.
    this.store.selectWidget(this.widget().id);
  }

  protected onInput(): void {
    const element = this.textElement().nativeElement;
    const typed = element.textContent ?? '';
    // Pasted lines come with a trailing break the browser adds, so trim those (never typed text).
    const text = /[\r\n]/.test(typed) ? singleLine(typed.trim()) : typed;
    if (text !== typed || (!text && element.childNodes.length)) {
      // A pasted line break (or a leftover <br> in an emptied field): rewrite, caret at the end.
      element.textContent = text;
      this.placeCaretAtEnd(element);
    }
    const value = this.widget().value;
    if (text === value.content.text) return;
    this.store.updateWidgetValue<WidgetType.Header>(
      this.widget().id,
      { ...value, content: { text } },
      headerTextBurstKey(this.widget().id),
    );
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.preventDefault();
      this.textElement().nativeElement.blur();
    }
  }

  protected onBlur(): void {
    this.store.closeBurst();
  }

  private placeCaretAtEnd(element: HTMLElement): void {
    const selection = element.ownerDocument.getSelection();
    if (!selection) return;
    const range = element.ownerDocument.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
