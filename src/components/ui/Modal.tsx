import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';

import { getDictionary } from '@/i18n';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** Hides the close control when the surrounding flow must be completed. */
  dismissible?: boolean;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Dialog with the three behaviours a modal owes a keyboard user: focus moves
 * in on open, Tab cycles inside it, and Escape returns focus to whatever
 * opened it. Built directly on <div role="dialog"> to avoid pulling in a
 * component library for a single surface.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  dismissible = true,
}: ModalProps) {
  const d = getDictionary();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    if (dismissible) {
      onClose();
    }
  }, [dismissible, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE);
    (firstFocusable ?? panel)?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !panel) {
        return;
      }

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, handleClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <div
        className="absolute inset-0 bg-void-deep/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
        className="relative isolate w-full max-w-lg overflow-hidden rounded-card border border-hairline bg-carbon-800 p-6 shadow-lift sm:p-8"
      >
        <div className="ambient-glow -top-24 left-1/2 h-48 w-72 -translate-x-1/2 bg-mint-500/20" />

        {dismissible ? (
          <button
            type="button"
            onClick={onClose}
            aria-label={d.a11y.closeDialog}
            className="absolute right-4 top-4 rounded-control p-1.5 text-ink-faint transition-colors duration-200 hover:bg-white/5 hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}

        <h2 id="modal-title" className="pr-8 text-2xl leading-tight">
          {title}
        </h2>

        {description ? (
          <p id="modal-description" className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-5">{children}</div> : null}

        {footer ? <div className="mt-7 flex flex-wrap gap-3">{footer}</div> : null}
      </div>
    </div>
  );
}
