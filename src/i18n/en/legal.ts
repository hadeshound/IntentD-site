/**
 * Terms and privacy policy.
 *
 * Bodies are HTML strings rather than plain text: the sections carry lists,
 * inline links and <strong>, and LegalDocument already renders each body with
 * set:html. The markup is authored here, never supplied by a visitor.
 *
 * `{{support}}`, `{{privacy}}` and `{{terms}}`/`{{pricing}}`/`{{schema}}` are
 * substituted by the page so an address or a route lives in one place.
 */
export const legal = {
  legal: {
    eyebrow: 'Legal',
    updatedAt: 'Last updated:',
    updatedPlaceholder: '[PLACEHOLDER — publication date]',
    contents: 'Sections',
    draftLabel: 'Draft.',

    terms: {
      metaTitle: 'Terms of use',
      metaDescription:
        'Terms of use of the IntentD platform: rules for extension developers, rules for data buyers, billing, liability and termination of access.',
      title: 'Terms of use',
      intro:
        'These terms govern access to the IntentD platform, both for extension developers integrating the SDK and for organisations receiving intent data deliveries.',
      notice:
        'The legal entity details, the governing law and the venue are marked as <span class="font-mono">[PLACEHOLDER]</span> and will be filled in after legal review. In its current revision this document is not a public offer.',
      sections: {
        definitions: {
          title: 'Definitions',
          body: `<p><strong>Platform</strong> — the IntentD service, comprising the edge SDK, the event intake and cleaning infrastructure, and the delivery channels.</p>
<p><strong>Publisher</strong> — a browser extension developer who has integrated the SDK.</p>
<p><strong>Data Buyer</strong> — an organisation granted access to the deliveries under one of the plans.</p>
<p><strong>Event</strong> — one anonymised record after filtering, whose structure is described in the <a href="{{schema}}">data schema</a>.</p>`,
        },
        account: {
          title: 'Account and access',
          body: `<p>An account is required to work with the platform. You are responsible for keeping your password safe and for everything done under your account.</p>
<p>Publisher API keys are issued individually and may not be passed to third parties. Report a leaked key immediately to <a href="mailto:{{support}}">{{support}}</a> — we will revoke it and issue a new one.</p>
<p>We may suspend access where we suspect an account has been compromised, limits are being abused, or these terms are being broken.</p>`,
        },
        publishers: {
          title: 'Publisher obligations',
          body: `<p>By integrating the SDK you confirm that you:</p>
<ul>
<li>have the right to distribute the extension and to change its code;</li>
<li>have disclosed the collection of anonymised telemetry in the extension privacy policy and in the store listing, as the Chrome Web Store and Mozilla Add-ons rules require;</li>
<li>will not modify the SDK to bypass the privacy filters, and will not feed it data obtained by other means;</li>
<li>will not use the platform in extensions aimed at children, or in extensions on medical, financial or otherwise sensitive subjects, without separate agreement.</li>
</ul>
<p>Breaking any of these points is grounds for disabling the key and withholding unpaid remuneration for the period of the breach.</p>`,
        },
        buyers: {
          title: 'Data buyer obligations',
          body: `<p>By taking access to the deliveries you undertake:</p>
<ul>
<li>not to attempt de-anonymisation — matching <code class="font-mono">anon_uid</code> to a person, a device or an account in another system;</li>
<li>not to resell or pass on raw deliveries to third parties without a separate written agreement;</li>
<li>to use the data in accordance with the applicable data protection law of your jurisdiction;</li>
<li>to protect the files you receive at least to the standard your organisation applies to confidential information.</li>
</ul>`,
        },
        billing: {
          title: 'Plans and billing',
          body: `<p>Current plans are published on the <a href="{{pricing}}">pricing page</a>. Prices exclude applicable taxes.</p>
<p>Each plan carries a one-off setup fee, charged when the stream is provisioned, and a recurring monthly fee. The setup fee covers the dedicated bucket, the keys and the delivery configuration, and is not refunded once provisioning is complete.</p>
<p>At this stage access is arranged by request: you pick a plan, we get in touch and we sign the documents. Automatic charging through a payment provider will be added separately, and until then the site accepts no payment details.</p>
<p>Going over the active user allowance does not cut off the stream. We record the overage and propose moving to the next plan from the following billing period.</p>`,
        },
        availability: {
          title: 'Service availability',
          body: `<p>We aim to keep event intake and delivery running continuously. A guaranteed availability level (SLA) is stated per plan and is fixed in a separate agreement for Enterprise.</p>
<p>Planned maintenance is announced in advance. During short outages the SDK keeps the event queue locally and retries.</p>`,
        },
        liability: {
          title: 'Liability',
          body: `<p>The platform is provided “as is”. We are not liable for lost profit or for indirect or incidental losses arising from use of, or inability to use, the service.</p>
<p>Aggregate liability under the contract is limited to the amount you actually paid for the three months preceding the event giving rise to the claim.</p>`,
        },
        termination: {
          title: 'Termination of access',
          body: `<p>You may stop using the platform at any time by removing the SDK from your extension or by not renewing the subscription.</p>
<p>We may end access on a material breach of these terms, notifying you at the email address on the account. Data already delivered stays with the buyer under the terms in force at the time of delivery.</p>`,
        },
        changes: {
          title: 'Changes to these terms',
          body: `<p>We may update these terms. We announce material changes by email no later than 14 days before they take effect. Continuing to use the platform after that date means you accept the new revision.</p>
<p>Questions about this document: <a href="mailto:{{support}}">{{support}}</a>.</p>`,
        },
        requisites: {
          title: 'Details and governing law',
          body: `<p>Platform operator: <span class="font-mono">[PLACEHOLDER]</span></p>
<p>Registered address: <span class="font-mono">[PLACEHOLDER]</span></p>
<p>Governing law and venue for disputes: <span class="font-mono">[PLACEHOLDER]</span></p>`,
        },
      },
    },

    privacy: {
      metaTitle: 'Privacy policy',
      metaDescription:
        'How IntentD processes data: what the SDK collects, what is stripped on the device, which account data we store and how data subject rights are exercised.',
      title: 'Privacy policy',
      intro:
        'IntentD is built so that personal data does not reach the stream. This page describes what we collect on the portal, what the SDK collects in the browser, and what is discarded before anything is sent.',
      notice:
        'The operator details, the sub-processor list and the publication date are marked as <span class="font-mono">[PLACEHOLDER]</span> pending legal review.',
      sections: {
        scope: {
          title: 'Scope',
          body: `<p>This document describes two independent data flows:</p>
<ul>
<li><strong>Account data</strong> — what you tell us yourself: email, the password as a hash, company name, the contents of contact forms.</li>
<li><strong>Extension telemetry</strong> — the anonymised signals the edge SDK collects in the browsers of users of connected extensions.</li>
</ul>
<p>Separate rules, described below, apply to the second flow: it is designed so that personal data does not enter it.</p>`,
        },
        'account-data': {
          title: 'Account data',
          body: `<p>When you register and use the portal we store:</p>
<ul>
<li>the email address — the account identifier and the contact channel;</li>
<li>the password hash (bcrypt) — the original password is not available to us and cannot be recovered;</li>
<li>the company name and the role you chose — data buyer or publisher;</li>
<li>a technical action log: sign-in, sign-out, password change, plan request, with the IP address and user agent — for investigating security incidents;</li>
<li>the contents of the contact forms you send.</li>
</ul>
<p>Sessions are held in an HttpOnly cookie carrying a refresh token; only its hash is in the database. The access token exists solely in tab memory and is never written to localStorage.</p>`,
        },
        telemetry: {
          title: 'What the SDK collects',
          body: `<p>The SDK builds an event out of the technical metadata of a visit. The field list is published in the <a href="{{schema}}">data schema</a> and covers the cleaned URL, the root domain, the extracted search query, the browser language, the device type and the country code.</p>
<p>Filtering runs on the device before anything is sent:</p>
<ul>
<li>query parameters that look like identifiers, tokens, emails or phone numbers are stripped;</li>
<li>events from the domains of banks, payment systems, mail services, and medical and government portals are discarded entirely;</li>
<li>authentication, password recovery and payment pages are discarded;</li>
<li>the session identifier is turned into an irreversible HMAC hash, <code class="font-mono">anon_uid</code>.</li>
</ul>
<p>We neither read nor set cookies of extension users. Page content, typed text, passwords and files are not collected in any form.</p>`,
        },
        'legal-basis': {
          title: 'Legal bases',
          body: `<p>Account data is processed to perform the contract with you, and on the basis of our legitimate interest in keeping the service secure.</p>
<p>Extension telemetry is processed solely on the basis of the user's explicit consent (GDPR art. 6(1)(a); for storage on the device, ePrivacy art. 5(3)). The SDK shows the consent prompt when the extension is installed or in its popup, and collects, stores and sends nothing until the user presses “Allow”. Declining does not limit how the extension itself works.</p>
<p><strong>Withdrawing consent.</strong> Consent can be withdrawn at any time in the extension settings. After withdrawal collection stops, and unsent events and the installation identifier are deleted from the device. Withdrawal does not affect the lawfulness of processing carried out before it. Anonymised data already transferred is deleted once the retention periods below expire; a request can be sent to <a href="mailto:{{privacy}}">{{privacy}}</a>.</p>
<p>The user's decision is stored only in their browser. When the consent text changes — because new data categories appear, for example — consent is requested again.</p>
<p>The extension publisher is responsible for invoking the consent prompt in their interface and for disclosing the collection in the store listing.</p>
<p><span class="font-mono">[LEGAL REVIEW NEEDED]</span></p>`,
        },
        retention: {
          title: 'Retention periods',
          body: `<ul>
<li>Account data — while the account is active, and 12 months after it is deleted.</li>
<li>Action log — 12 months.</li>
<li>Anonymised deliveries — 30 days in hot storage, up to 90 days in the archive.</li>
<li>Contact form messages — 24 months.</li>
</ul>`,
        },
        sharing: {
          title: 'Sharing with third parties',
          body: `<p>Anonymised deliveries are passed to data buyers under the <a href="{{terms}}">terms of use</a>, which include an outright ban on de-anonymisation.</p>
<p>We do not sell your account data and do not pass it on for advertising. Transfer is possible only to infrastructure processors (hosting, storage) and on a justified request from an authorised body.</p>
<p>Sub-processor list: <span class="font-mono">[PLACEHOLDER]</span>.</p>`,
        },
        rights: {
          title: 'Your rights',
          body: `<p>You can request access to your account data, its correction, deletion or export, and you can withdraw consent to mailings. Send the request to <a href="mailto:{{privacy}}">{{privacy}}</a> from the address on the account.</p>
<p>For the telemetry stream, deleting a specific record is technically impossible: it carries no field that would tie an event to a person. That is a consequence of the design, not a refusal to honour the right.</p>
<p>A data processing agreement (DPA) is provided on request — mention it in the <a href="{{contact}}">contact form</a>.</p>`,
        },
        security: {
          title: 'Security',
          body: `<ul>
<li>passwords are stored as bcrypt hashes;</li>
<li>refresh tokens are stored as hashes and revoked when the password changes;</li>
<li>every API call is rate limited and logged;</li>
<li>delivery access is granted through separate per-tenant keys.</li>
</ul>
<p>Report a suspected leak to <a href="mailto:{{privacy}}">{{privacy}}</a>.</p>`,
        },
        contacts: {
          title: 'Contacts and details',
          body: `<p>Data controller: <span class="font-mono">[PLACEHOLDER]</span></p>
<p>Address: <span class="font-mono">[PLACEHOLDER]</span></p>
<p>Data protection contact: <a href="mailto:{{privacy}}">{{privacy}}</a></p>`,
        },
      },
    },
  },
};
