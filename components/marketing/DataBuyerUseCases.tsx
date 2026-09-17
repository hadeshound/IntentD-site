import { BarChart3, ShoppingCart, Radar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ButtonLink } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface UseCase {
  icon: LucideIcon;
  segment: string;
  title: string;
  body: string;
  signals: string[];
}

const USE_CASES: UseCase[] = [
  {
    icon: ShoppingCart,
    segment: 'E-commerce & Retail',
    title: 'Видеть спрос раньше конкурента',
    body: 'Отслеживайте, какие товары и категории пользователи ищут прямо сейчас — до того, как они купят у конкурентов.',
    signals: ['search_query', 'domain', 'clean_url'],
  },
  {
    icon: Radar,
    segment: 'AdTech & Programmatic',
    title: 'Сегменты без 3rd-party cookies',
    body: 'Обогащайте аудиторные сегменты точными коммерческими интентами без зависимости от сторонних cookies.',
    signals: ['anon_uid', 'geo_country', 'device_type'],
  },
  {
    icon: BarChart3,
    segment: 'Market Research & Analytics',
    title: 'Сдвиги интереса на больших выборках',
    body: 'Анализируйте тренды посещаемости и смещение интересов на выборках из миллионов сессий.',
    signals: ['timestamp', 'lang', 'domain'],
  },
];

export function DataBuyerUseCases() {
  return (
    <section id="data-buyers" className="relative overflow-hidden py-24 lg:py-32">
      <SectionHeading
        className="shell"
        eyebrow="Для покупателей данных"
        title="Сигналы намерений высочайшего качества для вашего бизнеса"
        aside={
          <ButtonLink href="/docs/api" variant="secondary">
            Посмотреть схему данных
          </ButtonLink>
        }
      />

      {/* The track bleeds past the right edge of the shell so the row visibly
          continues off-screen instead of resolving into a neat three-up grid. */}
      <div
        className="scrollbar-none mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:mt-20"
        style={{ paddingInline: 'var(--shell-padding)' }}
        role="region"
        aria-label="Сценарии использования данных, горизонтальная прокрутка"
        tabIndex={0}
      >
        {USE_CASES.map((useCase, index) => {
          const Icon = useCase.icon;

          return (
            <article
              key={useCase.segment}
              className="surface-card surface-card-interactive w-[19rem] shrink-0 snap-start p-7 sm:w-[23rem] lg:w-[26rem] lg:p-9"
              style={{ marginTop: `${index * 1.75}rem` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-control border border-hairline bg-white/[0.03] text-mint-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <span className="font-mono text-xs text-ink-faint">
                  {String(index + 1).padStart(2, '0')} / {String(USE_CASES.length).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
                {useCase.segment}
              </p>

              <h3 className="mt-3 text-card-title">{useCase.title}</h3>

              <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ink-muted">{useCase.body}</p>

              <ul className="mt-7 flex flex-wrap gap-2 border-t border-hairline pt-6">
                {useCase.signals.map((signal) => (
                  <li
                    key={signal}
                    className="rounded-pill border border-hairline px-2.5 py-1 font-mono text-[0.6875rem] text-ink-muted"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
