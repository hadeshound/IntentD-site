import type { APIRoute } from 'astro';

import { PREFIXED_LANGUAGES } from '@/i18n';
import { SITE_URL } from '@/lib/config/urls';

export const prerender = true;

/** Auth and checkout are per-user flows with nothing to index, in every language. */
export const GET: APIRoute = () => {
  const privatePaths = ['/auth/', '/checkout'];

  const disallow = [
    ...privatePaths,
    ...PREFIXED_LANGUAGES.flatMap((lang) => privatePaths.map((path) => `/${lang}${path}`)),
  ].map((path) => `Disallow: ${path}`);

  const body = [
    'User-Agent: *',
    'Allow: /',
    ...disallow,
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
