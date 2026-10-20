import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Tooltip } from 'primeng/tooltip';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';

@Component({
  selector: 'app-link-widget',
  templateUrl: './link-widget.html',
  styleUrl: './link-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, TranslatePipe, Tooltip],
  host: { class: 'block' },
})
export class LinkWidget {
  readonly widget = input.required<WidgetOf<WidgetType.Link>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  protected readonly content = computed(() => this.widget().value.content);
  protected readonly host = computed(() => {
    try {
      return new URL(this.content().link.url).host;
    } catch {
      return '';
    }
  });
  protected readonly opensLink = computed(() => !this.editMode() && !!this.content().link.url);
}
