import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { InputText } from 'primeng/inputtext';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { inputValue } from '@Shared/utils/dom';
import { WidgetValueChange } from '../widget-contract';

type LinkField = 'label' | 'url' | 'description';

@Component({
  selector: 'app-link-widget-form',
  templateUrl: './link-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, InputText],
  host: { class: 'flex flex-col gap-4' },
})
export class LinkWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Link>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Link>>();
  readonly commit = output<void>();

  protected readonly fields: readonly { field: LinkField; labelKey: string; type: string }[] = [
    { field: 'label', labelKey: 'BUILDER.WIDGETS.LINK.FIELD_LABEL', type: 'text' },
    { field: 'url', labelKey: 'BUILDER.WIDGETS.LINK.FIELD_URL', type: 'url' },
    { field: 'description', labelKey: 'BUILDER.WIDGETS.LINK.FIELD_DESCRIPTION', type: 'text' },
  ];

  private readonly model = signal({ label: '', url: '', description: '' });
  protected readonly linkForm = form(this.model);

  constructor() {
    effect(() => {
      const { link, description } = this.widget().value.content;
      const next = { label: link.label, url: link.url, description };
      const current = this.model();
      if (
        current.label !== next.label ||
        current.url !== next.url ||
        current.description !== next.description
      ) {
        this.model.set(next);
      }
    });
  }

  protected onFieldInput(field: LinkField, event: Event): void {
    const typed = inputValue(event);
    this.model.update((model) => ({ ...model, [field]: typed }));
    const { label, url, description } = this.model();
    this.valueChange.emit({
      value: { content: { link: { label, url: url.trim() }, description } },
      burstKey: `${this.widget().id}:${field}`,
    });
  }
}
