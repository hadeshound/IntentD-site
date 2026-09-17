import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Sections alternate sides; nothing on this site is centred. */
  align?: 'left' | 'right';
  className?: string;
  /** Slot for a CTA or a stat that sits beside the heading. */
  aside?: ReactNode;
  id?: string;
}

/**
 * Section header used by every landing block. The eyebrow is a monospaced
 * label with a rule running out of it, which is what ties the sections
 * together without a centred title stack.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  aside,
  id,
}: SectionHeadingProps) {
  const isRight = align === 'right';

  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
        isRight && 'lg:flex-row-reverse',
        className,
      )}
    >
      <div className={cn('max-w-3xl', isRight && 'lg:text-right')}>
        <p className={cn('flex items-center gap-3', isRight && 'lg:justify-end')}>
          {isRight ? <span className="hidden h-px w-16 bg-hairline-strong lg:block" /> : null}
          <span className="eyebrow">{eyebrow}</span>
          {!isRight ? <span className="h-px w-16 bg-hairline-strong" /> : null}
        </p>

        <h2 id={id} className="mt-6 text-section-title text-balance">
          {title}
        </h2>

        {description ? (
          <div className={cn('mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty', isRight && 'lg:ml-auto')}>
            {description}
          </div>
        ) : null}
      </div>

      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
