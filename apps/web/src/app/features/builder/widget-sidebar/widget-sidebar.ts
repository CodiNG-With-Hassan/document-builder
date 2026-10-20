import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  effect,
  inject,
  inputBinding,
  outputBinding,
  untracked,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BuilderStore } from '../store/builder.store';
import { WidgetPalette } from '../widget-palette/widget-palette';
import { WidgetValueChange } from '../widgets/widget-contract';
import { WIDGET_REGISTRY } from '../widgets/widget-registry';

/** Right-hand sidebar: the palette, or the form of the Selected Widget. */
@Component({
  selector: 'app-widget-sidebar',
  templateUrl: './widget-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, ButtonModule, WidgetPalette],
})
export class WidgetSidebar {
  protected readonly store = inject(BuilderStore);
  private readonly formHost = viewChild('formHost', { read: ViewContainerRef });

  protected readonly definition = computed(() => {
    const widget = this.store.selectedWidget();
    return widget ? WIDGET_REGISTRY[widget.type] : null;
  });
  private readonly selectedId = computed(() => this.store.selectedWidget()?.id ?? null);
  private formRef: ComponentRef<unknown> | null = null;

  constructor() {
    // A fresh form per selected Widget, bound to the store through the registry's contract.
    effect(() => {
      const host = this.formHost();
      const widgetId = this.selectedId();
      const definition = this.definition();
      untracked(() => {
        this.formRef?.destroy();
        this.formRef = null;
        if (!host || !widgetId || !definition) return;

        this.formRef = host.createComponent(definition.form, {
          bindings: [
            inputBinding('widget', () => this.store.selectedWidget()),
            outputBinding<WidgetValueChange>('valueChange', ({ value, burstKey }) =>
              this.store.updateWidgetValue(widgetId, value, burstKey),
            ),
            outputBinding('commit', () => this.store.closeBurst()),
          ],
        });
      });
    });
  }
}
