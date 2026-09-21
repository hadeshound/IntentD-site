import { FALLBACK_PLANS } from '@/lib/content/pricing';
import { apiRequest } from './client';

export type PlanCode = 'starter' | 'growth' | 'scale' | 'enterprise';

/** Plans a visitor can check out on their own; Enterprise goes to sales. */
export const SELF_SERVE_PLAN_CODES = ['starter', 'growth', 'scale'] as const;

export type SelfServePlanCode = (typeof SELF_SERVE_PLAN_CODES)[number];

export function isSelfServePlan(code: PlanCode | null): code is SelfServePlanCode {
  return code !== null && (SELF_SERVE_PLAN_CODES as readonly string[]).includes(code);
}

export interface PlanFeatures {
  target?: string;
  delivery?: string;
  fields?: string[] | string;
  support?: string;
  sla?: string;
  custom_filters?: boolean;
  custom_schema?: boolean;
}

export interface Plan {
  code: PlanCode;
  name: string;
  price_cents: number;
  /** One-off provisioning fee, charged when the stream is opened. */
  setup_price_cents: number;
  currency: string;
  events_limit: number;
  /** Monthly active users included. Null means unlimited, which is not zero. */
  users_limit: number | null;
  delivery_frequency: string;
  sla: string;
  support_level: string;
  features: PlanFeatures;
  display_order: number;
  is_custom_priced: boolean;
}

/**
 * Reads the catalogue. The pricing copy itself lives in the dictionaries under
 * src/i18n; this call supplies the authoritative price and allowance so the
 * page can never drift from what the backend would actually bill.
 */
export async function fetchPlans(): Promise<Plan[]> {
  const data = await apiRequest<{ plans: Plan[] }>('/public/plans');
  return data.plans;
}

/**
 * Catalogue read that never throws. A cold API while a page renders should
 * downgrade the pricing section to our own seeded figures, not blank it out.
 * The flag lets the caller note that the data may be stale.
 *
 * On the prerendered pages this resolves once, at build time -- the figures are
 * baked into the HTML, exactly as the Next build did with `revalidate = 300`
 * minus the background revalidation. A price change therefore needs a redeploy,
 * which Cloudflare Pages can trigger from a webhook.
 */
export async function fetchPlansSafe(): Promise<{ plans: Plan[]; isFallback: boolean }> {
  try {
    const plans = await fetchPlans();
    return plans.length > 0
      ? { plans, isFallback: false }
      : { plans: FALLBACK_PLANS, isFallback: true };
  } catch {
    return { plans: FALLBACK_PLANS, isFallback: true };
  }
}
