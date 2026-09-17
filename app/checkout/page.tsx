import type { Metadata } from 'next';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { CheckoutPanel } from '@/components/checkout/CheckoutPanel';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import type { PlanCode } from '@/lib/api/plans';
import { buildLoginRedirect } from '@/lib/utils/redirect';

export const metadata: Metadata = {
  title: 'Оформление доступа',
  description: 'Оформление доступа к IntentD Data Stream.',
  robots: { index: false, follow: false },
};

const PLAN_CODES: PlanCode[] = ['starter', 'growth', 'enterprise'];

function parsePlan(raw: string | string[] | undefined): PlanCode | null {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return PLAN_CODES.find((code) => code === value) ?? null;
}

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const planCode = parsePlan(searchParams.plan);

  // An anonymous visitor is bounced to login and returned to this exact plan.
  const loginHref = planCode ? buildLoginRedirect(planCode) : '/auth/login?redirect=/checkout';

  return (
    <AuthGuard loginHref={loginHref}>
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="hairline-grid-overlay" />
        <AmbientGlow className="-left-28 top-0 h-96 w-96" drift />

        <div className="shell">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3">
              <span className="eyebrow">Checkout</span>
              <span className="h-px w-12 bg-hairline-strong" />
            </p>

            <h1 className="mt-7 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Оформление доступа к IntentD Data Stream
            </h1>

            <p className="mt-7 text-lg leading-relaxed text-ink-muted text-pretty">
              После подтверждения заявки за вашим аккаунтом будет зарезервирован
              индивидуальный S3-бакет с данными.
            </p>
          </div>

          <div className="mt-14 lg:mt-16">
            <CheckoutPanel planCode={planCode} />
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}
