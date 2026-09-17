import { useEffect, useState } from 'react';

import {
  login,
  logout,
  register,
  reload,
  subscribeAuth,
  type AuthState,
  type AuthStatus,
} from '@/lib/auth/session';
import type { UserProfile } from '@/lib/api/auth';

interface UseAuthResult extends AuthState {
  isAuthenticated: boolean;
  login: (payload: Parameters<typeof login>[0]) => Promise<UserProfile>;
  register: (payload: Parameters<typeof register>[0]) => Promise<UserProfile>;
  logout: () => Promise<void>;
  reload: () => Promise<void>;
}

export type { AuthStatus };

/**
 * React view of the shared session store. Subscribing is what starts the
 * silent refresh, so an island that needs the session gets it without a
 * provider above it in the tree.
 */
export function useAuth(): UseAuthResult {
  // Deliberately not seeded from the live store. An island hydrates after the
  // navbar's script has already started the refresh, so reading the store here
  // could produce a first render that disagrees with the server's -- which
  // React reports as a hydration mismatch and recovers from by throwing the
  // markup away. Starting at 'loading' matches the server every time; the
  // subscription below runs after hydration and delivers the real state.
  const [state, setState] = useState<AuthState>({ user: null, status: 'loading' });

  useEffect(() => subscribeAuth(setState), []);

  return {
    user: state.user,
    status: state.status,
    isAuthenticated: state.status === 'authenticated',
    login,
    register,
    logout,
    reload,
  };
}
