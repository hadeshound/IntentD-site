import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';

import { AuthShell } from '@/components/auth/AuthShell';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { resolvePostAuthTarget } from '@/lib/utils/redirect';

export const metadata: Metadata = {
  title: 'Регистрация',
  description:
    'Создайте аккаунт IntentD: получите доступ к потокам данных или начните монетизировать расширение.',
  robots: { index: false, follow: false },
};

const BENEFITS = [
  'Интеграция SDK занимает около пяти минут',
  'Никакой рекламы и подмены контента в расширении',
  'Данные в Parquet + LZ4, готовые для вашего хранилища',
  'Фильтрация PII выполняется до отправки события',
];

function firstValue(raw: string | string[] | undefined): string | null {
  if (Array.isArray(raw)) {
    return raw[0] ?? null;
  }
  return raw ?? null;
}

function parseRole(raw: string | null): 'buyer' | 'publisher' | undefined {
  return raw === 'buyer' || raw === 'publisher' ? raw : undefined;
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const plan = firstValue(searchParams.plan);
  const redirectTo = resolvePostAuthTarget(firstValue(searchParams.redirect), plan);

  // A visitor who came from a pricing CTA is a buyer unless they say otherwise.
  const defaultRole = parseRole(firstValue(searchParams.role)) ?? (plan ? 'buyer' : undefined);

  const loginHref =
    redirectTo === '/'
      ? '/auth/login'
      : `/auth/login?redirect=${redirectTo.split('?')[0]}${plan ? `&plan=${plan}` : ''}`;

  return (
    <AuthShell
      eyebrow="Регистрация"
      title="Создайте аккаунт в IntentD"
      description="Получите доступ к потокам данных или начните монетизировать ваше расширение уже сегодня."
      footer={
        <p>
          Уже есть аккаунт?{' '}
          <Link href={loginHref} className="link-underline underline underline-offset-4">
            Войти
          </Link>
        </p>
      }
      aside={
        <div className="surface-card surface-card-accent p-8 lg:p-10">
          <div className="ambient-glow -right-16 -top-16 h-56 w-56 bg-mint-500/25" />

          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mint-400">
            Что дальше
          </p>

          <h2 className="mt-5 font-display text-2xl text-ink">
            После регистрации мы свяжемся с вами
          </h2>

          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted">
            На этом этапе ключи и параметры выгрузки выдаёт менеджер: так мы проверяем
            совместимость вашего сценария до подписания документов.
          </p>

          <ul className="mt-8 space-y-3.5 border-t border-hairline pt-8">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                <Check className="mt-1 h-4 w-4 shrink-0 text-mint-400" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <RegisterForm redirectTo={redirectTo} defaultRole={defaultRole} />
    </AuthShell>
  );
}
