/** Landing page, FAQ, contact page and the 404 screen. */
export const marketing = {
  home: {
    metaTitle: 'IntentD — monetize browser extensions without ads',
    metaDescription:
      'IntentD turns anonymous clickstream into steady revenue. A safe SDK for extension developers and a PII-free intent data stream for analytics teams.',
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
    titleBefore: 'Monetize browser extensions',
    titleAccent: 'without ads',
    titleAfter: 'and without losing users',
    subtitle:
      'IntentD turns anonymous clickstream into steady revenue. A safe SDK, full privacy (PII-free) and a ready market for the data — in a single integration.',
    ctaPrimary: 'Connect your extension',
    ctaSecondary: 'Buy data',
    trust: ['Five-minute integration', 'Manifest V3', 'Chrome Web Store safe'],
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

  howItWorks: {
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
    eyebrow: 'For data buyers',
    title: 'Top-quality intent signals for your business',
    cta: 'See the data schema',
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
    metaTitle: 'Contact',
    metaDescription:
      'Get in touch with the IntentD team: data stream access, connecting an extension, technical support and data processing questions.',
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
      salesTitle: 'Sales',
      salesBody: 'Stream access, test extracts, Enterprise terms.',
      supportTitle: 'Technical support',
      supportBody: 'SDK integration, keys, questions about the Parquet format.',
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
        messageMin: 'Tell us a little more — at least 10 characters',
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
