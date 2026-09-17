'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/lib/hooks/useAuth';
import { PRIMARY_NAV } from '@/lib/content/navigation';
import { DASHBOARD_LINKS } from '@/lib/config/urls';
import { cn } from '@/lib/utils/cn';

/**
 * Sticky glass header. It floats above the page instead of sitting in the
 * document flow, and only picks up a border once the page has scrolled, so the
 * hero starts against an unbroken background.
 */
export function Navbar() {
  const pathname = usePathname();
  const { status, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route changes must not leave the mobile sheet hanging open.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        isScrolled || isMenuOpen
          ? 'border-b border-hairline bg-void/70 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav className="shell flex h-18 items-center justify-between gap-6" aria-label="Основная навигация">
        <Link href="/" className="rounded-control" aria-label="IntentD — на главную">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm transition-colors duration-200 hover:text-ink',
                  pathname === link.href ? 'text-ink' : 'text-ink-muted',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {status === 'authenticated' && user ? (
            <>
              <span className="max-w-[12rem] truncate text-sm text-ink-muted" title={user.email}>
                {user.email}
              </span>
              <ButtonLink href={DASHBOARD_LINKS.home} size="sm">
                Кабинет
              </ButtonLink>
              <Button variant="ghost" size="sm" onClick={() => void logout()}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <ButtonLink href={DASHBOARD_LINKS.login} variant="ghost" size="sm">
                Войти
              </ButtonLink>
              <ButtonLink href={DASHBOARD_LINKS.register} size="sm">
                Подключить расширение
              </ButtonLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="rounded-control p-2 text-ink transition-colors duration-200 hover:bg-white/5 lg:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className="border-t border-hairline bg-void/95 backdrop-blur-xl lg:hidden"
      >
        <div className="shell space-y-6 py-6">
          <ul className="space-y-1">
            {PRIMARY_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-control px-3 py-2.5 text-base text-ink-muted transition-colors duration-200 hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 border-t border-hairline pt-6">
            {status === 'authenticated' && user ? (
              <>
                <p className="truncate px-3 text-sm text-ink-faint">{user.email}</p>
                <ButtonLink href={DASHBOARD_LINKS.home}>Кабинет</ButtonLink>
                <Button variant="secondary" onClick={() => void logout()}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <ButtonLink href={DASHBOARD_LINKS.login} variant="secondary">
                  Войти
                </ButtonLink>
                <ButtonLink href={DASHBOARD_LINKS.register}>Создать аккаунт</ButtonLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
