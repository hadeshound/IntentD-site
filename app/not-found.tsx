import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { ButtonLink } from '@/components/ui/Button';

const SUGGESTIONS = [
  { href: '/pricing', label: 'Тарифы' },
  { href: '/docs/api', label: 'API и формат данных' },
  { href: '/contact', label: 'Контакты' },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-38">
      <div className="hairline-grid-overlay" />
      <AmbientGlow className="-left-24 top-0 h-80 w-80" drift />

      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-eyebrow uppercase tracking-[0.22em] text-mint-400">
            404 · Not Found
          </p>

          <h1 className="mt-7 text-hero">Такой страницы нет</h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-muted text-pretty">
            Ссылка устарела или в адресе опечатка. Ниже — разделы, куда чаще всего ведут
            сломанные ссылки.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              На главную
            </ButtonLink>

            {SUGGESTIONS.map((item) => (
              <ButtonLink key={item.href} href={item.href} variant="secondary" size="lg">
                {item.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
