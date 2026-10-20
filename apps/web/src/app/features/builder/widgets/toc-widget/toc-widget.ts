import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WidgetOf } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { BuilderNavigation } from '../../builder-page/builder-navigation';
import { BuilderStore } from '../../store/builder.store';
import { OutlineEntry } from '../../store/outline';

@Component({
  selector: 'app-toc-widget',
  templateUrl: './toc-widget.html',
  styleUrl: './toc-widget.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: { class: 'block' },
})
export class TocWidget {
  readonly widget = input.required<WidgetOf<WidgetType.TableOfContents>>();
  readonly editMode = input(false);
  readonly selected = input(false);

  private readonly store = inject(BuilderStore);
  private readonly navigation = inject(BuilderNavigation);

  protected readonly title = computed(() => this.widget().value.content.title);
  protected readonly entries = computed(() => {
    const depth = this.widget().value.config.depth;
    return this.store.outline().filter((entry) => entry.level <= depth);
  });

  protected go(entry: OutlineEntry, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.navigation.scrollTo(entry);
  }
}
