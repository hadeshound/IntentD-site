import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CheckboxField, TextField } from '@/components/ui/Field';
import { getDictionary } from '@/i18n';
import { useAuth } from '@/lib/hooks/useAuth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { registerSchema } from '@/lib/schemas/auth';

interface RegisterFormProps {
  redirectTo: string;
}

/**
 * Every new account is a publisher: Data Buyer access is closed, so the
 * "what brings you here" choice is gone until it reopens.
 */
export function RegisterForm({ redirectTo }: RegisterFormProps) {
  const { register, status } = useAuth();
  const t = getDictionary().auth.register.form;

  const schema = useMemo(() => registerSchema(), []);

  const form = useZodForm({
    schema,
    initialValues: {
      email: '',
      password: '',
      company_name: '',
      accept_terms: false,
    },
    onSubmit: async (values) => {
      await register({
        email: values.email,
        password: values.password,
        company_name: values.company_name || undefined,
        role: 'publisher',
        accept_terms: true,
      });
      window.location.replace(redirectTo);
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.replace(redirectTo);
    }
  }, [status, redirectTo]);

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-6">
      <TextField
        label={t.email}
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
        label={t.password}
        name="password"
        type="password"
        autoComplete="new-password"
        value={form.values.password}
        onChange={(event) => form.setValue('password', event.target.value)}
        onBlur={() => form.markTouched('password')}
        error={form.errorFor('password')}
        hint={t.passwordHint}
        required
      />

      <TextField
        label={t.company}
        name="company_name"
        autoComplete="organization"
        optional
        value={form.values.company_name ?? ''}
        onChange={(event) => form.setValue('company_name', event.target.value)}
        onBlur={() => form.markTouched('company_name')}
        error={form.errorFor('company_name')}
        hint={t.companyHint}
      />

      <CheckboxField
        name="accept_terms"
        checked={form.values.accept_terms}
        onChange={(checked) => form.setValue('accept_terms', checked)}
        onBlur={() => form.markTouched('accept_terms')}
        error={form.errorFor('accept_terms')}
      >
        {t.acceptBefore}{' '}
        <a href="/terms" className="text-mint-400 underline underline-offset-4">
          {t.acceptTerms}
        </a>{' '}
        {t.acceptAnd}{' '}
        <a href="/privacy" className="text-mint-400 underline underline-offset-4">
          {t.acceptPrivacy}
        </a>
        .
      </CheckboxField>

      {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={form.isSubmitting}
        loadingLabel={t.submitting}
      >
        {t.submit}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
