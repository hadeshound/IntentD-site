import { DEFAULT_LANG, getDictionary, getLangFromUrl, type Lang } from './index';

/**
 * The active language for code that is neither a component nor a hook.
 *
 * The API client and the form hook need a message when a request fails. Both
 * only ever produce one in the browser, after a user action, so the address bar
 * is a reliable source and there is no server render to disagree with.
 */
export function currentLang(): Lang {
  if (typeof window === 'undefined') {
    return DEFAULT_LANG;
  }
  return getLangFromUrl(window.location.pathname);
}

/** The dictionary for the active language. */
export function currentDictionary() {
  return getDictionary(currentLang());
}
