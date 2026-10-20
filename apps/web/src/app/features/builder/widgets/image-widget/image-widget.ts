import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';

/** No alt text by decision: images render with alt="" (ADR 0003). */
@Component({
  selector: 'app-image-widget',
  templateUrl: './image-widget.html',
  styleUrl: './image-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: { class: 'flex h-full flex-col' },
})
export class ImageWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Image>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  protected readonly content = computed(() => this.widget().value.content);
  protected readonly fit = computed(() => this.widget().value.config.fit);
  protected readonly opensLink = computed(() => !this.editMode() && !!this.content().href);
}
