# Spec: Document builder demo

A local-only demo of a **Document** builder whose Widgets are text. It is built on the `hassan-devkit-template` and follows every standard used in `~/Projects/de-autozaak` (DAZ).

Domain terms (**Document**, **Section**, **Widget**, **Header widget**, **Text widget**, **Selected Widget**, **Active Section**, **Edit mode**, **Preview mode**) are defined in [`CONTEXT.md`](../../CONTEXT.md). The layout engine decision is recorded in [ADR 0001](../adr/0001-gridstack-for-section-layout.md).

---

## 1. Scope

> **Update 2026-10-17: widget roadmap.** After seeding the Organizational Design Guide, these were accepted as future Widget types: **Table, Image, Callout / quote, Table of contents, Process / steps, Changelog, Link / embed, People / org chart**. Header widgets will get a **level** (H1/H2/H3). This overturns two decisions below: Widgets will have properties besides their text, and a Header no longer has one fixed style. The `⚠ Not supported yet` placeholders in the seed stay until each matching Widget type exists. The designs are settled and built: see [widget-catalogue.md](./widget-catalogue.md). Changelog and People / org chart were dropped from the MVP.

### In scope

- A Document list: create, open, rename and delete Documents.
- A Document builder with Sections and two Widget types (Header, Text).
- **Widgets:**
  - Create them by dragging from or clicking in the palette.
  - Select one and edit its text in a sidebar form. A Header's text can also be edited inline:
    clicking it in Edit mode places the caret there, and Enter or Escape leaves the field.
  - Move (reorder) and resize them inside a Section, and drag them across Sections.
  - Duplicate them, and delete them with a confirmation.
- **Sections:**
  - Add, and delete with a confirmation.
  - Edit the title inline.
  - Move up and down.
  - Collapse and expand.
- An Edit / Preview toggle.
- Undo / redo, scoped to the open Document.
- A light / dark theme toggle.
- An in-memory mock backend that resets to a hardcoded seed on every reload.

### Out of scope

- Any formatting of text (rich text, heading levels, fonts, alignment). **The text is the only editable property of a Widget.**
- Publishing, visibility, sharing, Document settings dialogs, filters.
- Persistence across reloads (no `localStorage` for Documents).
- Using the NestJS API. `apps/api` stays in the workspace and is not called.
- SSR, Docker-based dev, deployment.
- Unit tests and acceptance cases.
- Languages other than English (i18n is wired up, but there is only `en`).

---

## 2. Workspace and tooling

### Bootstrap

1. Work on a branch, not `main`; the devkit hook forbids commits on `main`. Tracker is `none`, so the branch name is free (e.g. `document-builder`).
2. Copy the contents of `CodiNG-With-Hassan/hassan-devkit-template` into this repo, without the template's git history. Keep the existing `CONTEXT.md`, `docs/adr/` and `assets/icon.svg`. The template's `README.md` replaces ours; put the icon back at the top of it.
3. Rename every `template` / `Template` placeholder to `document-creator` / `Document Creator`. The template README's "Renaming for a client" checklist lists the places. Rename `workspace.code-workspace` to `document-creator.code-workspace`.
4. Update the `hassan-devkit` block in the root `package.json`:
   - `tracker: { "kind": "none" }`
   - `ci.nodeVersion: "26"`
   - `i18n.languages: ["en"]`
   - `testCases` is removed, along with `docs/testing/` and the `test-cases:generate` script: there are no acceptance cases.
5. Run `pnpm exec hassan-devkit init`. It regenerates `docs/agents/*`, `ci.yml` and the hooks.
6. Remove the template samples:
   - `core/store/counter.store.ts`
   - `features/home/`
   - `public/assets/i18n/home/`
   - the `home` loader entry
   - the unused `jwt-decode` and `ngx-cookie-service`

### Versions (match DAZ)

