/**
 * Outward-facing URLs of the public site.
 *
 * WHERE TO CHANGE THE DOMAIN
 * --------------------------
 * There is no real domain yet, so each value falls back to a localhost port.
 * Set these in `.env.local` (or the deployment environment) and change nothing
 * in the source:
 *
 *   NEXT_PUBLIC_API_BASE_URL   http://localhost:8090/api/v1  ->  https://api.intentd.io/v1
 *   NEXT_PUBLIC_SITE_URL       http://localhost:3000         ->  https://intentd.io
 *   NEXT_PUBLIC_DASHBOARD_URL  http://localhost:3001         ->  https://app.intentd.io
 *
 * STAGE2.md lists these together with their backend counterparts.
 */

/** This site's own origin. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * The dashboard, which lives on its own origin so its code never mixes with
 * the marketing site's. Sign-in and account links point here.
 */
export const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? 'http://localhost:3001';

export const DASHBOARD_LINKS = {
  home: `${DASHBOARD_URL}/dashboard`,
  login: `${DASHBOARD_URL}/login`,
  register: `${DASHBOARD_URL}/register`,
} as const;

/** Builds a register link that remembers which plan the visitor came from. */
export function dashboardRegisterFor(planCode: string): string {
  return `${DASHBOARD_LINKS.register}?plan=${encodeURIComponent(planCode)}`;
}
