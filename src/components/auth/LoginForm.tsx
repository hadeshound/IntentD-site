import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { CheckboxField, TextField } from '@/components/ui/Field';
import { getDictionary, getLocalizedPath, type Lang } from '@/i18n';
import { LangProvider } from '@/i18n/react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { loginSchema } from '@/lib/schemas/auth';

interface LoginFormProps {
  /** Destination after a successful sign-in, already sanitised by the page. */
  redirectTo: string;
  lang: Lang;
}

/**
 * Publishes the page language to the shared primitives below (fields, dialogs)
 * so they do not each need it threaded through as a prop.
 */
export function LoginForm(props: LoginFormProps) {
  return (
    <LangProvider lang={props.lang}>
      <LoginFormBody {...props} />
    </LangProvider>
  );
}

function LoginFormBody({ redirectTo, lang }: LoginFormProps) {
  const { login, status } = useAuth();
  const t = getDictionary(lang).auth.login.form;

  // The schema carries its messages, so it is rebuilt when the language does.
  const schema = useMemo(() => loginSchema(lang), [lang]);

  const form = useZodForm({
    schema,
    initialValues: { email: '', password: '', remember_me: false },
    onSubmit: async (values) => {
      await login({
        email: values.email,
        password: values.password,
        remember_me: values.remember_me,
      });
      // router.replace() in the Next version. A location replace keeps the same
      // history behaviour: the login screen does not come back on Back.
      window.location.replace(redirectTo);
    },
  });

  // Someone who is already signed in has no business on this screen.
  useEffect(() => {
    if (status === 'authenticated') {
      window.location.replace(redirectTo);
    }
  }, [status, redirectTo]);

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      <TextField
        label={t.email}
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
        label={t.password}
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
          {t.remember}
        </CheckboxField>

        <a
          href={getLocalizedPath('/auth/forgot-password', lang)}
          className="text-sm text-ink-muted underline underline-offset-4 decoration-hairline-strong transition-colors duration-200 hover:text-mint-300"
        >
          {t.forgot}
        </a>
      </div>

      {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

      <Button type="submit" size="lg" className="w-full" isLoading={form.isSubmitting} loadingLabel={t.submitting}>
        {t.submit}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
