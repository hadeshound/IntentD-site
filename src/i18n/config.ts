/**
 * The language table, kept apart from the dictionaries so that anything which
 * only needs to know *which* languages exist -- astro.config.mjs, the sitemap,
 * the detection script -- does not pull four dictionaries into its bundle.
 */

export const LANGUAGES = ['en', 'ru', 'uk', 'zh'] as const;

export type Lang = (typeof LANGUAGES)[number];

/** English is served without a prefix, so it is also the fallback. */
export const DEFAULT_LANG: Lang = 'en';

export interface LanguageMeta {
  code: Lang;
  /** Endonym, shown in the switcher. */
  label: string;
  /** Short form for the collapsed switcher button. */
  short: string;
  /** Value of <html lang>; not always the same as the route prefix. */
  htmlLang: string;
  /** Value of og:locale. */
  ogLocale: string;
  /** Matched against navigator.language, longest prefix first. */
  browserPrefixes: string[];
}

export const LANGUAGE_META: Record<Lang, LanguageMeta> = {
  en: {
    code: 'en',
    label: 'English',
    short: 'EN',
    htmlLang: 'en',
    ogLocale: 'en_US',
    browserPrefixes: ['en'],
  },
  ru: {
    code: 'ru',
    label: 'Русский',
    short: 'RU',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    browserPrefixes: ['ru'],
  },
  uk: {
    code: 'uk',
    label: 'Українська',
    short: 'UK',
    htmlLang: 'uk',
    ogLocale: 'uk_UA',
    browserPrefixes: ['uk'],
  },
  zh: {
    code: 'zh',
    // Simplified Chinese only: the dictionary is written in 简体, so offering
    // zh-TW here would promise a translation that does not exist.
    label: '中文',
    short: '中文',
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
    browserPrefixes: ['zh-cn', 'zh-hans', 'zh-sg', 'zh'],
  },
};

/** The three prefixed languages, i.e. every language except the default. */
export const PREFIXED_LANGUAGES = LANGUAGES.filter((lang) => lang !== DEFAULT_LANG);

/** Name of the cookie the switcher writes and the detection script reads. */
export const LANG_COOKIE = 'intentd_lang';

/** Query parameter that overrides everything else and is then persisted. */
export const LANG_QUERY_PARAM = 'lang';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);
}
