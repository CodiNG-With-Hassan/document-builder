# Document Creator

A demo builder for composing Documents out of Widgets that can be arranged on a canvas.

## Language

**Document**:
A user-composed page made of an ordered list of Sections, identified to the user by its title. There can be many Documents, and each can be created, renamed and deleted.
_Avoid_: Page, story, report, name (for the title)

**Section**:
An ordered, titled part of a Document that contains its own freely arranged Widgets.
_Avoid_: Block, group, row, area

**Widget**:
A single block of content placed in a Document. Every Widget is of exactly one Widget type.
_Avoid_: Block, component, element, card

**Selected Widget**:
The one Widget currently being edited in the builder, if any.
_Avoid_: Active widget, focused widget

**Active Section**:
The Section that receives a Widget added by clicking in the palette: the Section of the Selected Widget, otherwise the last Section clicked, otherwise the last Section in the Document.
_Avoid_: Current section, focused section

**Edit mode**:
The builder state in which a Document's Sections and Widgets can be changed.

**Preview mode**:
The builder state in which a Document is shown read-only, as a reader would see it.
_Avoid_: View mode, read mode

**Header widget**:
A Widget holding a single line of plain text, shown in the style of its Heading level.
_Avoid_: Title, heading (as a type name)

**Heading level**:
How deep a Header widget sits below its Section: H1, H2 or H3. The Section title is the level above H1.
_Avoid_: Size, rank, heading type

**Numbered**:
Whether a Section or Header widget takes part in Heading numbering. Unnumbered ones show no number and don't advance the count.

**Heading number**:
The number the builder derives for a numbered Section or Header widget from Document order and Heading levels (e.g. 3.7.4). It is never typed as part of the text.
_Avoid_: Paragraph number, index

**Skipped level**:
A Header widget whose level is more than one below the Header widget before it in its Section (e.g. an H2 with no H1 before it). Its missing Heading number parts show as 0.

**Text widget**:
A Widget holding multi-line Rich text.
_Avoid_: Paragraph, body

**Rich text**:
Text that may contain bold, italic and inline Links, and no other formatting. Used by Text widgets, Callout bodies and Step descriptions.
_Avoid_: Formatted text, HTML, markdown

**Table of contents widget**:
A Widget listing the Document's Sections and Header widgets, with their Heading numbers, down to a chosen depth. A Document has at most one.
_Avoid_: TOC (in UI copy), index, outline

**Table widget**:
A Widget holding a grid of Cells in rows and columns, with an optional Caption, optional header row and header column, and optional striped rows. Its height always follows its content.
_Avoid_: Grid (that is the Section's layout), spreadsheet, matrix

**Cell**:
One position in a Table widget, holding either a single line of plain text or a Link.
_Avoid_: Field, value

**Link**:
A label together with the URL it opens. A Link without a URL is incomplete and only shows its label.
_Avoid_: Hyperlink, anchor, href

**Caption**:
Optional text that names a Table widget (shown above it) or an Image widget (shown below it).
_Avoid_: Title (that is a Document's or Section's), alt text

**Content height**:
A Widget whose height always follows its content, so only its width can be resized. Applies to Table of contents, Table, Callout, Process and Link widgets; a Video widget's height follows its width instead.
_Avoid_: Auto-height, fit content

**Image widget**:
A Widget showing one picture, uploaded or taken from a URL, fitted into a box the user sizes, with an optional Caption and an optional URL it opens.
_Avoid_: Picture, media, figure

**Callout widget**:
A Widget that sets content apart in one of three styles (Anecdote, Quote or Note), with an optional title, a Rich text body and an optional source.
_Avoid_: Box, panel, admonition

**Process widget**:
A Widget showing an ordered, linear list of numbered Steps.
_Avoid_: Flow, flowchart, timeline

**Step**:
One stage of a Process widget: a title and an optional Rich text description.
_Avoid_: Phase, stage (as a term)

**Link widget**:
A Widget showing one Link as a card, with an optional description.
_Avoid_: Bookmark, button

**Video widget**:
A Widget playing a YouTube or Vimeo video inline, at a 16:9 ratio.
_Avoid_: Embed (in general), iframe
