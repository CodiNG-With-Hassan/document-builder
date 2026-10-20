import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ButtonGroup } from 'primeng/buttongroup';
import { Menu } from 'primeng/menu';
import { Tooltip } from 'primeng/tooltip';
import { DocumentTitleDialog } from '@Shared/components/document-title-dialog/document-title-dialog';
import { BuilderMode, BuilderStore } from '../store/builder.store';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TranslatePipe,
    ButtonModule,
    ButtonGroup,
    Menu,
    Tooltip,
    DocumentTitleDialog,
  ],
})
export class BuilderToolbar {
  protected readonly store = inject(BuilderStore);
  private readonly confirmation = inject(ConfirmationService);
  private readonly translate = inject(TranslateService);

  protected readonly renameVisible = signal(false);
  protected readonly renameDocument = (title: string) => this.store.renameDocument(title);
  protected readonly modes: readonly { mode: BuilderMode; labelKey: string; icon: string }[] = [
    { mode: 'edit', labelKey: 'BUILDER.TOOLBAR.EDIT', icon: 'pi pi-pencil' },
    { mode: 'preview', labelKey: 'BUILDER.TOOLBAR.PREVIEW', icon: 'pi pi-eye' },
  ];
  protected readonly menuItems = signal<MenuItem[]>([]);

  protected openMenu(event: Event, menu: Menu): void {
    this.menuItems.set([
      {
        label: this.translate.instant('SHARED.ACTIONS.RENAME'),
        icon: 'pi pi-pencil',
        command: () => this.renameVisible.set(true),
      },
      {
        label: this.translate.instant('SHARED.ACTIONS.DELETE'),
        icon: 'pi pi-trash',
        command: () => this.confirmDelete(),
      },
    ]);
    menu.toggle(event);
  }

  private confirmDelete(): void {
    this.confirmation.confirm({
      header: this.translate.instant('DOCUMENTS.DELETE.HEADER'),
      message: this.translate.instant('DOCUMENTS.DELETE.MESSAGE', {
        title: this.store.document()?.title ?? '',
      }),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('SHARED.ACTIONS.DELETE'),
      rejectLabel: this.translate.instant('SHARED.ACTIONS.CANCEL'),
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => this.store.deleteDocument(),
    });
  }
}
