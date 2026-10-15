/**
 * Pricing copy. The plans are paid by extension developers and are priced by the
 * number of clean events the extension sends each month. Prices and event
 * allowances are NOT here: they come from GET /public/plans, so the page cannot advertise
 * a number the backend would not honour.
 */
export const pricing = {
  pricing: {
    metaTitle: 'Plans for extension developers',
    metaDescription:
      'Starter, Growth, Scale and Enterprise plans for browser extension developers, priced by the number of clean events your extension sends. Compare event limits, support and SLA.',
    eyebrow: 'Pricing',
    titleBefore: 'Plans priced by the volume of clean events',
    titleAccent: 'your extension sends',
    subtitle: 'Pick a plan by the number of clean events your extension sends us each month.',
    subtitleLong:
      'Pick a plan by the number of clean events your extension sends us each month. Setup is a one-off fee, then you pay for the volume you use.',
    compareAll: 'Compare every feature',
    teaserTitle: 'Plans for your extension',
    teaserBody: 'Pick a plan by the number of clean events your extension sends us each month.',
    teaserAllowance: 'Up to {events} clean events / mo',
    fallbackNote:
      'The catalogue is being served from a local copy right now — a manager will confirm the current terms.',

    /** Unit labels on a plan card. */
    setupFee: 'setup, one-off',
    perMonth: '/ mo',
    eventsAllowance: 'Up to {events} clean events / mo',
    unlimitedEvents: 'Unlimited clean events',
    customVolume: 'Volume agreed individually',
    customPrice: 'Custom',

    /** API enum values, spelled out for a reader. */
    slaBestEffort: 'Best effort',
    supportLabels: {
      email: 'Email (24 h)',
      priority_24_7: 'Priority 24/7',
      dedicated_manager: 'Dedicated manager',
      dedicated_team: 'Dedicated team',
    },

    custom: {
      title: 'Need a non-standard volume?',
      body: 'Very large extensions, custom event volumes and the SLA are discussed separately, together with the legal side.',
      cta: 'Discuss Enterprise',
    },

    cta: {
      subscribe: 'Subscribe',
      contactSales: 'Contact sales',
    },

    plans: {
      starter: {
        audience: 'For extensions getting started',
        features: [
          'Email support (24 h)',
          'Best-effort availability',
        ],
        highlightLabel: '',
      },
      growth: {
        audience: 'For growing extensions',
        features: [
          '24/7 priority support',
          '99.5% availability SLA',
        ],
        highlightLabel: 'Most popular',
      },
      scale: {
        audience: 'For large-scale extensions',
        features: [
          'Dedicated manager',
          '99.7% availability SLA',
        ],
        highlightLabel: '',
      },
      enterprise: {
        audience: 'For publishers with custom needs',
        features: [
          'Dedicated team',
          '99.9% availability SLA',
        ],
        highlightLabel: '',
      },
    },

    matrix: {
      eyebrow: 'Comparison',
      title: 'What each plan includes',
      caption: 'Feature comparison of the Starter, Growth, Scale and Enterprise plans',
      featureColumn: 'Feature',
      groups: [
        {
          title: 'Volume',
          rows: [
            {
              label: 'Clean events per month',
              values: {
                starter: '100,000',
                growth: '1,000,000',
                scale: '10,000,000',
                enterprise: 'Agreed individually',
              },
            },
            {
              label: 'Approx. commercial intents',
              values: {
                starter: '~25,000',
                growth: '~250,000',
                scale: '~2,500,000',
                enterprise: 'Agreed individually',
              },
            },
          ],
        },
        {
          title: 'Support and terms',
          rows: [
            {
              label: 'Support channel',
              values: {
                starter: 'Email (24 h)',
                growth: 'Priority 24/7',
                scale: 'Dedicated manager',
                enterprise: 'Dedicated team',
              },
            },
            {
              label: 'Availability SLA',
              values: {
                starter: 'Best effort',
                growth: '99.5%',
                scale: '99.7%',
                enterprise: '99.9%',
              },
            },
            {
              label: 'DPA and legal support',
              values: {
                starter: 'Standard',
                growth: 'Standard',
                scale: 'Standard',
                enterprise: 'Individual',
              },
            },
          ],
        },
      ],
    },

    faqEyebrow: 'Billing and limits',
    faqTitle: 'Pricing questions',
    faq: [
      {
        question: 'How are clean events counted?',
        answer:
          'A clean event is one record that passed the SDK filters and reached our ingest service during the billing month. Events that are stripped entirely (banking domains, passwords, tokens) are not counted against your plan.',
      },
      {
        question: 'What happens if we go over the limit?',
        answer:
          'The SDK keeps working. We record the overage and discuss moving to the next plan — nothing is charged retroactively.',
      },
      {
        question: 'Can we change plan mid-month?',
        answer:
          'Yes. The change takes effect from the next billing cycle, and the current plan and its event volume stay active until the end of the paid period.',
      },
      {
        question: 'Do you guarantee that my data will be sold?',
        answer:
          'No. IntentD charges for collecting, cleaning and delivering your data. What you do with it is up to you: sell through our marketplace partners, export it and sell it yourself, or analyse it internally. Actual sales depend on category, geography and demand.',
      },
      {
        question: 'What is the setup fee for?',
        answer:
          'It covers the one-off setup of your account and the SDK configuration for your extension. It is charged once, when the plan is activated.',
      },
      {
        question: 'How is the contract signed?',
        answer:
          'After your request a manager sends the terms and the DPA. Enterprise contracts are agreed individually, including the SLA.',
      },
    ],
  },

  checkout: {
    metaTitle: 'Activate a plan',
    metaDescription: 'Request activation of an IntentD plan for your extension.',
    eyebrow: 'Checkout',
    title: 'Request activation of your plan',
    intro:
      'Send the request and a manager will contact you to confirm the terms and activate the plan for your extension.',
    selectedPlan: 'Selected plan',
    loading: 'Loading the plan terms…',
    volume: 'Clean events',
    eventsPerMonth: 'events / mo',
    unlimited: 'Unlimited',
    audience: 'Built for',
    setupFee: 'Setup fee (one-off)',
    monthlyFee: 'Monthly fee',
    sla: 'SLA',
    support: 'Support',
    noCharge:
      'Nothing is charged at this step. We record the request and get in touch to confirm the terms.',
    changePlan: 'Change plan',
    formTitle: 'Activation details',
    formIntroPrefix: 'The request will be attached to account',
    companyLabel: 'Company name',
    companyHintExisting: 'Saved in your profile — adjust it if needed.',
    companyHintNew: 'We need the company name to prepare the agreement, so this field is required.',
    notesLabel: 'Note for the manager',
    notesPlaceholder: 'Your extension, its expected monthly event volume, preferred start date.',
    submit: 'Request activation',
    submitting: 'Sending the request…',
    guarantees: [
      'No payment details are requested or accepted at this stage.',
      'Sending the same plan twice creates no duplicate — we will see the original.',
    ],
    enterprise: {
      title: 'Enterprise is arranged separately',
      body: 'Custom volumes and the SLA are agreed individually, so this plan does not go through self-service checkout.',
      cta: 'Contact sales',
    },
    noPlan: {
      title: 'No plan selected',
      body: 'Go back to pricing and pick the plan for your extension.',
      cta: 'Go to pricing',
    },
    planError: {
      title: 'Could not load the plan',
      body: 'That plan is not in the catalogue. Pick another one on the pricing page.',
      cta: 'To pricing',
      loadFailed: 'Could not load the plans. Refresh the page.',
    },
    modal: {
      title: 'Request received',
      description:
        'Thank you! Our manager will contact you at the email you gave to confirm the terms and activate your plan.',
      planLabel: 'Plan',
      contactLabel: 'Contact',
      home: 'Back to home',
      docs: 'Open the documentation',
    },
    errors: {
      planRequired: 'Pick a plan',
      companyMin: 'Give the legal or working name of the company',
      max255: '255 characters or fewer',
      max2000: '2000 characters or fewer',
    },
  },
};
