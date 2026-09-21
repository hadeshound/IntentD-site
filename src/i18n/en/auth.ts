/** Sign-in, registration and password recovery screens. */
export const auth = {
  auth: {
    guard: {
      checking: 'Checking your session…',
      redirecting: 'Taking you to sign in…',
    },

    login: {
      metaTitle: 'Sign in',
      metaDescription: 'Sign in to your IntentD account to manage data stream access.',
      eyebrow: 'Sign in',
      title: 'Welcome back',
      description:
        'Sign in to carry on with access checkout, or to check the status of your request.',
      noAccount: 'No account yet?',
      createAccount: 'Create an account',
      asideTitle: 'How the session works',
      aside: [
        {
          strong: 'The access token lives in tab memory.',
          body: 'It never reaches localStorage, so a third-party script cannot pull it out.',
        },
        {
          strong: 'Refresh runs through an HttpOnly cookie.',
          body: 'JavaScript cannot read it, on our side or anyone else’s.',
        },
        {
          strong: 'Changing the password ends every session.',
          body: 'Old refresh tokens are revoked immediately.',
        },
      ],
      form: {
        email: 'Email',
        password: 'Password',
        remember: 'Remember me',
        forgot: 'Forgot your password?',
        submit: 'Sign in',
        submitting: 'Signing in…',
      },
    },

    register: {
      metaTitle: 'Create account',
      metaDescription:
        'Create an IntentD account: get access to the data streams, or start monetizing your extension.',
      eyebrow: 'Register',
      title: 'Create your IntentD account',
      description:
        'Get access to the data streams, or start monetizing your extension today.',
      haveAccount: 'Already have an account?',
      login: 'Sign in',
      asideEyebrow: 'What happens next',
      asideTitle: 'We get in touch after you register',
      asideBody:
        'At this stage a manager issues the keys and the delivery settings: that is how we check your scenario fits before any documents are signed.',
      benefits: [
        'SDK integration takes about five minutes',
        'No ads and no content injection in your extension',
        'Data in Parquet + LZ4, ready for your warehouse',
        'PII filtering runs before an event is sent',
      ],
      form: {
        roleLegend: 'What brings you here?',
        roleBuyer: 'I want to buy data',
        roleBuyerHint: 'Access to the intent signal stream in Parquet.',
        rolePublisher: 'I build a browser extension',
        rolePublisherHint: 'Ad-free monetization through the edge SDK.',
        email: 'Work email',
        password: 'Password',
        passwordHint: 'At least 10 characters, with at least one letter and one digit.',
        company: 'Company name',
        companyHint: 'Needed when a delivery is reserved — you can add it later.',
        acceptBefore: 'I agree to the',
        acceptTerms: 'terms of use',
        acceptAnd: 'and the',
        acceptPrivacy: 'privacy policy',
        submit: 'Create account',
        submitting: 'Creating your account…',
      },
    },

    forgot: {
      metaTitle: 'Password recovery',
      metaDescription: 'Request a link to reset the password of your IntentD account.',
      eyebrow: 'Recovery',
      title: 'Reset your password',
      description:
        'Give the email attached to the account. We will send a link for setting a new password.',
      remembered: 'Remembered it?',
      backToLogin: 'Back to sign in',
      asideTitle: 'Why the answer is always the same',
      asideBody:
        'The form answers identically whether or not the address is registered. Otherwise it could be used as a directory: feed it addresses and read off who has an account.',
      asideBody2:
        'The link is valid for one hour and works exactly once. Changing the password ends every active session on the account.',
      form: {
        email: 'Account email',
        submit: 'Send the instructions',
        submitting: 'Sending…',
        successTitle: 'Check your inbox',
        successBody:
          'If that email is registered, we have sent password recovery instructions. The link is valid for one hour.',
        tryAnother: 'Use a different address',
      },
    },

    reset: {
      metaTitle: 'New password',
      metaDescription: 'Set a new password for your IntentD account using the link from the email.',
      eyebrow: 'New password',
      title: 'Set a new password',
      description:
        'Choose a password this account has not used before. The link works only once.',
      expired: 'Link expired?',
      requestNew: 'Request a new one',
      form: {
        newPassword: 'New password',
        passwordHint: 'At least 10 characters, with at least one letter and one digit.',
        confirmPassword: 'Repeat the password',
        submit: 'Set the new password',
        submitting: 'Saving…',
        incompleteTitle: 'The link is incomplete',
        incompleteBodyBefore: 'The link has no recovery token. Request a new email on the',
        incompleteLink: 'password recovery page',
        successTitle: 'Password updated',
        successBody: 'Every active session on this account has been ended. Sign in with the new password.',
        goToLogin: 'Go to sign in',
      },
    },

    errors: {
      emailRequired: 'Enter a work email',
      emailMax: 'Email must be 255 characters or fewer',
      emailInvalid: 'That address looks like a typo',
      passwordRequired: 'Enter your password',
      passwordMin: 'At least 10 characters',
      passwordMax: '72 characters or fewer',
      passwordLetter: 'Add at least one letter',
      passwordDigit: 'Add at least one digit',
      max255: '255 characters or fewer',
      roleRequired: 'Tell us what brings you here',
      termsRequired: 'We cannot create an account without your agreement to the terms',
      tokenInvalid: 'The link is damaged — request a new one',
      passwordsMismatch: 'The passwords do not match',
    },
  },
};
