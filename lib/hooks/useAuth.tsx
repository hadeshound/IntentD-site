'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

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

interface AuthContextValue {
  user: UserProfile | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<UserProfile>;
  register: (payload: RegisterPayload) => Promise<UserProfile>;
  logout: () => Promise<void>;
  /** Re-reads /auth/me, e.g. after checkout stored a company name. */
  reload: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Refresh this many seconds before the access token actually expires. */
const REFRESH_LEEWAY_SECONDS = 60;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimer.current !== null) {
      clearTimeout(refreshTimer.current);
      refreshTimer.current = null;
    }
  }, []);

  const clearSession = useCallback(() => {
    clearRefreshTimer();
    setAccessToken(null);
    setUser(null);
    setStatus('anonymous');
  }, [clearRefreshTimer]);

  /**
   * Keeps the in-memory access token alive. The token itself is short-lived by
   * design; the HttpOnly refresh cookie is what actually survives a reload.
   */
  // The explicit annotation matters: the callback re-schedules itself, and
  // without it TypeScript cannot infer a type that references its own binding.
  const scheduleRefresh = useCallback<(expiresInSeconds: number) => void>(
    (expiresInSeconds) => {
      clearRefreshTimer();

      const delaySeconds = Math.max(expiresInSeconds - REFRESH_LEEWAY_SECONDS, 30);
      refreshTimer.current = setTimeout(() => {
        void refreshSession()
          .then((session) => {
            setUser(session.user);
            setStatus('authenticated');
            scheduleRefresh(session.expires_in);
          })
          .catch(() => {
            clearSession();
          });
      }, delaySeconds * 1000);
    },
    [clearRefreshTimer, clearSession],
  );

  const adoptSession = useCallback(
    (session: Session) => {
      setUser(session.user);
      setStatus('authenticated');
      scheduleRefresh(session.expires_in);
      return session.user;
    },
    [scheduleRefresh],
  );

  // Restore the session on first paint. A missing or expired cookie simply
  // means the visitor is anonymous, which is not an error worth surfacing.
  useEffect(() => {
    let cancelled = false;

    refreshSession()
      .then((session) => {
        if (!cancelled) {
          adoptSession(session);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAccessToken(null);
          setUser(null);
          setStatus('anonymous');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [adoptSession]);

  // The API client calls this when a refresh attempt fails mid-request.
  useEffect(() => {
    onSessionExpired(() => clearSession());
    return () => onSessionExpired(null);
  }, [clearSession]);

  useEffect(() => clearRefreshTimer, [clearRefreshTimer]);

  const login = useCallback(
    async (payload: LoginPayload) => adoptSession(await loginRequest(payload)),
    [adoptSession],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => adoptSession(await registerRequest(payload)),
    [adoptSession],
  );

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const reload = useCallback(async () => {
    try {
      setUser(await fetchCurrentUser());
    } catch {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated',
      login,
      register,
      logout,
      reload,
    }),
    [user, status, login, register, logout, reload],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}
