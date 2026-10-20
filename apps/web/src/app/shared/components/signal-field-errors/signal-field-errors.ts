import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

const FIELD_ERRORS_TRANSLATION_PREFIX = 'SHARED.FIELD_ERRORS.';

// Minimal structural view of a signal-forms FieldTree. Typed structurally on purpose:
// FieldTree's value signal is invariant in its value type, so a FieldTree<TValue> input
// would reject every concrete field the caller has.
export type FieldErrorsSource = () => {
  readonly touched: Signal<boolean>;
  readonly dirty: Signal<boolean>;
  readonly invalid: Signal<boolean>;
  readonly errors: Signal<readonly { readonly kind: string }[]>;
};

interface FieldErrorEntry {
  key: string;
  params: Record<string, string>;
}

/**
 * Renders the translated validation messages of a signal-forms field once it has been
 * touched or edited. Usage: `<app-signal-field-errors [label]="…" [field]="form.title" />`
 */
@Component({
  selector: 'app-signal-field-errors',
  imports: [TranslatePipe],
  templateUrl: './signal-field-errors.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block min-h-4' },
})
export class SignalFieldErrors {
  readonly label = input.required<string>();
  readonly field = input.required<FieldErrorsSource>();

  protected readonly errors = computed<FieldErrorEntry[]>(() => {
    const state = this.field()();
    if (!state.invalid() || (!state.dirty() && !state.touched())) return [];

    const label = this.label();
    return state.errors().map((error) => ({
      key:
        FIELD_ERRORS_TRANSLATION_PREFIX +
        (error.kind === 'required' ? 'IS_REQUIRED' : 'IS_NOT_VALID'),
      params: { label },
    }));
  });
}
