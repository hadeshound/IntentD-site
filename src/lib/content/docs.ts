import { getDictionary } from '@/i18n';

/**
 * Reference tables rendered on /docs/api.
 *
 * The structural half -- field names, wire types, HTTP methods, paths, status
 * codes, rate limits -- is the protocol. Only the prose column comes from
 * the dictionary.
 */

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  /** Marks fields that are only present on higher tiers. */
  tier?: 'growth' | 'enterprise';
}

export function eventSchema(): SchemaField[] {
  const f = getDictionary().docs.api.schema.fields;

  return [
    { name: 'event_id', type: 'String', description: f.event_id },
    { name: 'timestamp', type: 'Int64', description: f.timestamp },
    { name: 'anon_uid', type: 'String', description: f.anon_uid },
    { name: 'clean_url', type: 'String', description: f.clean_url },
    { name: 'search_query', type: 'String', description: f.search_query },
    { name: 'lang', type: 'String', description: f.lang },
    { name: 'geo_country', type: 'String', description: f.geo_country, tier: 'growth' },
    { name: 'device_type', type: 'String', description: f.device_type, tier: 'growth' },
    { name: 'domain', type: 'String', description: f.domain },
  ];
}

export interface EndpointSpec {
  method: 'POST' | 'GET';
  path: string;
  description: string;
  limit: string;
}

export function ingestEndpoints(): EndpointSpec[] {
  const e = getDictionary().docs.api.ingest.endpoints;

  return [
    { method: 'POST', path: '/sdk/register', ...e.register },
    { method: 'POST', path: '/telemetry/bucket', ...e.bucket },
    { method: 'POST', path: '/sdk/report-tamper', ...e.tamper },
  ];
}

export interface ErrorCodeSpec {
  status: number;
  code: string;
  meaning: string;
}

export function ingestErrors(): ErrorCodeSpec[] {
  const m = getDictionary().docs.api.ingest.errors;

  return [
    { status: 400, code: 'BUCKET_INVALID_FORMAT', meaning: m.BUCKET_INVALID_FORMAT },
    { status: 401, code: 'API_KEY_REVOKED', meaning: m.API_KEY_REVOKED },
    { status: 401, code: 'INVALID_SIGNATURE', meaning: m.INVALID_SIGNATURE },
    { status: 401, code: 'CLOCK_SKEW', meaning: m.CLOCK_SKEW },
    { status: 402, code: 'SUBSCRIPTION_INACTIVE', meaning: m.SUBSCRIPTION_INACTIVE },
    { status: 403, code: 'WRONG_EXTENSION', meaning: m.WRONG_EXTENSION },
    { status: 403, code: 'FINGERPRINT_MISMATCH', meaning: m.FINGERPRINT_MISMATCH },
    { status: 409, code: 'BUCKET_ALREADY_RECEIVED', meaning: m.BUCKET_ALREADY_RECEIVED },
    { status: 413, code: 'BUCKET_TOO_LARGE', meaning: m.BUCKET_TOO_LARGE },
    { status: 429, code: 'RATE_LIMITED', meaning: m.RATE_LIMITED },
  ];
}

/**
 * Code samples. The code is the same everywhere; only its comments differ,
 * so the samples live in the dictionaries next to the prose that explains them.
 */
export function docsSnippets() {
  return getDictionary().docs.api.snippets;
}

/** The S3 layout, which carries no words at all. */
export const S3_PATH_TEMPLATE = 'year=YYYY/month=MM/day=DD/tenant=<key_id>__<bucket_id>.parquet.lz4';
