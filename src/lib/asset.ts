/**
 * Prefixes a relative asset path with the configured basePath so raw
 * `<img>`/`<iframe>` sources resolve correctly under GitHub Pages project
 * repos (e.g. served from `/portfolio`). Next.js only auto-prefixes its own
 * components, not arbitrary string URLs, so we do it explicitly.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${basePath}/${clean}`;
}
