import { Send } from 'lucide-react';
import { useMemo } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { getDictionary, type Lang } from '@/i18n';
import { LangProvider } from '@/i18n/react';
import { requestPasswordReset } from '@/lib/api/auth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { forgotPasswordSchema } from '@/lib/schemas/auth';

interface ForgotPasswordFormProps {
  lang: Lang;
}

/**
 * Publishes the page language to the shared primitives below (fields, dialogs)
 * so they do not each need it threaded through as a prop.
 */
export function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  return (
    <LangProvider lang={props.lang}>
      <ForgotPasswordFormBody {...props} />
    </LangProvider>
  );
}

function ForgotPasswordFormBody({ lang }: ForgotPasswordFormProps) {
  const t = getDictionary(lang).auth.forgot.form;
  const schema = useMemo(() => forgotPasswordSchema(lang), [lang]);

  const form = useZodForm({
    schema,
    initialValues: { email: '' },
    onSubmit: async (values) => {
      await requestPasswordReset(values.email);
    },
  });

  // The success copy deliberately does not confirm whether the address exists:
  // that distinction is what turns a reset form into an account-enumeration tool.
  if (form.status === 'success') {
    return (
      <Alert tone="success" title={t.successTitle}>
        <p>{t.successBody}</p>
        <button
          type="button"
          onClick={form.reset}
          className="mt-3 text-sm underline underline-offset-4 transition-colors duration-200 hover:text-mint-200"
        >
          {t.tryAnother}
        </button>
      </Alert>
    );
  }

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

      {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={form.isSubmitting}
        loadingLabel={t.submitting}
      >
        {t.submit}
        <Send className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
