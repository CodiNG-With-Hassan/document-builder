import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { form, FormField } from '@angular/forms/signals';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { Section as SectionModel } from '@Core/models/document.model';
import { SectionGrid } from '../section-grid/section-grid';
import { BuilderStore } from '../store/builder.store';

/** One Section on the canvas: its header (title, collapse, move, delete) and its grid. */
@Component({
  selector: 'app-section',
  templateUrl: './section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, CdkDragHandle, FormField, ButtonModule, InputText, Tooltip, SectionGrid],
  host: {
    class: 'block',
    '[attr.data-section-id]': 'section().id',
    '(pointerdown)': 'store.clickSection(section().id)',
  },
})
export class Section {
  readonly section = input.required<SectionModel>();
  /** Position in the Document; the host element is the cdkDrag item of BuilderPage's list. */
  readonly index = input.required<number>();

  protected readonly store = inject(BuilderStore);
  private readonly confirmation = inject(ConfirmationService);
  private readonly translate = inject(TranslateService);
  private readonly titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  protected readonly collapsed = computed(
    () => this.store.editMode() && this.store.collapsedSectionIds().includes(this.section().id),
  );
  protected readonly showHeader = computed(() => this.store.editMode() || !!this.section().title);
  protected readonly number = computed(
    () => this.store.outlineById().get(this.section().id)?.number ?? null,
  );
  protected readonly isFirst = computed(() => this.index() === 0);
  protected readonly isLast = computed(() => this.index() === this.store.sections().length - 1);

  protected readonly editingTitle = signal(false);
  private readonly titleModel = signal({ title: '' });
  protected readonly titleForm = form(this.titleModel);

  protected startTitleEdit(): void {
    this.titleModel.set({ title: this.section().title });
    this.editingTitle.set(true);
    setTimeout(() => this.titleInput()?.nativeElement.select());
  }

  /** Enter and blur both commit; Escape cancels, and the blur that follows is then ignored. */
  protected commitTitle(): void {
    if (!this.editingTitle()) return;
    this.editingTitle.set(false);
    this.store.renameSection(this.section().id, this.titleModel().title.trim());
  }

  protected move(offset: -1 | 1): void {
    this.store.moveSectionTo(this.section().id, this.index() + offset);
  }

  protected cancelTitleEdit(): void {
    this.editingTitle.set(false);
  }

  protected confirmDelete(): void {
    this.confirmation.confirm({
      header: this.translate.instant('BUILDER.SECTION.DELETE_HEADER'),
      message: this.translate.instant('BUILDER.SECTION.DELETE_MESSAGE'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('SHARED.ACTIONS.DELETE'),
      rejectLabel: this.translate.instant('SHARED.ACTIONS.CANCEL'),
      acceptButtonProps: { severity: 'danger' },
      rejectButtonProps: { severity: 'secondary', text: true },
      accept: () => this.store.deleteSection(this.section().id),
    });
  }
}
