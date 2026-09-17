'use client';

import { ArrowRight, Check } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import type { Plan } from '@/lib/api/plans';
import { PLAN_PRESENTATION } from '@/lib/content/pricing';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils/cn';
import { formatEventsLimit, formatPrice } from '@/lib/utils/format';
import { dashboardRegisterFor } from '@/lib/config/urls';

interface PlanCardProps {
  plan: Plan;
  /** Index in the grid; drives the vertical offset on wide screens. */
  index: number;
}

export function PlanCard({ plan, index }: PlanCardProps) {
  const { isAuthenticated } = useAuth();
  const presentation = PLAN_PRESENTATION[plan.code];

  // Enterprise is quoted per deal, so its CTA goes to sales rather than to
  // checkout. Everything else routes through the dashboard: a signed-in user
  // straight to checkout, an anonymous one to registration with the plan
  // carried along.
  const href = plan.is_custom_priced
    ? presentation.cta.href
    : isAuthenticated
      ? `/checkout?plan=${plan.code}`
      : dashboardRegisterFor(plan.code);

  const isHighlighted = Boolean(presentation.highlighted);

  return (
    <article
      className={cn(
        'surface-card surface-card-interactive flex flex-col p-7 lg:p-8',
        isHighlighted && 'surface-card-accent lg:-mt-6 lg:mb-6',
        !isHighlighted && index === 2 && 'lg:mt-8',
      )}
    >
      {isHighlighted ? (
        <div className="ambient-glow -right-14 -top-16 h-56 w-56 bg-mint-500/25" />
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-ink">{plan.name}</h3>
          <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-ink-faint">
            {presentation.audience}
          </p>
        </div>

        {isHighlighted && presentation.highlightLabel ? (
          <Badge tone="mint">{presentation.highlightLabel}</Badge>
        ) : null}
      </div>

      <p className="mt-8 flex items-baseline gap-2">
        <span className="font-display text-4xl tracking-tight text-ink lg:text-[2.75rem]">
          {formatPrice(plan.price_cents, plan.currency)}
        </span>
        {plan.is_custom_priced ? null : (
          <span className="text-sm text-ink-faint">/ мес</span>
        )}
      </p>

      <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
        {plan.is_custom_priced
          ? 'Объём согласуется индивидуально'
          : `${formatEventsLimit(plan.events_limit)} событий в месяц`}
      </p>

      <ul className="mt-8 space-y-3.5 border-t border-hairline pt-8">
        {presentation.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-muted">
            <Check
              className={cn('mt-1 h-4 w-4 shrink-0', isHighlighted ? 'text-mint-400' : 'text-mint-500/70')}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        <ButtonLink
          href={href}
          variant={isHighlighted ? 'primary' : 'secondary'}
          size="lg"
          className="w-full"
        >
          {presentation.cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
