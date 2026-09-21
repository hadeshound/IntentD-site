import { z } from 'zod';

import { getDictionary } from '@/i18n';

/**
 * These rules mirror internal/auth/password.go and the `validate` tags on the
 * Go request structs one-for-one. The browser copy exists to give instant
 * feedback; the server remains the authority and re-checks everything.
 */

type AuthErrors = ReturnType<typeof getDictionary>['auth']['errors'];

function errorsFor(): AuthErrors {
  return getDictionary().auth.errors;
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

export function loginSchema() {
  const e = errorsFor();

  return z.object({
    email: emailField(e),
    password: z.string().min(1, e.passwordRequired).max(72, e.passwordMax),
    remember_me: z.boolean().default(false),
  });
}

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;

export function registerSchema() {
  const e = errorsFor();

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

export function forgotPasswordSchema() {
  return z.object({ email: emailField(errorsFor()) });
}

export type ForgotPasswordValues = z.infer<ReturnType<typeof forgotPasswordSchema>>;

export function resetPasswordSchema() {
  const e = errorsFor();

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
