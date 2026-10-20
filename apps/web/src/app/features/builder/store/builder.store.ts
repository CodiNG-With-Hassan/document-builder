import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { Document, Section, Widget, WidgetLayout } from '@Core/models/document.model';
import { WidgetType } from '@Core/models/widget-type.enum';
import { WidgetValue } from '@Core/models/widget-value.model';
import { DocumentRepository } from '@Core/repositories/document.repository';
import { WIDGET_REGISTRY } from '../widgets/widget-registry';
import {
  addWidgetToSection,
  applyGridLayouts,
  bottomOf,
  findWidget,
  findWidgetSection,
  removeWidgetFromSection,
  updateSection,
} from './document-mutations';
import { buildOutline } from './outline';
import { applySnapshot, DocumentSnapshot, pushSnapshot, snapshotOf } from './undo-history';

/** A burst of typing in one field becomes a single undo step once it has been idle this long. */
const BURST_IDLE_MS = 1000;

export type BuilderMode = 'edit' | 'preview';

interface BuilderState {
  /** Working copy; every change is written through to the repository straight away. */
  document: Document | null;
  mode: BuilderMode;
  selectedWidgetId: string | null;
  lastClickedSectionId: string | null;
  collapsedSectionIds: string[];
  undoStack: DocumentSnapshot[];
  redoStack: DocumentSnapshot[];
  /**
   * The field (e.g. `widgetId:text`, `widgetId:cell:2:1`) whose keystrokes are being merged into
   * the undo step the burst started; null when no burst is open.
   */
  burstKey: string | null;
}

const initialState: BuilderState = {
  document: null,
  mode: 'edit',
  selectedWidgetId: null,
  lastClickedSectionId: null,
  collapsedSectionIds: [],
  undoStack: [],
  redoStack: [],
  burstKey: null,
};

interface CommitOptions {
  /** false for changes that follow from the previous step, e.g. the grid reflowing after it. */
  undoable?: boolean;
  /** Typing in this field: merges into the open burst for the same field. */
  burstKey?: string;
}

/**
 * State of the Document open in the builder. Provided by BuilderPage, so the undo history
 * lives exactly as long as the Document is open. Every change to the Document goes through here.
 */
