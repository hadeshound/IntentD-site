import { ArrowRight, Check, Database, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Alert } from '@/components/ui/Alert';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { Badge } from '@/components/ui/Badge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { TextAreaField, TextField } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { getDictionary } from '@/i18n';
import { isSelfServePlan, type PlanCode, type SelfServePlanCode } from '@/lib/api/plans';
import { createCheckoutIntent } from '@/lib/api/subscriptions';
import { planPresentation } from '@/lib/content/pricing';
import { findPlan, usePlans } from '@/lib/hooks/usePlans';
import { useAuth } from '@/lib/hooks/useAuth';
import { useZodForm } from '@/lib/hooks/useZodForm';
import { checkoutSchema } from '@/lib/schemas/checkout';
import {
  formatDelivery,
  formatPrice,
  formatSla,
  formatSupport,
  usersAllowance,
} from '@/lib/utils/format';

interface CheckoutPanelProps {
  /** Plan code taken from ?plan=, already narrowed by the page. */
  planCode: PlanCode | null;
}

export function CheckoutPanel({ planCode }: CheckoutPanelProps) {
  const { user, reload } = useAuth();
  const { plans, isLoading, error } = usePlans();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = getDictionary().checkout;
  const pricingHref = '/pricing';

  const plan = useMemo(() => findPlan(plans, planCode), [plans, planCode]);
  const presentation = useMemo(
    () => (planCode ? planPresentation(planCode) : null),
    [planCode],
  );

  const existingCompany = user?.company_name?.trim() ?? '';
  const schema = useMemo(() => checkoutSchema(), []);

  const form = useZodForm({
    schema,
    initialValues: {
      plan_code: (isSelfServePlan(planCode) ? planCode : 'starter') as SelfServePlanCode,
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
    if (isSelfServePlan(planCode)) {
      setValue('plan_code', planCode);
    }
  }, [planCode, setValue]);

  // --- guards -------------------------------------------------------------

  if (planCode === 'enterprise') {
    return (
      <Alert tone="info" title={t.enterprise.title}>
        <p>{t.enterprise.body}</p>
        <ButtonLink href="/contact?topic=enterprise" className="mt-5">
          {t.enterprise.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </Alert>
    );
  }

  if (!planCode) {
    return (
      <Alert tone="info" title={t.noPlan.title}>
        <p>{t.noPlan.body}</p>
        <ButtonLink href={pricingHref} className="mt-5">
          {t.noPlan.cta}
        </ButtonLink>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <p className="flex items-center gap-3 text-sm text-ink-muted" role="status" aria-live="polite">
        <Spinner className="h-4 w-4" />
        {t.loading}
      </p>
    );
  }

  if (error || !plan || !presentation) {
    return (
      <Alert tone="error" title={t.planError.title}>
        <p>{error ?? t.planError.body}</p>
        <ButtonLink href={pricingHref} variant="secondary" className="mt-5">
          {t.planError.cta}
        </ButtonLink>
      </Alert>
    );
  }

  // --- main view ----------------------------------------------------------

  const allowance = usersAllowance(plan.users_limit);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <div className="surface-card surface-card-accent p-7 lg:p-9">
            <AmbientGlow className="-right-16 -top-16 h-56 w-56" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-400">
                  {t.selectedPlan}
                </p>
                <h2 className="mt-3 font-display text-2xl text-ink">{plan.name}</h2>
              </div>

              <Badge tone="mint">{plan.code}</Badge>
            </div>

            <p className="mt-7 flex items-baseline gap-2">
              <span className="font-display text-4xl tracking-tight text-ink">
                {formatPrice(plan.price_cents, plan.currency)}
              </span>
              <span className="text-sm text-ink-faint">{t.monthlyFee}</span>
            </p>

            <dl className="mt-8 space-y-4 border-t border-hairline pt-8 text-sm">
              {/* The setup fee is what makes the first invoice different from
                  every later one, so it is the first line of the summary. */}
              {plan.setup_price_cents > 0 ? (
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-ink-muted">{t.setupFee}</dt>
                  <dd className="text-right font-mono text-ink">
                    {formatPrice(plan.setup_price_cents, plan.currency)}
                  </dd>
                </div>
              ) : null}

              {/* Omitted, rather than guessed at, when the catalogue predates
                  portal migration 000015 and carries no allowance. */}
              {allowance.kind === 'unknown' ? null : (
                <div className="flex items-start justify-between gap-6">
                  <dt className="text-ink-muted">{t.volume}</dt>
                  <dd className="text-right font-mono text-ink">
                    {allowance.kind === 'unlimited'
                      ? t.unlimited
                      : `${allowance.text} ${t.usersPerMonth}`}
                  </dd>
                </div>
              )}

              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">{t.delivery}</dt>
                <dd className="max-w-[16rem] text-right text-ink">
                  {formatDelivery(plan.delivery_frequency)}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">{t.sla}</dt>
                <dd className="text-right text-ink">{formatSla(plan.sla)}</dd>
              </div>

              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">{t.support}</dt>
                <dd className="max-w-[16rem] text-right text-ink">
                  {formatSupport(plan.support_level)}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6">
                <dt className="text-ink-muted">{t.audience}</dt>
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
              {t.noCharge}{' '}
              <a href={pricingHref} className="underline underline-offset-4">
                {t.changePlan}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="surface-card p-7 lg:p-9">
            <h2 className="font-display text-xl text-ink">{t.formTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {t.formIntroPrefix}{' '}
              <span className="font-mono text-ink">{user?.email}</span>.
            </p>

            <form onSubmit={form.handleSubmit} noValidate className="mt-8 space-y-5">
              <TextField
                label={t.companyLabel}
                name="company_name"
                autoComplete="organization"
                value={form.values.company_name}
                onChange={(event) => form.setValue('company_name', event.target.value)}
                onBlur={() => form.markTouched('company_name')}
                error={form.errorFor('company_name')}
                hint={existingCompany ? t.companyHintExisting : t.companyHintNew}
                required
              />

              <TextAreaField
                label={t.notesLabel}
                name="notes"
                rows={4}
                optional
                placeholder={t.notesPlaceholder}
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
                loadingLabel={t.submitting}
              >
                {t.submit}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>

            <ul className="mt-8 space-y-3 border-t border-hairline pt-7 text-xs leading-relaxed text-ink-faint">
              {t.guarantees.map((line, index) => (
                <li key={line} className="flex gap-2.5">
                  {index === 0 ? (
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-500/70" aria-hidden="true" />
                  ) : (
                    <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-500/70" aria-hidden="true" />
                  )}
                  {line}
                </li>
              ))}
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
        title={t.modal.title}
        description={t.modal.description}
        footer={
          <>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                window.location.assign('/');
              }}
            >
              {t.modal.home}
            </Button>
            <ButtonLink href="/docs/api" variant="secondary">
              {t.modal.docs}
            </ButtonLink>
          </>
        }
      >
        <div className="rounded-card border border-hairline bg-void/60 p-4 text-sm text-ink-muted">
          <p>
            {t.modal.planLabel}: <span className="font-mono text-ink">{plan.name}</span>
          </p>
          <p className="mt-1.5">
            {t.modal.contactLabel}: <span className="font-mono text-ink">{user?.email}</span>
          </p>
        </div>
      </Modal>
    </>
  );
}
