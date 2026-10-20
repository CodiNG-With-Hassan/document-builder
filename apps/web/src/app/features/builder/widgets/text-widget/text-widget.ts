import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { RichText } from '@Shared/components/rich-text/rich-text';
import { isBlankHtml } from '@Shared/utils/rich-text';

@Component({
  selector: 'app-text-widget',
  templateUrl: './text-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RichText],
  host: { class: 'block' },
})
export class TextWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Text>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  protected readonly html = computed(() => this.widget().value.content.html);
  protected readonly blank = computed(() => isBlankHtml(this.html()));
}
