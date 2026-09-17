/**
 * Single HTTP entry point for the portal API.
 *
 * Token handling follows the security rule the whole app is built around:
 * the access token lives in a module-level variable (memory only, gone on
 * reload) and the refresh token is an HttpOnly cookie this code can never
 * read. A 401 triggers exactly one silent refresh, then the original request
 * is replayed.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api/v1';

/** Error shape returned inside the envelope. */
export interface ApiErrorBody {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  error: ApiErrorBody | null;
}

/** Thrown for every non-success response, including network failures. */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly details?: Record<string, string>;

  constructor(message: string, code: string, status: number, details?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  /** True when the server rejected individual fields and the form can show them inline. */
  get isValidationError(): boolean {
    return this.code === 'VALIDATION_FAILED' && Boolean(this.details);
  }

  /** True when the session is gone and the user has to sign in again. */
  get isSessionExpired(): boolean {
    return this.code === 'SESSION_EXPIRED' || this.code === 'UNAUTHORIZED';
  }
}

const NETWORK_ERROR_MESSAGE =
  'Не удалось связаться с сервером. Проверьте подключение и попробуйте ещё раз.';

// --- in-memory access token -------------------------------------------------

let accessToken: string | null = null;
let sessionExpiredHandler: (() => void) | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

/** Registered by AuthProvider so a dead session can clear the React state. */
export function onSessionExpired(handler: (() => void) | null): void {
  sessionExpiredHandler = handler;
}

// --- request ----------------------------------------------------------------

interface RequestOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
  /** Attach the bearer token. */
  auth?: boolean;
  /** Internal: prevents an endless refresh loop. */
  retryOnUnauthorized?: boolean;
  signal?: AbortSignal;
  /** Next.js fetch cache hint, used by server components. */
  revalidate?: number;
}

async function rawRequest<T>(path: string, options: RequestOptions): Promise<T> {
  const { method = 'GET', body, auth = false, signal, revalidate } = options;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      // Required for the refresh cookie to travel on /auth/* calls.
      credentials: 'include',
      signal,
      ...(revalidate === undefined ? { cache: 'no-store' as const } : { next: { revalidate } }),
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw cause;
    }
    throw new ApiError(NETWORK_ERROR_MESSAGE, 'NETWORK_ERROR', 0);
  }

  let envelope: ApiEnvelope<T> | null = null;
  try {
    envelope = (await response.json()) as ApiEnvelope<T>;
  } catch {
    // A body-less 204 or a proxy error page: fall through to the status check.
  }

  if (!response.ok || !envelope?.success) {
    const error = envelope?.error;
    throw new ApiError(
      error?.message ?? 'Произошла непредвиденная ошибка.',
      error?.code ?? 'INTERNAL_ERROR',
      response.status,
      error?.details,
    );
  }

  return envelope.data as T;
}

/**
 * Performs a request and, on a 401 for an authenticated call, refreshes the
 * session once before replaying it.
 */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { retryOnUnauthorized = true, ...rest } = options;

  try {
    return await rawRequest<T>(path, rest);
  } catch (error) {
    const canRetry =
      error instanceof ApiError &&
      error.isSessionExpired &&
      rest.auth === true &&
      retryOnUnauthorized;

    if (!canRetry) {
      throw error;
    }

    const refreshed = await tryRefresh();
    if (!refreshed) {
      sessionExpiredHandler?.();
      throw error;
    }

    return rawRequest<T>(path, rest);
  }
}

interface RefreshPayload {
  access_token: string;
}

/** Attempts a silent refresh. Never throws: the caller only needs the verdict. */
async function tryRefresh(): Promise<boolean> {
  try {
    const data = await rawRequest<RefreshPayload>('/auth/refresh', { method: 'POST' });
    setAccessToken(data.access_token);
    return true;
  } catch {
    setAccessToken(null);
    return false;
  }
}
