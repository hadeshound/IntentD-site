import type { ReactNode } from 'react';

import { AmbientGlow } from '@/components/ui/AmbientGlow';

interface AuthShellProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** Optional supporting panel shown beside the form on wide screens. */
  aside?: ReactNode;
  /** Rendered under the form, e.g. a link to the opposite auth page. */
  footer?: ReactNode;
}

/**
 * Layout for every /auth screen. The form sits left and never centres; the
 * supporting panel on the right is offset downwards so the two columns do not
 * share a baseline.
 */
export function AuthShell({ eyebrow, title, description, children, aside, footer }: AuthShellProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="hairline-grid-overlay" />
      <AmbientGlow className="-left-28 top-0 h-96 w-96" drift />
      <AmbientGlow tone="violet" className="right-0 bottom-0 h-80 w-80" />

      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3">
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-px w-12 bg-hairline-strong" />
          </p>

          <h1 className="mt-7 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>

          {description ? (
            <div className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted text-pretty">
              {description}
            </div>
          ) : null}

          <div className="mt-10">{children}</div>

          {footer ? (
            <div className="mt-8 border-t border-hairline pt-6 text-sm text-ink-muted">
              {footer}
            </div>
          ) : null}
        </div>

        {aside ? (
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-20">{aside}</div>
        ) : null}
      </div>
    </section>
  );
}
