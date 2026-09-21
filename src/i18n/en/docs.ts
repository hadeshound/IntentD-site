/** Documentation prose. */
export const docs = {
  docs: {
    layout: {
      eyebrow: 'Documentation',
      contents: 'Contents',
    },

    api: {
      metaTitle: 'API and data format',
      metaDescription:
        'IntentD technical specifications: connecting the edge SDK, the Ingest API with HMAC signing, the event schema, the Parquet + LZ4 format and the structure of S3 deliveries.',
      heading: 'IntentD integration and data format',
      intro:
        'Technical specifications for extension developers and for data engineers on the buyer side. Everything needed to start sending events or reading deliveries.',
      sections: {
        quickstart: { label: 'SDK Quickstart', audience: 'Publishers' },
        ingest: { label: 'Ingest API', audience: 'Publishers' },
        schema: { label: 'Data schema', audience: 'Data Buyers' },
        provenance: { label: 'Data Provenance', audience: 'Data Buyers' },
        delivery: { label: 'Storage and delivery', audience: 'Data Buyers' },
        examples: { label: 'Reading examples', audience: 'Data Buyers' },
      },

      quickstart: {
        title: 'SDK Quickstart',
        body: 'The SDK runs in the extension background script and needs no access to page DOM. The bundle is built in the dashboard specifically for your extension: the keys, the encryption key and the extension ID are already inside, and there is no init to call by hand. Before the user consents the SDK collects nothing —',
        consentLink: 'how the consent prompt works',
        manifestTitle: 'Manifest requirements',
        manifest: {
          version: 'the SDK uses no eval and loads no remote code.',
          storage:
            'permissions: events accumulate locally and go out as one bucket per day.',
          navigation: '(or tabs) — the source of navigation events.',
          host: 'in host_permissions.',
        },
        note: 'Before downloading, enter your store extension ID in the dashboard: the bundle refuses to run inside any other extension and says so.',
      },

      ingest: {
        title: 'Ingest API',
        baseUrl: 'Base URL',
        auth: 'Authentication',
        authValue: 'X-API-Key + HMAC-SHA256 over the body',
        endpointsTitle: 'Endpoints',
        tableMethod: 'Method',
        tablePath: 'Path',
        tablePurpose: 'Purpose',
        tableLimit: 'Limit',
        requestTitle: 'Example request',
        errorsTitle: 'Error codes',
        tableHttp: 'HTTP',
        tableCode: 'Code',
        tableMeaning: 'Meaning',
        retryNote:
          'On network errors, 429 and 503 the SDK keeps the queue and retries once an hour. The binary bucket format and the encryption scheme are documented openly —',
        specLink: 'the INTD v1 specification',
        endpoints: {
          register: {
            description: 'Registers an installation: the session and the bundle identifier. Idempotent.',
            limit: '120 requests / min per IP',
          },
          bucket: {
            description: 'An encrypted event bucket (X25519 + AES-256-GCM). Once a day, or earlier.',
            limit: '48 buckets / day per installation',
          },
          tamper: {
            description: 'The SDK reporting a failed integrity check.',
            limit: '30 requests / min per IP',
          },
        },
        errors: {
          BUCKET_INVALID_FORMAT: 'The bucket did not decrypt, or failed the format and CRC32 check',
          API_KEY_REVOKED: 'The key is revoked — the SDK switches itself off',
          INVALID_SIGNATURE: 'The HMAC signature did not match the request body',
          CLOCK_SKEW: 'The client clock is more than 5 minutes out; the response carries server_time',
          SUBSCRIPTION_INACTIVE: 'No active subscription — events stay in the queue',
          WRONG_EXTENSION: 'The bundle is running in an extension it was not issued for',
          FINGERPRINT_MISMATCH: 'The environment does not match the session — the SDK registers again',
          BUCKET_ALREADY_RECEIVED: 'This bucket has already been accepted',
          BUCKET_TOO_LARGE: 'More than 10,000 events or 10 MB — the SDK splits the bucket',
          RATE_LIMITED: 'The request rate or the daily bucket limit was exceeded',
        },
      },

      schema: {
        title: 'Data schema',
        body: 'One Parquet row is one cleaned event. There are no personal-data fields in the schema by construction: they are dropped in the browser, before anything is sent.',
        caption: 'Event fields in the Parquet delivery',
        tableField: 'Field',
        tableType: 'Type',
        tableDescription: 'Description',
        fields: {
          event_id: 'Unique GUID of the event',
          timestamp: 'Unix timestamp in milliseconds, UTC',
          anon_uid: 'HMAC hash of the user session, irreversible',
          clean_url: 'The URL after PII parameters are stripped',
          search_query: 'The extracted search intent, when there is one',
          lang: 'Browser language, BCP 47',
          geo_country: 'ISO country code, resolved from the IP at the edge',
          device_type: 'desktop / mobile / tablet',
          domain: 'Root domain, without subdomains',
        },
      },

      provenance: {
        title: 'Data Provenance',
        items: [
          'Every event comes only from users who explicitly pressed “Allow” in the consent prompt (GDPR art. 6(1)(a)). Before consent the SDK creates no identifier and stores no events.',
          'Each accepted bucket carries the version of the consent text; the server rejects buckets without it and records the version in the intake log. When the text changes, consent is asked again.',
          'When consent is withdrawn the SDK stops collecting and deletes unsent events on the device; a later grant creates a new pseudonym unrelated to the previous one.',
          'Whether and when a particular user consented is not stored on the server: the accepted bucket and the recorded text version are the evidence.',
        ],
      },

      delivery: {
        title: 'Storage and delivery',
        facts: {
          format: 'Format',
          storage: 'Storage',
          hot: 'Hot access',
          archive: 'Archive',
          hotValue: '30 days',
          archiveValue: '90 days',
        },
        pathsTitle: 'Path structure',
        body: 'Partitioning by date and tenant lets you read the slice you need without scanning the whole bucket. Growth and above additionally support syncing into your own bucket.',
      },

      examples: {
        title: 'Reading examples',
        body: 'The delivery reads with any standard Parquet stack. Below are minimal examples in Python and Go.',
      },

      cta: {
        title: 'Ready to connect?',
        body: 'Create an account to get the keys and reserve a delivery. If you need a data sample before signing, write to us.',
        primary: 'Create account',
        secondary: 'Request a sample',
        note: 'The full OpenAPI specification of the portal lives in the repository:',
        noteAfter: 'A public hosted version will arrive with the dashboard —',
        noteLink: 'tell us you need it',
      },

      snippets: {
        install: `# Dashboard → Extensions → SDK → Download
# The intentd-<name>.min.js file already carries your keys and configuration.
cp ~/Downloads/intentd-my-extension.min.js ./extension/intentd.min.js`,
        init: `// background.js — first line, at the top level.
// init is called for you; listeners must be registered when the service
// worker starts, otherwise Manifest V3 will not deliver the events.
import './intentd.min.js';

// Optional: status and a manual flush.
// const status = await IntentD.status();
// await IntentD.flush();`,
        request: `POST /v1/telemetry/bucket HTTP/1.1
Host: api.intentd.io
Content-Type: application/json
X-API-Key: ext_...
X-Timestamp: 1758000000
# hex(HMAC-SHA256(secret, "intentd-v2|bucket|<X-Timestamp>|<X-API-Key>|" + hex(SHA-256(body))))
X-Signature: d49d3b20...

{
  "bucket_id": "7c0e…", "session_id": "2b91…",
  "ephemeral_public_key": "base64(32 bytes)",
  "iv": "base64(12 bytes)",
  "encrypted_key": "base64(48 bytes)",
  "ciphertext": "base64(AES-256-GCM of the INTD bucket)",
  "events_count": 1234, "bytes_size": 45678, "bucket_version": 1,
  "client_ts": 1758000000, "fingerprint_hash": "5c9a96…"
}`,
        python: `import pandas as pd

# A tenant's daily partition in S3.
path = "s3://intentd-delivery/year=2026/month=09/day=11/tenant=ext_acme__7c0e.parquet.lz4"

frame = pd.read_parquet(
    path,
    columns=["timestamp", "domain", "search_query", "geo_country"],
    storage_options={
        "key": "YOUR_ACCESS_KEY",
        "secret": "YOUR_SECRET_KEY",
    },
)

top_domains = frame.groupby("domain").size().sort_values(ascending=False).head(20)
print(top_domains)`,
        go: `package main

import (
    "context"
    "log"

    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
    ctx := context.Background()

    cfg, err := config.LoadDefaultConfig(ctx)
    if err != nil {
        log.Fatal(err)
    }

    client := s3.NewFromConfig(cfg)

    object, err := client.GetObject(ctx, &s3.GetObjectInput{
        Bucket: ptr("intentd-delivery"),
        Key:    ptr("year=2026/month=09/day=11/tenant=ext_acme__7c0e.parquet.lz4"),
    })
    if err != nil {
        log.Fatal(err)
    }
    defer object.Body.Close()

    // From here on, any Parquet reader will do -- parquet-go, for example.
    log.Printf("received %d bytes", *object.ContentLength)
}

func ptr(s string) *string { return &s }`,
      },
    },

    sdk: {
      metaTitle: 'SDK: integration and user consent',
      metaDescription:
        'How to add the IntentD edge SDK to a Manifest V3 extension, and how the user consent prompt works: the popup banner, the consent tab, and withdrawing consent.',
      backToApi: '← API documentation',
      eyebrow: 'Publishers',
      title: 'SDK integration and user consent',
      intro:
        'The SDK collects URLs and search queries, so under GDPR (art. 6) and ePrivacy (art. 5(3)) it needs explicit user consent. Until the user presses “Allow”, the SDK creates no identifier, stores no events and contacts no server. Your extension works the same either way.',

      install: {
        title: 'Installation',
        body: 'In the dashboard: Extensions → SDK → “Download”. Unpack the archive into the extension root.',
        archiveLabel: 'archive',
        files: `intentd.min.js        the SDK carrying your extension keys — do not rename
intentd-consent.html  the consent page for extensions without a popup
intentd-consent.js    that page's script (MV3 forbids inline scripts)`,
        manifest: `{
  "manifest_version": 3,
  "background": { "service_worker": "background.js", "type": "module" },
  "action": { "default_popup": "popup.html" },
  "permissions": ["storage", "webNavigation", "tabs", "alarms", "unlimitedStorage"],
  "host_permissions": ["https://api.intentd.io/*"]
}`,
        background: `// background.js — first line, at the top level
import './intentd.min.js';`,
      },

      consent: {
        title: 'Consent Flow',
        withPopupTitle: 'An extension with a popup',
        withPopupBodyBefore: 'Call',
        withPopupBodyAfter:
          'in your popup. If you do not, the user only ever sees the consent tab shown at install time, and the SDK stays inactive until they choose — making the call is the extension’s responsibility.',
        popupHtml: `<div id="consent-root"></div>
<!-- ... your extension UI ... -->
<script src="intentd.min.js"></script>
<script src="popup.js"></script>`,
        popupJs: `// The banner appears only when there is no consent for the current text version.
// The promise resolves with the user's choice: true — allowed, false — declined.
IntentD.mountConsent(document.getElementById('consent-root'));`,
        shadowDom:
          'The banner renders in a closed Shadow DOM: your styles do not affect it, its styles do not affect you. The theme (light or dark) is picked from the popup background, and the width ranges from 320 to 800 px. “Decline” and “Allow” are the same size, and nothing is pre-ticked. After consent the banner disappears for good; after a decline it comes back the next time the popup opens.',
        withoutPopupTitle: 'An extension without a popup',
        withoutPopupBody:
          'The SDK opens the intentd-consent.html tab itself at install time and at browser start, for as long as there is no consent. A second tab is never opened — the existing one is focused instead. The tab closes once the choice is made.',
        triggersTitle: 'When the prompt appears',
        triggersHead: ['Event', 'Behaviour'],
        triggers: [
          ['Extension installed or updated', 'The consent tab, when there is no consent for the current text'],
          ['Browser start', 'The consent tab — only for extensions without a popup'],
          ['Popup opened', 'The banner, if you call mountConsent and there is no consent'],
          ['Any other service worker wake-up', 'Nothing is shown'],
          ['Consent already given', 'The banner is no longer shown'],
          ['Consent text version changed', 'Consent is requested again'],
        ],
        revokeTitle: 'Withdrawing consent',
        revokeBody:
          'The consent text promises the user they can withdraw it in the settings. Add a toggle to your options page:',
        optionsJs: `const allowed = await IntentD.hasConsent();

// "Withdraw consent" button
await IntentD.revokeConsent();   // collection stopped, local data deleted

// "Allow collection" button (after a decline, for instance)
await IntentD.grantConsent();`,
        warningTitle: 'Do not add the consent page to web_accessible_resources',
        warningBody:
          'Extension pages are reachable by the extension itself without that list. If the page becomes web-accessible, any site can frame it and quietly harvest an “Allow” click — and consent obtained that way is not valid.',
      },

      api: {
        title: 'API',
        head: ['Method', 'Purpose'],
        rows: [
          ['IntentD.mountConsent(element)', 'Show the banner in the popup when there is no consent. Promise<boolean>.'],
          ['IntentD.hasConsent()', 'Whether consent exists for the current text version. Promise<boolean>.'],
          ['IntentD.getConsentState()', "'approved' | 'declined' | null."],
          ['IntentD.grantConsent()', 'Record consent (from your own UI).'],
          ['IntentD.revokeConsent()', 'Withdraw: collection stops, the queue and the installation identifier are deleted.'],
          ['IntentD.openConsentTab()', 'Open the consent tab manually (or focus the open one).'],
          ['IntentD.status()', 'SDK state, including consent.'],
        ],
        storageNote:
          'The decision is stored only in chrome.storage.local of that browser profile: every device asks separately, and the server does not record who consented or when. Only the consent text version travels to the server with each bucket.',
      },
    },

    bucket: {
      metaTitle: 'INTD bucket format v1',
      metaDescription:
        'The open specification of the IntentD SDK binary bucket format: header, event encoding, CRC32, X25519 + HKDF + AES-256-GCM encryption and test vectors.',
      backToApi: '← API documentation',
      eyebrow: 'Specification',
      title: 'INTD bucket format v1',
      intro:
        'The format is open on purpose: confidentiality and integrity come from encrypting and signing the request, not from keeping the layout secret. A fixed structure and CRC32 let the server throw away junk cheaply, before anything is written to storage.',

      container: {
        title: 'Container',
        head: ['Offset', 'Size', 'Field', 'Value'],
        note: 'The total size is exactly 26 + N bytes; trailing bytes are an error.',
        rows: [
          ['0', '4', 'MAGIC', '0x49 0x4E 0x54 0x44 (“INTD”)'],
          ['4', '1', 'VERSION', '0x01'],
          ['5', '1', 'FLAGS', '0x00, reserved'],
          ['6', '8', 'TIMESTAMP', 'uint64 BE, unix ms — the base for the deltas'],
          ['14', '4', 'EVENTS_COUNT', 'uint32 BE'],
          ['18', '4', 'BLOB_LENGTH', 'uint32 BE, length of EVENTS_BLOB'],
          ['22', 'N', 'EVENTS_BLOB', 'the events, back to back'],
          ['22+N', '4', 'CRC32', 'uint32 BE, CRC-32/IEEE of EVENTS_BLOB'],
        ],
      },

      event: {
        title: 'Event',
        head: ['Size', 'Field', 'Value'],
        rows: [
          ['1', 'TYPE', '0x01 pageview, 0x02 search'],
          ['4', 'TS_DELTA', 'uint32 BE, ms after TIMESTAMP'],
          ['2 + var', 'DOMAIN', 'uint16 length ≤ 255, UTF-8'],
          ['2 + var', 'URL', 'uint16 length ≤ 2048, UTF-8'],
          ['2 + var', 'QUERY', 'uint16 length ≤ 500, 0 when absent'],
          ['1 + var', 'LANG', 'uint8 length ≤ 20, BCP 47'],
          ['1', 'DEVICE_TYPE', '0x00 unknown, 0x01 desktop, 0x02 mobile, 0x03 tablet, 0x04 bot'],
        ],
        note: 'Strings are truncated on a UTF-8 character boundary. The server rejects a bucket when a length exceeds the limit, a string is not valid UTF-8, the event count disagrees with the header, or the CRC32 does not match.',
      },

      server: {
        title: 'What the server does',
        items: [
          'The domain is recomputed from the URL (eTLD+1); the client value is not used.',
          'Tokens, passwords, e-mail addresses and card numbers are stripped from the URL and the query.',
          'Events older than 7 days, and events more than 10 minutes in the future, are dropped.',
          'The country is resolved from the connection IP, and the installation identifier is hashed separately for each extension.',
        ],
      },

      crypto: {
        title: 'Encryption and signing',
        note: 'The scheme gives no forward secrecy if the extension private key is later compromised, and does not protect against whoever holds a copy of the bundle: repackaging is countered by per-installation sessions, the extension ID check and the server-side checks.',
        envelope: `sessionKey   = random(32)
iv           = random(12)
ciphertext   = AES-256-GCM(sessionKey, iv, bucket)
ephemeral    = X25519 — a fresh pair per bucket
shared       = X25519(ephemeral.private, extension.publicKey)
derivedKey   = HKDF-SHA256(IKM = shared, salt = iv, info = "intentd-bucket-v1", 32)
encryptedKey = AES-256-GCM(derivedKey, iv, sessionKey)   // 48 bytes`,
        signature: `X-Signature = hex(HMAC-SHA256(secret,
  "intentd-v2|bucket|" + X-Timestamp + "|" + X-API-Key + "|" + hex(SHA-256(body))))`,
      },

      vectors: {
        title: 'Test vectors',
        bucket: `// One search event: base 1758000000000, delta 7,
// domain a.io, URL https://a.io/?q=x, query x, language en, desktop
494e5444 01 00 0000019950f72c00 00000001 00000025
02 00000007 0004 612e696f 0011 68747470733a2f2f612e696f2f3f713d78 0001 78 02 656e 01
cee33ee2`,
        hkdf: `HKDF-SHA256(IKM = 0x11 × 32, salt = 0x22 × 12, info = "intentd-bucket-v1", L = 32)
=> 4a359b8818fc073f6f81a3cb4acd9065302e285fbef0d35d2ff71fba107e6056`,
      },
    },
  },
};
