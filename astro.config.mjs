// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,

  /**
   * Astro 5 dropped `output: 'hybrid'`: 'static' now *is* the hybrid mode --
   * every page is prerendered unless it opts out with `export const prerender
   * = false`. The auth screens and /checkout do exactly that, because they
   * read query parameters on the server the way the Next pages did.
   */
  output: 'static',

  /**
   * Keep the Next URL shape. Astro's default directory format would publish
   * /pricing/index.html, and Cloudflare Pages would then 308 /pricing to
   * /pricing/ -- a different canonical for every page on the site, against the
   * sitemap and every internal link. 'file' publishes /pricing.html, which
   * Pages serves at /pricing with no redirect.
   */
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // The site has no astro:assets images at all, so there is nothing to
    // optimise and no reason to pull sharp (and its node:fs / child_process
    // dependencies) into a worker that cannot run it.
    imageService: 'passthrough',
  }),

  integrations: [
    // The palette and type scale live in tailwind.config.ts; base styles are
    // applied by src/styles/global.css, which imports the three @tailwind
    // layers itself.
    tailwind({ applyBaseStyles: false }),

    // Used for the form islands and to render lucide icons at build time.
    react(),
  ],

  vite: {
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
});
