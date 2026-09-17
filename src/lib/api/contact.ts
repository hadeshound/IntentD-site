import { apiRequest } from './client';

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
  return apiRequest<ContactResult>('/public/contact', { method: 'POST', body: payload });
}
