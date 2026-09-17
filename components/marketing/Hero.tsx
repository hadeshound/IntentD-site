import { ArrowRight, Check, Zap } from 'lucide-react';

import { ButtonLink } from '@/components/ui/Button';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { DASHBOARD_LINKS } from '@/lib/config/urls';
import { DataFlowDiagram } from './DataFlowDiagram';

const TRUST_POINTS = [
  { icon: Zap, label: '5 минут на интеграцию' },
  { icon: Check, label: 'Manifest V3' },
  { icon: Check, label: 'Chrome Web Store Safe' },
];

/**
 * Asymmetric hero: copy holds seven of twelve columns on the left, the flow
 * diagram takes five on the right and is pushed down so it breaks the top
 * alignment instead of sitting in a tidy 50/50 split.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 lg:pb-38 lg:pt-24">
      <div className="hairline-grid-overlay" />
      <AmbientGlow className="-left-32 top-0 h-[28rem] w-[28rem]" drift />
      <AmbientGlow tone="violet" className="right-0 top-40 h-[22rem] w-[22rem]" />

      <div className="shell grid items-start gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3">
            <span className="eyebrow">Infrastructure for intent data</span>
            <span className="h-px w-12 bg-hairline-strong" />
          </p>

          <h1 className="mt-7 text-hero">
            Монетизируйте браузерные расширения{' '}
            <span className="text-mint-400">без рекламы</span> и потери пользователей
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
            IntentD превращает анонимный пользовательский кликстрим в стабильный доход.
            Безопасный SDK, полная приватность (PII-free) и готовый рынок сбыта данных —
            в одной интеграции.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`${DASHBOARD_LINKS.register}?role=publisher`} size="lg">
              Подключить расширение
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>

            <ButtonLink href="#data-buyers" variant="secondary" size="lg">
              Купить данные
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-ink-muted">
                <Icon className="h-4 w-4 text-mint-400" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Pulled down and slightly out of the grid so the two halves never
            line up on a single baseline. */}
        <div className="lg:col-span-5 lg:mt-14 lg:-mr-4 xl:-mr-10">
          <DataFlowDiagram />
        </div>
      </div>
    </section>
  );
}
