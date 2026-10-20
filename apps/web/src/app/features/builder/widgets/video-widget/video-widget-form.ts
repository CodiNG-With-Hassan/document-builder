import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { InputText } from 'primeng/inputtext';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { inputValue } from '@Shared/utils/dom';
import { WidgetValueChange } from '../widget-contract';
import { videoEmbedUrl } from './video-url';

@Component({
  selector: 'app-video-widget-form',
  templateUrl: './video-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, InputText],
  host: { class: 'flex flex-col gap-2' },
})
export class VideoWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Video>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Video>>();
  readonly commit = output<void>();

  private readonly model = signal({ url: '' });
  protected readonly videoForm = form(this.model);

  constructor() {
    effect(() => {
      const url = this.widget().value.content.url;
      if (url !== this.model().url) this.model.set({ url });
    });
  }

  protected unsupported(): boolean {
    const url = this.model().url.trim();
    return !!url && !videoEmbedUrl(url);
  }

  protected onUrlInput(event: Event): void {
    const url = inputValue(event);
    this.model.set({ url });
    this.valueChange.emit({
      value: { content: { url: url.trim() } },
      burstKey: `${this.widget().id}:url`,
    });
  }
}
