import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type BadgeTone = 'neutral' | 'mint' | 'violet';

const TONES: Record<BadgeTone, string> = {
  neutral: 'border-hairline bg-white/[0.04] text-ink-muted',
  mint: 'border-mint-500/30 bg-mint-500/10 text-mint-300',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

/** Small monospaced label used for plan highlights and inline tags. */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em]',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
