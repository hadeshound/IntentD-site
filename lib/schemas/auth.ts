import { z } from 'zod';

/**
 * These rules mirror internal/auth/password.go and the `validate` tags on the
 * Go request structs one-for-one. The browser copy exists to give instant
 * feedback; the server remains the authority and re-checks everything.
 */

const emailField = z
  .string()
  .trim()
  .min(1, 'Укажите рабочий email')
  .max(255, 'Email не длиннее 255 символов')
  .email('Похоже, в адресе опечатка');

const passwordField = z
  .string()
  .min(10, 'Минимум 10 символов')
  .max(72, 'Не длиннее 72 символов')
  .refine((value) => /\p{L}/u.test(value), 'Добавьте хотя бы одну букву')
  .refine((value) => /\d/.test(value), 'Добавьте хотя бы одну цифру');

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Введите пароль').max(72, 'Не длиннее 72 символов'),
  remember_me: z.boolean().default(false),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: emailField,
  password: passwordField,
  company_name: z.string().trim().max(255, 'Не длиннее 255 символов').optional(),
  role: z.enum(['buyer', 'publisher'], {
    errorMap: () => ({ message: 'Выберите, зачем вы пришли' }),
  }),
  // A refined boolean rather than z.literal(true): the checkbox starts as
  // false, and the literal form would make the initial state a type error.
  accept_terms: z
    .boolean()
    .refine((accepted) => accepted, 'Без согласия с условиями мы не сможем создать аккаунт'),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(16, 'Ссылка повреждена — запросите новую'),
    new_password: passwordField,
    confirm_password: z.string(),
  })
  .refine((values) => values.new_password === values.confirm_password, {
    path: ['confirm_password'],
    message: 'Пароли не совпадают',
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
