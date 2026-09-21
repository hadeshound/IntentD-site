/**
 * Helpers for the "sign in first, then continue" flow.
 *
 * Pricing CTAs point at /checkout?plan=X. An anonymous visitor is sent to
 * /auth/register?redirect=/checkout&plan=X instead, and the auth pages use
 * these helpers to rebuild the original destination afterwards.
 */

/** Paths a redirect parameter is allowed to name. */
const ALLOWED_REDIRECT_PREFIXES = ['/checkout', '/pricing', '/docs', '/contact'];

export const DEFAULT_REDIRECT = '/';

/**
 * Validates an incoming redirect target. Anything absolute, protocol-relative
 * or outside the whitelist is discarded: an open redirect on the login page is
 * a phishing primitive, not a convenience.
 */
export function sanitizeRedirect(raw: string | null | undefined): string | null {
  if (!raw) {
    return null;
  }

  const value = raw.trim();
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return null;
  }

  const path = value.split('?')[0] ?? '';
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
): string {
  const safeRedirect = sanitizeRedirect(redirect);
  if (!safeRedirect) {
    return DEFAULT_REDIRECT;
  }

  if (!plan || safeRedirect.includes('?')) {
    return safeRedirect;
  }

  return `${safeRedirect}?plan=${encodeURIComponent(plan)}`;
}

/** Builds the link a pricing CTA should use for an anonymous visitor. */
export function buildRegisterRedirect(
  planCode: string,
  target = '/checkout',
): string {
  const base = '/auth/register';
  return `${base}?redirect=${target}&plan=${encodeURIComponent(planCode)}`;
}

/** Same, for the login page. */
export function buildLoginRedirect(
  planCode: string,
  target = '/checkout',
): string {
  const base = '/auth/login';
  return `${base}?redirect=${target}&plan=${encodeURIComponent(planCode)}`;
}
