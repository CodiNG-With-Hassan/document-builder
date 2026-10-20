# theme

Document Creator brand tokens: the PrimeNG Aura preset (`src/primeng.preset.ts`).

- **Consumed as source, never built.** `apps/web` maps the `@Theme` tsconfig path alias to
  `../../libs/theme/src/primeng.preset.ts` and lists `theme` in `nx.implicitDependencies`.
- **Import the default export:** `import documentCreatorPreset from '@Theme';`.
- **Version contract:** `@primeuix/themes` here must stay on the same range as `apps/web`, or pnpm
  installs two copies — bump them together.
- Only app-agnostic tokens belong here; no components, services or app aliases.
