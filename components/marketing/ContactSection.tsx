import { Mail, MessageSquare, Users } from 'lucide-react';

import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { SALES_EMAIL, SUPPORT_EMAIL } from '@/lib/content/navigation';
import { ContactForm } from './ContactForm';

const CHANNELS = [
  {
    icon: Users,
    title: 'Отдел продаж',
    body: 'Доступ к потоку, тестовые выгрузки, условия Enterprise.',
    email: SALES_EMAIL,
  },
  {
    icon: MessageSquare,
    title: 'Техническая поддержка',
    body: 'Интеграция SDK, ключи, вопросы по формату Parquet.',
    email: SUPPORT_EMAIL,
  },
];

/**
 * Landing contact block. The form takes the wider column and the channel list
 * sits beside it, so the section keeps the asymmetric rhythm of the page.
 */
export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <AmbientGlow tone="violet" className="-left-24 top-20 h-80 w-80" />

      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3">
            <span className="eyebrow">Контакты</span>
            <span className="h-px w-12 bg-hairline-strong" />
          </p>

          <h2 className="mt-6 text-section-title">Обсудим ваш сценарий</h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted text-pretty">
            Расскажите, что вам нужно: подключить расширение, получить сэмпл выгрузки
            или обсудить объёмы Enterprise. Мы ответим по существу.
          </p>

          <ul className="mt-10 space-y-4">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;

              return (
                <li key={channel.email} className="surface-card p-5">
                  <div className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-hairline bg-white/[0.03] text-mint-400">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>

                    <div>
                      <h3 className="text-base text-ink">{channel.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{channel.body}</p>
                      <a
                        href={`mailto:${channel.email}`}
                        className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs text-mint-400 transition-colors duration-200 hover:text-mint-300"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        {channel.email}
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="surface-card p-7 lg:p-9">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
