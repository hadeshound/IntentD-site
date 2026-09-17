import { apiRequest } from './client';

export type PlanCode = 'starter' | 'growth' | 'enterprise';

export interface PlanFeatures {
  target?: string;
  delivery?: string;
  fields?: string[] | string;
  support?: string;
  sla?: string;
}

export interface Plan {
  code: PlanCode;
  name: string;
  price_cents: number;
  currency: string;
  events_limit: number;
  features: PlanFeatures;
  display_order: number;
  is_custom_priced: boolean;
}

/**
 * Reads the catalogue. The pricing copy itself lives in lib/content/pricing.ts;
 * this call supplies the authoritative price and volume so the page can never
 * drift from what the backend would actually bill.
 */
export async function fetchPlans(revalidateSeconds = 300): Promise<Plan[]> {
  const data = await apiRequest<{ plans: Plan[] }>('/public/plans', {
    revalidate: revalidateSeconds,
  });
  return data.plans;
}

/**
 * Server-side catalogue read that never throws. A cold API during a page
 * render should downgrade the pricing section to our own seeded figures, not
 * blank it out. The flag lets the caller note that the data may be stale.
 */
export async function fetchPlansSafe(): Promise<{ plans: Plan[]; isFallback: boolean }> {
  const { FALLBACK_PLANS } = await import('@/lib/content/pricing');

  try {
    const plans = await fetchPlans();
    return plans.length > 0
      ? { plans, isFallback: false }
      : { plans: FALLBACK_PLANS, isFallback: true };
  } catch {
    return { plans: FALLBACK_PLANS, isFallback: true };
  }
}
