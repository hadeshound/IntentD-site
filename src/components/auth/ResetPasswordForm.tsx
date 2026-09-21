import { Check } from 'lucide-react';
import { useMemo } from 'react';

import { Alert } from '@/components/ui/Alert';
import { Button, ButtonLink } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { getDictionary } from '@/i18n';
import { resetPassword } from '@/lib/api/auth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { resetPasswordSchema } from '@/lib/schemas/auth';

interface ResetPasswordFormProps {
  /** Token taken from the emailed link. */
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const t = getDictionary().auth.reset.form;
  const schema = useMemo(() => resetPasswordSchema(), []);

  const form = useZodForm({
    schema,
    initialValues: { token, new_password: '', confirm_password: '' },
    onSubmit: async (values) => {
      await resetPassword(values.token, values.new_password);
    },
  });

  if (!token) {
    return (
      <Alert tone="error" title={t.incompleteTitle}>
        <p>
          {t.incompleteBodyBefore}{' '}
          <a href="/auth/forgot-password">{t.incompleteLink}</a>.
        </p>
      </Alert>
    );
  }

  if (form.status === 'success') {
    return (
      <div className="space-y-5">
        <Alert tone="success" title={t.successTitle}>
          <p>{t.successBody}</p>
        </Alert>

        <ButtonLink href="/auth/login" size="lg" className="w-full">
          {t.goToLogin}
          <Check className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      <TextField
        label={t.newPassword}
        name="new_password"
        type="password"
        autoComplete="new-password"
        autoFocus
        value={form.values.new_password}
        onChange={(event) => form.setValue('new_password', event.target.value)}
        onBlur={() => form.markTouched('new_password')}
        error={form.errorFor('new_password')}
        hint={t.passwordHint}
        required
      />

      <TextField
        label={t.confirmPassword}
        name="confirm_password"
        type="password"
        autoComplete="new-password"
        value={form.values.confirm_password}
        onChange={(event) => form.setValue('confirm_password', event.target.value)}
        onBlur={() => form.markTouched('confirm_password')}
        error={form.errorFor('confirm_password')}
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
      </Button>
    </form>
  );
}
