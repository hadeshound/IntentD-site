import { Send } from 'lucide-react';

import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { requestPasswordReset } from '@/lib/api/auth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { forgotPasswordSchema } from '@/lib/schemas/auth';

export function ForgotPasswordForm() {
  const form = useZodForm({
    schema: forgotPasswordSchema,
    initialValues: { email: '' },
    onSubmit: async (values) => {
      await requestPasswordReset(values.email);
    },
  });

  // The success copy deliberately does not confirm whether the address exists:
  // that distinction is what turns a reset form into an account-enumeration tool.
  if (form.status === 'success') {
    return (
      <Alert tone="success" title="Проверьте почту">
        <p>
          Если такой email зарегистрирован — мы отправили инструкцию по восстановлению
          пароля. Ссылка действует один час.
        </p>
        <button
          type="button"
          onClick={form.reset}
          className="mt-3 text-sm underline underline-offset-4 transition-colors duration-200 hover:text-mint-200"
        >
          Указать другой адрес
        </button>
      </Alert>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      <TextField
        label="Email аккаунта"
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
        loadingLabel="Отправляем…"
      >
        Отправить инструкцию
        <Send className="h-4 w-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
