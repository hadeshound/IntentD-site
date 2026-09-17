import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthShell } from '@/components/auth/AuthShell';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Восстановление пароля',
  description: 'Запросите ссылку для сброса пароля от аккаунта IntentD.',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Восстановление"
      title="Сбросить пароль"
      description="Укажите email, привязанный к аккаунту. Мы отправим ссылку для установки нового пароля."
      footer={
        <p>
          Вспомнили пароль?{' '}
          <Link href="/auth/login" className="link-underline underline underline-offset-4">
            Вернуться ко входу
          </Link>
        </p>
      }
      aside={
        <div className="surface-card p-8 lg:p-10">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
            Почему ответ всегда одинаковый
          </p>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-muted">
            Форма отвечает одинаково независимо от того, зарегистрирован адрес или нет.
            Иначе её можно было бы использовать как справочник: подставлять адреса и по
            разнице в ответе выяснять, у кого есть аккаунт.
          </p>

          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-muted">
            Ссылка действует один час и срабатывает ровно один раз. После смены пароля
            все активные сессии аккаунта завершаются.
          </p>
        </div>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
