import { createContext, useContext, type ReactNode } from 'react';

import { DEFAULT_LANG, getDictionary, type Dictionary, type Lang } from './index';

/**
 * The active language, for React islands.
 *
 * Every island already receives `lang` as a prop from the Astro page that
 * renders it -- the context exists so the shared primitives underneath (fields,
 * dialogs) can read it without every call site threading a prop through. The
 * default is English, which is also what an island rendered outside a provider
 * would legitimately be.
 */
const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

/** The dictionary for the active language. */
export function useDictionary(): Dictionary {
  return getDictionary(useLang());
}
