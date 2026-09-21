import { getDictionary, getLocalizedPath, type Lang } from '@/i18n';
import { DASHBOARD_LINKS } from '@/lib/config/urls';

/**
 * Link tables shared by the header and the footer.
 *
 * Built per language: the labels come from the dictionary and every internal
 * href is rewritten through getLocalizedPath, so a reader on /ru stays on /ru
 * when they follow the navigation. Dashboard links are absolute and untouched.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Set when the destination is not a page of this site. */
  external?: boolean;
}

export function primaryNav(lang: Lang): NavLink[] {
  const t = getDictionary(lang).nav;

  return [
    { label: t.pricing, href: getLocalizedPath('/pricing', lang) },
    { label: t.docs, href: getLocalizedPath('/docs/api', lang) },
    { label: t.forPublishers, href: getLocalizedPath('/#publishers', lang) },
    { label: t.forBuyers, href: getLocalizedPath('/#data-buyers', lang) },
  ];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export function footerColumns(lang: Lang): FooterColumn[] {
  const t = getDictionary(lang).footer;
  const path = (route: string) => getLocalizedPath(route, lang);

  return [
    {
      title: t.product.title,
      links: [
        { label: t.product.pricing, href: path('/pricing') },
        { label: t.product.api, href: path('/docs/api') },
        { label: t.product.sdk, href: path('/docs/sdk') },
        { label: t.product.howItWorks, href: path('/#how-it-works') },
        { label: t.product.faq, href: path('/#faq') },
      ],
    },
    {
      title: t.company.title,
      links: [
        { label: t.company.contact, href: path('/contact') },
        { label: t.company.dashboard, href: DASHBOARD_LINKS.home, external: true },
        { label: t.company.login, href: DASHBOARD_LINKS.login, external: true },
      ],
    },
    {
      title: t.legal.title,
      links: [
        { label: t.legal.terms, href: path('/terms') },
        { label: t.legal.privacy, href: path('/privacy') },
        { label: t.legal.dpa, href: path('/contact?topic=support') },
      ],
    },
  ];
}

/** Single source for the support address used across pages. */
export const SUPPORT_EMAIL = 'support@intentd.io';
export const SALES_EMAIL = 'sales@intentd.io';
export const PRIVACY_EMAIL = 'privacy@intentd.io';
