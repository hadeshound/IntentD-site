import Link from 'next/link';

import { Accordion } from '@/components/ui/Accordion';
import type { FaqEntry } from '@/lib/content/faq';

interface FaqSectionProps {
  items: FaqEntry[];
  eyebrow?: string;
  title?: string;
  id?: string;
}

/**
 * Heading and answers sit in separate columns rather than stacked, so the
 * section reads as a two-track layout like the rest of the page.
 */
export function FaqSection({
  items,
  eyebrow = 'FAQ',
  title = 'Частые вопросы',
  id = 'faq',
}: FaqSectionProps) {
  return (
    <section id={id} className="py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3">
              <span className="eyebrow">{eyebrow}</span>
              <span className="h-px w-12 bg-hairline-strong" />
            </p>

            <h2 className="mt-6 text-section-title">{title}</h2>

            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
              Не нашли ответ?{' '}
              <Link href="/contact" className="link-underline underline underline-offset-4 decoration-hairline-strong">
                Напишите нам
              </Link>{' '}
              — отвечаем в течение рабочего дня.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
