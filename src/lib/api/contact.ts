import { CONTACT_INTAKE_URL } from '@/lib/config/urls';
import { getDictionary } from '@/i18n';

import { apiRequest, ApiError, type ApiEnvelope } from './client';

export type ContactTopic = 'buy_data' | 'monetize_extension' | 'support' | 'enterprise';

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  topic: ContactTopic;
  message: string;
  /** Honeypot field. Always submitted empty by a real person. */
  website?: string;
}

export interface ContactResult {
  message_id: string;
  message: string;
}

export async function submitContactMessage(payload: ContactPayload): Promise<ContactResult> {
  // Dev: straight to the local portal.
  if (!CONTACT_INTAKE_URL) {
    return apiRequest<ContactResult>('/public/contact', { method: 'POST', body: payload });
  }

  // Production: through the intake Worker. It answers in the portal's envelope, so errors look the same to the form.
  let response: Response;
  try {
    response = await fetch(CONTACT_INTAKE_URL, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
  } catch {
    throw new ApiError(getDictionary().errors.network, 'NETWORK_ERROR', 0);
  }

  let envelope: ApiEnvelope<ContactResult> | null = null;
  try {
    envelope = (await response.json()) as ApiEnvelope<ContactResult>;
  } catch {
    // not JSON: handled below
  }

  if (!response.ok || !envelope?.success) {
    const error = envelope?.error;
    throw new ApiError(
      error?.message ?? getDictionary().errors.unexpected,
      error?.code ?? 'INTERNAL_ERROR',
      response.status,
      error?.details,
    );
  }
  return envelope.data as ContactResult;
}
