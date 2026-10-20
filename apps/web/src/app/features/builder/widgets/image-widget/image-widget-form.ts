import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { InputText } from 'primeng/inputtext';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { ImageFit } from '@Core/models/widget-value.model';
import { inputValue } from '@Shared/utils/dom';
import { WidgetValueChange } from '../widget-contract';

/** Uploads live in the in-memory store as data URLs, so they are kept small. */
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

@Component({
  selector: 'app-image-widget-form',
  templateUrl: './image-widget-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, FormField, ButtonModule, ButtonGroup, InputText],
  host: { class: 'flex flex-col gap-4' },
})
export class ImageWidgetForm {
  readonly widget = input.required<WidgetOf<WidgetType.Image>>();
  readonly valueChange = output<WidgetValueChange<WidgetType.Image>>();
  readonly commit = output<void>();

  protected readonly fits: readonly { fit: ImageFit; labelKey: string }[] = [
    { fit: 'contain', labelKey: 'BUILDER.WIDGETS.IMAGE.FIT_CONTAIN' },
    { fit: 'cover', labelKey: 'BUILDER.WIDGETS.IMAGE.FIT_COVER' },
  ];
  protected readonly uploadError = signal<string | null>(null);

  private readonly model = signal({ url: '', caption: '', href: '' });
  protected readonly imageForm = form(this.model);

  constructor() {
    effect(() => {
      const { src, caption, href } = this.widget().value.content;
      const url = this.isUpload(src) ? '' : src;
      const current = this.model();
      if (current.url !== url || current.caption !== caption || current.href !== href) {
        this.model.set({ url, caption, href });
      }
    });
  }

  protected isUpload(src = this.widget().value.content.src): boolean {
    return src.startsWith('data:');
  }

  protected onFieldInput(field: 'url' | 'caption' | 'href', event: Event): void {
    const typed = inputValue(event);
    this.model.update((model) => ({ ...model, [field]: typed }));
    const value = this.widget().value;
    const { url, caption, href } = this.model();
    const content = { ...value.content, caption, href };
    if (field === 'url') content.src = url.trim();
    this.valueChange.emit({
      value: { ...value, content },
      burstKey: `${this.widget().id}:${field}`,
    });
  }

  protected onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.uploadError.set('BUILDER.WIDGETS.IMAGE.NOT_AN_IMAGE');
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      this.uploadError.set('BUILDER.WIDGETS.IMAGE.TOO_LARGE');
      return;
    }
    this.uploadError.set(null);
    const reader = new FileReader();
    reader.onload = () => {
      const value = this.widget().value;
      this.valueChange.emit({
        value: { ...value, content: { ...value.content, src: String(reader.result) } },
      });
    };
    reader.readAsDataURL(file);
  }

  protected removeImage(): void {
    const value = this.widget().value;
    this.valueChange.emit({ value: { ...value, content: { ...value.content, src: '' } } });
  }

  protected setFit(fit: ImageFit): void {
    const value = this.widget().value;
    if (value.config.fit === fit) return;
    this.valueChange.emit({ value: { ...value, config: { fit } } });
  }
}
