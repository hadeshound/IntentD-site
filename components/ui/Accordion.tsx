'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import type { FaqEntry } from '@/lib/content/faq';
import { cn } from '@/lib/utils/cn';

interface AccordionProps {
  items: FaqEntry[];
  /** Index opened on first render; -1 leaves everything collapsed. */
  defaultOpen?: number;
}

/**
 * Single-open accordion built from buttons and aria-expanded rather than
 * <details>, so the open/close transition can be animated consistently across
 * browsers while keyboard semantics stay native.
 */
export function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const isOpen = index === openIndex;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-mint-300"
              >
                <span
                  className={cn(
                    'font-display text-lg leading-snug transition-colors duration-200 sm:text-xl',
                    isOpen ? 'text-ink' : 'text-ink/90',
                  )}
                >
                  {item.question}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline transition-[transform,border-color,background-color] duration-300 ease-surface',
                    isOpen
                      ? 'rotate-45 border-mint-500/50 bg-mint-500/10 text-mint-400'
                      : 'text-ink-faint group-hover:border-hairline-strong',
                  )}
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-7 pr-12"
            >
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
