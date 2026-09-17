import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type AlertTone = 'error' | 'success' | 'info';

const TONES: Record<AlertTone, { wrapper: string; icon: typeof Info }> = {
  error: { wrapper: 'border-red-500/30 bg-red-500/[0.07] text-red-200', icon: AlertTriangle },
  success: { wrapper: 'border-mint-500/30 bg-mint-500/[0.07] text-mint-300', icon: CheckCircle2 },
  info: { wrapper: 'border-hairline bg-white/[0.04] text-ink-muted', icon: Info },
};

interface AlertProps {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Form-level feedback. Errors are announced assertively because they usually
 * follow a failed submit the user is waiting on; the rest stay polite.
 */
export function Alert({ tone = 'info', title, children, className }: AlertProps) {
  const { wrapper, icon: Icon } = TONES[tone];

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={cn('flex gap-3 rounded-card border p-3.5 text-sm leading-relaxed', wrapper, className)}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <div className="[&_a]:underline [&_a]:underline-offset-2">{children}</div>
      </div>
    </div>
  );
}
