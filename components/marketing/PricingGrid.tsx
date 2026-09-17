import Link from 'next/link';

import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Plan } from '@/lib/api/plans';
import { PLAN_ORDER } from '@/lib/content/pricing';
import { PlanCard } from './PlanCard';

interface PricingGridProps {
  plans: Plan[];
  /** Set when the catalogue endpoint was unreachable and seeds were used. */
  isFallback?: boolean;
  /** The /pricing page renders its own heading, so it can suppress this one. */
  showHeading?: boolean;
}

export function PricingGrid({ plans, isFallback = false, showHeading = true }: PricingGridProps) {
  const ordered = [...plans].sort(
    (a, b) => PLAN_ORDER.indexOf(a.code) - PLAN_ORDER.indexOf(b.code),
  );

  return (
    <section id="pricing" className="relative py-24 lg:py-32">
      <AmbientGlow className="left-1/3 top-24 h-[26rem] w-[26rem]" drift />
      <AmbientGlow tone="violet" className="right-0 bottom-10 h-[20rem] w-[20rem]" />

      {showHeading ? (
        <SectionHeading
          className="shell"
          eyebrow="Тарифы"
          title="Прозрачные тарифы для доступа к потоку данных"
          description="Выберите объём сигналов, необходимый для ваших аналитических систем."
          aside={
            <Link
              href="/pricing"
              className="link-underline text-sm underline underline-offset-4 decoration-hairline-strong"
            >
              Сравнить все возможности
            </Link>
          }
        />
      ) : null}

      <div className="shell mt-16 grid items-start gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-7">
        {ordered.map((plan, index) => (
          <PlanCard key={plan.code} plan={plan} index={index} />
        ))}
      </div>

      {isFallback ? (
        <p className="shell mt-8 font-mono text-xs text-ink-faint">
          Каталог временно отдаётся из локальной копии — актуальные условия подтвердит менеджер.
        </p>
      ) : null}
    </section>
  );
}
