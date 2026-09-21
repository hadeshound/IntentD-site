import { DEFAULT_LANG, isLang, LANGUAGE_META, LANGUAGES, type Lang } from './config';
import { en } from './en';
import { ru } from './ru';
import { uk } from './uk';
import { zh } from './zh';

export {
  DEFAULT_LANG,
  isLang,
  LANG_COOKIE,
  LANG_QUERY_PARAM,
  LANGUAGE_META,
  LANGUAGES,
  PREFIXED_LANGUAGES,
  type Lang,
  type LanguageMeta,
} from './config';

/**
 * The English dictionary is the schema: every other language is typed against
 * it, so a missing or misspelled key fails `astro check` instead of rendering
 * a raw key path in production.
 */
export type Dictionary = typeof en;

const DICTIONARIES: Record<Lang, Dictionary> = { en, ru, uk, zh };

/** The full dictionary, for sections whose content is a list rather than a string. */
export function getDictionary(lang: Lang): Dictionary {
  return DICTIONARIES[lang] ?? DICTIONARIES[DEFAULT_LANG];
}

/**
 * Reads the language out of the first path segment.
 *
 * English has no prefix, so anything that is not a known language code is
 * English by definition -- including /pricing, /docs/api and /.
 */
export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const first = pathname.split('/').filter(Boolean)[0];

  return isLang(first) ? first : DEFAULT_LANG;
}

/** The path with any language prefix removed, always starting with a slash. */
export function stripLang(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLang(segments[0])) {
    segments.shift();
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

/**
 * The same route in another language.
 *
 * Accepts a path that is already prefixed, so switching from /ru/pricing to
 * Ukrainian does not produce /uk/ru/pricing. Query strings and fragments ride
 * along untouched, which is what /contact?topic=enterprise needs.
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  // An absolute URL is a link off this site (the dashboard, mostly): it has no
  // language prefix of ours to rewrite.
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')) {
    return path;
  }

  const [beforeHash, hash = ''] = splitOnce(path, '#');
  const [rawPath, search = ''] = splitOnce(beforeHash, '?');

  const basePath = stripLang(rawPath || '/');
  const prefixed = lang === DEFAULT_LANG ? basePath : `/${lang}${basePath === '/' ? '' : basePath}`;
  const normalised = prefixed === '' ? '/' : prefixed;

  return `${normalised}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}

function splitOnce(value: string, separator: string): [string, string?] {
  const index = value.indexOf(separator);
  return index === -1 ? [value] : [value.slice(0, index), value.slice(index + 1)];
}

/**
 * Looks a dot path up in a dictionary: `t('nav.pricing')`.
 *
 * Structured content -- feature lists, FAQ entries, matrix rows -- is read off
 * `getDictionary()` directly instead, because a list is not a string and
 * flattening it into `features.0` would lose the type.
 */
export function useTranslations(lang: Lang) {
  const dictionary = getDictionary(lang);

  return function t(key: string): string {
    const value = lookup(dictionary, key);
    if (typeof value === 'string') {
      return value;
    }

    // A key present in English but not yet translated renders in English
    // rather than as a broken path; a key missing everywhere renders as the
    // path, which is loud enough to be caught in review.
    const fallback = lookup(en, key);
    return typeof fallback === 'string' ? fallback : key;
  };
}

function lookup(source: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((node, segment) => {
    if (node && typeof node === 'object' && segment in node) {
      return (node as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
}

/** Every language's absolute URL for one route, for the hreflang block. */
export function alternateUrls(path: string, siteUrl: string): Array<{ lang: Lang; href: string }> {
  return LANGUAGES.map((lang) => ({
    lang,
    href: new URL(getLocalizedPath(path, lang), siteUrl).href,
  }));
}

/** Metadata of the active language, for <html lang> and og:locale. */
export function langMeta(lang: Lang) {
  return LANGUAGE_META[lang] ?? LANGUAGE_META[DEFAULT_LANG];
}
