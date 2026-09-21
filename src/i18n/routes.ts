import type { GetStaticPaths } from 'astro';

import { PREFIXED_LANGUAGES } from './config';

/**
 * The `[lang]` segment of every prefixed route.
 *
 * English is served at the root, so it is deliberately absent: adding it would
 * publish both /pricing and /en/pricing, i.e. two canonicals for one page.
 */
export const prefixedLangPaths: GetStaticPaths = () =>
  PREFIXED_LANGUAGES.map((lang) => ({ params: { lang } }));
