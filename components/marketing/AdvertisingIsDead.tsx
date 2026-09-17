import { Ban, ShieldCheck, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils/cn';

interface ProblemCard {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Vertical offset that breaks the row alignment on large screens. */
  offset: string;
  isSolution?: boolean;
}

const CARDS: ProblemCard[] = [
  {
    icon: TrendingDown,
    title: 'Рекламный баннер отпугивает',
    body: 'Внедрение рекламы в интерфейс расширения снижает retention и вызывает поток однозвёздочных отзывов.',
    offset: 'lg:mt-0',
  },
  {
    icon: Ban,
    title: 'Модерация блокирует',
    body: 'Chrome и Firefox жёстко пессимизируют или удаляют расширения с рекламными скриптами и инжектором ссылок.',
    offset: 'lg:mt-16',
  },
  {
    icon: ShieldCheck,
    title: 'Решение от IntentD',
    body: 'Мы собираем обезличенные агрегированные сигналы в фоновом режиме. Интерфейс вашего расширения остаётся на 100% чистым.',
    offset: 'lg:mt-32',
    isSolution: true,
  },
];

export function AdvertisingIsDead() {
  return (
    <section id="publishers" className="relative py-24 lg:py-32">
      <SectionHeading
        className="shell"
        eyebrow="Для разработчиков расширений"
        title={
          <>
            Перестаньте рисковать вашими пользователями{' '}
            <span className="text-ink-faint">ради баннеров</span>
          </>
        }
      />

      <div className="shell mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-7">
        {CARDS.map((card, index) => {
          const Icon = card.icon;

          return (
            <Reveal key={card.title} delay={index * 110} className={card.offset}>
              <article
                className={cn(
                  'surface-card surface-card-interactive h-full p-7',
                  card.isSolution && 'surface-card-accent',
                )}
              >
                {card.isSolution ? (
                  <div className="ambient-glow -right-10 -top-10 h-40 w-40 bg-mint-500/25" />
                ) : null}

                <span
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-control border',
                    card.isSolution
                      ? 'border-mint-500/40 bg-mint-500/10 text-mint-400'
                      : 'border-hairline bg-white/[0.03] text-ink-muted',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-card-title">{card.title}</h3>

                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {card.body}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
