import { AuthGuard } from '@/components/auth/AuthGuard';
import { getDictionary } from '@/i18n';
import type { PlanCode } from '@/lib/api/plans';
import { CheckoutPanel } from './CheckoutPanel';

interface CheckoutViewProps {
  /** Plan code taken from ?plan=, already narrowed by the page. */
  planCode: PlanCode | null;
  /** Login destination for an anonymous visitor, built by the page. */
  loginHref: string;
}

/**
 * The whole /checkout body as one island.
 *
 * The heading is inside the guard rather than beside it, which is where the Next
 * page had it: an anonymous visitor on their way to the login screen should not
 * see a page about reserving a bucket for half a second.
 */
export function CheckoutView({ planCode, loginHref }: CheckoutViewProps) {
  const t = getDictionary().checkout;

  return (
    <AuthGuard loginHref={loginHref}>
      <div className="shell">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3">
            <span className="eyebrow">{t.eyebrow}</span>
            <span className="h-px w-12 bg-hairline-strong" />
          </p>

          <h1 className="mt-7 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {t.title}
          </h1>

          <p className="mt-7 text-lg leading-relaxed text-ink-muted text-pretty">{t.intro}</p>
        </div>

        <div className="mt-14 lg:mt-16">
          <CheckoutPanel planCode={planCode} />
        </div>
      </div>
    </AuthGuard>
  );
}
