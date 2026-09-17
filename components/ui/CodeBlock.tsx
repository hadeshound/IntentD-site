'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils/cn';

interface CodeBlockProps {
  code: string;
  /** Shown in the header strip, e.g. "bash" or "background.js". */
  label?: string;
  className?: string;
}

/** Monospaced snippet with a copy control. Wide lines scroll inside the block
 *  rather than widening the page. */
export function CodeBlock({ code, label, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the snippet is still selectable.
      setCopied(false);
    }
  }, [code]);

  return (
    <figure className={cn('overflow-hidden rounded-card border border-hairline bg-void-deep/80', className)}>
      <figcaption className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
          {label ?? 'code'}
        </span>

        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-control px-2 py-1 text-xs text-ink-faint transition-colors duration-200 hover:bg-white/5 hover:text-ink"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-mint-400" aria-hidden="true" />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{copied ? 'Скопировано' : 'Копировать'}</span>
        </button>
      </figcaption>

      <pre className="scrollbar-none overflow-x-auto px-4 py-4 text-[0.8125rem] leading-relaxed">
        <code className="font-mono text-ink-muted">{code}</code>
      </pre>
    </figure>
  );
}