export const BuilderStore = signalStore(
  withState(initialState),
  withComputed(
    ({ document, selectedWidgetId, lastClickedSectionId, mode, undoStack, redoStack }) => {
      const sections = computed(() => document()?.sections ?? []);
      const selectedWidget = computed(() => {
        const current = document();
        const id = selectedWidgetId();
        return current && id ? (findWidget(current, id) ?? null) : null;
      });
      const selectedWidgetSectionId = computed(() => {
        const current = document();
        const id = selectedWidgetId();
        return current && id ? (findWidgetSection(current, id)?.id ?? null) : null;
      });
      const outline = computed(() => {
        const current = document();
        return current ? buildOutline(current) : [];
      });
      return {
        sections,
        outline,
        /** Heading numbers and Skipped levels by Section / Header widget id. */
        outlineById: computed(() => new Map(outline().map((entry) => [entry.id, entry]))),
        widgetCountByType: computed(() => {
          const counts = new Map<WidgetType, number>();
          sections().forEach((s) =>
            s.widgets.forEach((w) => counts.set(w.type, (counts.get(w.type) ?? 0) + 1)),
          );
          return counts;
        }),
        selectedWidget,
        selectedWidgetSectionId,
        layoutById: computed(
          () => new Map(sections().flatMap((s) => s.layout.map((l) => [l.id, l] as const))),
        ),
        widgetsById: computed(
          () => new Map(sections().flatMap((s) => s.widgets.map((w) => [w.id, w] as const))),
        ),
        /** Where a Widget added by clicking in the palette goes. */
        activeSectionId: computed(() => {
          const ids = sections().map((s) => s.id);
          const lastClicked = lastClickedSectionId();
          return (
            selectedWidgetSectionId() ??
            (lastClicked && ids.includes(lastClicked) ? lastClicked : null) ??
            ids.at(-1) ??
            null
          );
        }),
        editMode: computed(() => mode() === 'edit'),
        canUndo: computed(() => mode() === 'edit' && undoStack().length > 0),
        canRedo: computed(() => mode() === 'edit' && redoStack().length > 0),
        canDeleteSection: computed(() => sections().length > 1),
      };
    },
  ),
  withMethods((store) => {
    const repository = inject(DocumentRepository);
    const router = inject(Router);
    const messages = inject(MessageService);
    const translate = inject(TranslateService);
    let burstTimer: ReturnType<typeof setTimeout> | undefined;

    const showError = (summaryKey: string): void =>
      messages.add({ severity: 'error', summary: translate.instant(summaryKey) });

    const persist = (document: Document): void => {
      repository.save(document).subscribe({ error: () => showError('ERRORS.SAVE_FAILED') });
    };

    const closeBurst = (): void => {
      clearTimeout(burstTimer);
      burstTimer = undefined;
      if (store.burstKey()) patchState(store, { burstKey: null });
    };

    const commit = (
      change: (document: Document) => Document,
      { undoable = true, burstKey }: CommitOptions = {},
    ): void => {
      const current = store.document();
      if (!current) return;
      const next = change(current);
      if (next === current) return;

      // Follow-up changes (grid reflow, Content height) belong to whatever caused them, so
      // they neither start an undo step nor end a typing burst.
      if (!undoable) {
        patchState(store, { document: next });
        persist(next);
        return;
      }

      const continuesBurst = !!burstKey && store.burstKey() === burstKey;
      if (!continuesBurst) closeBurst();
      patchState(store, (state) => ({
        document: next,
        undoStack: continuesBurst
          ? state.undoStack
          : pushSnapshot(state.undoStack, snapshotOf(current)),
        redoStack: [],
        burstKey: burstKey ?? null,
      }));
      if (burstKey) {
        clearTimeout(burstTimer);
        burstTimer = setTimeout(closeBurst, BURST_IDLE_MS);
      }
      persist(next);
    };

    const updateWidget = (
      document: Document,
      widgetId: string,
      update: (widget: Widget) => Widget,
    ): Document => {
      const section = findWidgetSection(document, widgetId);
      if (!section) return document;
      return updateSection(document, section.id, (s) => ({
        ...s,
        widgets: s.widgets.map((w) => (w.id === widgetId ? update(w) : w)),
      }));
    };

    /** Whether one more Widget of this type fits in the Document (Table of contents: one). */
    const canAdd = (type: WidgetType): boolean => {
      const max = WIDGET_REGISTRY[type].maxPerDocument;
      return max === undefined || (store.widgetCountByType().get(type) ?? 0) < max;
    };

    /** Drops selection and collapse state that points at things that no longer exist. */
    const pruneUiState = (): void => {
      const document = store.document();
      if (!document) return;
      const sectionIds = document.sections.map((s) => s.id);
      patchState(store, (state) => ({
        selectedWidgetId:
          state.selectedWidgetId && findWidget(document, state.selectedWidgetId)
            ? state.selectedWidgetId
            : null,
        collapsedSectionIds: state.collapsedSectionIds.filter((id) => sectionIds.includes(id)),
      }));
    };

    const travel = (from: 'undoStack' | 'redoStack', to: 'undoStack' | 'redoStack'): void => {
      const current = store.document();
      const target = store[from]().at(-1);
      if (!current || !target || !store.editMode()) return;
      closeBurst();

      const next = applySnapshot(current, target);
      patchState(store, (state) => ({
        document: next,
        [from]: state[from].slice(0, -1),
        [to]: pushSnapshot(state[to], snapshotOf(current)),
      }));
      pruneUiState();
      persist(next);
    };

    return {
      load(id: string): void {
        patchState(store, initialState);
        repository.get(id).subscribe({
          next: (document) => patchState(store, { document }),
          error: () => {
            showError('ERRORS.DOCUMENT_NOT_FOUND');
            void router.navigate(['/documents']);
          },
        });
      },

      /** Goes through the repository so the title rules apply; the dialog shows its errors. */
      renameDocument(title: string): Observable<Document> {
        const id = store.document()?.id ?? '';
        return repository
          .rename(id, title)
          .pipe(tap((saved) => commit((document) => ({ ...document, title: saved.title }))));
      },

      deleteDocument(): void {
        const id = store.document()?.id;
        if (!id) return;
        repository.delete(id).subscribe(() => void router.navigate(['/documents']));
      },

      /** Without a position (click in the palette) it goes to the bottom of the Active Section. */
      canAdd,

      addWidget(type: WidgetType, sectionId?: string, position?: { x: number; y: number }): void {
        const targetId = sectionId ?? store.activeSectionId();
        if (!targetId || !canAdd(type)) return;
        const definition = WIDGET_REGISTRY[type];
        const widget = {
          id: crypto.randomUUID(),
          type,
          value: definition.defaultValue(),
        } as Widget;

        commit((document) =>
          updateSection(document, targetId, (section) =>
            addWidgetToSection(section, widget, {
              id: widget.id,
              x: position?.x ?? 0,
              y: position?.y ?? bottomOf(section),
              ...definition.defaultSize,
            }),
          ),
        );
        patchState(store, { selectedWidgetId: widget.id, lastClickedSectionId: targetId });
      },

      /**
       * Replaces a Widget's value. With a `burstKey` (typing), keystrokes in the same field merge
       * into one undo step; without one (structure, toggles) the change is its own undo step.
       */
      updateWidgetValue<T extends WidgetType>(
        widgetId: string,
        value: WidgetValue<T>,
        burstKey?: string,
      ): void {
        commit((document) => updateWidget(document, widgetId, (w) => ({ ...w, value }) as Widget), {
          burstKey,
        });
      },

      /** Content height: the rows a Widget's content needs. Never an undo step of its own. */
      setWidgetHeight(widgetId: string, h: number): void {
        commit(
          (document) => {
            const section = findWidgetSection(document, widgetId);
            const layout = section?.layout.find((l) => l.id === widgetId);
            if (!section || !layout || layout.h === h) return document;
            return updateSection(document, section.id, (s) => ({
              ...s,
              layout: s.layout.map((l) => (l.id === widgetId ? { ...l, h } : l)),
            }));
          },
          { undoable: false },
        );
      },

      closeBurst,

      /** One drag or resize gesture, possibly across Sections: one undo step. */
      applyGridLayouts(layoutsBySection: ReadonlyMap<string, readonly WidgetLayout[]>): void {
        commit((document) => applyGridLayouts(document, layoutsBySection));
      },

      /** The grid reflowed after a change that is already an undo step (e.g. pushed neighbours). */
      amendGridLayouts(layoutsBySection: ReadonlyMap<string, readonly WidgetLayout[]>): void {
        commit((document) => applyGridLayouts(document, layoutsBySection), { undoable: false });
      },

      /** Copy goes directly below the original, at the same column and size, and is selected. */
      duplicateWidget(widgetId: string): void {
        const document = store.document();
        const section = document && findWidgetSection(document, widgetId);
        const original = section?.widgets.find((w) => w.id === widgetId);
        const layout = section?.layout.find((l) => l.id === widgetId);
        if (!section || !original || !layout || !canAdd(original.type)) return;

        const copy: Widget = { ...structuredClone(original), id: crypto.randomUUID() };
        commit((current) =>
          updateSection(current, section.id, (s) =>
            addWidgetToSection(s, copy, { ...layout, id: copy.id, y: layout.y + layout.h }),
          ),
        );
        patchState(store, { selectedWidgetId: copy.id });
      },

      deleteWidget(widgetId: string): void {
        commit((document) => {
          const section = findWidgetSection(document, widgetId);
          return section
            ? updateSection(document, section.id, (s) => removeWidgetFromSection(s, widgetId))
            : document;
        });
        pruneUiState();
      },

      addSection(): void {
        const section: Section = {
          id: crypto.randomUUID(),
          title: '',
          numbered: true,
          widgets: [],
          layout: [],
        };
        commit((document) => ({ ...document, sections: [...document.sections, section] }));
        patchState(store, { lastClickedSectionId: section.id });
      },

      deleteSection(sectionId: string): void {
        if (!store.canDeleteSection()) return;
        commit((document) => ({
          ...document,
          sections: document.sections.filter((s) => s.id !== sectionId),
        }));
        pruneUiState();
      },

      renameSection(sectionId: string, title: string): void {
        commit((document) =>
          updateSection(document, sectionId, (section) =>
            section.title === title ? section : { ...section, title },
          ),
        );
      },

      toggleSectionNumbered(sectionId: string): void {
        commit((document) =>
          updateSection(document, sectionId, (section) => ({
            ...section,
            numbered: !section.numbered,
          })),
        );
      },

      /** UI state only. Used before scrolling to something inside a collapsed Section. */
      expandSection(sectionId: string): void {
        patchState(store, (state) => ({
          collapsedSectionIds: state.collapsedSectionIds.filter((id) => id !== sectionId),
        }));
      },

      /** Moves a Section to `toIndex` (drag and drop, or one step via the up/down buttons). */
      moveSectionTo(sectionId: string, toIndex: number): void {
        commit((document) => {
          const from = document.sections.findIndex((s) => s.id === sectionId);
          if (from < 0 || toIndex < 0 || toIndex >= document.sections.length || from === toIndex) {
            return document;
          }
          const sections = [...document.sections];
          sections.splice(toIndex, 0, ...sections.splice(from, 1));
          return { ...document, sections };
        });
      },

      /** UI state only: neither undoable nor persisted. */
      toggleSectionCollapsed(sectionId: string): void {
        patchState(store, (state) => ({
          collapsedSectionIds: state.collapsedSectionIds.includes(sectionId)
            ? state.collapsedSectionIds.filter((id) => id !== sectionId)
            : [...state.collapsedSectionIds, sectionId],
        }));
      },

      selectWidget(widgetId: string | null): void {
        if (widgetId === store.selectedWidgetId()) return;
        closeBurst();
        patchState(store, { selectedWidgetId: widgetId });
      },

      clickSection(sectionId: string): void {
        patchState(store, { lastClickedSectionId: sectionId });
      },

      setMode(mode: BuilderMode): void {
        closeBurst();
        patchState(store, {
          mode,
          selectedWidgetId: mode === 'preview' ? null : store.selectedWidgetId(),
        });
      },

      undo(): void {
        travel('undoStack', 'redoStack');
      },

      redo(): void {
        travel('redoStack', 'undoStack');
      },
    };
  }),
  withHooks({
    onDestroy(store) {
      store.closeBurst();
    },
  }),
);
