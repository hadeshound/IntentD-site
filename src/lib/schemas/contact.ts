import { z } from 'zod';

/** Mirrors contactRequest in internal/api/handlers/contact.go. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Как к вам обращаться?')
    .max(255, 'Не длиннее 255 символов'),
  email: z
    .string()
    .trim()
    .min(1, 'Укажите рабочий email')
    .max(255, 'Email не длиннее 255 символов')
    .email('Похоже, в адресе опечатка'),
  company: z.string().trim().max(255, 'Не длиннее 255 символов').optional(),
  topic: z.enum(['buy_data', 'monetize_extension', 'support', 'enterprise'], {
    errorMap: () => ({ message: 'Выберите тип запроса' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Расскажите чуть подробнее — минимум 10 символов')
    .max(5000, 'Не длиннее 5000 символов'),
  // Honeypot: rendered off-screen and hidden from assistive tech.
  website: z.string().max(255).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const CONTACT_TOPICS: ReadonlyArray<{ value: ContactValues['topic']; label: string }> = [
  { value: 'buy_data', label: 'Купить данные' },
  { value: 'monetize_extension', label: 'Монетизировать расширение' },
  { value: 'support', label: 'Техподдержка' },
  { value: 'enterprise', label: 'Enterprise Data Pipeline' },
];
