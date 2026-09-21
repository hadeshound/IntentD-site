import { getDictionary, getLocalizedPath, type Lang } from '@/i18n';
import type { LegalSection } from '@/components/marketing/LegalDocument.astro';
import { PRIVACY_EMAIL, SUPPORT_EMAIL } from './navigation';

/**
 * Builds /terms and /privacy from the dictionary.
 *
 * The bodies carry `{{token}}` placeholders instead of literal addresses and
 * routes, so a support address or a moved page is changed in one place rather
 * than in eight paragraphs across four languages -- and so every internal link
 * inside the legal text keeps the reader's language.
 */
function tokensFor(lang: Lang): Record<string, string> {
  return {
    support: SUPPORT_EMAIL,
    privacy: PRIVACY_EMAIL,
    schema: getLocalizedPath('/docs/api#data-schema', lang),
    pricing: getLocalizedPath('/pricing', lang),
    terms: getLocalizedPath('/terms#buyers', lang),
    contact: getLocalizedPath('/contact?topic=support', lang),
  };
}

function substitute(html: string, tokens: Record<string, string>): string {
  return html.replace(/\{\{(\w+)\}\}/g, (match, key: string) => tokens[key] ?? match);
}

type LegalDocumentKey = 'terms' | 'privacy';

export interface LegalDocumentContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
  intro: string;
  notice: string;
  sections: LegalSection[];
}

export function legalDocument(lang: Lang, key: LegalDocumentKey): LegalDocumentContent {
  const legal = getDictionary(lang).legal;
  const document = legal[key];
  const tokens = tokensFor(lang);

  // Object key order is the section order: it is the reading order of the
  // document and the numbering the contents list prints.
  const sections: LegalSection[] = Object.entries(document.sections).map(([id, section]) => ({
    id,
    title: section.title,
    body: substitute(section.body, tokens),
  }));

  return {
    title: document.title,
    metaTitle: document.metaTitle,
    metaDescription: document.metaDescription,
    updatedAt: legal.updatedPlaceholder,
    intro: substitute(document.intro, tokens),
    notice: substitute(document.notice, tokens),
    sections,
  };
}
