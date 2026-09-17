import { cn } from '@/lib/utils/cn';

/**
 * Wordmark. The glyph is three stacked signal bars converging into one stream,
 * which is the product in one shape: many browser sessions, one data feed.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 28 28"
        className="h-7 w-7"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0.75" y="0.75" width="26.5" height="26.5" rx="7.25" stroke="rgba(255,255,255,0.14)" />
        <path d="M7 9h7" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 14h11" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 19h5" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20.5" cy="19" r="2" fill="#6366F1" />
      </svg>

      <span className="font-display text-lg font-bold tracking-tight text-ink">
        Intent<span className="text-mint-400">D</span>
      </span>
    </span>
  );
}
