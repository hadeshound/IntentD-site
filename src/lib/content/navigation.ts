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

export type NavIcon = 'puzzle' | 'database' | 'calculator' | 'code' | 'package' | 'file';
export type NavTone = 'teal' | 'blue' | 'amber' | 'cyan';

export interface NavMenuItem {
  title: string;
  description: string;
  href: string;
  icon: NavIcon;
  tone: NavTone;
}

export type NavEntry =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'group'; id: string; label: string; items: NavMenuItem[] };

/**
 * The header: two menus that group the pages the footer used to hide
 * (Solutions, Docs) and two direct links. Contact stays one click away.
 */
export function primaryNav(): NavEntry[] {
  const t = getDictionary().nav;

  return [
    {
      kind: 'group',
      id: 'solutions',
      label: t.menu.solutions,
      items: [
        { title: t.menu.developers.title, description: t.menu.developers.description, href: '/developers', icon: 'puzzle', tone: 'teal' },
        { title: t.menu.buyers.title, description: t.menu.buyers.description, href: '/data-buyers', icon: 'database', tone: 'blue' },
        { title: t.menu.calculator.title, description: t.menu.calculator.description, href: '/calculator', icon: 'calculator', tone: 'amber' },
      ],
    },
    { kind: 'link', label: t.pricing, href: '/pricing' },
    {
      kind: 'group',
      id: 'docs',
      label: t.menu.docs,
      items: [
        { title: t.menu.api.title, description: t.menu.api.description, href: '/docs/api', icon: 'code', tone: 'cyan' },
        { title: t.menu.sdk.title, description: t.menu.sdk.description, href: '/docs/sdk', icon: 'package', tone: 'teal' },
        { title: t.menu.bucket.title, description: t.menu.bucket.description, href: '/docs/bucket-format-v1', icon: 'file', tone: 'blue' },
      ],
    },
    { kind: 'link', label: t.contact, href: '/contact' },
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
        { label: t.product.developers, href: path('/developers') },
        { label: t.product.buyers, href: path('/data-buyers') },
        { label: t.product.calculator, href: path('/calculator') },
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
export const SUPPORT_EMAIL = 'support@intentd.net';
export const SALES_EMAIL = 'sales@intentd.net';
export const PRIVACY_EMAIL = 'privacy@intentd.net';
