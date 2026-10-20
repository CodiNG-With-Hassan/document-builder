# Spec: Widget catalogue v2

Extends [document-builder.md](./document-builder.md). It was decided on 2026-10-17, after seeding the Organizational Design Guide. Terms are defined in [`CONTEXT.md`](../../CONTEXT.md). See also [ADR 0002](../adr/0002-rich-text-as-sanitized-html.md) (Rich text) and [ADR 0003](../adr/0003-images-without-alt-text.md) (Images without alt text).

**Out of scope:** Changelog (it will be managed elsewhere) and People / org chart.

## 1. Widget types

| Type | Edited | Height | Palette default |
|---|---|---|---|
| Header | sidebar: text, Heading level, Numbered | free | 6×6, H1, numbered |
| Text | sidebar: Rich text (p-editor) | free | 6×6 |
| Table of contents | sidebar: title, depth | content | 12 wide, title "Contents", all levels; max 1 per Document |
| Table | inline cells and structure; sidebar: caption and toggles | content | 12 wide, 3×3, header row on |
| Image | sidebar: upload or URL, caption, URL to open, fit | free | 6×10, contain |
| Callout | sidebar: style, title, Rich text body, source | content | 12 wide, Note |
| Process | sidebar: steps (title + Rich text description), add, delete, reorder | content | 12 wide, 2 empty steps |
| Link | sidebar: label, URL, description | content | 4 wide |
| Video | sidebar: YouTube/Vimeo URL | content (16:9) | 6 wide |

**Content height:** the frame measures its content and stores the rows it needs. The grid gets `minH = maxH = h`, so only the width can be resized. These height changes are never undo steps of their own; they are folded into the change that caused them, and they don't close a typing burst.

## 2. Value model

`Widget` becomes a union discriminated by `type`, and its `value` is typed per type through a type-to-value map (`WidgetValueByType`). `content` holds what the reader sees and `config` holds how it's shown.

```ts
type HeadingLevel = 1 | 2 | 3;
interface Link { label: string; url: string }               // url '' = incomplete
type TableCell = { kind: 'text'; text: string } | { kind: 'link'; link: Link };
interface ProcessStep { id: string; title: string; html: string }

header:            { content: { text }, config: { level: HeadingLevel, numbered: boolean } }
text:              { content: { html } }
table-of-contents: { content: { title }, config: { depth: 0 | 1 | 2 | 3 } }   // 0 = Sections only
table:             { content: { caption, rows: TableCell[][] },
                     config: { headerRow, headerColumn, striped: boolean, columnWidths: number[] | null } } // % or auto
image:             { content: { src, caption, href }, config: { fit: 'contain' | 'cover' } }
callout:           { content: { title, html, source }, config: { style: 'anecdote' | 'quote' | 'note' } }
process:           { content: { steps: ProcessStep[] } }
link:              { content: { link: Link, description } }
video:             { content: { url } }
```

`Section` gains `numbered: boolean`, which defaults to true.

## 3. Heading numbers

- **Section numbers:** numbered Sections are counted 1, 2, 3, … in Document order. Unnumbered Sections are skipped and their Header widgets get no number.
- **Reading order:** inside a numbered Section, Header widgets are read in grid order (y, then x).
  - A numbered H*n* increments counter *n* and resets the deeper counters.
  - Its number is the Section number followed by counters 1…*n*.
  - Unnumbered Headers don't touch the counters.
- **Skipped level:** if a counter above *n* is still 0, it shows as 0 (e.g. 2.0.1). In Edit mode the Header shows a warning icon, and its sidebar form says "Level skipped: this H*n* has no H*n-1* before it in this Section".
- **Where numbers show:** in front of the text in the Header view (both modes), in front of Section titles, and in the Table of contents. They are never part of the stored text.

## 4. Table of contents

