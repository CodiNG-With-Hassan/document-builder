import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { InputText } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { HeadingLevel } from '@Core/models/widget-value.model';
import { inputValue } from '@Shared/utils/dom';
import { BuilderStore } from '../../store/builder.store';
import { WidgetValueChange } from '../widget-contract';
import { headerTextBurstKey, singleLine } from './header-widget';

@Component({
  selector: 'app-header-widget-form',
  templateUrl: './header-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, ButtonModule, ButtonGroup, InputText, ToggleSwitch],
  host: { class: 'flex flex-col gap-4' },
})
export class HeaderWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Header>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Header>>();
  readonly commit = output<void>();

  private readonly store = inject(BuilderStore);
  protected readonly levels: readonly HeadingLevel[] = [1, 2, 3];
  protected readonly outline = computed(() => this.store.outlineById().get(this.widget().id));

  private readonly model = signal({ text: '', numbered: true });
  protected readonly headerForm = form(this.model);

  constructor() {
    // Follow outside changes (undo/redo, another Widget selected) without echoing them back.
    effect(() => {
      const { content, config } = this.widget().value;
      const current = this.model();
      if (current.text !== content.text || current.numbered !== config.numbered) {
        this.model.set({ text: content.text, numbered: config.numbered });
      }
    });
  }

  protected onTextInput(event: Event): void {
    const text = singleLine(inputValue(event));
    this.model.update((model) => ({ ...model, text }));
    const value = this.widget().value;
    this.valueChange.emit({
      value: { ...value, content: { text } },
      burstKey: headerTextBurstKey(this.widget().id),
    });
  }

  protected setLevel(level: HeadingLevel): void {
    const value = this.widget().value;
    if (value.config.level === level) return;
    this.valueChange.emit({ value: { ...value, config: { ...value.config, level } } });
  }

  protected onNumberedChange(): void {
    const value = this.widget().value;
    const numbered = this.model().numbered;
    if (value.config.numbered === numbered) return;
    this.valueChange.emit({ value: { ...value, config: { ...value.config, numbered } } });
  }
}
