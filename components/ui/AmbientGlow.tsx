import { cn } from '@/lib/utils/cn';

type GlowTone = 'mint' | 'violet';

interface AmbientGlowProps {
  tone?: GlowTone;
  className?: string;
  /** Adds a slow drift so the background is never perfectly static. */
  drift?: boolean;
}

/**
 * Heavily blurred colour field placed behind a section. Sits below the content
 * layer and ignores pointer events, so it can overlap anything safely.
 */
export function AmbientGlow({ tone = 'mint', className, drift = false }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'ambient-glow',
        tone === 'mint' ? 'bg-mint-500/20' : 'bg-violet-500/20',
        drift && 'animate-glow-drift',
        className,
      )}
    />
  );
}
