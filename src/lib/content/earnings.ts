/**
 * Assumptions behind the profit calculator.
 *
 * A developer pays a monthly subscription (Starter, Growth or Scale, priced by
 * the number of monthly active users the extension may have) and earns from the
 * consented data its users generate. The calculator shows income minus the plan.
 *
 * IMPORTANT: `DEFAULT_REVENUE_PER_USER` is an EXAMPLE, not a published figure.
 * What a consenting user is worth depends on the developer's agreement, so the
 * visitor sets it themselves, as with the subscription price in the Seadevil
 * calculator. Replace the default with a realistic figure before relying on the
 * calculator in marketing.
 */
export const EARNINGS = {
  /** Example monthly income per consenting user, in USD. */
  DEFAULT_REVENUE_PER_USER: 0.15,
  MIN_REVENUE_PER_USER: 0,
  MAX_REVENUE_PER_USER: 1,
  /** Share of active users who accept the consent prompt, in percent. */
  DEFAULT_CONSENT: 40,
  MIN_CONSENT: 10,
  MAX_CONSENT: 90,
  /** Slider range for monthly active users. */
  MIN_USERS: 1_000,
  MAX_USERS: 1_000_000,
  DEFAULT_USERS: 50_000,
} as const;
