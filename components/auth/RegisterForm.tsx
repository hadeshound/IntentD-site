'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CheckboxField, TextField } from '@/components/ui/Field';
import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { useAuth } from '@/lib/hooks/useAuth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { registerSchema } from '@/lib/schemas/auth';

type Role = 'buyer' | 'publisher';

const ROLE_OPTIONS = [
  {
    value: 'buyer' as const,
    label: 'Я хочу купить данные',
    description: 'Доступ к потоку intent-сигналов в Parquet.',
  },
  {
    value: 'publisher' as const,
    label: 'Я разработчик расширения',
    description: 'Монетизация без рекламы через edge-SDK.',
  },
];

interface RegisterFormProps {
  redirectTo: string;
  /** Pre-selected from ?role= on the pricing and hero CTAs. */
  defaultRole?: Role;
}

export function RegisterForm({ redirectTo, defaultRole }: RegisterFormProps) {
  const router = useRouter();
  const { register, status } = useAuth();

  const form = useZodForm({
    schema: registerSchema,
    initialValues: {
      email: '',
      password: '',
      company_name: '',
      role: (defaultRole ?? 'buyer') as Role,
      accept_terms: false,
    },
    onSubmit: async (values) => {
      await register({
        email: values.email,
        password: values.password,
        company_name: values.company_name || undefined,
        role: values.role,
        accept_terms: true,
      });
      router.replace(redirectTo);
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(redirectTo);
    }
  }, [status, redirectTo, router]);

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-6">
      <RadioCardGroup<Role>
        name="role"
        legend="Зачем вы пришли?"
        value={form.values.role}
        onChange={(value) => form.setValue('role', value)}
        options={ROLE_OPTIONS}
        error={form.errorFor('role')}
      />

      <TextField
        label="Рабочий email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
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
        autoComplete="new-password"
        value={form.values.password}
        onChange={(event) => form.setValue('password', event.target.value)}
        onBlur={() => form.markTouched('password')}
        error={form.errorFor('password')}
        hint="Минимум 10 символов, хотя бы одна буква и одна цифра."
        required
      />

      <TextField
        label="Название компании"
        name="company_name"
        autoComplete="organization"
        optional
        value={form.values.company_name ?? ''}
        onChange={(event) => form.setValue('company_name', event.target.value)}
        onBlur={() => form.markTouched('company_name')}
        error={form.errorFor('company_name')}
        hint="Понадобится при резервировании выгрузки — можно указать позже."
      />

      <CheckboxField
        name="accept_terms"
        checked={form.values.accept_terms}
        onChange={(checked) => form.setValue('accept_terms', checked)}
        onBlur={() => form.markTouched('accept_terms')}
        error={form.errorFor('accept_terms')}
      >
        Я согласен с{' '}
        <Link href="/terms" className="text-mint-400 underline underline-offset-4">
          условиями использования
        </Link>{' '}
        и{' '}
        <Link href="/privacy" className="text-mint-400 underline underline-offset-4">
          политикой конфиденциальности
        </Link>
        .
      </CheckboxField>

      {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={form.isSubmitting}
        loadingLabel="Создаём аккаунт…"
      >
        Создать аккаунт
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
