import { z } from 'zod';

import { getDictionary, type Lang } from '@/i18n';

/**
 * These rules mirror internal/auth/password.go and the `validate` tags on the
 * Go request structs one-for-one. The browser copy exists to give instant
 * feedback; the server remains the authority and re-checks everything.
 *
 * The schemas are built per language rather than declared once: a Zod message
 * is baked into the schema at construction time, so a shared instance could
 * only ever speak one language.
 */

type AuthErrors = ReturnType<typeof getDictionary>['auth']['errors'];

function errorsFor(lang: Lang): AuthErrors {
  return getDictionary(lang).auth.errors;
}

function emailField(e: AuthErrors) {
  return z
    .string()
    .trim()
    .min(1, e.emailRequired)
    .max(255, e.emailMax)
    .email(e.emailInvalid);
}

function passwordField(e: AuthErrors) {
  return z
    .string()
    .min(10, e.passwordMin)
    .max(72, e.passwordMax)
    .refine((value) => /\p{L}/u.test(value), e.passwordLetter)
    .refine((value) => /\d/.test(value), e.passwordDigit);
}

export function loginSchema(lang: Lang) {
  const e = errorsFor(lang);

  return z.object({
    email: emailField(e),
    password: z.string().min(1, e.passwordRequired).max(72, e.passwordMax),
    remember_me: z.boolean().default(false),
  });
}

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;

export function registerSchema(lang: Lang) {
  const e = errorsFor(lang);

  return z.object({
    email: emailField(e),
    password: passwordField(e),
    company_name: z.string().trim().max(255, e.max255).optional(),
    role: z.enum(['buyer', 'publisher'], {
      errorMap: () => ({ message: e.roleRequired }),
    }),
    // A refined boolean rather than z.literal(true): the checkbox starts as
    // false, and the literal form would make the initial state a type error.
    accept_terms: z.boolean().refine((accepted) => accepted, e.termsRequired),
  });
}

export type RegisterValues = z.infer<ReturnType<typeof registerSchema>>;

export function forgotPasswordSchema(lang: Lang) {
  return z.object({ email: emailField(errorsFor(lang)) });
}

export type ForgotPasswordValues = z.infer<ReturnType<typeof forgotPasswordSchema>>;

export function resetPasswordSchema(lang: Lang) {
  const e = errorsFor(lang);

  return z
    .object({
      token: z.string().min(16, e.tokenInvalid),
      new_password: passwordField(e),
      confirm_password: z.string(),
    })
    .refine((values) => values.new_password === values.confirm_password, {
      path: ['confirm_password'],
      message: e.passwordsMismatch,
    });
}

export type ResetPasswordValues = z.infer<ReturnType<typeof resetPasswordSchema>>;
