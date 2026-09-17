import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/lib/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  /** Where to send an anonymous visitor, including the return path. */
  loginHref: string;
}

/**
 * Client-side gate for protected pages.
 *
 * The session lives in an HttpOnly cookie scoped to the API origin, so neither
 * this code nor the Astro server can read it: the check necessarily happens
 * after hydration. The page renders a waiting state until the silent refresh
 * resolves, then either shows the content or replaces the history entry with the
 * login screen. (An SSR cookie check was the other option, but the cookie is set
 * by api.intentd.io and never reaches this origin.)
 */
export function AuthGuard({ children, loginHref }: AuthGuardProps) {
  const { status } = useAuth();

  useEffect(() => {
    if (status === 'anonymous') {
      window.location.replace(loginHref);
    }
  }, [status, loginHref]);

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="flex items-center gap-3 text-sm text-ink-muted">
        <Spinner className="h-4 w-4" />
        {status === 'loading' ? 'Проверяем сессию…' : 'Переходим ко входу…'}
      </p>
    </div>
  );
}
