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
    pricing: 'Pricing',
    docs: 'Documentation',
    forPublishers: 'For developers',
    forBuyers: 'For data buyers',
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
      howItWorks: 'How it works',
      faq: 'FAQ',
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

  status: {
    checking: 'Checking status',
    operational: 'All systems operational',
    degraded: 'Elevated response times',
  },
};
