# Document Creator workspace

<!-- devkit standards: house rules shipped by @coding-with-hassan/devkit; project rules follow -->
@../node_modules/@coding-with-hassan/devkit/claude/standards.md

Local-only demo of a Document builder (Sections of text Widgets), in an Nx
package-based pnpm workspace scaffolded from
[hassan-devkit-template](https://github.com/CodiNG-With-Hassan/hassan-devkit-template) and kept in
line with the de-autozaak standards. The design lives in `docs/specs/document-builder.md`, the
vocabulary in `CONTEXT.md`, decisions in `docs/adr/`.

- `apps/web`: Angular 22 + PrimeNG 22, NgRx signal stores, ngx-translate (EN only), Tailwind,
  gridstack. Client-side only (no SSR).
- `apps/api`: the template's NestJS API. **Intentionally unused**: kept so the workspace matches
  the template, but nothing calls it. Keep it linting and building; don't build features on it.
- `libs/theme`: the PrimeNG preset, consumed as source via `@Theme`.

## Running it

`pnpm --filter web start` serves the app on http://localhost:4200. No Docker, no API: the app's
backend is `InMemoryDocumentRepository` (bound to `DocumentRepository` in `app.config.ts`), which
resets to `document.seed.ts` on every reload. Don't add Docker or deployment work; this project is
local-only.

## Linting & formatting

Each project owns its config through the shared presets (`@coding-with-hassan/eslint-config-*`,
`@coding-with-hassan/prettier-config-*`). Root: `pnpm lint`, `pnpm format`, `pnpm format:check`,
`pnpm build` (all through Nx), `pnpm ci:check` + `pnpm affected` for CI parity. Forms are signal
forms only; ESLint bans `FormsModule`, `ReactiveFormsModule` and `FormBuilder`.

## Tests

None, by decision: no unit tests and no acceptance cases for this demo.

## Translations

App copy lives in `apps/web/public/assets/i18n/<module>/en.json` (`shared`, `documents`, `builder`,
`errors`), loaded per module by `@larscom/ngx-translate-module-loader`. Keys are
`UPPERCASE_SNAKE_CASE`; `hassan-devkit i18n:check` runs in the pre-commit hook. User content
(titles, Widget text) is never translated.
