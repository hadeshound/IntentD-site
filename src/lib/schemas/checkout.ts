import { z } from 'zod';

import { getDictionary } from '@/i18n';

/** Mirrors checkoutIntentRequest in internal/api/handlers/subscriptions.go. */
export function checkoutSchema() {
  const e = getDictionary().checkout.errors;

  return z.object({
    // Enterprise is quoted per deal and never reaches this form, which is why
    // it is absent here as well as from the Go `oneof` tag.
    plan_code: z.enum(['starter', 'growth', 'scale'], {
      errorMap: () => ({ message: e.planRequired }),
    }),
    company_name: z.string().trim().min(2, e.companyMin).max(255, e.max255),
    notes: z.string().trim().max(2000, e.max2000).optional(),
  });
}

export type CheckoutValues = z.infer<ReturnType<typeof checkoutSchema>>;
