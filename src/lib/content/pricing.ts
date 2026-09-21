import { getDictionary, type Lang } from '@/i18n';
import type { Plan, PlanCode } from '@/lib/api/plans';

/**
 * Presentation layer for the catalogue.
 *
 * Prices, user allowances and delivery cadence are NOT here: they come from
 * GET /public/plans so the page can never advertise a number the backend would
 * not honour. The words around those numbers come from the dictionaries, which
 * is why this file is a set of lookups rather than a table of copy.
 *
 * Plan names are not translated either -- Starter, Growth, Scale and Enterprise
 * are product names, and the API is their source.
 */

export interface PlanPresentation {
  code: PlanCode;
  /** Who the tier is for, shown under the title. */
  audience: string;
  features: string[];
  /** Only the highlighted tier carries a label. */
  highlightLabel: string;
  highlighted: boolean;
}

/** The tier that carries the highlight in the grid. */
const HIGHLIGHTED_PLAN: PlanCode = 'growth';

export function planPresentation(lang: Lang, code: PlanCode): PlanPresentation {
  const plan = getDictionary(lang).pricing.plans[code];

  return {
    code,
    audience: plan.audience,
    features: [...plan.features],
    highlightLabel: plan.highlightLabel,
    highlighted: code === HIGHLIGHTED_PLAN,
  };
}

/** Order used when the API is unreachable and the grid renders from copy alone. */
export const PLAN_ORDER: PlanCode[] = ['starter', 'growth', 'scale', 'enterprise'];

// --- Feature matrix (/pricing) ---------------------------------------------

export interface MatrixRow {
  label: string;
  /** A string renders as text; a boolean renders as an included/excluded mark. */
  values: Record<PlanCode, string | boolean>;
}

export interface MatrixGroup {
  title: string;
  rows: MatrixRow[];
}

export function featureMatrix(lang: Lang): MatrixGroup[] {
  return getDictionary(lang).pricing.matrix.groups.map((group) => ({
    title: group.title,
    rows: group.rows.map((row) => ({ label: row.label, values: { ...row.values } })),
  }));
}

/**
 * Mirror of the catalogue after portal migration 000015_update_plans.up.sql.
 * Used only when the catalogue endpoint is unreachable at render time, so the
 * pricing page degrades to our own published figures rather than to an empty
 * section. Update both files together.
 */
export const FALLBACK_PLANS: Plan[] = [
  {
    code: 'starter',
    name: 'Starter',
    price_cents: 49900,
    setup_price_cents: 49900,
    currency: 'USD',
    events_limit: 5_000_000,
    users_limit: 10_000,
    delivery_frequency: 'daily',
    sla: 'best_effort',
    support_level: 'email',
    features: { target: 'startups', delivery: 'daily', support: 'email', sla: 'best_effort' },
    display_order: 1,
    is_custom_priced: false,
  },
  {
    code: 'growth',
    name: 'Growth',
    price_cents: 199900,
    setup_price_cents: 99900,
    currency: 'USD',
    events_limit: 30_000_000,
    users_limit: 100_000,
    delivery_frequency: 'hourly',
    sla: '99.5',
    support_level: 'priority_24_7',
    features: { target: 'adtech', delivery: 'hourly', support: 'priority_24_7', sla: '99.5' },
    display_order: 2,
    is_custom_priced: false,
  },
  {
    code: 'scale',
    name: 'Scale',
    price_cents: 499900,
    setup_price_cents: 149900,
    currency: 'USD',
    events_limit: 150_000_000,
    users_limit: 500_000,
    delivery_frequency: 'hourly_direct',
    sla: '99.7',
    support_level: 'dedicated_manager',
    features: {
      target: 'large_adtech',
      delivery: 'hourly_direct',
      support: 'dedicated_manager',
      sla: '99.7',
      fields: 'all',
      custom_filters: true,
    },
    display_order: 3,
    is_custom_priced: false,
  },
  {
    code: 'enterprise',
    name: 'Enterprise',
    price_cents: 0,
    setup_price_cents: 0,
    currency: 'USD',
    events_limit: 0,
    users_limit: null,
    delivery_frequency: 'realtime',
    sla: '99.9',
    support_level: 'dedicated_team',
    features: {
      target: 'enterprise',
      delivery: 'realtime',
      support: 'dedicated_team',
      sla: '99.9',
      fields: 'custom',
      custom_schema: true,
    },
    display_order: 4,
    is_custom_priced: true,
  },
];
