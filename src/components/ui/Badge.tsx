import type { ReactNode } from 'react';

import { badgeStyles, type BadgeTone } from './styles';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

/** Small monospaced label used for plan highlights and inline tags. */
export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return <span className={badgeStyles(tone, className)}>{children}</span>;
}
