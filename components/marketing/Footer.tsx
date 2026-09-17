import Link from 'next/link';

import { Logo } from '@/components/ui/Logo';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { FOOTER_COLUMNS, SUPPORT_EMAIL } from '@/lib/content/navigation';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-30 border-t border-hairline">
      <div className="shell grid gap-14 py-16 lg:grid-cols-[1.4fr_2fr] lg:py-20">
        <div className="space-y-6">
          <Logo />

          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            Инфраструктура intent-данных: SDK для разработчиков расширений и
            чистый PII-free поток для аналитических команд.
          </p>

          <StatusIndicator />
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
                {column.title}
              </h2>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    {/* The dashboard lives on another origin, so those entries
                        are plain anchors: next/link would try a client-side
                        navigation that cannot succeed. */}
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors duration-200 hover:text-mint-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors duration-200 hover:text-mint-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} IntentD. Все права защищены.</p>

          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="transition-colors duration-200 hover:text-mint-300"
            >
              {SUPPORT_EMAIL}
            </a>
            <span className="font-mono uppercase tracking-[0.14em]">PII-free · GDPR-safe</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
