import { en } from './en';

/**
 * The site is English-only. The copy still lives in ./en/* rather than inline
 * in the components, so wording changes stay in one place.
 */
export type Dictionary = typeof en;

export const DEFAULT_LOCALE = 'en';

/** The full dictionary, for sections whose content is a list rather than a string. */
export function getDictionary(): Dictionary {
  return en;
}

/** Looks a dot path up in the dictionary: `t('nav.pricing')`. */
export function t(key: string): string {
  const value = key.split('.').reduce<unknown>((node, segment) => {
    if (node && typeof node === 'object' && segment in node) {
      return (node as Record<string, unknown>)[segment];
    }
    return undefined;
  }, en);

  return typeof value === 'string' ? value : key;
}
