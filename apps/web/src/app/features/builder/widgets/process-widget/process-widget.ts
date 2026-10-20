import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { RichText } from '@Shared/components/rich-text/rich-text';
import { isBlankHtml } from '@Shared/utils/rich-text';

@Component({
  selector: 'app-process-widget',
  templateUrl: './process-widget.html',
  styleUrl: './process-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RichText],
  host: { class: 'block' },
})
export class ProcessWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Process>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  protected readonly steps = computed(() =>
    this.widget().value.content.steps.map((step) => ({ ...step, blank: isBlankHtml(step.html) })),
  );
}
