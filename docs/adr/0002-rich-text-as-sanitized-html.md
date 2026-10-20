# Rich text is stored as sanitized HTML edited with PrimeNG Editor

Text widgets started as plain text ("the text is the only editable property"). Seeding the Organizational Design Guide showed that its references live inside running text ("see … on confluence", "HERE"), so Text widgets, Callout bodies and Step descriptions now hold Rich text: bold, italic and inline Links, nothing else. It is edited with PrimeNG Editor (Quill) in the sidebar, its toolbar limited to those three formats, and stored as HTML that is sanitized again whenever it is rendered.

## Considered Options

- **`[label](url)` markup in plain text.** Keeps the model plain and undo trivial, but readers of the raw text in the editor see syntax, and bold/italic would need more markup.
- **Plain text plus structured `{start, end, url}` spans.** Clean data, but offsets must be re-mapped on every keystroke in a contenteditable field — fragile for little gain.

## Consequences

- The stored value of these Widgets is HTML; anything rendering it must go through Angular's sanitizer, and anything importing content must produce HTML (the seed converts its plain paragraphs to `<p>` elements).
- Allowing more formatting later (lists, headings) is a toolbar change plus sanitizer allowance, but every consumer of the HTML must then cope with it.
- Moving back to plain text would mean stripping markup from stored content.
