import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { inputValue } from '@Shared/utils/dom';
import { WidgetValueChange } from '../widget-contract';
import { setColumnWidths } from './table-ops';

type TableToggle = 'headerRow' | 'headerColumn' | 'striped';

@Component({
  selector: 'app-table-widget-form',
  templateUrl: './table-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, ButtonModule, InputText, ToggleSwitch],
  host: { class: 'flex flex-col gap-4' },
})
export class TableWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Table>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Table>>();
  readonly commit = output<void>();

  protected readonly toggles: readonly { key: TableToggle; labelKey: string }[] = [
    { key: 'headerRow', labelKey: 'BUILDER.WIDGETS.TABLE.HEADER_ROW' },
    { key: 'headerColumn', labelKey: 'BUILDER.WIDGETS.TABLE.HEADER_COLUMN' },
    { key: 'striped', labelKey: 'BUILDER.WIDGETS.TABLE.STRIPED' },
  ];

  private readonly model = signal({
    caption: '',
    headerRow: true,
    headerColumn: false,
    striped: false,
  });
  protected readonly tableForm = form(this.model);

  constructor() {
    effect(() => {
      const { content, config } = this.widget().value;
      const next = {
        caption: content.caption,
        headerRow: config.headerRow,
        headerColumn: config.headerColumn,
        striped: config.striped,
      };
      const current = this.model();
      if (Object.entries(next).some(([key, v]) => current[key as keyof typeof current] !== v)) {
        this.model.set(next);
      }
    });
  }

  protected onCaptionInput(event: Event): void {
    const caption = inputValue(event);
    this.model.update((model) => ({ ...model, caption }));
    const value = this.widget().value;
    this.valueChange.emit({
      value: { ...value, content: { ...value.content, caption } },
      burstKey: `${this.widget().id}:caption`,
    });
  }

  protected onToggle(key: TableToggle): void {
    const value = this.widget().value;
    const enabled = this.model()[key];
    if (value.config[key] === enabled) return;
    this.valueChange.emit({ value: { ...value, config: { ...value.config, [key]: enabled } } });
  }

  protected resetWidths(): void {
    this.valueChange.emit({ value: setColumnWidths(this.widget().value, null) });
  }
}
