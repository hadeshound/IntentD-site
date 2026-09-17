import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { ReactNode } from 'react';

import { alertStyles, type AlertTone } from './styles';

const ICONS: Record<AlertTone, typeof Info> = {
  error: AlertTriangle,
  success: CheckCircle2,
  info: Info,
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
  const Icon = ICONS[tone];

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={alertStyles(tone, className)}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="space-y-1">
        {title ? <p className="font-medium">{title}</p> : null}
        <div className="[&_a]:underline [&_a]:underline-offset-2">{children}</div>
      </div>
    </div>
  );
}
