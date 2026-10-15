/** Site chrome: navigation, footer, accessibility labels, shared form copy. */
export const common = {
  common: {
    loading: 'Loading…',
    error: 'Something went wrong',
    retry: 'Try again',
    optional: 'optional',
    required: 'required',
    send: 'Send',
    sending: 'Sending…',
    close: 'Close',
    backToHome: 'Back to home',
    perMonth: '/ mo',
    setupOnce: 'setup, one-off',
    copy: 'Copy',
    copied: 'Copied',
  },

  a11y: {
    skipToContent: 'Skip to content',
    closeDialog: 'Close dialog',
    primaryNav: 'Primary navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeLink: 'IntentD — home',
    included: 'Included',
    notIncluded: 'Not included',
    docsContents: 'Documentation contents',
    legalSections: 'Document sections',
    useCasesScroller: 'Data use cases, horizontal scroll',
  },

  nav: {
    menu: {
      solutions: 'Solutions',
      docs: 'Docs',
      developers: { title: 'For developers', description: 'Monetize your extension without ads' },
      buyers: { title: 'For data buyers', description: 'A PII-free intent data stream' },
      calculator: { title: 'Profit calculator', description: 'Check whether a plan pays off' },
      api: { title: 'API and data format', description: 'Ingest API, event schema and delivery' },
      sdk: { title: 'SDK and consent', description: 'Integrate the SDK and the consent prompt' },
      bucket: { title: 'Bucket format v1', description: 'The open binary bucket specification' },
    },
    pricing: 'Pricing',
    docs: 'Documentation',
    forPublishers: 'For developers',
    forBuyers: 'For data buyers',
    contact: 'Contact',
    talkToSales: 'Talk to sales',
    talkToUs: 'Talk to us',
    dashboard: 'Dashboard',
    login: 'Sign in',
    logout: 'Sign out',
    register: 'Create account',
    connectExtension: 'Connect your extension',
  },

  footer: {
    tagline:
      'Intent data infrastructure: an SDK for extension developers and a clean, PII-free stream for analytics teams.',
    copyright: 'IntentD. All rights reserved.',
    badge: 'PII-free · GDPR-safe',
    product: {
      title: 'Product',
      pricing: 'Pricing',
      api: 'API and data format',
      sdk: 'SDK and consent',
      developers: 'For developers',
      buyers: 'For data buyers',
      calculator: 'Earnings calculator',
    },
    company: {
      title: 'Company',
      contact: 'Contact',
      dashboard: 'Dashboard',
      login: 'Sign in',
    },
    legal: {
      title: 'Legal',
      terms: 'Terms of use',
      privacy: 'Privacy policy',
      dpa: 'DPA (data processing agreement)',
    },
  },

  /** Transport-level fallbacks, used when the server gives no message. */
  errors: {
    network: 'Could not reach the server. Check your connection and try again.',
    unexpected: 'Something unexpected happened.',
    formGeneric: 'Something went wrong. Please try again.',
  },

};
