import type { Metadata } from 'next';
import { Clock, Mail, ShieldCheck } from 'lucide-react';

import { ContactForm } from '@/components/marketing/ContactForm';
import { FaqSection } from '@/components/marketing/FaqSection';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { CONTACT_FAQ } from '@/lib/content/faq';
import { PRIVACY_EMAIL, SALES_EMAIL, SUPPORT_EMAIL } from '@/lib/content/navigation';
import type { ContactValues } from '@/lib/schemas/contact';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с командой IntentD: доступ к потоку данных, подключение расширения, техническая поддержка и вопросы по обработке данных.',
};

const VALID_TOPICS = ['buy_data', 'monetize_extension', 'support', 'enterprise'] as const;

function parseTopic(raw: string | string[] | undefined): ContactValues['topic'] | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return VALID_TOPICS.find((topic) => topic === value);
}

const DIRECT_CHANNELS = [
  { icon: Mail, label: 'Продажи и доступ к данным', email: SALES_EMAIL },
  { icon: ShieldCheck, label: 'Приватность и DPA', email: PRIVACY_EMAIL },
  { icon: Mail, label: 'Техническая поддержка', email: SUPPORT_EMAIL },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // The Enterprise pricing CTA arrives here with ?topic=enterprise preselected.
  const defaultTopic = parseTopic(searchParams.topic);

  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-16 lg:pb-28 lg:pt-24">
        <div className="hairline-grid-overlay" />
        <AmbientGlow className="-left-24 top-4 h-96 w-96" drift />
        <AmbientGlow tone="violet" className="right-0 top-48 h-72 w-72" />

        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3">
              <span className="eyebrow">Контакты</span>
              <span className="h-px w-12 bg-hairline-strong" />
            </p>

            <h1 className="mt-7 text-section-title">Напишите нам</h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-muted text-pretty">
              Опишите задачу максимально конкретно: какой сегмент данных нужен, какой
              объём, в какие сроки. Так первый же ответ будет по делу.
            </p>

            <div className="surface-card mt-10 p-6">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-hairline bg-white/[0.03] text-mint-400">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>

                <div>
                  <h2 className="text-base text-ink">Время ответа</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    Заявки на доступ к данным — в течение рабочего дня. Технические
                    обращения от подключённых издателей — по приоритету тарифа.
                  </p>
                </div>
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {DIRECT_CHANNELS.map((channel) => {
                const Icon = channel.icon;

                return (
                  <li key={channel.email} className="flex items-center gap-3 text-sm">
                    <Icon className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                    <span className="text-ink-muted">{channel.label}</span>
                    <a
                      href={`mailto:${channel.email}`}
                      className="ml-auto font-mono text-xs text-mint-400 transition-colors duration-200 hover:text-mint-300"
                    >
                      {channel.email}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:mt-10">
            <div className="surface-card p-7 lg:p-9">
              <h2 className="font-display text-xl text-ink">Форма обращения</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Все поля, кроме компании, обязательны.
              </p>

              <div className="mt-8">
                <ContactForm defaultTopic={defaultTopic} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        items={CONTACT_FAQ}
        eyebrow="Перед обращением"
        title="Что стоит знать заранее"
        id="contact-faq"
      />
    </>
  );
}
