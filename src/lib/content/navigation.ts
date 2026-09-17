import { DASHBOARD_LINKS } from '@/lib/config/urls';

/** Link tables shared by the header and the footer. */

export interface NavLink {
  label: string;
  href: string;
  /** Set when the destination is not a page of this site. */
  external?: boolean;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Тарифы', href: '/pricing' },
  { label: 'Документация', href: '/docs/api' },
  { label: 'Для разработчиков', href: '/#publishers' },
  { label: 'Для покупателей данных', href: '/#data-buyers' },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Продукт',
    links: [
      { label: 'Тарифы', href: '/pricing' },
      { label: 'API и формат данных', href: '/docs/api' },
      { label: 'SDK и согласие', href: '/docs/sdk' },
      { label: 'Как это работает', href: '/#how-it-works' },
      { label: 'Частые вопросы', href: '/#faq' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'Контакты', href: '/contact' },
      { label: 'Личный кабинет', href: DASHBOARD_LINKS.home, external: true },
      { label: 'Вход', href: DASHBOARD_LINKS.login, external: true },
    ],
  },
  {
    title: 'Правовое',
    links: [
      { label: 'Условия использования', href: '/terms' },
      { label: 'Политика конфиденциальности', href: '/privacy' },
      { label: 'DPA (соглашение об обработке)', href: '/contact?topic=support' },
    ],
  },
];

/** Single source for the support address used across pages. */
export const SUPPORT_EMAIL = 'support@intentd.io';
export const SALES_EMAIL = 'sales@intentd.io';
export const PRIVACY_EMAIL = 'privacy@intentd.io';
