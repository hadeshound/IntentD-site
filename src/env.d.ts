/// <reference types="astro/client" />

/**
 * Only PUBLIC_* variables exist: every value here is read in the browser as
 * well as on the server, and Astro refuses to expose anything else to client
 * code. See .env.example for the local defaults.
 */
interface ImportMetaEnv {
  /** Base URL of the Go portal API, e.g. https://api.intentd.io/v1. */
  readonly PUBLIC_API_BASE_URL?: string;
  /** Canonical origin of this site. */
  readonly PUBLIC_SITE_URL?: string;
  /** Dashboard origin; sign-in and account links point here. */
  readonly PUBLIC_DASHBOARD_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
