import type { ReactNode } from 'react';

import { AmbientGlow } from '@/components/ui/AmbientGlow';

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface LegalDocumentProps {
  title: string;
  /** Human-readable date of the last substantive change. */
  updatedAt: string;
  intro: ReactNode;
  sections: LegalSection[];
  /** Shown above the body when the document still needs counsel review. */
  notice?: ReactNode;
}

/**
 * Shared shell for /terms and /privacy: numbered sections, a sticky contents
 * list and a readable measure. Legal text still follows the site typography
 * rather than dropping into an unstyled document.
 */
export function LegalDocument({ title, updatedAt, intro, sections, notice }: LegalDocumentProps) {
  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-16 lg:pt-24">
        <div className="hairline-grid-overlay" />
        <AmbientGlow className="-left-28 top-0 h-80 w-80" />

        <div className="shell max-w-4xl">
          <p className="flex items-center gap-3">
            <span className="eyebrow">Legal</span>
            <span className="h-px w-12 bg-hairline-strong" />
          </p>

          <h1 className="mt-7 text-section-title">{title}</h1>

          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
            Последнее обновление: {updatedAt}
          </p>

          <div className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">
            {intro}
          </div>

          {notice ? (
            <div className="mt-8 rounded-card border border-violet-500/30 bg-violet-500/[0.06] p-5 text-sm leading-relaxed text-ink-muted">
              {notice}
            </div>
          ) : null}
        </div>
      </section>

      <div className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <nav aria-label="Разделы документа" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
              Разделы
            </p>

            <ol className="mt-5 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-3 rounded-control px-2.5 py-2 text-sm text-ink-muted transition-colors duration-200 hover:bg-white/5 hover:text-ink"
                  >
                    <span className="font-mono text-xs text-ink-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="space-y-14 lg:col-span-8 lg:col-start-5">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-mint-400">
                {String(index + 1).padStart(2, '0')}
              </p>

              <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">{section.title}</h2>

              <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-ink-muted [&_a]:text-mint-400 [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink [&_ul]:space-y-2">
                {section.body}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
