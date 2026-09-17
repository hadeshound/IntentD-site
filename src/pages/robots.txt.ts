import type { APIRoute } from 'astro';

import { SITE_URL } from '@/lib/config/urls';

export const prerender = true;

/** Auth and checkout are per-user flows with nothing to index. */
export const GET: APIRoute = () => {
  const body = [
    'User-Agent: *',
    'Allow: /',
    'Disallow: /auth/',
    'Disallow: /checkout',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
