/**
 * Assumptions behind the earnings calculator.
 *
 * Earnings are derived from the real subscription catalogue: each buyer plan
 * costs `price / active-user allowance` per user per month, and the publisher
 * earns a share of that for every consenting user.
 *
 * IMPORTANT: `DEFAULT_SHARE` is an EXAMPLE, not a published revenue share.
 * Replace it with the share from the publisher agreement before relying on the
 * calculator in marketing. The visitor can move it, and the page says the
 * result is an estimate.
 */
export const EARNINGS = {
  /** Example publisher revenue share, in percent of the plan price per user. */
  DEFAULT_SHARE: 50,
  MIN_SHARE: 10,
  MAX_SHARE: 90,
  /** Share of active users who accept the consent prompt, in percent. */
  DEFAULT_CONSENT: 40,
  MIN_CONSENT: 10,
  MAX_CONSENT: 90,
  /** Slider range for monthly active users. */
  MIN_USERS: 1_000,
  MAX_USERS: 1_000_000,
  DEFAULT_USERS: 50_000,
} as const;
