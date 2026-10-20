/** Helpers for Rich text: HTML limited to paragraphs, bold, italic and links (ADR 0002). */

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Plain text to Rich text the way Quill stores it: one <p> per line, empty lines as <p><br></p>. */
export function plainToHtml(text: string): string {
  return text
    .split('\n')
    .map((line) => (line ? `<p>${escapeHtml(line)}</p>` : '<p><br></p>'))
    .join('');
}

/** Rich text to the plain text a reader sees (for search, numbering previews, …). */
export function htmlToPlain(html: string): string {
  return html
    .replace(/<\/p>/g, '\n')
    .replace(/<br\s*\/?>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .trimEnd();
}

/** True when the HTML has no visible text (Quill's empty editor is `<p><br></p>`). */
export function isBlankHtml(html: string): boolean {
  return htmlToPlain(html).trim() === '';
}
