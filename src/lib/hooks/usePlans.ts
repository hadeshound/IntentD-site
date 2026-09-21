import { useEffect, useState } from 'react';

import { DEFAULT_LANG, getDictionary, type Lang } from '@/i18n';
import { fetchPlans, type Plan, type PlanCode } from '@/lib/api/plans';

interface UsePlansResult {
  plans: Plan[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Client-side catalogue read, used by /checkout where the plan comes from a
 * query parameter. Marketing pages render plans on the server instead.
 */
export function usePlans(lang: Lang = DEFAULT_LANG): UsePlansResult {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetchPlans()
      .then((result) => {
        if (!cancelled) {
          setPlans(result);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(getDictionary(lang).checkout.planError.loadFailed);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [lang]);

  return { plans, isLoading, error };
}

/** Convenience lookup used by the checkout page. */
export function findPlan(plans: Plan[], code: PlanCode | null): Plan | null {
  if (!code) {
    return null;
  }
  return plans.find((plan) => plan.code === code) ?? null;
}
