import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { videoEmbedUrl } from './video-url';

@Component({
  selector: 'app-video-widget',
  templateUrl: './video-widget.html',
  styleUrl: './video-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: { class: 'block' },
})
export class VideoWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Video>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly url = computed(() => this.widget().value.content.url);
  /** Only YouTube and Vimeo embed URLs ever reach the iframe (see videoEmbedUrl). */
  protected readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const embed = videoEmbedUrl(this.url());
    return embed ? this.sanitizer.bypassSecurityTrustResourceUrl(embed) : null;
  });
}
