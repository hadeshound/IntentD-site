import { AdvertisingIsDead } from '@/components/marketing/AdvertisingIsDead';
import { ContactSection } from '@/components/marketing/ContactSection';
import { DataBuyerUseCases } from '@/components/marketing/DataBuyerUseCases';
import { FaqSection } from '@/components/marketing/FaqSection';
import { Hero } from '@/components/marketing/Hero';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { PricingGrid } from '@/components/marketing/PricingGrid';
import { WhyIntentD } from '@/components/marketing/WhyIntentD';
import { fetchPlansSafe } from '@/lib/api/plans';
import { LANDING_FAQ } from '@/lib/content/faq';

// The catalogue is revalidated on the server, so the landing page stays static
// between price changes instead of hitting the API on every visit.
export const revalidate = 300;

export default async function LandingPage() {
  const { plans, isFallback } = await fetchPlansSafe();

  return (
    <>
      <Hero />
      <AdvertisingIsDead />
      <HowItWorks />
      <DataBuyerUseCases />
      <WhyIntentD />
      <PricingGrid plans={plans} isFallback={isFallback} />
      <FaqSection items={LANDING_FAQ} />
      <ContactSection />
    </>
  );
}
