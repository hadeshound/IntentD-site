/**
 * Pricing copy. Prices, user allowances and delivery cadence are NOT here:
 * they come from GET /public/plans, so the page cannot advertise a number the
 * backend would not honour. Plan names stay in English in every language.
 */
export const pricing = {
  pricing: {
    metaTitle: 'Pricing',
    metaDescription:
      'Transparent pricing for the IntentD intent data stream: Starter, Growth, Scale and Enterprise. Compare user allowances, delivery cadence and field coverage.',
    eyebrow: 'Pricing',
    titleBefore: 'Transparent pricing for access to the',
    titleAccent: 'data stream',
    subtitle: 'Choose the volume of signals your analytics systems need.',
    subtitleLong:
      'Choose the volume of signals your analytics systems need. You pay for the stream, not for space in an interface.',
    compareAll: 'Compare every feature',
    fallbackNote:
      'The catalogue is being served from a local copy right now — a manager will confirm the current terms.',

    /** Unit labels on a plan card. */
    setupFee: 'setup, one-off',
    perMonth: '/ mo',
    activeUsers: 'active users',
    unlimitedUsers: 'Unlimited active users',
    customVolume: 'Volume agreed individually',
    customPrice: 'Custom',

    /** API enum values, spelled out for a reader. */
    deliveryLabels: {
      daily: 'Once a day',
      hourly: 'Once an hour',
      hourly_direct: 'Hourly + direct S3/GCS access',
      realtime: 'Real-time Firehose',
    },
    slaBestEffort: 'Best effort',
    supportLabels: {
      email: 'Email (24 h)',
      priority_24_7: 'Priority 24/7',
      dedicated_manager: 'Dedicated manager',
      dedicated_team: 'Dedicated team',
    },

    custom: {
      title: 'Need a non-standard volume?',
      body: 'Raw Firehose, your own filtering rules and direct bucket access are discussed separately — together with the SLA and the legal side.',
      cta: 'Discuss Enterprise',
    },

    cta: {
      subscribe: 'Subscribe',
      contactSales: 'Contact sales',
    },

    plans: {
      starter: {
        audience: 'Startups and local marketing agencies',
        features: [
          'Up to 10,000 active users',
          'Daily S3 export (Parquet)',
          'Basic fields and PII cleaning',
          'Email support',
        ],
        highlightLabel: '',
      },
      growth: {
        audience: 'AdTech platforms and mid-size E-commerce',
        features: [
          'Up to 100,000 active users',
          'Hourly S3 sync',
          'Extended fields (geo, device, lang)',
          '24/7 priority support',
        ],
        highlightLabel: 'Most popular',
      },
      scale: {
        audience: 'Large AdTech, DSP, DMP, CDP platforms',
        features: [
          'Up to 500,000 active users',
          'Hourly + direct S3/GCS',
          'Custom filters',
          'Dedicated manager',
        ],
        highlightLabel: '',
      },
      enterprise: {
        audience: 'Funds, research institutes, data brokers',
        features: [
          'Unlimited event stream (Raw Firehose)',
          'Custom filtering rules',
          'Dedicated S3/GCS channel',
          '99.9% SLA',
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
          title: 'Volume and delivery',
          rows: [
            {
              label: 'Active users per month',
              values: {
                starter: '10,000',
                growth: '100,000',
                scale: '500,000',
                enterprise: 'Unlimited',
              },
            },
            {
              label: 'Delivery frequency',
              values: {
                starter: 'Once a day',
                growth: 'Once an hour',
                scale: 'Hourly + direct access',
                enterprise: 'Real-time Firehose',
              },
            },
            {
              label: 'Format',
              values: {
                starter: 'Parquet + LZ4',
                growth: 'Parquet + LZ4',
                scale: 'Parquet + LZ4',
                enterprise: 'Parquet + LZ4 / Raw JSONL',
              },
            },
            {
              label: 'Delivery into your own bucket',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'S3 / GCS direct access',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: 'What the data contains',
          rows: [
            {
              label: 'Cleaned URL and domain',
              values: { starter: true, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'Search intents',
              values: {
                starter: 'Basic',
                growth: 'Full + categories',
                scale: 'Full + categories',
                enterprise: 'Full + custom',
              },
            },
            {
              label: 'Geo and device type',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'Custom filtering rules',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
            {
              label: 'Schema extension',
              values: { starter: false, growth: false, scale: true, enterprise: true },
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
        question: 'How are active users counted?',
        answer:
          'An active user is one installation that sent at least one cleaned event during the billing month. Installations that never sent anything are not counted.',
      },
      {
        question: 'What happens if we go over the limit?',
        answer:
          'The stream is not cut off. We record the overage and discuss moving to the next plan — nothing is charged retroactively.',
      },
      {
        question: 'Can we change plan mid-month?',
        answer:
          'Yes. The change takes effect from the next delivery cycle, and access to the current volume is kept until the end of the paid period.',
      },
      {
        question: 'What is the setup fee for?',
        answer:
          'It covers one-off provisioning: a dedicated bucket, keys, delivery configuration and filtering rules. It is charged once, when the stream is opened.',
      },
      {
        question: 'How is the contract signed?',
        answer:
          'After your request a manager sends the terms and the DPA. Enterprise contracts are agreed individually, including the SLA and the filtering rules.',
      },
    ],
  },

  checkout: {
    metaTitle: 'Access checkout',
    metaDescription: 'Request access to the IntentD Data Stream.',
    eyebrow: 'Checkout',
    title: 'Request access to the IntentD Data Stream',
    intro:
      'Once the request is confirmed, a dedicated S3 bucket of data will be reserved for your account.',
    selectedPlan: 'Selected plan',
    loading: 'Loading the plan terms…',
    volume: 'Active users',
    usersPerMonth: 'users / mo',
    unlimited: 'Unlimited',
    delivery: 'Delivery',
    audience: 'Built for',
    setupFee: 'Setup fee (one-off)',
    monthlyFee: 'Monthly fee',
    sla: 'SLA',
    support: 'Support',
    noCharge:
      'Nothing is charged at this step. We record the request and get in touch to issue test keys.',
    changePlan: 'Change plan',
    formTitle: 'Activation details',
    formIntroPrefix: 'The request will be attached to account',
    companyLabel: 'Company name',
    companyHintExisting: 'Saved in your profile — adjust it if needed.',
    companyHintNew: 'A separate S3 bucket is reserved per company, so this field is required.',
    notesLabel: 'Note for the manager',
    notesPlaceholder: 'Verticals of interest, preferred start date, filtering requirements.',
    submit: 'Request activation',
    submitting: 'Sending the request…',
    guarantees: [
      'No payment details are requested or accepted at this stage.',
      'Sending the same plan twice creates no duplicate — we will see the original.',
    ],
    enterprise: {
      title: 'Enterprise is arranged separately',
      body: 'Raw Firehose, custom filters and the SLA are agreed individually, so this plan does not go through self-service checkout.',
      cta: 'Contact sales',
    },
    noPlan: {
      title: 'No plan selected',
      body: 'Go back to pricing and pick the stream volume you need.',
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
        'Thank you! Our manager will contact you at the email you gave to issue test API keys and configure delivery.',
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
