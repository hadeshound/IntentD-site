import { DEFAULT_LANG, getLocalizedPath, stripLang, type Lang } from '@/i18n';

/**
 * Helpers for the "sign in first, then continue" flow.
 *
 * Pricing CTAs point at /checkout?plan=X. An anonymous visitor is sent to
 * /auth/register?redirect=/checkout&plan=X instead, and the auth pages use
 * these helpers to rebuild the original destination afterwards.
 *
 * Every path here is handled without its language prefix and prefixed again on
 * the way out, so /ru/checkout survives the round trip and a visitor who
 * started in Ukrainian does not land back on the English page.
 */

/** Paths a redirect parameter is allowed to name, language prefix removed. */
const ALLOWED_REDIRECT_PREFIXES = ['/checkout', '/pricing', '/docs', '/contact'];

export const DEFAULT_REDIRECT = '/';

/**
 * Validates an incoming redirect target. Anything absolute, protocol-relative
 * or outside the whitelist is discarded: an open redirect on the login page is
 * a phishing primitive, not a convenience.
 *
 * The returned value keeps whatever language prefix it arrived with, so the
 * check is done on the bare route and the prefix is restored afterwards.
 */
export function sanitizeRedirect(raw: string | null | undefined): string | null {
  if (!raw) {
    return null;
  }

  const value = raw.trim();
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return null;
  }

  const withoutQuery = value.split('?')[0] ?? '';
  const path = stripLang(withoutQuery);
  const isAllowed = ALLOWED_REDIRECT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );

  return isAllowed ? value : null;
}

/**
 * Rebuilds the post-authentication destination from the `redirect` and `plan`
 * query parameters. The plan is carried separately so the pricing links stay
 * readable, matching the URLs the spec asks for.
 */
export function resolvePostAuthTarget(
  redirect: string | null | undefined,
  plan: string | null | undefined,
  lang: Lang = DEFAULT_LANG,
): string {
  const safeRedirect = sanitizeRedirect(redirect);
  if (!safeRedirect) {
    return getLocalizedPath(DEFAULT_REDIRECT, lang);
  }

  const localized = getLocalizedPath(safeRedirect, lang);

  if (!plan || localized.includes('?')) {
    return localized;
  }

  return `${localized}?plan=${encodeURIComponent(plan)}`;
}

/** Builds the link a pricing CTA should use for an anonymous visitor. */
export function buildRegisterRedirect(
  planCode: string,
  lang: Lang = DEFAULT_LANG,
  target = '/checkout',
): string {
  const base = getLocalizedPath('/auth/register', lang);
  return `${base}?redirect=${target}&plan=${encodeURIComponent(planCode)}`;
}

/** Same, for the login page. */
export function buildLoginRedirect(
  planCode: string,
  lang: Lang = DEFAULT_LANG,
  target = '/checkout',
): string {
  const base = getLocalizedPath('/auth/login', lang);
  return `${base}?redirect=${target}&plan=${encodeURIComponent(planCode)}`;
}
