/**
 * The route a URL represents, as the site advertises it.
 *
 * `build.format: 'file'` keeps the Next URL shape for readers -- Cloudflare
 * serves /pricing.html at /pricing -- but while a page is being prerendered
 * `Astro.url.pathname` is the file path, ".html" and all. Canonical tags and
 * the navbar's active-link test both need the public form.
 */
export function routePath(pathname: string): string {
  const withoutIndex = pathname.replace(/\/index\.html$/, '/');
  const withoutExtension = withoutIndex.replace(/\.html$/, '');

  if (withoutExtension === '') {
    return '/';
  }

  // Trailing slashes are stripped for the same reason: /pricing/ and /pricing
  // must not become two canonicals.
  return withoutExtension.replace(/(.)\/$/, '$1');
}
