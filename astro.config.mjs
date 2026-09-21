// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const site = process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,

  /**
   * Four languages, English unprefixed.
   *
   * This block does not generate the routes -- it makes the locale set known
   * to Astro and keeps `prefixDefaultLocale: false` honest. The routes
   * themselves are src/pages/[lang]/*, which render the shared screens under
   * src/screens for ru, uk and zh, while src/pages/* is the English copy at
   * the root. `redirectToDefaultLocale` stays off: /ru/pricing is a real page,
   * not a redirect target.
   */
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'uk', 'zh'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  /**
   * Astro 5 dropped `output: 'hybrid'`: 'static' now *is* the hybrid mode --
   * every page is prerendered unless it opts out with `export const prerender
   * = false`. The auth screens and /checkout do exactly that, because they
   * read query parameters on the server the way the Next pages did.
   */
  output: 'static',

  /**
   * Directory format for two reasons:
   *
   * 1. Locale home pages. With 'file', /ru is emitted as ru.html at the repo
   *    root, and Cloudflare does not resolve /ru to /ru.html -- the request
   *    404s or loops. With 'directory', /ru becomes ru/index.html and Cloudflare
   *    serves it on the /ru path with no extra configuration.
   *
   * 2. Canonical URLs stay clean. trailingSlash: 'never' stops Cloudflare from
   *    redirecting /pricing to /pricing/, so the URL shape stays the same as
   *    the Next site and matches the sitemap.
   */
  trailingSlash: 'never',
  build: {
    format: 'directory',
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