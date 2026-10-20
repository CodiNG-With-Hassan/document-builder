import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { InputText } from 'primeng/inputtext';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { CalloutStyle } from '@Core/models/widget-value.model';
import { inputValue } from '@Shared/utils/dom';
import { RichTextEditor } from '@Shared/components/rich-text-editor/rich-text-editor';
import { WidgetValueChange } from '../widget-contract';
import { CALLOUT_STYLES } from './callout-styles';

@Component({
  selector: 'app-callout-widget-form',
  templateUrl: './callout-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, ButtonModule, ButtonGroup, InputText, RichTextEditor],
  host: { class: 'flex flex-col gap-4' },
})
export class CalloutWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Callout>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Callout>>();
  readonly commit = output<void>();

  protected readonly styles = CALLOUT_STYLES;
  private readonly model = signal({ title: '', source: '' });
  protected readonly calloutForm = form(this.model);

  constructor() {
    effect(() => {
      const { title, source } = this.widget().value.content;
      const current = this.model();
      if (current.title !== title || current.source !== source) this.model.set({ title, source });
    });
  }

  protected onFieldInput(field: 'title' | 'source', event: Event): void {
    const typed = inputValue(event);
    this.model.update((model) => ({ ...model, [field]: typed }));
    const value = this.widget().value;
    this.valueChange.emit({
      value: { ...value, content: { ...value.content, [field]: typed } },
      burstKey: `${this.widget().id}:${field}`,
    });
  }

  protected onHtmlChange(html: string): void {
    const value = this.widget().value;
    this.valueChange.emit({
      value: { ...value, content: { ...value.content, html } },
      burstKey: `${this.widget().id}:html`,
    });
  }

  protected setStyle(style: CalloutStyle): void {
    const value = this.widget().value;
    if (value.config.style === style) return;
    this.valueChange.emit({ value: { ...value, config: { style } } });
  }
}
