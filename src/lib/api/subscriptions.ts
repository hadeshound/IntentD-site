import { apiRequest } from './client';
import type { PlanCode } from './plans';

export interface CheckoutIntentPayload {
  plan_code: Exclude<PlanCode, 'enterprise'>;
  company_name?: string;
  notes?: string;
}

export interface CheckoutIntent {
  checkout_id: string;
  status: string;
  plan_code: string;
  plan_name: string;
  already_requested: boolean;
}

export interface PendingSubscription {
  checkout_id: string;
  plan_code: string;
  plan_name: string;
  price_cents: number;
  currency: string;
  status: string;
  notes: string | null;
  created_at: string;
}

/** Records the activation request. Stage 1 charges nothing: a manager follows up. */
export async function createCheckoutIntent(payload: CheckoutIntentPayload): Promise<CheckoutIntent> {
  return apiRequest<CheckoutIntent>('/subscriptions/intent', {
    method: 'POST',
    body: payload,
    auth: true,
  });
}

export async function fetchPendingSubscriptions(): Promise<PendingSubscription[]> {
  const data = await apiRequest<{ pending_subscriptions: PendingSubscription[] }>(
    '/subscriptions/pending',
    { auth: true },
  );
  return data.pending_subscriptions;
}
