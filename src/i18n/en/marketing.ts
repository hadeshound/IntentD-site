/** Landing page, FAQ, contact page and the 404 screen. */
export const marketing = {
  home: {
    metaTitle: 'IntentD — ad-free extension monetization, clean PII-free data for analytics',
    metaDescription:
      'IntentD connects browser extension developers and analytics teams: ad-free monetization through a safe SDK, and a clean, PII-free intent data stream delivered as Parquet.',
    keywords: [
      'intent data',
      'extension monetization',
      'browser extension SDK',
      'clickstream',
      'PII-free',
      'Parquet',
    ],
  },

  hero: {
    eyebrow: 'Infrastructure for intent data',
    titleBefore: 'Ad‑free extension monetization,',
    titleAccent: 'clean PII‑free data',
    titleAfter: 'for analytics',
    subtitle:
      'IntentD connects extension developers and analytics teams: ad‑free monetization on one side and a clean, PII‑free data stream on the other.',
    ctaPrimary: 'Connect your extension',
    ctaSecondary: 'See pricing',
    trust: ['Five-minute integration', 'Manifest V3', 'Chrome Web Store safe'],
    strip: [
      { label: 'PII-free and GDPR-safe', tone: 'teal', icon: 'shield' },
      { label: 'Manifest V3 ready', tone: 'amber', icon: 'chrome' },
      { label: 'Chrome Web Store safe', tone: 'blue', icon: 'store' },
      { label: '< 300 KB SDK', tone: 'cyan', icon: 'zap' },
      { label: 'Five-minute integration', tone: 'violet', icon: 'timer' },
    ],
  },

  flow: {
    caption: 'Data flow',
    live: 'live',
    nodes: [
      { title: 'Browser extension', subtitle: 'background script' },
      { title: '@intentd/edge-sdk', subtitle: '< 300 KB · Manifest V3' },
      { title: 'IntentD Edge', subtitle: 'HMAC signing · PII filter' },
      { title: 'AWS S3', subtitle: 'Parquet + LZ4' },
    ],
    edges: ['events', 'cleaning', 'delivery'],
    note: 'Clean events pass through IntentD Ingest before they reach storage.',
    stats: [
      { label: 'PII in the stream', value: '0' },
      { label: 'SDK size', value: '< 300 KB' },
      { label: 'Format', value: 'Parquet' },
    ],
    alt: 'Flow diagram: the browser extension sends events to the SDK, the SDK passes them to IntentD Edge, where requests are HMAC-signed and personal data is stripped, the clean events pass through IntentD Ingest, and are then delivered to AWS S3 in Parquet format.',
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
        body: 'We collect pseudonymised, aggregated signals in the background. Your extension UI stays 100% clean.',
      },
    ],
  },

  pathSplit: {
    title: 'Work with IntentD',
    developers: {
      title: 'For extension developers',
      body: 'Monetize your extension without banners. Add the lightweight SDK, collect consented signals in the background, and turn them into revenue — with full user consent.',
      cta: 'Explore the developer path',
      secondary: 'See plans',
    },
  },

  developersPage: {
    metaTitle: 'Monetize browser extensions without ads',
    metaDescription:
      'Monetize your browser extension without banners: add the IntentD SDK, collect consented, PII-free signals in the background and turn them into revenue. Plans are priced by the clean events you send.',
    titleBefore: 'Monetize browser extensions',
    titleAccent: 'without ads',
    titleAfter: 'and without losing users',
    subtitle:
      'Add a lightweight, privacy-safe SDK and monetize your extension with pseudonymised, consented intent data. No banners, no impact on your users.',
    ctaPrimary: 'Connect your extension',
    ctaSecondary: 'See pricing',
    snippetLabel: 'background.js',
    howTitle: 'How it works for developers',
    faqTitle: 'Questions from extension developers',
    closing: {
      title: 'Ready to connect your extension?',
      body: 'Create an account, download the SDK built for your extension and start collecting consented signals.',
      primary: 'Connect your extension',
      secondary: 'Talk to us',
    },
  },

  howItWorks: {
    titleDevelopers: 'How it works for developers',
    eyebrow: 'How it works',
    title: 'One integration, two sides of the market',
    description:
      'Developers add the SDK and monetize their extension. Our cleaning infrastructure turns raw signals into a clean, consented stream.',
    publishers: {
      label: 'Publishers',
      audience: 'For extension developers',
      steps: [
        {
          title: 'Five-minute integration',
          body: 'Drop the lightweight SDK (< 300 KB) into your extension background script.',
        },
        {
          title: 'Background signal collection',
          body: 'The SDK aggregates visit patterns and search intents, leaving PII out.',
        },
        {
          title: 'Passive revenue',
          body: 'Earn a share of the revenue from the data your extension sends.',
        },
      ],
    },
  },

  why: {
    eyebrow: 'Why IntentD',
    title: 'Infrastructure, not one more ad script',
    description:
      'Four engineering decisions that keep an extension from losing users, and keep a data buyer from spending weeks on cleaning.',
    items: [
      {
        title: 'Zero-PII and privacy first',
        body: 'HMAC signing and built-in filters. Passwords, tokens, personal data and banking domains never leave the browser.',
        footnote: 'Filtering runs on the device, before the bucket is sent.',
      },
      {
        title: 'A light, fast SDK',
        body: 'It does not slow the browser down, does not eat memory, and follows Manifest V3 strictly.',
        footnote: '',
      },
      {
        title: 'Chrome Web Store safe',
        body: 'The SDK uses no eval and loads no remote code. It follows the current Chrome Web Store and Firefox Add-ons policies.',
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
        question: 'How do you protect user identities?',
        answer:
          'Every personal identifier — emails, tokens in URLs, private parameters — is stripped while the bucket is built, inside the browser. Only a pseudonymised session ID and a cleaned URL reach our servers.',
      },
      {
        question: 'What format is the data delivered in?',
        answer:
          'The primary format is Parquet with LZ4 compression, partitioned by time interval and category. You can pull it straight from our AWS S3, or have it synced into your own bucket.',
      },
      {
        question: 'How soon do I start collecting data?',
        answer:
          'As soon as the SDK is in place and the API key is active in your dashboard, clean events start flowing into your account. What you do with them — sell through our marketplace partners, export and sell yourself, or analyse internally — is your choice.',
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
        enterprise: 'Enterprise plan',
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
