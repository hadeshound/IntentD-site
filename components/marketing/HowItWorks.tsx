import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils/cn';

interface Track {
  id: string;
  label: string;
  audience: string;
  accent: 'mint' | 'violet';
  steps: Array<{ title: string; body: string }>;
}

const TRACKS: Track[] = [
  {
    id: 'publishers-track',
    label: 'Publishers',
    audience: 'Для разработчиков расширений',
    accent: 'mint',
    steps: [
      {
        title: 'Интеграция за 5 минут',
        body: 'Вставьте лёгкий SDK (< 15 КБ) в background script расширения.',
      },
      {
        title: 'Фоновый сбор сигналов',
        body: 'SDK агрегирует паттерны посещений и поисковые интенты, исключая PII.',
      },
      {
        title: 'Пассивный доход',
        body: 'Получайте регулярные выплаты за объём сгенерированных данных.',
      },
    ],
  },
  {
    id: 'buyers-track',
    label: 'Data Buyers',
    audience: 'Для покупателей данных',
    accent: 'violet',
    steps: [
      {
        title: 'Свежие сигналы',
        body: 'Доступ к паттернам коммерческого поведения в реальном времени.',
      },
      {
        title: 'Чистота данных',
        body: 'Автофильтрация банков, паролей, email и идентификаторов на edge-уровне.',
      },
      {
        title: 'Удобный формат',
        body: 'Parquet + LZ4 в AWS S3 или синхронизация в ваш bucket.',
      },
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <SectionHeading
        className="shell"
        align="right"
        eyebrow="Как это работает"
        title="Одна интеграция, две стороны рынка"
        description="Разработчики подключают SDK и зарабатывают. Аналитические команды получают готовый поток. Между ними — наша инфраструктура очистки."
      />

      <div className="shell mt-16 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline lg:mt-20 lg:grid-cols-2">
        {TRACKS.map((track, trackIndex) => (
          <div
            key={track.id}
            className={cn(
              'relative bg-void/80 p-8 lg:p-10',
              // Each half carries its own glow so the two audiences read as
              // distinct without splitting the section into two components.
              track.accent === 'mint' ? 'lg:pr-12' : 'lg:pl-12',
            )}
          >
            <div
              className={cn(
                'ambient-glow h-56 w-56',
                track.accent === 'mint' ? '-left-16 top-0 bg-mint-500/18' : '-right-16 top-0 bg-violet-500/18',
              )}
            />

            <p
              className={cn(
                'font-mono text-eyebrow uppercase',
                track.accent === 'mint' ? 'text-mint-400' : 'text-violet-400',
              )}
            >
              {track.label}
            </p>

            <h3 className="mt-4 font-display text-2xl text-ink sm:text-3xl">{track.audience}</h3>

            <ol className="mt-9 space-y-8">
              {track.steps.map((step, index) => (
                <Reveal key={step.title} as="li" delay={trackIndex * 80 + index * 90}>
                  <div className="flex gap-5">
                    <span
                      className={cn(
                        'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-sm',
                        track.accent === 'mint'
                          ? 'border-mint-500/40 bg-mint-500/[0.08] text-mint-300'
                          : 'border-violet-500/40 bg-violet-500/[0.08] text-violet-400',
                      )}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h4 className="text-lg text-ink">{step.title}</h4>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
