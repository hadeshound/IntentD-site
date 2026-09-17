import type { Metadata } from 'next';

import { FaqSection } from '@/components/marketing/FaqSection';
import { FeatureMatrix } from '@/components/marketing/FeatureMatrix';
import { PricingGrid } from '@/components/marketing/PricingGrid';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { ButtonLink } from '@/components/ui/Button';
import { fetchPlansSafe } from '@/lib/api/plans';

export const metadata: Metadata = {
  title: 'Тарифы',
  description:
    'Прозрачные тарифы на доступ к потоку intent-данных IntentD: Starter, Growth и Enterprise Data Pipeline. Сравнение объёмов, частоты выгрузки и состава полей.',
};

export const revalidate = 300;

const PRICING_FAQ = [
  {
    question: 'Как считаются события?',
    answer:
      'Одно событие — это один очищенный сигнал после фильтрации PII. Отброшенные и отфильтрованные записи в лимит не входят.',
  },
  {
    question: 'Что происходит при превышении лимита?',
    answer:
      'Поток не обрывается. Мы фиксируем перерасход и обсуждаем переход на следующий тариф — задним числом ничего не списывается.',
  },
  {
    question: 'Можно ли сменить тариф в середине месяца?',
    answer:
      'Да. Смена вступает в силу со следующего цикла выгрузки, а доступ к текущему объёму сохраняется до конца оплаченного периода.',
  },
  {
    question: 'Как оформляется договор?',
    answer:
      'После заявки менеджер присылает условия и DPA. Enterprise-контракты согласуются индивидуально, включая SLA и правила фильтрации.',
  },
];

export default async function PricingPage() {
  const { plans, isFallback } = await fetchPlansSafe();

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-16 lg:pb-16 lg:pt-24">
        <div className="hairline-grid-overlay" />
        <AmbientGlow className="-left-20 top-0 h-96 w-96" drift />

        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3">
              <span className="eyebrow">Pricing</span>
              <span className="h-px w-12 bg-hairline-strong" />
            </p>

            <h1 className="mt-7 text-hero">
              Прозрачные тарифы для доступа к <span className="text-mint-400">потоку данных</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted text-pretty">
              Выберите объём сигналов, необходимый для ваших аналитических систем.
              Платите за поток, а не за место в интерфейсе.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:mt-16">
            <div className="surface-card p-7">
              <h2 className="font-display text-lg text-ink">Нужен нестандартный объём?</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Raw Firehose, собственные правила фильтрации и прямой доступ к bucket
                обсуждаются отдельно — вместе с SLA и юридическим контуром.
              </p>
              <ButtonLink href="/contact?topic=enterprise" variant="secondary" className="mt-6 w-full">
                Обсудить Enterprise
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <PricingGrid plans={plans} isFallback={isFallback} showHeading={false} />

      <FeatureMatrix />

      <FaqSection items={PRICING_FAQ} eyebrow="Оплата и лимиты" title="Вопросы по тарифам" id="pricing-faq" />
    </>
  );
}
