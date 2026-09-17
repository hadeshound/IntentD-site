'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CheckboxField, TextField } from '@/components/ui/Field';
import { useAuth } from '@/lib/hooks/useAuth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { loginSchema } from '@/lib/schemas/auth';

interface LoginFormProps {
  /** Destination after a successful sign-in, already sanitised by the page. */
  redirectTo: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const { login, status } = useAuth();

  const form = useZodForm({
    schema: loginSchema,
    initialValues: { email: '', password: '', remember_me: false },
    onSubmit: async (values) => {
      await login({
        email: values.email,
        password: values.password,
        remember_me: values.remember_me,
      });
      router.replace(redirectTo);
    },
  });

  // Someone who is already signed in has no business on this screen.
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(redirectTo);
    }
  }, [status, redirectTo, router]);

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      <TextField
        label="Email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        autoFocus
        placeholder="you@company.com"
        value={form.values.email}
        onChange={(event) => form.setValue('email', event.target.value)}
        onBlur={() => form.markTouched('email')}
        error={form.errorFor('email')}
        required
      />

      <TextField
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
        value={form.values.password}
        onChange={(event) => form.setValue('password', event.target.value)}
        onBlur={() => form.markTouched('password')}
        error={form.errorFor('password')}
        required
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <CheckboxField
          name="remember_me"
          checked={form.values.remember_me ?? false}
          onChange={(checked) => form.setValue('remember_me', checked)}
        >
          Запомнить меня
        </CheckboxField>

        <Link
          href="/auth/forgot-password"
          className="text-sm text-ink-muted underline underline-offset-4 decoration-hairline-strong transition-colors duration-200 hover:text-mint-300"
        >
          Забыли пароль?
        </Link>
      </div>

      {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

      <Button type="submit" size="lg" className="w-full" isLoading={form.isSubmitting} loadingLabel="Входим…">
        Войти
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
