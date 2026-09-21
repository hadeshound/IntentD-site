import { z } from 'zod';

import { getDictionary } from '@/i18n';

/** Mirrors contactRequest in internal/api/handlers/contact.go. */
export function contactSchema() {
  const e = getDictionary().contact.form.errors;

  return z.object({
    name: z.string().trim().min(2, e.nameMin).max(255, e.max255),
    email: z
      .string()
      .trim()
      .min(1, e.emailRequired)
      .max(255, e.emailMax)
      .email(e.emailInvalid),
    company: z.string().trim().max(255, e.max255).optional(),
    topic: z.enum(['buy_data', 'monetize_extension', 'support', 'enterprise'], {
      errorMap: () => ({ message: e.topicRequired }),
    }),
    message: z.string().trim().min(10, e.messageMin).max(5000, e.messageMax),
    // Honeypot: rendered off-screen and hidden from assistive tech.
    website: z.string().max(255).optional(),
  });
}

export type ContactValues = z.infer<ReturnType<typeof contactSchema>>;

export type ContactTopic = ContactValues['topic'];

/** The topic list, in the order the select renders it. */
export function contactTopics(): ReadonlyArray<{ value: ContactTopic; label: string }> {
  const t = getDictionary().contact.form.topics;

  return [
    { value: 'buy_data', label: t.buy_data },
    { value: 'monetize_extension', label: t.monetize_extension },
    { value: 'support', label: t.support },
    { value: 'enterprise', label: t.enterprise },
  ];
}
