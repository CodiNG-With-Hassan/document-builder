<img src="assets/icon.svg" width="64" height="64" alt="">

# Document Creator

A local-only demo of a Document builder. Documents are made of ordered Sections, and each
Section is a 12-column grid of Widgets (Header, Text, Table of contents, Table, Image, Callout,
Process, Link and Video) that you can drag in from a palette, move (also across Sections), resize,
edit, duplicate and delete, with numbered headings, undo/redo and a Preview mode.

The backend is mocked: an in-memory repository seeded with three Documents (including the
Organizational Design Guide), reset on every reload.

Built on [hassan-devkit-template](https://github.com/CodiNG-With-Hassan/hassan-devkit-template)
and following the same standards as de-autozaak.

## What's in the box

- **`apps/web`**: Angular 22, PrimeNG 22 (Aura preset, light/dark), NgRx signal stores, signal
  forms, ngx-translate (EN), Tailwind 4, gridstack.
- **`libs/theme`**: the PrimeNG preset, consumed as source via `@Theme`.
- **`apps/api`**: the template's NestJS API, kept but **not used** by this demo.

## Getting started

Requires Node.js 26 and pnpm 11.

```sh
pnpm install
pnpm --filter web start   # http://localhost:4200
```

No Docker, `.env` or API needed.

## Commands

| Command | What |
| --- | --- |
| `pnpm --filter web start` | the web app on http://localhost:4200 |
| `pnpm lint` / `format` / `format:check` / `build` | every project through Nx |
| `pnpm ci:check` / `pnpm affected` | exactly what CI runs |

## Docs

- [`CONTEXT.md`](CONTEXT.md): the domain vocabulary (Document, Section, Widget, …).
- [`docs/specs/document-builder.md`](docs/specs/document-builder.md): the design.
- [`docs/adr/`](docs/adr): architecture decisions.