It lists every Section, with its Header widgets indented by level, down to `depth`, with numbers. Clicking an entry scrolls to it, in both modes. A collapsed target Section is expanded first. When a Document already has one, the palette entry is disabled with a tooltip, and the TOC has no duplicate button.

## 5. Table

- **Selecting and editing:** the first click selects the Table; then clicking a cell edits it.
  - Tab and Shift+Tab move between cells and Enter moves down. Tab in the last cell adds a row. Esc stops editing.
  - Each cell is one line of text, or a Link edited as two inline fields (label, URL).
- **Structure:**
  - Every row and column has a handle menu: insert before/after, move, delete, and "Make link" / "Make text" for cells.
  - `+ Row` and `+ Column` buttons sit at the bottom and right edges.
  - Each structural action is one undo step. Typing is one step per burst per cell.
- **Column widths:** automatic until a border is dragged. Then every width is stored as a percentage, and new columns take an equal share. "Reset widths" lives in the sidebar. Each resize is one undo step.
- **Empty URLs:** a Link with an empty URL shows a warning icon in Edit mode and is plain text in Preview.

## 6. Image, Callout, Process, Link, Video

- **Image:**
  - Upload (data URL, max 2 MB, in memory only) or URL. Caption under the image. An optional URL opens in a new tab in Preview. Fit is contain or cover inside the box.
  - Rendered with `alt=""`: a deliberate deviation from WCAG AA (ADR 0003).
- **Callout:** Anecdote, Quote or Note styles. The title and source are optional and hidden when empty.
- **Process:** a vertical list of numbered circles joined by a line. Linear only.
- **Link:** a card showing the label, the URL host and the description. It opens in a new tab in Preview. An empty URL shows a warning in Edit mode.
- **Video:** only `youtube.com`, `youtu.be` (played via `youtube-nocookie.com/embed`) and `vimeo.com` (via `player.vimeo.com`). Any other URL shows "Unsupported video URL".

## 7. Rich text

- **Editor:** PrimeNG Editor (Quill 2) in the sidebar, limited to bold, italic and link (`formats: ['bold', 'italic', 'link']`).
- **Rendering:** stored as HTML and rendered through Angular's sanitizer.
- **Links while editing:** in Edit mode, clicking a link on the canvas doesn't follow it. Links with an empty `href` look incomplete in Edit mode and render as plain text in Preview.
- **Undo:** typing in one editor is one undo step per burst, same as before.

## 8. Seed conversion (Organizational Design Guide)

- **Sections:** chapters 1–4 are numbered and the "1 " prefixes are stripped. Cover/about and "Document changes" are unnumbered.
- **Headers:** typed numbers are stripped, and levels come from them: x.y → H1, x.y.z → H2, deeper → H3. Unnumbered sub-headings and Anecdote titles become unnumbered H3s. The "Sounding board advice process" heading becomes a numbered H2, so the numbers come out as 3.7.3 and 3.7.4, matching the references in 3.5.
- **Table of contents:** the placeholder becomes a Table of contents widget.
- **Tables:** all 21 table placeholders become Table widgets with a header row. "… (link)" cells become Links with empty URLs.
- **Images:** the PDF's images go to `apps/web/public/assets/seeds/sbp-odg/`, each with a short caption. The long descriptions stay as seed comments, and the badge-icons placeholder is dropped.
- **Callouts:**
  - Anecdotes: the two in 4.1.
  - Quotes: both copies of the SBP oath, the culture extracts in 1.6.3 and 4.1, and the "Fairly" tagline.
  - Note: the "Important Note" in 3.8.
- **Processes:** the Big Decision processes, the arbitration paths and the consent method. A step's title is the text before its first ':' or '.' (if short), and the rest becomes the description.
- **Links:**
  - References inside sentences become inline Links with empty URLs.
  - Each chapter ends with a "Referenced documents" row of Link cards, also with empty URLs.
- **Unchanged:** the Document properties placeholder stays, since there's no widget for it.
