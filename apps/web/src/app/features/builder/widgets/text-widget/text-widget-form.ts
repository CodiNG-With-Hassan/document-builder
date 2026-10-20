import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { RichTextEditor } from '@Shared/components/rich-text-editor/rich-text-editor';
import { WidgetValueChange } from '../widget-contract';

@Component({
  selector: 'app-text-widget-form',
  templateUrl: './text-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RichTextEditor],
})
export class TextWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Text>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Text>>();
  readonly commit = output<void>();

  protected onHtmlChange(html: string): void {
    this.valueChange.emit({ value: { content: { html } }, burstKey: `${this.widget().id}:html` });
  }
}
