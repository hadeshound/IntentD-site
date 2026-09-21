import type { Dictionary } from '@/i18n';

/** Site chrome: navigation, footer, accessibility labels, shared form copy. */
export const common: Pick<Dictionary, 'common' | 'a11y' | 'nav' | 'footer' | 'errors' | 'status'> = {
  common: {
    loading: 'Завантажуємо…',
    error: 'Щось пішло не так',
    retry: 'Повторити',
    optional: 'необов’язково',
    required: 'обов’язково',
    send: 'Надіслати',
    sending: 'Надсилаємо…',
    close: 'Закрити',
    backToHome: 'На головну',
    perMonth: '/ міс',
    setupOnce: 'підключення, разово',
    copy: 'Копіювати',
    copied: 'Скопійовано',
  },

  a11y: {
    skipToContent: 'Перейти до вмісту',
    closeDialog: 'Закрити вікно',
    primaryNav: 'Основна навігація',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
    homeLink: 'IntentD — на головну',
    languageSwitcher: 'Мова',
    included: 'Включено',
    notIncluded: 'Не включено',
    docsContents: 'Зміст документації',
    legalSections: 'Розділи документа',
    useCasesScroller: 'Сценарії використання даних, горизонтальне прокручування',
  },

  nav: {
    pricing: 'Тарифи',
    docs: 'Документація',
    forPublishers: 'Для розробників',
    forBuyers: 'Для покупців даних',
    dashboard: 'Кабінет',
    login: 'Увійти',
    logout: 'Вийти',
    register: 'Створити акаунт',
    connectExtension: 'Підключити розширення',
  },

  footer: {
    tagline:
      'Інфраструктура intent-даних: SDK для розробників розширень і чистий PII-free потік для аналітичних команд.',
    copyright: 'IntentD. Усі права захищено.',
    badge: 'PII-free · GDPR-safe',
    product: {
      title: 'Продукт',
      pricing: 'Тарифи',
      api: 'API і формат даних',
      sdk: 'SDK і згода',
      howItWorks: 'Як це працює',
      faq: 'Часті запитання',
    },
    company: {
      title: 'Компанія',
      contact: 'Контакти',
      dashboard: 'Особистий кабінет',
      login: 'Вхід',
    },
    legal: {
      title: 'Правове',
      terms: 'Умови використання',
      privacy: 'Політика конфіденційності',
      dpa: 'DPA (угода про обробку)',
    },
  },

  /** Transport-level fallbacks, used when the server gives no message. */
  errors: {
    network: 'Не вдалося зв’язатися із сервером. Перевірте підключення та спробуйте ще раз.',
    unexpected: 'Сталася непередбачена помилка.',
    formGeneric: 'Щось пішло не так. Спробуйте ще раз.',
  },

  status: {
    checking: 'Перевіряємо статус',
    operational: 'Усі системи працюють',
    degraded: 'Підвищений час відгуку',
  },
};
