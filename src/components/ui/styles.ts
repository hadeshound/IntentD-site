import { cn } from '@/lib/utils/cn';

/**
 * Class tables shared by the .astro and .tsx variants of the primitives.
 *
 * A few controls exist twice: once as an Astro component for the static pages,
 * once as React for the form islands. Both read their classes from here, so a
 * change to the palette or a hover state cannot land on one half only.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium ' +
  'transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-surface ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  // Mint is the only solid fill on the site: it marks the one action that moves
  // the visitor forward on a given screen.
  primary:
    'bg-gradient-to-br from-mint-500 to-violet-500 text-void-deep shadow-mint-glow hover:brightness-110 active:brightness-95',
  secondary:
    'border border-hairline-strong bg-white/[0.03] text-ink hover:border-white/25 hover:bg-white/[0.07]',
  ghost: 'text-ink-muted hover:bg-white/5 hover:text-ink',
  danger: 'border border-red-500/40 bg-red-500/10 text-red-200 hover:bg-red-500/20',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);
}

// --- Badge ------------------------------------------------------------------

export type BadgeTone = 'neutral' | 'mint' | 'violet';

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: 'border-hairline bg-white/[0.04] text-ink-muted',
  mint: 'border-mint-500/30 bg-mint-500/10 text-mint-300',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
};

export function badgeStyles(tone: BadgeTone = 'neutral', className?: string): string {
  return cn(
    'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-xs font-medium',
    BADGE_TONES[tone],
    className,
  );
}

// --- Alert ------------------------------------------------------------------

export type AlertTone = 'error' | 'success' | 'info';

export const ALERT_TONES: Record<AlertTone, string> = {
  error: 'border-red-500/30 bg-red-500/[0.07] text-red-200',
  success: 'border-mint-500/30 bg-mint-500/[0.07] text-mint-300',
  info: 'border-hairline bg-white/[0.04] text-ink-muted',
};

export function alertStyles(tone: AlertTone = 'info', className?: string): string {
  return cn(
    'flex gap-3 rounded-card border p-3.5 text-sm leading-relaxed',
    ALERT_TONES[tone],
    className,
  );
}

// --- Ambient glow -----------------------------------------------------------

export type GlowTone = 'mint' | 'violet';

export function glowStyles(tone: GlowTone = 'mint', drift = false, className?: string): string {
  // Decorative glows were retired in the redesign; callers still pass their props.
  void tone;
  void drift;
  return cn('hidden', className);
}

// --- Form controls ----------------------------------------------------------

const CONTROL_BASE =
  'w-full rounded-control border bg-white/[0.03] px-3.5 text-[0.9375rem] text-ink placeholder:text-ink-faint ' +
  'transition-[border-color,box-shadow,background-color] duration-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-mint-400/70 focus:ring-offset-0 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

export function controlStyles(hasError: boolean, extra?: string): string {
  return cn(
    CONTROL_BASE,
    hasError ? 'border-red-500/60 focus:ring-red-400/70' : 'border-hairline focus:border-mint-500/50',
    extra,
  );
}
