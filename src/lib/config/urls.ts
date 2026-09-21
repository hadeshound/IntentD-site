/**
 * Outward-facing URLs of the public site.
 *
 * Hardcoded to production in a production build, localhost in dev.
 * The marketing site ships to a single origin (intentd.net) and search-engine
 * metadata must not depend on a build-time environment variable — if Cloudflare
 * forgets to set PUBLIC_SITE_URL, the sitemap would publish localhost URLs.
 *
 * If a staging domain appears later, introduce it here explicitly.
 */

const IS_PROD = import.meta.env.PROD;

/** This site's own origin. */
export const SITE_URL = IS_PROD ? 'https://intentd.net' : 'http://localhost:4321';

/** Base URL of the Go portal API. */
export const API_BASE_URL = IS_PROD
  ? 'https://api.intentd.net/api/v1'
  : 'http://localhost:8080/api/v1';

/**
 * The dashboard, which lives on its own origin so its code never mixes with
 * the marketing site's. Sign-in and account links point here.
 */
export const DASHBOARD_URL = IS_PROD
  ? 'https://app.intentd.net'
  : 'http://localhost:3001';

export const DASHBOARD_LINKS = {
  home: `${DASHBOARD_URL}/dashboard`,
  login: `${DASHBOARD_URL}/login`,
  register: `${DASHBOARD_URL}/register`,
} as const;
