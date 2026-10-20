import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { TocDepth } from '@Core/models/widget-value.model';
import { inputValue } from '@Shared/utils/dom';
import { WidgetValueChange } from '../widget-contract';

@Component({
  selector: 'app-toc-widget-form',
  templateUrl: './toc-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, ButtonModule, InputText],
  host: { class: 'flex flex-col gap-4' },
})
export class TocWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.TableOfContents>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.TableOfContents>>();
  readonly commit = output<void>();

  protected readonly depths: readonly { depth: TocDepth; labelKey: string }[] = [
    { depth: 0, labelKey: 'BUILDER.WIDGETS.TOC.DEPTH_SECTIONS' },
    { depth: 1, labelKey: 'BUILDER.WIDGETS.TOC.DEPTH_H1' },
    { depth: 2, labelKey: 'BUILDER.WIDGETS.TOC.DEPTH_H2' },
    { depth: 3, labelKey: 'BUILDER.WIDGETS.TOC.DEPTH_ALL' },
  ];

  private readonly model = signal({ title: '' });
  protected readonly tocForm = form(this.model);

  constructor() {
    effect(() => {
      const title = this.widget().value.content.title;
      if (title !== this.model().title) this.model.set({ title });
    });
  }

  protected onTitleInput(event: Event): void {
    const title = inputValue(event);
    this.model.set({ title });
    const value = this.widget().value;
    this.valueChange.emit({
      value: { ...value, content: { title } },
      burstKey: `${this.widget().id}:title`,
    });
  }

  protected setDepth(depth: TocDepth): void {
    const value = this.widget().value;
    if (value.config.depth === depth) return;
    this.valueChange.emit({ value: { ...value, config: { depth } } });
  }
}
