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
    return 'Индивидуально';
  }

  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
  const units = cents / 100;
  const rendered = Number.isInteger(units)
    ? units.toLocaleString('en-US')
    : units.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return `${symbol}${rendered}`;
}

/** Formats the monthly event allowance; zero means an unmetered firehose. */
export function formatEventsLimit(limit: number): string {
  if (limit <= 0) {
    return 'Без лимита';
  }
  return new Intl.NumberFormat('ru-RU').format(limit);
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
