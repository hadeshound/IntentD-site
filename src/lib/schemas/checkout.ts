import { z } from 'zod';

/** Mirrors checkoutIntentRequest in internal/api/handlers/subscriptions.go. */
export const checkoutSchema = z.object({
  plan_code: z.enum(['starter', 'growth'], {
    errorMap: () => ({ message: 'Выберите тариф' }),
  }),
  company_name: z
    .string()
    .trim()
    .min(2, 'Укажите юридическое или рабочее название компании')
    .max(255, 'Не длиннее 255 символов'),
  notes: z.string().trim().max(2000, 'Не длиннее 2000 символов').optional(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
