import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthShell } from '@/components/auth/AuthShell';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Новый пароль',
  description: 'Установите новый пароль для аккаунта IntentD по ссылке из письма.',
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams.token;
  const token = (Array.isArray(raw) ? raw[0] : raw) ?? '';

  return (
    <AuthShell
      eyebrow="Новый пароль"
      title="Установите новый пароль"
      description="Придумайте пароль, которого ещё не было у этого аккаунта. Ссылка сработает только один раз."
      footer={
        <p>
          Ссылка устарела?{' '}
          <Link href="/auth/forgot-password" className="link-underline underline underline-offset-4">
            Запросить новую
          </Link>
        </p>
      }
    >
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
