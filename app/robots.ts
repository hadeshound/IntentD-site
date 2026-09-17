import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/** Auth and checkout are per-user flows with nothing to index. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/checkout'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
