import { ArrowRight, Check, Database, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Alert } from '@/components/ui/Alert';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { Badge } from '@/components/ui/Badge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { TextAreaField, TextField } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import type { PlanCode } from '@/lib/api/plans';
import { createCheckoutIntent } from '@/lib/api/subscriptions';
import { PLAN_PRESENTATION } from '@/lib/content/pricing';
import { findPlan, usePlans } from '@/lib/hooks/usePlans';
import { useAuth } from '@/lib/hooks/useAuth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { checkoutSchema } from '@/lib/schemas/checkout';
import { formatEventsLimit, formatPrice } from '@/lib/utils/format';

interface CheckoutPanelProps {
  /** Plan code taken from ?plan=, already narrowed by the page. */
  planCode: PlanCode | null;
}

const DELIVERY_BY_PLAN: Record<string, string> = {
  starter: 'Ежедневная выгрузка в S3, Parquet + LZ4',
  growth: 'Почасовая синхронизация S3 / MinIO, Parquet + LZ4',
};

export function CheckoutPanel({ planCode }: CheckoutPanelProps) {
  const { user, reload } = useAuth();
  const { plans, isLoading, error } = usePlans();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plan = useMemo(() => findPlan(plans, planCode), [plans, planCode]);
  const presentation = planCode ? PLAN_PRESENTATION[planCode] : null;

  const existingCompany = user?.company_name?.trim() ?? '';

  const form = useZodForm({
    schema: checkoutSchema,
    initialValues: {
      plan_code: (planCode === 'growth' ? 'growth' : 'starter') as 'starter' | 'growth',
      company_name: existingCompany,
      notes: '',
    },
    onSubmit: async (values) => {
      await createCheckoutIntent({
        plan_code: values.plan_code,
        company_name: values.company_name,
        notes: values.notes || undefined,
      });
      // The intent may have backfilled the company on the account.
      await reload();
      setIsModalOpen(true);
    },
  });

  const { setValue } = form;

  // The profile arrives after the silent refresh, so the company field is
  // populated once rather than on every render.
  useEffect(() => {
    if (existingCompany) {
      setValue('company_name', existingCompany);
    }
  }, [existingCompany, setValue]);

  useEffect(() => {
    if (planCode === 'starter' || planCode === 'growth') {
      setValue('plan_code', planCode);
    }
  }, [planCode, setValue]);

  // --- guards -------------------------------------------------------------

  if (planCode === 'enterprise') {
    return (
      <Alert tone="info" title="Enterprise оформляется отдельно">
        <p>
          Raw Firehose, кастомные фильтры и SLA согласуются индивидуально, поэтому этот
          тариф не проходит через самостоятельное оформление.
        </p>
        <ButtonLink href="/contact?topic=enterprise" className="mt-5">
          Связаться с менеджером
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </Alert>
    );
  }

  if (!planCode) {
    return (
      <Alert tone="info" title="Тариф не выбран">
        <p>Вернитесь к тарифам и выберите объём потока, который вам нужен.</p>
        <ButtonLink href="/pricing" className="mt-5">
          Перейти к тарифам
        </ButtonLink>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <p className="flex items-center gap-3 text-sm text-ink-muted" role="status" aria-live="polite">
        <Spinner className="h-4 w-4" />
        Загружаем условия тарифа…
      </p>
    );
  }

  if (error || !plan || !presentation) {
    return (
      <Alert tone="error" title="Не удалось загрузить тариф">
        <p>{error ?? 'Такого тарифа нет в каталоге. Выберите другой на странице тарифов.'}</p>
        <ButtonLink href="/pricing" variant="secondary" className="mt-5">
          К тарифам
        </ButtonLink>
      </Alert>
    );
  }

  // --- main view ----------------------------------------------------------

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <div className="surface-card surface-card-accent p-7 lg:p-9">
            <AmbientGlow className="-right-16 -top-16 h-56 w-56" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-400">
                  Выбранный тариф
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink">{plan.name}</h2>
              </div>

              <Badge tone="mint">{plan.code}</Badge>
            </div>

            <p className="mt-7 flex items-baseline gap-2">
              <span className="font-display text-4xl tracking-tight text-ink">
                {formatPrice(plan.price_cents, plan.currency)}
              </span>
              <span className="text-sm text-ink-faint">/ мес</span>
            </p>

            <dl className="mt-8 space-y-4 border-t border-hairline pt-8 text-sm">
              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">Объём</dt>
                <dd className="text-right font-mono text-ink">
                  {formatEventsLimit(plan.events_limit)} событий / мес
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">Формат доставки</dt>
                <dd className="max-w-[16rem] text-right text-ink">
                  {DELIVERY_BY_PLAN[plan.code] ?? 'Parquet + LZ4 в AWS S3'}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">Для кого</dt>
                <dd className="max-w-[16rem] text-right text-ink">{presentation.audience}</dd>
              </div>
            </dl>

            <ul className="mt-8 space-y-3 border-t border-hairline pt-8">
              {presentation.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-mint-400" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs leading-relaxed text-ink-faint">
              Оплата на этом шаге не списывается. Мы фиксируем заявку и связываемся с вами
              для выдачи тестовых ключей.{' '}
              <a href="/pricing" className="underline underline-offset-4">
                Сменить тариф
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="surface-card p-7 lg:p-9">
            <h2 className="font-display text-xl text-ink">Данные для активации</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Заявка привяжется к аккаунту{' '}
              <span className="font-mono text-ink">{user?.email}</span>.
            </p>

            <form onSubmit={form.handleSubmit} noValidate className="mt-8 space-y-5">
              <TextField
                label="Название компании"
                name="company_name"
                autoComplete="organization"
                value={form.values.company_name}
                onChange={(event) => form.setValue('company_name', event.target.value)}
                onBlur={() => form.markTouched('company_name')}
                error={form.errorFor('company_name')}
                hint={
                  existingCompany
                    ? 'Название сохранено в профиле — при необходимости поправьте.'
                    : 'За компанией резервируется отдельный S3-бакет, поэтому поле обязательно.'
                }
                required
              />

              <TextAreaField
                label="Комментарий для менеджера"
                name="notes"
                rows={4}
                optional
                placeholder="Интересующие вертикали, желаемые сроки старта, требования к фильтрации."
                value={form.values.notes ?? ''}
                onChange={(event) => form.setValue('notes', event.target.value)}
                onBlur={() => form.markTouched('notes')}
                error={form.errorFor('notes')}
              />

              {form.formError ? <Alert tone="error">{form.formError}</Alert> : null}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={form.isSubmitting}
                loadingLabel="Отправляем заявку…"
              >
                Запросить активацию тарифа
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>

            <ul className="mt-8 space-y-3 border-t border-hairline pt-7 text-xs leading-relaxed text-ink-faint">
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-500/70" aria-hidden="true" />
                Платёжные данные на этом этапе не запрашиваются и не принимаются.
              </li>
              <li className="flex gap-2.5">
                <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-500/70" aria-hidden="true" />
                Повторная заявка на тот же тариф не создаёт дубликат — мы увидим исходную.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          // No dashboard exists yet, so the flow returns to the landing page.
          window.location.assign('/');
        }}
        title="Заявка принята"
        description="Наш менеджер свяжется с вами по указанному email в течение 15 минут для выдачи тестовых API-ключей и настройки выгрузки."
        footer={
          <>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                window.location.assign('/');
              }}
            >
              Вернуться на главную
            </Button>
            <ButtonLink href="/docs/api" variant="secondary">
              Открыть документацию
            </ButtonLink>
          </>
        }
      >
        <div className="rounded-card border border-hairline bg-void/60 p-4 text-sm text-ink-muted">
          <p>
            Тариф: <span className="font-mono text-ink">{plan.name}</span>
          </p>
          <p className="mt-1.5">
            Контакт: <span className="font-mono text-ink">{user?.email}</span>
          </p>
        </div>
      </Modal>
    </>
  );
}
