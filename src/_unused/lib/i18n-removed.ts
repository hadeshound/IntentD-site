/**
 * Dictionary blocks taken out of src/i18n/en/* together with the calculator
 * and the data buyer page. Kept verbatim so the pages in src/_unused/ can be
 * restored: move each block back under the key named in its comment.
 */

// src/i18n/en/marketing.ts -> marketing.calculator
export const calculator = {
    metaTitle: 'Earnings calculator for browser extensions',
    metaDescription:
      'Estimate how much a browser extension can earn from consented, PII-free data: set your monthly active users, the consent rate and the payout rate, and get a monthly and yearly figure.',
    pageTitle: 'How much can your extension earn?',
    faqTitle: 'About the estimate',
    faq: [
      {
        question: 'Where does the income come from?',
        answer:
          'From the anonymised, consented signals your extension collects. The calculator asks for the income you expect per consenting user, because the final figure depends on your agreement. Users who decline send nothing.',
      },
      {
        question: 'Is this figure guaranteed?',
        answer:
          'No. It is a planning tool. The plan prices are the current ones; the income per consenting user is your own assumption, and with a large plan and few users the result can be a loss.',
      },
      {
        question: 'What share of users usually accept?',
        answer:
          'It depends on how the consent prompt is presented. The calculator starts at 40 percent and lets you test lower and higher values.',
      },
    ],
    title: 'Estimate what your users can earn you',
    description:
      'Pick a plan, set your active users, the consent rate and what a consenting user is worth to you, and see whether your extension makes a profit or a loss each month.',
    users: 'Monthly active users',
    consent: 'Users who accept the consent prompt',
    consentHint: 'Most extensions see between a third and a half of users opt in.',
    plan: 'Your plan',
    revenue: 'Income per consenting user',
    revenueHint: 'Per month. An example figure: set what a consenting user is worth to you under your agreement.',
    income: 'Income',
    planCost: 'Plan',
    firstYear: 'First year, after setup',
    breakEven: 'Break-even',
    payback: 'Setup pays back in',
    compareTitle: 'Net result on each plan',
    resultLabel: 'Estimated net result',
    perMonth: 'per month',
    perYear: 'Per year',
    consenting: 'Consenting users',
    disclaimer: 'An estimate for planning, not a guarantee. Plan prices are current; the income per user is your own assumption, so the result can be a loss.',
    cta: 'Get your SDK key',
};

// src/i18n/en/marketing.ts -> marketing.buyersPage
export const buyersPage = {
    metaTitle: 'Intent data stream for analytics teams',
    metaDescription:
      'A PII-free stream of anonymous intent signals from browser extensions, delivered as Parquet to your S3 or GCS bucket. See the use cases, plans and request a sample extract.',
    subtitle:
      'Anonymous, aggregated intent signals from consented extension users, cleaned at the edge and delivered as Parquet to your own bucket. Data access is arranged individually with our team, not sold in fixed packages.',
    ctaPrimary: 'Request a sample',
    ctaSecondary: 'See the data schema',
    deliveryTitle: 'What you receive',
    delivery: [
      { label: 'Format', value: 'Parquet + LZ4' },
      { label: 'Destination', value: 'AWS S3, or your own bucket' },
      { label: 'Cleaning', value: 'HMAC hashing and a PII filter at the edge' },
    ],
    fieldsLabel: 'Fields in the stream',
    howTitle: 'How the data reaches you',
    faqTitle: 'Questions from data buyers',
    closing: {
      title: 'Want to see the data first?',
      body: 'Tell us which verticals and what volume you care about, and we will prepare a sample Parquet file with the production structure.',
      primary: 'Request a sample',
      secondary: 'Talk to a manager',
    },
};

// src/i18n/en/marketing.ts -> marketing.useCases
export const useCases = {
    heading: 'What teams build with the stream',
    eyebrow: 'For data buyers',
    title: 'Top-quality intent signals for your business',
    cta: 'See the data schema',
    ctaSample: 'Request a sample',
    items: [
      {
        segment: 'E-commerce & Retail',
        title: 'See demand before your competitor does',
        body: 'Track which products and categories people are searching for right now — before they buy somewhere else.',
      },
      {
        segment: 'AdTech & Programmatic',
        title: 'Segments without third-party cookies',
        body: 'Enrich audience segments with precise commercial intent, without depending on third-party cookies.',
      },
      {
        segment: 'Market Research & Analytics',
        title: 'Interest shifts across large samples',
        body: 'Analyse traffic trends and shifting interests across samples of millions of sessions.',
      },
    ],
};

// src/i18n/en/marketing.ts -> marketing.pathSplit.buyers
export const pathSplitBuyers = {
      title: 'For data buyers',
      body: 'A PII-free stream of intent signals delivered as Parquet to your own bucket. Ask for a sample extract before you commit.',
      cta: 'Explore the data stream',
      secondary: 'See the data schema',
};

// src/i18n/en/marketing.ts -> marketing.howItWorks (titleBuyers, calculatorCta, buyers)
export const howItWorksBuyers = {
  titleBuyers: 'How the data reaches you',
  calculatorCta: 'Calculate your earnings',
    buyers: {
      label: 'Data Buyers',
      audience: 'For data buyers',
      steps: [
        {
          title: 'Fresh signals',
          body: 'Access commercial behaviour patterns in real time.',
        },
        {
          title: 'Clean data',
          body: 'Banking, password, email and identifier traffic is filtered out at the edge.',
        },
        {
          title: 'A format you can use',
          body: 'Parquet + LZ4 in AWS S3, or synced into your own bucket.',
        },
      ],
    },
};

// src/i18n/en/marketing.ts -> marketing.developersPage.band (the #calculator-cta section)
export const developersPageBand = {
  title: 'Will a plan pay off for you?',
  body: 'Pick a plan, set your active users and the consent rate, and see your monthly profit or loss.',
  cta: 'Open the calculator',
};

// src/i18n/en/common.ts -> common.a11y.useCasesScroller, nav.menu.buyers,
// nav.menu.calculator, nav.forBuyers, footer.product.buyers, footer.product.calculator
export const commonRemoved = {
  useCasesScroller: 'Data use cases, horizontal scroll',
  menuBuyers: { title: 'For data buyers', description: 'A PII-free intent data stream' },
  menuCalculator: { title: 'Profit calculator', description: 'Check whether a plan pays off' },
  forBuyers: 'For data buyers',
  footerBuyers: 'For data buyers',
  footerCalculator: 'Earnings calculator',
};

// src/lib/content/navigation.ts -> primaryNav() "solutions" items and footerColumns() "Product" links
// { title: t.menu.buyers.title, description: t.menu.buyers.description, href: '/data-buyers', icon: 'database', tone: 'blue' },
// { title: t.menu.calculator.title, description: t.menu.calculator.description, href: '/calculator', icon: 'calculator', tone: 'amber' },
// { label: t.product.buyers, href: path('/data-buyers') },
// { label: t.product.calculator, href: path('/calculator') },
// Navbar.astro also mapped the 'calculator' icon to lucide's Calculator.

// src/pages/sitemap.xml.ts
// { path: '/data-buyers', priority: 0.9, changeFrequency: 'monthly' },
// { path: '/calculator', priority: 0.7, changeFrequency: 'monthly' },
