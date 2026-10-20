# Image widgets have no alt text, deviating from the WCAG AA standard

The de-autozaak standards this project follows require components to pass AXE and WCAG AA, which needs a text alternative for every meaningful image. For this demo we deliberately leave alt text out of the Image widget: it has a source, a Caption, a Fit and an optional URL, and nothing else. Images render with an empty `alt` attribute, so screen readers skip them; a Caption, when present, is visible text next to the image but is not wired up as its text alternative.

## Considered Options

- **A separate alt-text field** with a warning when it is empty — the standard-compliant option.
- **Caption doubles as alt text**, with Images without a Caption marked decorative.

## Consequences

- Documents built with this demo are not WCAG AA compliant wherever an Image carries meaning (e.g. the organisation charts in the seed).
- Adding alt text later is additive: a new optional property per Image widget, defaulting to empty.
