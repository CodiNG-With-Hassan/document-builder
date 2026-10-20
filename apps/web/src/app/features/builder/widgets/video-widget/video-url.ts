/**
 * Turns a YouTube or Vimeo page URL into its embed URL; any other host is not supported.
 * YouTube plays from youtube-nocookie.com (privacy-enhanced mode).
 */
export function videoEmbedUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\./, '').replace(/^m\./, '');
  const id = (value: string | null | undefined) => (value && /^[\w-]+$/.test(value) ? value : null);

  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const videoId =
      id(parsed.searchParams.get('v')) ??
      id(parsed.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1]);
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  }
  if (host === 'youtu.be') {
    const videoId = id(parsed.pathname.slice(1));
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const videoId = parsed.pathname.match(/(\d+)/)?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
  }
  return null;
}
