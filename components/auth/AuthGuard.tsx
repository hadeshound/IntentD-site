'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

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
 * The session lives in an HttpOnly cookie that only the API can read, so the
 * check necessarily happens after hydration: the page renders a waiting state
 * until the silent refresh resolves, then either shows the content or replaces
 * the history entry with the login screen.
 */
export function AuthGuard({ children, loginHref }: AuthGuardProps) {
  const router = useRouter();
  const { status } = useAuth();

  useEffect(() => {
    if (status === 'anonymous') {
      router.replace(loginHref);
    }
  }, [status, loginHref, router]);

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
