import { getDictionary } from '@/i18n';

/** Presentation helpers shared by the pricing grid, checkout and docs. */

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
};

/**
 * Renders a catalogue price. Cents are dropped when the amount is whole, which
 * it always is for the published tiers; a zero price means "quoted per deal".
 */
export function formatPrice(cents: number, currency = 'USD'): string {
  if (cents <= 0) {
    return getDictionary().pricing.customPrice;
  }

  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
  const units = cents / 100;
  const rendered = Number.isInteger(units)
    ? units.toLocaleString('en-US')
    : units.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `${symbol}${rendered}`;
}

/**
 * The monthly active-user allowance, ready to render.
 *
 * Three outcomes rather than one string, because they are three different
 * claims: a number, "unlimited", and "we do not know". The last one happens
 * when the frontend is deployed ahead of portal migration 000015 and the
 * catalogue response has no users_limit at all -- printing a figure there
 * would be inventing one, so the caller omits the line instead.
 */
export type UsersAllowance =
  | { kind: 'limited'; text: string }
  | { kind: 'unlimited'; text: string }
  | { kind: 'unknown' };

export function usersAllowance(limit: number | null | undefined): UsersAllowance {
  if (limit === null) {
    return { kind: 'unlimited', text: getDictionary().pricing.unlimitedUsers };
  }
  if (typeof limit !== 'number' || !Number.isFinite(limit)) {
    return { kind: 'unknown' };
  }
  if (limit <= 0) {
    return { kind: 'unlimited', text: getDictionary().pricing.unlimitedUsers };
  }
  return { kind: 'limited', text: formatUsersLimit(limit) };
}

/** Just the number, with thousands separators. */
export function formatUsersLimit(limit: number): string {
  return new Intl.NumberFormat('en').format(limit);
}

/** Formats the monthly event allowance; zero means an unmetered firehose. */
export function formatEventsLimit(limit: number): string {
  if (!Number.isFinite(limit) || limit <= 0) {
    return getDictionary().checkout.unlimited;
  }
  return new Intl.NumberFormat('en').format(limit);
}

/** Compact variant for tight card headers: 5 000 000 becomes "5M". */
export function formatEventsCompact(limit: number): string {
  if (limit <= 0) {
    return '∞';
  }
  if (limit >= 1_000_000) {
    return `${Math.round(limit / 1_000_000)}M`;
  }
  if (limit >= 1_000) {
    return `${Math.round(limit / 1_000)}K`;
  }
  return String(limit);
}

/**
 * The delivery cadence as a phrase rather than the raw enum the API sends.
 * An unknown value falls through to the code itself: loud enough to be caught
 * in review, and the card still renders.
 */
export function formatDelivery(frequency: string): string {
  const labels: Record<string, string> = getDictionary().pricing.deliveryLabels;
  return labels[frequency] ?? frequency;
}

/** The SLA figure as published: a percentage, or the best-effort phrase. */
export function formatSla(sla: string): string {
  if (!sla || sla === 'best_effort') {
    return getDictionary().pricing.slaBestEffort;
  }
  return `${sla}%`;
}

/** The support tier as published on the comparison table. */
export function formatSupport(level: string): string {
  const labels: Record<string, string> = getDictionary().pricing.supportLabels;
  return labels[level] ?? level;
}