| Package | Version |
|---|---|
| Node | 26 |
| pnpm | `packageManager: pnpm@11.18.0` |
| Nx | ^23.1.1 |
| `@coding-with-hassan/devkit` | ^1.4.0 |
| `@coding-with-hassan/renovate-config` | match DAZ |
| Angular (+ CLI, `@angular/build`) | ^22.1 |
| TypeScript | ~6.0 |
| PrimeNG | ^22.1 |
| `@primeuix/themes` | ^3.0 |
| primeicons | ^8 |
| `@ngrx/signals`, `@ngrx/operators` | ^22.0 (DAZ is on ^21.1, whose peer range predates Angular 22) |
| `@ngx-translate/core` | ^17 (+ `@larscom/ngx-translate-module-loader`) |
| Tailwind | v4 via `@tailwindcss/postcss` |
| gridstack | latest stable |
| `@angular/cdk` | same range as Angular (Section drag and drop) |
| `@coding-with-hassan/eslint-config-spa` / `prettier-config-spa` | match DAZ |

`apps/api` is bumped only where needed to keep `pnpm install` and `nx run-many -t lint build` green. It is not otherwise touched.

### Projects

| Project | Purpose |
|---|---|
| `apps/web` | The Angular app: Document list and builder. |
| `apps/api` | Template NestJS API. Kept, unused, must still lint and build. |
| `libs/theme` | The PrimeNG preset. Source-shared and never built. The app imports it as `@Theme` (tsconfig path → `../../libs/theme/src/primeng.preset.ts`) and lists it in `nx.implicitDependencies`. It has its own `package.json` (`workspace:*`, with peer ranges that mirror the app's), plus a README. |

### Removing SSR

Delete `main.server.ts`, `server.ts`, `app.config.server.ts` and `app.routes.server.ts`. Also remove the `server` / `ssr` / `outputMode` options from `angular.json` and drop `express` and `@angular/ssr`. The app is a client-side SPA.

### Running locally

`pnpm --filter web start` runs `ng serve` on port 4200. No Docker, no API. The `/api` proxy config may stay, but nothing calls it.

Root `pnpm lint`, `pnpm build`, `pnpm format:check` and `pnpm ci:check` must all pass.

---

## 3. Frontend standards (from DAZ)

### Components

- Standalone by default: no `standalone: true` and no NgModules.
- Zoneless (`provideZonelessChangeDetection()`).
- `ChangeDetectionStrategy.OnPush` everywhere.
- Always a `templateUrl` and a `.css` file; never inline templates.
- `input()` / `output()` / `model()`, `inject()`, `host: {}` instead of `@HostBinding`.
- `@if` / `@for` / `@switch`, class bindings instead of `ngClass`.
- `protected readonly` for members the template uses.
- Selector prefix `app`.
- File naming without the type suffix (Angular 20+ style): `section.ts` / `section.html` / `section.css`, class `Section`.
- Keep the type suffixes DAZ uses: `.store.ts`, `.model.ts`, `.enum.ts`, `.routes.ts`, `.repository.ts`.

### Forms

Signal forms only (`@angular/forms/signals`: `form()`, `required`, `validate`, `[formField]`).

- Copy DAZ's ESLint `no-restricted-imports` block that bans `FormsModule`, `ReactiveFormsModule` and `FormBuilder`.
- Field errors render through a `signal-field-errors` component, modelled on DAZ's `app-signal-field-errors`.

### Lint and format

- `eslint.config.js` = `@coding-with-hassan/eslint-config-spa({ prefix: 'app', tsconfigRootDir: __dirname })` plus the forms ban.
- `.prettierrc` = `"@coding-with-hassan/prettier-config-spa"` (100 columns, single quotes).

### TypeScript

DAZ web strictness: `strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`. Also `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`.

### Path aliases

In `apps/web/tsconfig.json`: `@Theme`, `@Environment`, `@Core/*`, `@Shared/*`, `@Features/*`.

### Styling

Tailwind v4 with plain CSS (no SCSS), using DAZ's `styles.css` layering:

```css
@layer tailwind-base, primeng, gridstack, tailwind-utilities;
@import 'tailwindcss/theme' layer(tailwind-base);
@import 'tailwindcss/preflight' layer(tailwind-base);
@import 'gridstack/dist/gridstack.min.css' layer(gridstack);
@import 'tailwindcss/utilities' layer(tailwind-utilities);
@import 'primeicons/primeicons.css';
@custom-variant dark (&:where(.dark-mode, .dark-mode *));
```

- `providePrimeNG` uses the matching `cssLayer: { name: 'primeng', order: 'tailwind-base, primeng, gridstack, tailwind-utilities' }`. Drop `tailwindcss-primeui` to match DAZ.
- Colours come from PrimeNG CSS variables (`var(--p-surface-0)`, …), never literal hex values in components.
- Budgets match DAZ: initial bundle warning 1MB / error 1.2MB; `anyComponentStyle` warning 8kB / error 12kB.

### Theme

`libs/theme/src/primeng.preset.ts` exports `documentCreatorPreset = definePreset(Aura, { … })`:

- a blue primary ramp centred on `#2563eb` (primary-600, matching `assets/icon.svg`);
- light and dark `colorScheme` surfaces.

`providePrimeNG` also sets:

- `darkModeSelector: '.dark-mode'`;
- the PrimeNG `license` key, copied from DAZ's `apps/web-admin/src/app/app.config.ts` (a community/dev key).

`core/services/theme-switcher.ts` toggles `.dark-mode` on `<html>` and stores the choice in `localStorage` (`theme`), modelled on DAZ's `ThemeSwitcherService`. The toggle sits in the app shell's top bar.

### i18n

ngx-translate with per-module catalogs at `public/assets/i18n/<module>/en.json` and UPPER_SNAKE nested keys (`BUILDER.TOOLBAR.UNDO`).

- Modules: `shared`, `documents`, `builder`, `errors`.
- All user-facing text goes through `TranslatePipe`; there are no hardcoded strings in templates.
- `translate.addLangs(['en'])`, `fallbackLang: 'en'`.
- The `check-translations` script and the devkit `i18n:check` must pass.

**User content is not translated:** Document titles, Section titles and Widget text, including the seed data.

### App shape

`app.config.ts` contains:

- `provideZonelessChangeDetection()`;
- `provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))`;
- `provideAnimationsAsync()`;
- `providePrimeNG(...)`;
- the translate providers;
- `{ provide: DocumentRepository, useClass: InMemoryDocumentRepository }`.

`provideHttpClient(withFetch())` may stay, unused.

---

## 4. Domain model

Persisted shape. Content and layout are kept apart and joined by `id`.

```ts
// core/models/widget-type.enum.ts
export enum WidgetType {
  Header = 'header',
  Text = 'text',
}

// core/models/document.model.ts
export interface Document {
  id: string; // crypto.randomUUID()
  title: string; // required, unique (trim + case-insensitive)
  sections: Section[]; // ordered, length >= 1
  updatedAt: string; // ISO; set by the repository on every write
}

export interface Section {
  id: string;
  title: string; // may be empty
  widgets: Widget[];
  layout: WidgetLayout[]; // one entry per widget, joined by id
}

export interface Widget {
  id: string;
  type: WidgetType;
  value: { content: { text: string } }; // plain text; may be empty
}

export interface WidgetLayout {
  id: string; // === Widget.id
  x: number;
  y: number;
  w: number;
  h: number; // 12-column grid units / 20px rows
}

export interface DocumentSummary {
  id: string;
  title: string;
  updatedAt: string;
}
```

Rules:

- **Header widget text** is a single line. Strip newlines on input.
- **Text widget text** keeps newlines and renders them (`white-space: pre-wrap`).
- **Minimum sizes are never stored.** They are applied from the Widget type registry when a Section's grid loads. Only `id/x/y/w/h` are persisted. Strip any extra gridstack node fields before writing.
- **A Document always has at least one Section.**

---

## 5. Widget type registry

There is a single source of truth per Widget type: `features/builder/widgets/widget-registry.ts`. Adding a type touches only this file and the type's own folder.

```ts
export interface WidgetTypeDefinition {
  type: WidgetType;
  labelKey: string; // i18n key, e.g. 'BUILDER.WIDGET_TYPES.HEADER'
  icon: string; // primeicons class, e.g. 'pi pi-heading'
  placeholderKey: string; // shown for empty text in Edit mode
  defaultValue: () => Widget['value'];
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
  view: Type<unknown>; // takes input `text: string`, plus `editMode: boolean` for the placeholder
  form: Type<unknown>; // takes input `text: string`, emits output `textChange: string`, plus `textCommit` on blur
}
export const WIDGET_REGISTRY: Record<WidgetType, WidgetTypeDefinition>;
```

| Type | Default size | Min size | View | Form field |
|---|---|---|---|---|
| Header | 6×6 | 1×1 | Single line in a fixed heading style | PrimeNG `pInputText` |
| Text | 6×6 | 1×1 | Multi-line body text (`pre-wrap`) | PrimeNG `pTextarea` with auto-resize |

Views and forms are rendered with `NgComponentOutlet`, with inputs passed through its `inputs` binding. There are no hand-written `@switch` blocks per type.

**Overflow:** a Widget keeps the size the user gave it, and its content scrolls inside it (`overflow: auto`). There is no auto-grow.

---

## 6. Mock backend

### Repository: the boundary the app talks to

```ts
// core/repositories/document.repository.ts
export abstract class DocumentRepository {
  abstract list(): Observable<DocumentSummary[]>; // sorted by updatedAt desc
  abstract get(id: string): Observable<Document>; // errors DOCUMENT_NOT_FOUND
  abstract create(title: string): Observable<Document>; // one empty Section; errors DOCUMENT_TITLE_REQUIRED | DOCUMENT_TITLE_TAKEN
  abstract rename(id: string, title: string): Observable<Document>; // same title errors + DOCUMENT_NOT_FOUND
  abstract save(document: Document): Observable<Document>; // whole-document write-through
  abstract delete(id: string): Observable<void>;
}
```

`InMemoryDocumentRepository` (`core/repositories/in-memory-document.repository.ts`):

- Holds `signal<Document[]>` initialised from `structuredClone(DOCUMENT_SEED)`, so every reload restarts from the seed.
- Returns `of(...)` synchronously. There is no artificial delay.
- Returns deep clones, so callers can never mutate its state.
- Errors are thrown as `throwError(() => new RepositoryError(code))`. The codes come from `RepositoryErrorCode`: `DOCUMENT_NOT_FOUND`, `DOCUMENT_TITLE_REQUIRED`, `DOCUMENT_TITLE_TAKEN`.
- The UI renders errors through the `errorKey` pipe → `ERRORS.<CODE>` → `translate`. Codes are compared against the enum, never string literals. This mirrors the shape of DAZ's ADR 0012.

### Seed (`core/repositories/document.seed.ts`)

1. **"Quarterly Update"**: three Sections with varied layouts.
   - Section "Highlights": a full-width Header, then two half-width Text widgets side by side.
   - Section "Numbers in words": a Header plus a long Text widget, so internal scrolling shows.
   - Section "Next steps": one Header and one Text widget at different widths.
2. **"Meeting Notes"**: one Section titled "Notes" containing a Header and a Text widget.
3. **"Organizational Design Guide"** (`seeds/sbp-organizational-design-guide.seed.ts`): the full Schuberg Philis Organizational Design Guide v1.5 (59 pages, internal) as a realistic large Document: 6 Sections (one per chapter), ~305 Widgets. Text is copied verbatim from the PDF. Content without a Widget type yet (tables, images, table of contents, document properties) is kept as Text widgets that start with `⚠ Not supported yet — <kind>`; tables stay structured (`table(caption, columns, rows)`) so they can move to a Table widget later.

`seeds/seed-builder.ts` lets long seeds be written as content: blocks are stacked in reading order, full width or 8+4 columns side by side, and their height is estimated from the text length.

---

## 7. State: `BuilderStore`

`features/builder/store/builder.store.ts` is an `@ngrx/signals` `signalStore` provided at the builder page component level, not in root. It is created when a Document is opened and destroyed when you leave, which clears the undo history.

### State

| Field | Persisted? | Notes |
|---|---|---|
| `document: Document \| null` | yes (via `save`) | Working copy |
| `mode: 'edit' \| 'preview'` | no | Starts as `'edit'` |
| `selectedWidgetId: string \| null` | no | |
| `lastClickedSectionId: string \| null` | no | Feeds the Active Section |
| `collapsedSectionIds: string[]` | no | Edit mode only |
| `undoStack` / `redoStack: DocumentSnapshot[]` | no | Max 50 entries |
| `error: RepositoryErrorCode \| null` | no | |

### Computed

- `selectedWidget`, `selectedWidgetSectionId`
- `activeSectionId`: the Section of the Selected Widget, otherwise `lastClickedSectionId` if it still exists, otherwise the last Section
- `canUndo` / `canRedo`: false in Preview mode
- `canDeleteSection`: `sections.length > 1`

### Write-through

Every mutating method:

1. pushes the pre-change snapshot onto the undo stack (see bursts below) and clears the redo stack;
2. applies the change immutably to `document`;
3. calls `repository.save(document)` straight away. With the in-memory repository the round-trip is synchronous.

There is no debounce, no Save button and no "Saved" toast.

### Methods

| Method | Behaviour |
|---|---|
| `load(id)` | Fetches the Document. On `DOCUMENT_NOT_FOUND`, navigates to the list and shows a toast. |
| `renameDocument(title)` | Goes through `repository.rename`, so uniqueness is checked; on success, replaces `document`. Undoable. |
| `deleteDocument()` | Goes through `repository.delete`, then navigates to the list. Not undoable. |
| `addWidget(type, sectionId, position?)` | Uses the registry defaults. With `position` (drag-in) it uses that x/y. Without it (click-in) it targets the **Active Section** at `x: 0, y: bottom of the Section`. The new Widget becomes the **Selected Widget**. |
| `updateWidgetText(id, text)` | Burst-coalesced undo (see below). |
| `updateLayouts(sectionId, layouts)` | Applies move and resize results from gridstack, including reflowed neighbours. One undo step per gesture. |
| `moveWidgetToSection(id, fromSectionId, toSectionId, layout)` | Cross-Section drag. **One** undo step. |
| `duplicateWidget(id)` | A deep copy with a new id, same `x/w/h`, at `y = original.y + original.h`. The copy is selected. |
| `deleteWidget(id)` | Runs after confirmation. Clears the selection if this Widget was selected. |
| `addSection()` | Appends an empty Section (empty title, no Widgets) and makes it `lastClickedSectionId`. |
| `deleteSection(id)` | Runs after confirmation. A no-op if it is the last Section. |
| `renameSection(id, title)` | Commits on blur or Enter. One undo step. |
| `moveSectionTo(id, toIndex)` | Moves the Section to `toIndex`: dropped by its grip, or one step via the up/down buttons. No-op when out of range. |
| `toggleSectionCollapsed(id)` | UI state only. Not undoable, not persisted. |
| `selectWidget(id \| null)` / `clickSection(id)` | Selection and Active Section bookkeeping. Selecting closes an open text burst. |
| `setMode(mode)` | Preview clears the selection and closes any burst. |
| `undo()` / `redo()` | Restores a snapshot, then writes it through with `save`. The selection is cleared if the Selected Widget no longer exists. |

### Undo details

- **Snapshots** store the `sections` and `title` of the Document. Use a snapshot stack rather than a command union; it is simpler with write-through.
- **Truncating the redo branch:** when pushing at index `i`, keep entries `0..i` inclusive. This avoids the `slice(0, currentIndex)` off-by-one.
- **Text bursts:**
  - The first `updateWidgetText` of a burst pushes one snapshot; later keystrokes in the same burst do not.
  - A burst closes after 1s of no typing, when the field loses focus, when another Widget is selected, or on any other mutation.
- **Shortcuts:** Ctrl/Cmd+Z = undo, Ctrl/Cmd+Shift+Z = redo, active in Edit mode only. When focus is in an `input` or `textarea`, the browser's native text undo applies instead and the builder shortcut is ignored.

---

## 8. Routes and screens

```
''                 → redirect 'documents'
'documents'        → features/documents/document-list        (lazy loadComponent)
'documents/:id'    → features/builder/builder-page           (lazy loadComponent; `id` via withComponentInputBinding)
'**'               → redirect 'documents'
```

An app shell (`app.html`) holds a top bar with the app name and icon on the left and the theme toggle on the right, plus a `<router-outlet>`, a `p-toast` and a `p-confirm-dialog`.

### 8.1 Document list

- **Table:** a PrimeNG table or data view with a row per Document showing its title and when it was last updated (localised relative or absolute date). Clicking the row opens the Document.
- **Row actions** (a `p-menu` behind a kebab button): **Rename** and **Delete**.
- **"New document":** a button at the top that opens the title dialog in create mode. On success it opens the new Document's builder.
- **Title dialog** (`document-title-dialog`): a `p-dialog` with a signal form containing one field.
  - Validation: required (after trimming).
  - The repository's `DOCUMENT_TITLE_TAKEN` error shows inline on the field.
  - It is used for both create and rename, the latter pre-filled.
- **Delete:** a confirm dialog naming the Document, styled as a danger action.
- **Empty state:** text plus a "New document" button, shown when every Document has been deleted.

### 8.2 Builder page

```
┌ Toolbar ─────────────────────────────────────────────────────────────────────────┐
│ ← back · Document title · ⋮ (Rename, Delete)   Undo Redo   [Edit | Preview]      │
└──────────────────────────────────────────────────────────────────────────────────┘
┌ Canvas (scrolls) ─────────────────────────────────────────┐ ┌ Sidebar (320px) ───┐
│ Section header: ⠿ drag · ▾ collapse · title · ↑ ↓ 🗑      │ │ Palette            │
│ ┌ gridstack (12 cols, 20px rows) ───────────────────────┐ │ │  ▸ Header          │
│ │ [Widget + hover overlay: ⧉ duplicate, 🗑 delete]       │ │ │  ▸ Text            │
│ └────────────────────────────────────────────────────────┘ │ │   — or —           │
│ Section …                                                  │ │ ← Widget form      │
│ [+ Add section]                                            │ │  (input/textarea)  │
└────────────────────────────────────────────────────────────┘ └────────────────────┘
```

- **Toolbar:**
  - Back returns to the list.
  - The title is shown as text. The ⋮ menu offers Rename (title dialog) and Delete (confirm, then back to the list).
  - Undo and Redo buttons have tooltips and are disabled when unavailable.
  - The Edit/Preview control is a `p-selectButton` or toggle.
- **Sidebar:**
  - In **palette mode** it lists the registry types (icon + label). Each entry can be **dragged** into any Section's grid, where it drops at that x/y. It can also be **clicked**, which appends it to the Active Section.
  - In **form mode** (a Widget is selected) it shows a back arrow, the type label, and the type's form component bound to the Widget text. Changes apply as you type (write-through). The back arrow clears the selection.
- **Section:**
  - The header has a collapse chevron and an inline title. The title is plain text that becomes an input on click, built with a signal form; it commits on blur or Enter and Esc cancels.
  - A grip (`pi-grip-vertical`) at the start of the header reorders Sections by drag and drop (Angular CDK `cdkDropList`, vertical only). While dragging, a compact card with the Section title follows the pointer and a dashed placeholder marks the drop position, so the Section's grid is never cloned. One drop is one undo step.
  - Move up/down buttons stay as the keyboard alternative; they are disabled at the edges. The delete button is disabled when this is the only Section.
  - An empty title shows a muted "Untitled section" placeholder in Edit mode.
  - An empty Section's grid shows the hint "Drag a widget here".
  - Clicking anywhere in a Section sets it as the last clicked Section.
- **Widget:**
  - Clicking selects it, shown with an outline in the primary colour.
  - Hovering, or being selected, reveals the overlay with **duplicate** and **delete** (delete asks for confirmation).
  - A grip (`pi-grip-vertical`) in the top-left corner is the drag handle, so clicking a Widget to select it never starts a drag. Resize handles are on `e, se, s, sw, w`.
  - Empty text shows a muted placeholder ("Empty header" / "Empty text") in Edit mode.
- **Preview mode:**
  - The sidebar is hidden and the grids are static (`setStatic(true)`).
  - Overlays, Section controls, placeholders, empty-Section hints and "+ Add section" are hidden.
  - Sections whose title is empty show no header, and every Section is expanded.
  - Undo and redo are disabled.

### 8.3 gridstack integration

- Each Section owns one grid with these options:
  - `column: 12`, `cellHeight: 20`, `margin: 0`, `float: false`, `acceptWidgets: true`
  - `animate: true`, `minRow: 5`, `disableOneColumnMode: true`
  - `resizable: { handles: 'e, se, s, sw, w' }`, `draggable: { appendTo: '#gridstackDragLayer', scroll: false }`
- Spacing comes from padding inside the Widget wrapper.
- **The model drives the grid.** The store owns the Widgets and their layout. The grid renders from the store, and gridstack events (`change`, `dropped`, `added`/`removed` when moving across Sections) are turned into store method calls.
- **Use only gridstack's public API.** Don't patch its internals, don't force re-renders with `*ngIf`/`setTimeout` toggles, and don't swap in placeholders. All three are hacks to avoid.
- **Dropping from the palette:** the palette entries are set up with `GridStack.setupDragIn(…, { appendTo: '#gridstackDragLayer', helper: 'clone' })` and carry `data-widget-type`. On `dropped`, remove gridstack's temporary node and call `addWidget(type, sectionId, { x, y })`.
- **Gesture handling:**
  - A move or resize gesture produces one `updateLayouts` call. Batch the `change` events of a single gesture, for example on `dragstop`/`resizestop`.
  - A move across Sections produces one `moveWidgetToSection` call. Pair the `removed` and `dropped` events to make it a single undo step.
- **Minimum sizes** are applied to grid nodes from the registry when the grid loads. They are never written back to the model.
- **Wrapper:** gridstack's own Angular wrapper is built for older Angular, so `section-grid` wraps the core API itself, created in `afterNextRender`. gridstack owns the item elements (it moves them between grids on its own); the `WidgetFrame` inside each item is created with `createComponent` and tracked by a builder-level `GridRegistry`, which also reads all grids back after a gesture.
- **Packing:** gridstack 14 replaced `float: false` with `mode: 'top'`. Dragged items are appended to `body` instead of a `#gridstackDragLayer`.

---

## 9. Folder layout (`apps/web/src/app`)

```
app.ts · app.html · app.css · app.config.ts · app.routes.ts
core/
  models/            document.model.ts · widget-type.enum.ts
  repositories/      document.repository.ts · in-memory-document.repository.ts · document.seed.ts · repository-error.ts
  services/          theme-switcher.ts
shared/
  components/        signal-field-errors/ · document-title-dialog/   ← the dialog is used by the list and the builder
  pipes/             error-key.pipe.ts
features/
  documents/
    document-list/            document-list.{ts,html}
  builder/
    builder-page/             builder-page.{ts,html}              ← provides BuilderStore + GridRegistry
    builder-toolbar/
    section/                  section.{ts,html}                   ← header + grid
    section-grid/             section-grid.{ts,html} · grid-registry.ts   ← gridstack wrapper
    widget-frame/             widget-frame.{ts,html,css}          ← overlay + NgComponentOutlet view
    widget-palette/           palette entries (drag-in + click-to-add)
    widget-sidebar/           the palette, or the Selected Widget's form
    store/                    builder.store.ts · undo-history.ts · document-mutations.ts
    widgets/
      widget-registry.ts
      header-widget/          header-widget.{ts,html} · header-widget-form.{ts,html}
      text-widget/            text-widget.{ts,html} · text-widget-form.{ts,html}
public/assets/i18n/{shared,documents,builder,errors}/en.json
```

`libs/theme/{package.json, README.md, src/primeng.preset.ts}`

---

## 10. Agent and docs housekeeping

- `.claude/CLAUDE.md`:
  - Rename the heading to "Document Creator workspace".
  - Replace the Docker/API notes with: the web app runs standalone through `pnpm --filter web start`; `apps/api` is intentionally unused; the mock backend is `InMemoryDocumentRepository`.
- Add `.claude/rules/builder.md` with `paths: apps/web/src/app/features/builder/**`. It covers:
  - the model-driven gridstack rule;
  - "minimum sizes are never persisted";
  - "every mutation goes through BuilderStore";
  - "new Widget types are added only via the registry".
- `README.md` (from the template): icon, a one-paragraph summary, getting started (Node 26, pnpm, `pnpm install`, `pnpm --filter web start`), and links to `CONTEXT.md`, this spec and `docs/adr/`.
- `CONTEXT.md` stays the glossary. New terms are added there, not here.

---

## 11. Acceptance checklist (manual)

**Documents**

- [ ] The list shows the three seeded Documents. A reload restores the seed after any changes.
- [ ] A Document can be created with a unique title. An empty title or a duplicate title (any case or surrounding whitespace) is rejected inline. The new Document opens with one empty Section.
- [ ] A Document can be renamed from the list and from the builder ⋮ menu, with the same validation. Renaming in the builder can be undone.
- [ ] Deleting a Document asks for confirmation, from the list and from the builder. Deleting from the builder returns to the list.

**Creating and editing Widgets**

- [ ] Dragging Header or Text from the palette into any Section drops it at that spot, at 6×6, and selects it.
- [ ] Clicking a palette entry appends to the Active Section: the Selected Widget's Section, otherwise the last clicked Section, otherwise the last Section.
- [ ] Selecting a Widget switches the sidebar to its form. Typing updates the canvas live. A Header strips newlines; Text keeps them.

**Arranging Widgets**

- [ ] Widgets can be moved by their grip (dragging the body does nothing), reflowing their neighbours upward, and resized down to 1×1. Long text scrolls inside the Widget.
- [ ] A Widget can be dragged from one Section into another.
- [ ] Duplicate puts the copy directly below the original. Delete asks for confirmation.

**Sections**

- [ ] Sections can be added, renamed inline, reordered by dragging their grip or with the up/down buttons (disabled at the edges), and collapsed.
- [ ] Deleting a Section asks for confirmation, and is disabled for the last Section.

**Undo / redo**

- [ ] Undo and redo cover every change above. A burst of typing undoes as one step. A move across Sections undoes as one step.
- [ ] Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z work outside text fields. Inside a text field, native text undo applies.
- [ ] Leaving the builder clears the history.

**Modes and theme**

- [ ] Preview hides the sidebar, overlays, controls and placeholders. It locks the grid and disables undo/redo.
- [ ] The dark mode toggle switches PrimeNG and Tailwind together and survives a reload.

**Quality gates**

- [ ] No hardcoded UI strings. `i18n:check` and `check-translations` pass.
- [ ] `pnpm lint`, `pnpm build` (production, within budgets) and `pnpm ci:check` pass. Commits follow the devkit format (`feat(web): …`, signed, no AI attribution).

---

## 12. Implementation order

1. Workspace: bring in the template, rename, bump versions, remove SSR, devkit `init`, add `libs/theme`, dark mode, check that it lints and builds.
2. Domain models, repository, seed, error codes and translations.
3. Document list, title dialog, delete confirmation.
4. Builder page shell, `BuilderStore` (without undo), Sections with static rendering, Widget registry, views.
5. gridstack: move and resize within a Section, then palette drag-in and click-to-add, then moving across Sections.
6. Sidebar form editing, duplicate, delete, Section operations, collapse.
7. Undo/redo with text bursts and keyboard shortcuts.
8. Preview mode. Polish empty states and placeholders. Docs housekeeping (section 10). Run the acceptance checklist.
