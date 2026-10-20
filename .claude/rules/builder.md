---
paths:
  - "apps/web/src/app/features/builder/**"
---

<!-- How the Document builder is wired. Read docs/specs/document-builder.md and docs/adr/0001 first. -->

## The store is the source of truth

- Every change to the open Document goes through `BuilderStore` (`store/builder.store.ts`), which
  writes it through to `DocumentRepository` immediately and records undo history. Components never
  call the repository's `save` themselves.
- Undo snapshots share references with the Document, so Document edits must stay immutable: use
  the pure helpers in `store/document-mutations.ts`, never mutate a Section or Widget in place.
- UI-only state (selection, Active Section, collapsed Sections, Edit/Preview mode) is not undoable
  and not persisted.

## gridstack

- The grid follows the store, not the other way round: `SectionGrid` reconciles its grid with its
  Section on every store change. User gestures are read back from **all** grids through
  `GridRegistry` and stored as one undo step (`applyGridLayouts`); reflows caused by a store change
  are folded into that same step (`amendGridLayouts`).
- gridstack owns the grid item elements and moves them between Sections itself, so the Angular
  component inside each item (`WidgetFrame`) is created with `createComponent` and tracked in
  `GridRegistry`, not rendered with `@for`.
- Public gridstack API only. Don't patch its internals, and don't force re-renders with
  `@if`/`setTimeout` toggles.
- Min sizes come from the Widget type registry when items are added. Only `id/x/y/w/h` are stored.
- Widgets move by their grip only (`WIDGET_DRAG_HANDLE_CLASS`). gridstack looks the handle up when
  it sets an item up, so the grip is always rendered (hidden by CSS outside Edit mode) and the
  frame is change-detected before `makeWidget`.

## Section order

Sections are reordered with Angular CDK drag-drop (`cdkDropList` in `BuilderPage`, `cdkDragHandle`
in `Section`), not gridstack. The drag uses a compact preview and placeholder so the Section's grid
is never cloned; `@for` tracks Sections by id, so their grids survive the move.

## Widget types

A new Widget type is an entry in `widgets/widget-registry.ts` plus its own folder (view + form);
nothing else may switch on `WidgetType`. The value shape lives in
`core/models/widget-value.model.ts` (`content` = what the reader sees, `config` = how it is shown).
The view/form contract is in `widgets/widget-contract.ts`:

- view inputs `widget`, `editMode`, `selected`; it may inject `BuilderStore` (numbers, outline,
  inline edits — the Table edits its cells in place, the Header its text through a plain-text
  contenteditable written by an effect, so typing never resets the caret).
- form input `widget`, outputs `valueChange` ({ value, burstKey? }) and `commit` (closes the
  burst). Typing passes a `burstKey` per field so keystrokes merge into one undo step; structural
  changes and toggles pass none. Read typed values from the input event (`inputValue`), not from
  the signal-forms model: the `(input)` handler can run before `[formField]` updated the model.

## Content height

Registry `sizing: 'content'` Widgets (Table of contents, Table, Callout, Process, Link, Video)
measure their content in `WidgetFrame` and store the rows via `setWidgetHeight` — never an undo
step and never closing a burst. `SectionGrid` locks them with `minH = maxH = h` and applies height
changes after the batch update, widening the lock first; inside a batch gridstack would re-pack
the grown item to the end of the Section instead of pushing its neighbours down.

## Rich text

Text, Callout bodies and Step descriptions hold sanitized HTML (ADR 0002): edit with
`app-rich-text-editor`, render with `app-rich-text` (never bind `[innerHTML]` yourself).
