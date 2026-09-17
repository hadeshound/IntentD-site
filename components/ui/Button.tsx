import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-surface ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void';

const VARIANTS: Record<ButtonVariant, string> = {
  // Mint is the only solid fill on the site: it marks the one action that moves
  // the visitor forward on a given screen.
  primary:
    'bg-mint-500 text-void-deep hover:bg-mint-400 hover:-translate-y-0.5 hover:shadow-mint-glow active:translate-y-0',
  secondary:
    'border border-hairline-strong bg-white/5 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-mint-500/40 hover:bg-white/[0.08] active:translate-y-0',
  ghost: 'text-ink-muted hover:bg-white/5 hover:text-ink',
  danger: 'border border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Swaps the label for a spinner and blocks repeat submissions. */
  isLoading?: boolean;
  loadingLabel?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingLabel,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles(variant, size, className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4" />
          <span>{loadingLabel ?? children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/** Same visual treatment as Button, rendered as a real link for navigation. */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (!isInternal) {
    return (
      <a
        href={href}
        className={buttonStyles(variant, size, className)}
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
