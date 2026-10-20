import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { RichText } from '@Shared/components/rich-text/rich-text';
import { isBlankHtml } from '@Shared/utils/rich-text';
import { CALLOUT_STYLES } from './callout-styles';

@Component({
  selector: 'app-callout-widget',
  templateUrl: './callout-widget.html',
  styleUrl: './callout-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RichText],
  host: { class: 'block' },
})
export class CalloutWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Callout>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  protected readonly content = computed(() => this.widget().value.content);
  protected readonly style = computed(
    () =>
      CALLOUT_STYLES.find((s) => s.style === this.widget().value.config.style) ?? CALLOUT_STYLES[0],
  );
  protected readonly blank = computed(() => isBlankHtml(this.content().html));
}
