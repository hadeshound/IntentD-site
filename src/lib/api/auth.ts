import { apiRequest, setAccessToken } from './client';

export type UserRole = 'buyer' | 'publisher' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  company_name: string | null;
  role: UserRole;
  email_verified: boolean;
  status: string;
  created_at: string;
}

export interface Session {
  user: UserProfile;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RegisterPayload {
  email: string;
  password: string;
  company_name?: string;
  role: 'buyer' | 'publisher';
  accept_terms: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember_me: boolean;
}

/** Creates an account and opens a session in one round trip. */
export async function register(payload: RegisterPayload): Promise<Session> {
  const session = await apiRequest<Session>('/auth/register', { method: 'POST', body: payload });
  setAccessToken(session.access_token);
  return session;
}

export async function login(payload: LoginPayload): Promise<Session> {
  const session = await apiRequest<Session>('/auth/login', { method: 'POST', body: payload });
  setAccessToken(session.access_token);
  return session;
}

/** Exchanges the HttpOnly refresh cookie for a fresh access token. */
export async function refreshSession(): Promise<Session> {
  const session = await apiRequest<Session>('/auth/refresh', { method: 'POST' });
  setAccessToken(session.access_token);
  return session;
}

export async function logout(): Promise<void> {
  try {
    await apiRequest<{ logged_out: boolean }>('/auth/logout', { method: 'POST' });
  } finally {
    // Even a failed call must drop the in-memory credential.
    setAccessToken(null);
  }
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  const data = await apiRequest<{ user: UserProfile }>('/auth/me', { auth: true });
  return data.user;
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
}

export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: { token, new_password: newPassword },
  });
}
