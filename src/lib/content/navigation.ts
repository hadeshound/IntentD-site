import { getDictionary } from '@/i18n';
import { DASHBOARD_LINKS } from '@/lib/config/urls';

/**
 * Link tables shared by the header and the footer. The labels come from the dictionary;
 * dashboard links are absolute.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Set when the destination is not a page of this site. */
  external?: boolean;
}

export function primaryNav(): NavLink[] {
  const t = getDictionary().nav;

  return [
    { label: t.pricing, href: '/pricing' },
    { label: t.docs, href: '/docs/api' },
    { label: t.forPublishers, href: '/#publishers' },
    { label: t.forBuyers, href: '/#data-buyers' },
  ];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export function footerColumns(): FooterColumn[] {
  const t = getDictionary().footer;
  const path = (route: string) => route;

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
