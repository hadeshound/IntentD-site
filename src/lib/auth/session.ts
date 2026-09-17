/**
 * Session state, held in a module singleton instead of a React context.
 *
 * WHY NOT A CONTEXT
 * -----------------
 * The Next app wrapped the whole tree in <AuthProvider>, so the navbar, the
 * pricing cards and the auth forms all read one context. Astro has no single
 * React tree: every island hydrates on its own, and a provider in one of them
 * is invisible to the others. Two islands with two providers would mean two
 * silent refreshes racing for the same rotating refresh token.
 *
 * A module-level store solves it. Islands on a page share the same chunk, so
 * they share this instance -- and because it is plain TypeScript, the parts
 * that stayed Astro (navbar, plan cards) can subscribe from a <script> without
 * pulling React onto pages that have no forms.
 *
 * The security properties are unchanged: the access token still lives only in
 * memory inside lib/api/client.ts, and the refresh token is still an HttpOnly
 * cookie this code cannot read.
 */

import {
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  refreshSession,
  register as registerRequest,
  type LoginPayload,
  type RegisterPayload,
  type Session,
  type UserProfile,
} from '@/lib/api/auth';
import { onSessionExpired, setAccessToken } from '@/lib/api/client';

export type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

export interface AuthState {
  user: UserProfile | null;
  status: AuthStatus;
}

/** Refresh this many seconds before the access token actually expires. */
const REFRESH_LEEWAY_SECONDS = 60;

let state: AuthState = { user: null, status: 'loading' };

const listeners = new Set<(state: AuthState) => void>();
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let bootstrapped = false;

function emit(): void {
  for (const listener of listeners) {
    listener(state);
  }
}

function setState(next: AuthState): void {
  state = next;
  emit();
}

export function getAuthState(): AuthState {
  return state;
}

/**
 * Subscribes to session changes and returns the unsubscribe function. The
 * listener is called immediately with the current state, and the first
 * subscriber triggers the session restore.
 */
export function subscribeAuth(listener: (state: AuthState) => void): () => void {
  listeners.add(listener);
  listener(state);
  void bootstrapSession();

  return () => {
    listeners.delete(listener);
  };
}

function clearRefreshTimer(): void {
  if (refreshTimer !== null) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

function clearSession(): void {
  clearRefreshTimer();
  setAccessToken(null);
  setState({ user: null, status: 'anonymous' });
}

/**
 * Keeps the in-memory access token alive. The token itself is short-lived by
 * design; the HttpOnly refresh cookie is what actually survives a reload.
 */
function scheduleRefresh(expiresInSeconds: number): void {
  clearRefreshTimer();

  const delaySeconds = Math.max(expiresInSeconds - REFRESH_LEEWAY_SECONDS, 30);
  refreshTimer = setTimeout(() => {
    void refreshSession()
      .then((session) => adoptSession(session))
      .catch(() => clearSession());
  }, delaySeconds * 1000);
}

function adoptSession(session: Session): UserProfile {
  setState({ user: session.user, status: 'authenticated' });
  scheduleRefresh(session.expires_in);
  return session.user;
}

/**
 * Restores the session once per page load. A missing or expired cookie simply
 * means the visitor is anonymous, which is not an error worth surfacing.
 */
export async function bootstrapSession(): Promise<void> {
  if (bootstrapped || typeof window === 'undefined') {
    return;
  }
  bootstrapped = true;

  // The API client calls this when a refresh attempt fails mid-request.
  onSessionExpired(() => clearSession());

  try {
    adoptSession(await refreshSession());
  } catch {
    setAccessToken(null);
    setState({ user: null, status: 'anonymous' });
  }
}

export async function login(payload: LoginPayload): Promise<UserProfile> {
  return adoptSession(await loginRequest(payload));
}

export async function register(payload: RegisterPayload): Promise<UserProfile> {
  return adoptSession(await registerRequest(payload));
}

export async function logout(): Promise<void> {
  try {
    await logoutRequest();
  } finally {
    clearSession();
  }
}

/** Re-reads /auth/me, e.g. after checkout stored a company name. */
export async function reload(): Promise<void> {
  try {
    setState({ user: await fetchCurrentUser(), status: 'authenticated' });
  } catch {
    clearSession();
  }
}
