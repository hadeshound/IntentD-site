import { Database, Gauge, Lock, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils/cn';

interface Advantage {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Column span plus the offset that keeps the grid from squaring up. */
  layout: string;
  footnote?: string;
  accent?: boolean;
}

const ADVANTAGES: Advantage[] = [
  {
    icon: Lock,
    title: 'Zero-PII & Privacy First',
    body: 'HMAC-хеширование и встроенные фильтры. Пароли, токены, личные данные и банковские домены никогда не покидают браузер.',
    layout: 'lg:col-span-7',
    footnote: 'Фильтрация выполняется на устройстве, до отправки пакета.',
    accent: true,
  },
  {
    icon: Gauge,
    title: 'Лёгкий и быстрый SDK',
    body: 'Не замедляет браузер, не ест память, работает в строгом соответствии с Manifest V3.',
    layout: 'lg:col-span-5 lg:mt-12',
  },
  {
    icon: ShieldCheck,
    title: 'Chrome Web Store Safe',
    body: 'SDK не использует eval и не грузит динамический код извне. Полностью проходит автопроверки Google и Mozilla.',
    layout: 'lg:col-span-5 lg:-mt-4',
  },
  {
    icon: Database,
    title: 'Parquet институционального качества',
    body: 'Сжатый структурированный формат, готовый для ClickHouse, Snowflake и Databricks.',
    layout: 'lg:col-span-7 lg:mt-8',
    footnote: 'Партиционирование по дате и арендатору из коробки.',
  },
];

export function WhyIntentD() {
  return (
    <section className="relative py-24 lg:py-32">
      <SectionHeading
        className="shell"
        eyebrow="Почему IntentD"
        title="Инфраструктура, а не ещё один рекламный скрипт"
        description="Четыре инженерных решения, из-за которых расширение не теряет пользователей, а покупатель данных не тратит недели на очистку."
      />

      <div className="shell mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-7">
        {ADVANTAGES.map((advantage, index) => {
          const Icon = advantage.icon;

          return (
            <Reveal key={advantage.title} delay={index * 100} className={advantage.layout}>
              <article
                className={cn(
                  'surface-card surface-card-interactive flex h-full flex-col p-7 lg:p-9',
                  advantage.accent && 'surface-card-accent',
                )}
              >
                {advantage.accent ? (
                  <div className="ambient-glow -left-12 -top-12 h-48 w-48 bg-mint-500/20" />
                ) : null}

                <span
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-control border',
                    advantage.accent
                      ? 'border-mint-500/40 bg-mint-500/10 text-mint-400'
                      : 'border-hairline bg-white/[0.03] text-ink-muted',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-card-title">{advantage.title}</h3>

                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {advantage.body}
                </p>

                {advantage.footnote ? (
                  <p className="mt-auto pt-7 font-mono text-xs leading-relaxed text-ink-faint">
                    {advantage.footnote}
                  </p>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
