/**
 * Assumptions behind the earnings calculator on the landing page.
 *
 * IMPORTANT: `RATE_PER_1000` is an EXAMPLE, not a published payout rate. Replace
 * it with the real figure from the publisher agreement before relying on the
 * calculator in marketing. The visitor can edit the rate in the form, and the
 * page says the result is an estimate.
 */
export const EARNINGS = {
  /** Example payout, USD per 1,000 consenting monthly active users per month. */
  RATE_PER_1000: 2.5,
  /** Share of active users who accept the consent prompt, in percent. */
  DEFAULT_CONSENT: 40,
  MIN_CONSENT: 10,
  MAX_CONSENT: 90,
  /** Slider range for monthly active users. */
  MIN_USERS: 1_000,
  MAX_USERS: 1_000_000,
  DEFAULT_USERS: 50_000,
} as const;
