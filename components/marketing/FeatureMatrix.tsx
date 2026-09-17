import { Check, Minus } from 'lucide-react';

import type { PlanCode } from '@/lib/api/plans';
import { FEATURE_MATRIX, PLAN_ORDER, PLAN_PRESENTATION } from '@/lib/content/pricing';

const COLUMN_TITLES: Record<PlanCode, string> = {
  starter: 'Starter',
  growth: 'Growth',
  enterprise: 'Enterprise',
};

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-mint-400" aria-hidden="true" />
        <span className="sr-only">Включено</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-ink-faint" aria-hidden="true" />
        <span className="sr-only">Не включено</span>
      </>
    );
  }

  return <span className="text-sm text-ink-muted">{value}</span>;
}

/**
 * Full comparison table for /pricing. It is a real <table> with scope-d
 * headers so a screen reader announces "Growth · Частота выгрузки · раз в час"
 * instead of reading a wall of disconnected cells.
 */
export function FeatureMatrix() {
  return (
    <section className="py-24 lg:py-28">
      <div className="shell">
        <p className="flex items-center gap-3">
          <span className="eyebrow">Сравнение</span>
          <span className="h-px w-12 bg-hairline-strong" />
        </p>

        <h2 className="mt-6 max-w-2xl text-section-title">Что входит в каждый тариф</h2>

        <div className="mt-12 overflow-x-auto rounded-card border border-hairline">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">
              Сравнение возможностей тарифов Starter, Growth и Enterprise
            </caption>

            <thead>
              <tr className="border-b border-hairline bg-white/[0.02]">
                <th scope="col" className="px-6 py-5 text-sm font-medium text-ink-faint">
                  Возможность
                </th>

                {PLAN_ORDER.map((code) => (
                  <th
                    key={code}
                    scope="col"
                    className="px-6 py-5 text-center font-display text-base text-ink"
                  >
                    {COLUMN_TITLES[code]}
                    <span className="mt-1 block font-sans text-xs font-normal text-ink-faint">
                      {PLAN_PRESENTATION[code].audience.split(' ').slice(0, 3).join(' ')}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {FEATURE_MATRIX.map((group) => (
              <tbody key={group.title}>
                <tr className="border-b border-hairline bg-white/[0.015]">
                  <th
                    scope="colgroup"
                    colSpan={PLAN_ORDER.length + 1}
                    className="px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-400"
                  >
                    {group.title}
                  </th>
                </tr>

                {group.rows.map((row) => (
                  <tr key={row.label} className="border-b border-hairline last:border-b-0">
                    <th scope="row" className="px-6 py-4 text-sm font-normal text-ink">
                      {row.label}
                    </th>

                    {PLAN_ORDER.map((code) => (
                      <td key={code} className="px-6 py-4 text-center">
                        <Cell value={row.values[code]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
