import type { Metadata } from 'next';
import Link from 'next/link';

import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';
import { resolvePostAuthTarget } from '@/lib/utils/redirect';

export const metadata: Metadata = {
  title: 'Вход',
  description: 'Войдите в аккаунт IntentD, чтобы управлять доступом к потоку данных.',
  robots: { index: false, follow: false },
};

function firstValue(raw: string | string[] | undefined): string | null {
  if (Array.isArray(raw)) {
    return raw[0] ?? null;
  }
  return raw ?? null;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const redirectTo = resolvePostAuthTarget(
    firstValue(searchParams.redirect),
    firstValue(searchParams.plan),
  );

  const registerHref =
    redirectTo === '/'
      ? '/auth/register'
      : `/auth/register?redirect=${redirectTo.split('?')[0]}${
          firstValue(searchParams.plan) ? `&plan=${firstValue(searchParams.plan)}` : ''
        }`;

  return (
    <AuthShell
      eyebrow="Вход"
      title="С возвращением"
      description="Войдите, чтобы продолжить оформление доступа или проверить статус заявки."
      footer={
        <p>
          Ещё нет аккаунта?{' '}
          <Link href={registerHref} className="link-underline underline underline-offset-4">
            Создать аккаунт
          </Link>
        </p>
      }
      aside={
        <div className="surface-card p-8 lg:p-10">
          <div className="ambient-glow -right-16 -top-16 h-56 w-56 bg-mint-500/20" />

          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
            Как устроена сессия
          </p>

          <ul className="mt-7 space-y-5 text-[0.9375rem] leading-relaxed text-ink-muted">
            <li>
              <strong className="text-ink">Токен доступа живёт в памяти вкладки.</strong> Он
              не попадает в localStorage, поэтому его нельзя вытащить сторонним скриптом.
            </li>
            <li>
              <strong className="text-ink">Обновление — через HttpOnly-cookie.</strong>{' '}
              JavaScript не читает её ни на нашей стороне, ни на чужой.
            </li>
            <li>
              <strong className="text-ink">Смена пароля завершает все сессии.</strong> Старые
              refresh-токены отзываются немедленно.
            </li>
          </ul>
        </div>
      }
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
