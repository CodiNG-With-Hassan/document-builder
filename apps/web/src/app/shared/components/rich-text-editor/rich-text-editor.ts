import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { Editor, EditorTextChangeEvent } from 'primeng/editor';

/** The only formats Rich text allows (ADR 0002). */
const RICH_TEXT_FORMATS = ['bold', 'italic', 'link'];

/**
 * PrimeNG Editor limited to Rich text: bold, italic and Links. Emits HTML on every change and
 * `commit` when it loses focus, which closes the typing burst's undo step.
 */
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.html',
  styleUrl: './rich-text-editor.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, Editor],
})
export class RichTextEditor {
  readonly html = input.required<string>();
  readonly label = input.required<string>();
  readonly htmlChange = output<string>();
  readonly commit = output<void>();

  protected readonly formats = RICH_TEXT_FORMATS;
  private readonly model = signal({ html: '' });
  protected readonly editorForm = form(this.model);

  constructor() {
    // Follow outside changes (undo/redo, another Widget selected) without echoing them back.
    effect(() => {
      const html = this.html();
      if (html !== this.model().html) this.model.set({ html });
    });
  }

  protected onTextChange(event: EditorTextChangeEvent): void {
    const html = event.htmlValue ?? '';
    if (html === this.html()) return;
    this.htmlChange.emit(html);
  }
}
