import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { buttonStyles, type ButtonSize, type ButtonVariant } from './styles';
import { Spinner } from './Spinner';

export { buttonStyles };
export type { ButtonSize, ButtonVariant };

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

  return (
    <a
      href={href}
      className={buttonStyles(variant, size, className)}
      rel={isInternal ? undefined : 'noopener noreferrer'}
      {...props}
    >
      {children}
    </a>
  );
}
