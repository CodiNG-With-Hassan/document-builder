import { ChangeDetectionStrategy, Component, input, model, output, signal } from '@angular/core';
import { form, FormField, validate } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Observable } from 'rxjs';
import { isRepositoryError, RepositoryErrorCode } from '@Core/repositories/repository-error';
import { SignalFieldErrors } from '@Shared/components/signal-field-errors/signal-field-errors';
import { ErrorKeyPipe } from '@Shared/pipes/error-key.pipe';

/**
 * Asks for a Document title, for both creating and renaming. The caller passes `submitTitle`,
 * which performs the actual repository call; its title errors (required, taken) render inline.
 */
@Component({
  selector: 'app-document-title-dialog',
  templateUrl: './document-title-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    FormField,
    ButtonModule,
    Dialog,
    InputText,
    SignalFieldErrors,
    ErrorKeyPipe,
  ],
})
export class DocumentTitleDialog {
  readonly visible = model(false);
  readonly mode = input.required<'create' | 'rename'>();
  readonly initialTitle = input('');
  readonly submitTitle = input.required<(title: string) => Observable<unknown>>();
  readonly saved = output<void>();

  private readonly model = signal({ title: '' });
  protected readonly titleForm = form(this.model, (path) => {
    validate(path.title, ({ value }) => (value().trim() ? null : { kind: 'required' }));
  });
  protected readonly serverError = signal<RepositoryErrorCode | null>(null);

  protected reset(): void {
    this.titleForm().reset({ title: this.initialTitle() });
    this.serverError.set(null);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    this.titleForm.title().markAsTouched();
    if (this.titleForm().invalid()) return;

    this.submitTitle()(this.model().title).subscribe({
      next: () => {
        this.visible.set(false);
        this.saved.emit();
      },
      error: (error: unknown) => {
        if (!isRepositoryError(error)) throw error;
        this.serverError.set(error.code);
      },
    });
  }
}
