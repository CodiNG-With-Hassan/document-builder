import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { EMPTY, Observable, tap } from 'rxjs';
import { Document, DocumentSummary } from '@Core/models/document.model';
import { DocumentRepository } from '@Core/repositories/document.repository';
import { DocumentTitleDialog } from '@Shared/components/document-title-dialog/document-title-dialog';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, TranslatePipe, ButtonModule, Menu, TableModule, DocumentTitleDialog],
})
export class DocumentList implements OnInit {
  private readonly repository = inject(DocumentRepository);
  private readonly router = inject(Router);
  private readonly confirmation = inject(ConfirmationService);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly documents = signal<DocumentSummary[]>([]);
  protected readonly rowMenuItems = signal<MenuItem[]>([]);

  protected readonly dialogVisible = signal(false);
  protected readonly dialogMode = signal<'create' | 'rename'>('create');
  protected readonly dialogInitialTitle = signal('');
  protected readonly dialogSubmit = signal<(title: string) => Observable<unknown>>(() => EMPTY);

  ngOnInit(): void {
    this.load();
  }

  protected open(document: DocumentSummary): void {
    void this.router.navigate(['/documents', document.id]);
  }

  protected openCreateDialog(): void {
    this.dialogMode.set('create');
    this.dialogInitialTitle.set('');
    this.dialogSubmit.set((title) => this.createDocument(title));
    this.dialogVisible.set(true);
  }

  protected openRowMenu(event: Event, menu: Menu, document: DocumentSummary): void {
    event.stopPropagation();
    this.rowMenuItems.set([
      {
        label: this.translate.instant('SHARED.ACTIONS.RENAME'),
        icon: 'pi pi-pencil',
        command: () => this.openRenameDialog(document),
      },
      {
        label: this.translate.instant('SHARED.ACTIONS.DELETE'),
        icon: 'pi pi-trash',
        command: () => this.confirmDelete(document),
      },
    ]);
    menu.toggle(event);
  }

  protected load(): void {
    this.repository
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((documents) => this.documents.set(documents));
  }

  private openRenameDialog(document: DocumentSummary): void {
    this.dialogMode.set('rename');
    this.dialogInitialTitle.set(document.title);
    this.dialogSubmit.set((title) => this.repository.rename(document.id, title));
    this.dialogVisible.set(true);
  }

  private createDocument(title: string): Observable<Document> {
    return this.repository.create(title).pipe(tap((document) => this.open(document)));
  }

  private confirmDelete(document: DocumentSummary): void {
    this.confirmation.confirm({
      header: this.translate.instant('DOCUMENTS.DELETE.HEADER'),
      message: this.translate.instant('DOCUMENTS.DELETE.MESSAGE', { title: document.title }),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('SHARED.ACTIONS.DELETE'),
      rejectLabel: this.translate.instant('SHARED.ACTIONS.CANCEL'),
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => this.repository.delete(document.id).subscribe(() => this.load()),
    });
  }
}
