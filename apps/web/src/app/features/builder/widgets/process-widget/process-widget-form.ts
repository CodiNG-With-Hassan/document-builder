import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { ProcessStep } from '@Core/models/widget-value.model';
import { inputValue } from '@Shared/utils/dom';
import { RichTextEditor } from '@Shared/components/rich-text-editor/rich-text-editor';
import { WidgetValueChange } from '../widget-contract';

@Component({
  selector: 'app-process-widget-form',
  templateUrl: './process-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    TranslatePipe,
    FormField,
    ButtonModule,
    InputText,
    Tooltip,
    RichTextEditor,
  ],
  host: { class: 'flex flex-col gap-3' },
})
export class ProcessWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Process>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Process>>();
  readonly commit = output<void>();

  private readonly model = signal<{ titles: string[] }>({ titles: [] });
  protected readonly processForm = form(this.model);

  constructor() {
    effect(() => {
      const titles = this.widget().value.content.steps.map((step) => step.title);
      const current = this.model().titles;
      if (titles.length !== current.length || titles.some((t, i) => t !== current[i])) {
        this.model.set({ titles });
      }
    });
  }

  protected steps(): ProcessStep[] {
    return this.widget().value.content.steps;
  }

  protected onTitleInput(index: number, event: Event): void {
    const step = this.steps()[index];
    const title = inputValue(event);
    this.model.update(({ titles }) => ({
      titles: titles.map((t, i) => (i === index ? title : t)),
    }));
    this.emitSteps(
      this.steps().map((s, i) => (i === index ? { ...s, title } : s)),
      `${this.widget().id}:step:${step.id}:title`,
    );
  }

  protected onHtmlChange(index: number, html: string): void {
    const step = this.steps()[index];
    this.emitSteps(
      this.steps().map((s, i) => (i === index ? { ...s, html } : s)),
      `${this.widget().id}:step:${step.id}:html`,
    );
  }

  protected addStep(): void {
    this.emitSteps([...this.steps(), { id: crypto.randomUUID(), title: '', html: '' }]);
  }

  protected deleteStep(index: number): void {
    this.emitSteps(this.steps().filter((_, i) => i !== index));
  }

  protected moveStep(from: number, to: number): void {
    if (to < 0 || to >= this.steps().length || from === to) return;
    const steps = [...this.steps()];
    steps.splice(to, 0, ...steps.splice(from, 1));
    this.emitSteps(steps);
  }

  protected onDrop(event: CdkDragDrop<unknown>): void {
    this.moveStep(event.previousIndex, event.currentIndex);
  }

  private emitSteps(steps: ProcessStep[], burstKey?: string): void {
    this.valueChange.emit({ value: { content: { steps } }, burstKey });
  }
}
