'use client';

import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/lib/api/client';
import { cn } from '@/lib/utils/cn';

type SystemStatus = 'checking' | 'operational' | 'degraded';

const LABELS: Record<SystemStatus, string> = {
  checking: 'Проверяем статус',
  operational: 'All Systems Operational',
  degraded: 'Повышенное время отклика',
};

/**
 * Footer status light. It polls the real health endpoint rather than printing
 * a hardcoded "operational", so the badge cannot claim more than we know.
 */
export function StatusIndicator({ className }: { className?: string }) {
  const [status, setStatus] = useState<SystemStatus>('checking');

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/public/health`, { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.json())
      .then((payload: { data?: { status?: string } }) => {
        if (cancelled) {
          return;
        }
        setStatus(payload?.data?.status === 'ok' ? 'operational' : 'degraded');
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('degraded');
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const isOperational = status === 'operational';

  return (
    <p className={cn('inline-flex items-center gap-2.5 text-sm', className)}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {isOperational ? (
          <span className="absolute inline-flex h-full w-full animate-status-ping rounded-full bg-mint-400" />
        ) : null}
        <span
          className={cn(
            'relative inline-flex h-2 w-2 rounded-full',
            isOperational ? 'bg-mint-400' : status === 'checking' ? 'bg-ink-faint' : 'bg-amber-400',
          )}
        />
      </span>

      <span className={cn(isOperational ? 'text-mint-300' : 'text-ink-muted')}>{LABELS[status]}</span>
    </p>
  );
}
