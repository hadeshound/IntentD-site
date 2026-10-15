/** Landing page, FAQ, contact page and the 404 screen. */
export const marketing = {
  home: {
    metaTitle: 'IntentD — intent data infrastructure for extensions and analytics teams',
    metaDescription:
      'IntentD connects browser extension developers and analytics teams: a safe SDK that earns without ads, and a PII-free intent data stream delivered as Parquet.',
    keywords: [
      'intent data',
      'extension monetization',
      'browser extension SDK',
      'clickstream',
      'PII-free',
      'Parquet',
    ],
  },

  calculator: {
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
  },

  hero: {
    eyebrow: 'Infrastructure for intent data',
    titleBefore: 'Intent data infrastructure',
    titleAccent: 'for extension developers',
    titleAfter: 'and analytics teams',
    subtitle:
      'IntentD connects both sides of the market: an SDK that lets extension developers earn without ads, and a clean, PII-free data stream for analytics teams.',
    ctaPrimary: 'Connect your extension',
    ctaSecondary: 'Talk to sales',
    trust: ['Five-minute integration', 'Manifest V3', 'Chrome Web Store safe'],
    strip: [
      { label: 'PII-free and GDPR-safe', tone: 'teal', icon: 'shield' },
      { label: 'Manifest V3 ready', tone: 'amber', icon: 'chrome' },
      { label: 'Chrome Web Store safe', tone: 'blue', icon: 'store' },
      { label: '< 15 KB SDK', tone: 'cyan', icon: 'zap' },
      { label: 'Five-minute integration', tone: 'violet', icon: 'timer' },
    ],
  },

  flow: {
    caption: 'Data flow',
    live: 'live',
    nodes: [
      { title: 'Browser extension', subtitle: 'background script' },
      { title: '@intentd/edge-sdk', subtitle: '< 15 KB · Manifest V3' },
      { title: 'IntentD Edge', subtitle: 'HMAC hash · PII filter' },
      { title: 'AWS S3', subtitle: 'Parquet + LZ4' },
    ],
    edges: ['events', 'cleaning', 'delivery'],
    stats: [
      { label: 'PII in the stream', value: '0' },
      { label: 'SDK size', value: '< 15 KB' },
      { label: 'Format', value: 'Parquet' },
    ],
    alt: 'Flow diagram: the browser extension sends events to the SDK, the SDK passes them to IntentD Edge, where identifiers are hashed and personal data is stripped, and the cleaned events are then delivered to AWS S3 in Parquet format.',
  },

  advertising: {
    eyebrow: 'For extension developers',
    titleBefore: 'Stop risking your users',
    titleMuted: 'for the sake of banners',
    cta: 'See how it works',
    cards: [
      {
        title: 'Banners drive users away',
        body: 'Putting ads into an extension UI hurts retention and brings a stream of one-star reviews.',
      },
      {
        title: 'Review teams block you',
        body: 'Chrome and Firefox heavily demote or remove extensions that carry ad scripts and link injectors.',
      },
      {
        title: 'The IntentD answer',
        body: 'We collect anonymised, aggregated signals in the background. Your extension UI stays 100% clean.',
      },
    ],
  },

  pathSplit: {
    title: 'Two ways to work with IntentD',
    developers: {
      title: 'For extension developers',
      body: 'Earn from your users without banners. Add the lightweight SDK, collect consented signals in the background and get regular payouts.',
      cta: 'Explore the developer path',
      secondary: 'See plans',
    },
    buyers: {
      title: 'For data buyers',
      body: 'A PII-free stream of intent signals delivered as Parquet to your own bucket. Ask for a sample extract before you commit.',
      cta: 'Explore the data stream',
      secondary: 'See the data schema',
    },
  },

  developersPage: {
    metaTitle: 'Monetize browser extensions without ads',
    metaDescription:
      'Earn from your browser extension without banners: add the IntentD SDK, collect consented, PII-free signals in the background and get regular payouts. Estimate your earnings.',
    titleBefore: 'Monetize browser extensions',
    titleAccent: 'without ads',
    titleAfter: 'and without losing users',
    subtitle:
      'Add a lightweight, privacy-safe SDK to your extension and earn from anonymous, consented intent data. No banners, no impact on your users.',
    ctaPrimary: 'Connect your extension',
    ctaSecondary: 'Calculate your earnings',
    snippetLabel: 'background.js',
    howTitle: 'How it works for developers',
    faqTitle: 'Questions from extension developers',
    band: {
      title: 'Will a plan pay off for you?',
      body: 'Pick a plan, set your active users and the consent rate, and see your monthly profit or loss.',
      cta: 'Open the calculator',
    },
    closing: {
      title: 'Ready to connect your extension?',
      body: 'Create an account, download the SDK built for your extension and start collecting consented signals.',
      primary: 'Connect your extension',
      secondary: 'Talk to us',
    },
  },

  buyersPage: {
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
  },

  howItWorks: {
    titleDevelopers: 'How it works for developers',
    titleBuyers: 'How the data reaches you',
    calculatorCta: 'Calculate your earnings',
    eyebrow: 'How it works',
    title: 'One integration, two sides of the market',
    description:
      'Developers add the SDK and earn. Analytics teams get a ready-made stream. Our cleaning infrastructure sits between them.',
    publishers: {
      label: 'Publishers',
      audience: 'For extension developers',
      steps: [
        {
          title: 'Five-minute integration',
          body: 'Drop the lightweight SDK (< 15 KB) into your extension background script.',
        },
        {
          title: 'Background signal collection',
          body: 'The SDK aggregates visit patterns and search intents, leaving PII out.',
        },
        {
          title: 'Passive revenue',
          body: 'Get regular payouts for the volume of data you generate.',
        },
      ],
    },
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
  },

  useCases: {
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
  },

  why: {
    eyebrow: 'Why IntentD',
    title: 'Infrastructure, not one more ad script',
    description:
      'Four engineering decisions that keep an extension from losing users, and keep a data buyer from spending weeks on cleaning.',
    items: [
      {
        title: 'Zero-PII and privacy first',
        body: 'HMAC hashing and built-in filters. Passwords, tokens, personal data and banking domains never leave the browser.',
        footnote: 'Filtering runs on the device, before the bucket is sent.',
      },
      {
        title: 'A light, fast SDK',
        body: 'It does not slow the browser down, does not eat memory, and follows Manifest V3 strictly.',
        footnote: '',
      },
      {
        title: 'Chrome Web Store safe',
        body: 'The SDK uses no eval and loads no remote code. It passes the automated checks at Google and Mozilla in full.',
        footnote: '',
      },
      {
        title: 'Institutional-grade Parquet',
        body: 'A compressed, structured format ready for ClickHouse, Snowflake and Databricks.',
        footnote: 'Partitioned by date and tenant out of the box.',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    notFoundPrefix: 'Still stuck?',
    writeUs: 'Write to us',
    notFoundSuffix: '— we reply within one business day.',
    landing: [
      {
        question: 'Is this safe for my extension ranking in the Chrome Web Store?',
        answer:
          'Yes. The SDK follows the Developer Program Policies strictly. We show no ads, we do not alter page content, and we collect only technical metadata with no link to a person.',
      },
      {
        question: 'How do you keep users anonymous?',
        answer:
          'Every personal identifier — emails, tokens in URLs, private parameters — is stripped while the bucket is built, inside the browser. Only a hashed session ID and a cleaned URL reach the database.',
      },
      {
        question: 'What format is the data delivered in?',
        answer:
          'The primary format is Parquet with LZ4 compression, partitioned by time interval and category. You can pull it straight from our AWS S3, or have it synced into your own bucket.',
      },
      {
        question: 'How soon do I start earning as a developer?',
        answer:
          'As soon as the SDK is in place and the API key is active in your dashboard. Revenue accrues from the first active user sessions.',
      },
    ],
  },

  contact: {
    metaTitle: 'Contact sales and support',
    metaDescription:
      'Talk to the IntentD team: request a sample Parquet extract, get data stream access, connect your browser extension or ask a technical question. Replies within one business day.',
    eyebrow: 'Contact',
    heading: 'Write to us',
    intro:
      'Describe the task as concretely as you can: which data segment you need, what volume, on what timeline. That way the first reply is already useful.',
    responseTitle: 'Response time',
    responseBody:
      'Data access requests: within one business day. Technical requests from connected publishers: by plan priority.',
    directChannels: {
      sales: 'Sales and data access',
      privacy: 'Privacy and DPA',
      support: 'Technical support',
    },
    formTitle: 'Contact form',
    formHint: 'Every field except company is required.',
    faqEyebrow: 'Before you write',
    faqTitle: 'Worth knowing up front',
    faq: [
      {
        question: 'How long until you reply?',
        answer:
          'A manager answers data access requests within one business day. Technical requests from connected publishers are handled in the order of your plan priority.',
      },
      {
        question: 'Can we get a test extract before paying?',
        answer:
          'Yes. Tell us which verticals and what volume you care about, and we will prepare a sample Parquet file with exactly the production structure.',
      },
      {
        question: 'We operate in the EU. What about GDPR?',
        answer:
          'The stream carries no personal data: identifiers are hashed on the device, and filters strip sensitive domains and parameters. We sign a DPA on request — mention it in your message.',
      },
    ],
    section: {
      eyebrow: 'Contact',
      title: 'Let us talk through your scenario',
      body: 'Tell us what you need: connecting an extension, getting a sample extract, or discussing Enterprise volumes. We will answer on the substance.',
      cta: 'Talk to sales',
      ctaSupport: 'Technical support',
    },
    form: {
      name: 'Name',
      email: 'Work email',
      emailPlaceholder: 'you@company.com',
      company: 'Company',
      topic: 'Request type',
      message: 'Message',
      messagePlaceholder: 'Describe the task: verticals of interest, volume, timeline.',
      honeypotLabel: 'Leave this field empty',
      submit: 'Send request',
      submitting: 'Sending…',
      consent:
        'By sending this form you agree to the processing of your contact details in line with our privacy policy.',
      successTitle: 'Request sent',
      successBody:
        'We have your message and will reply to the email you gave. For data access requests a manager gets in touch within one business day.',
      sendAnother: 'Send another message',
      topics: {
        buy_data: 'Buy data',
        monetize_extension: 'Monetize an extension',
        support: 'Technical support',
        enterprise: 'Enterprise Data Pipeline',
      },
      errors: {
        nameMin: 'What should we call you?',
        emailRequired: 'Enter a work email',
        emailMax: 'Email must be 255 characters or fewer',
        emailInvalid: 'That address looks like a typo',
        max255: '255 characters or fewer',
        topicRequired: 'Pick a request type',
        messageMin: 'Please enter a message',
        messageMax: '5000 characters or fewer',
      },
    },
  },

  notFound: {
    metaTitle: 'Page not found',
    metaDescription: 'There is no such page on the IntentD site.',
    label: '404 · Not Found',
    title: 'No such page',
    body: 'The link is out of date, or the address has a typo. Below are the sections broken links usually point at.',
    home: 'Go home',
    suggestions: {
      pricing: 'Pricing',
      api: 'API and data format',
      contact: 'Contact',
    },
  },
};
