import type { Dictionary } from '@/i18n';

/** Site chrome: navigation, footer, accessibility labels, shared form copy. */
export const common: Pick<Dictionary, 'common' | 'a11y' | 'nav' | 'footer' | 'errors' | 'status'> = {
  common: {
    loading: 'Загружаем…',
    error: 'Что-то пошло не так',
    retry: 'Повторить',
    optional: 'необязательно',
    required: 'обязательно',
    send: 'Отправить',
    sending: 'Отправляем…',
    close: 'Закрыть',
    backToHome: 'На главную',
    perMonth: '/ мес',
    setupOnce: 'подключение, разово',
    copy: 'Копировать',
    copied: 'Скопировано',
  },

  a11y: {
    skipToContent: 'Перейти к содержимому',
    closeDialog: 'Закрыть окно',
    primaryNav: 'Основная навигация',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    homeLink: 'IntentD — на главную',
    languageSwitcher: 'Язык',
    included: 'Включено',
    notIncluded: 'Не включено',
    docsContents: 'Содержание документации',
    legalSections: 'Разделы документа',
    useCasesScroller: 'Сценарии использования данных, горизонтальная прокрутка',
  },

  nav: {
    pricing: 'Тарифы',
    docs: 'Документация',
    forPublishers: 'Для разработчиков',
    forBuyers: 'Для покупателей данных',
    dashboard: 'Кабинет',
    login: 'Войти',
    logout: 'Выйти',
    register: 'Создать аккаунт',
    connectExtension: 'Подключить расширение',
  },

  footer: {
    tagline:
      'Инфраструктура intent-данных: SDK для разработчиков расширений и чистый PII-free поток для аналитических команд.',
    copyright: 'IntentD. Все права защищены.',
    badge: 'PII-free · GDPR-safe',
    product: {
      title: 'Продукт',
      pricing: 'Тарифы',
      api: 'API и формат данных',
      sdk: 'SDK и согласие',
      howItWorks: 'Как это работает',
      faq: 'Частые вопросы',
    },
    company: {
      title: 'Компания',
      contact: 'Контакты',
      dashboard: 'Личный кабинет',
      login: 'Вход',
    },
    legal: {
      title: 'Правовое',
      terms: 'Условия использования',
      privacy: 'Политика конфиденциальности',
      dpa: 'DPA (соглашение об обработке)',
    },
  },

  /** Transport-level fallbacks, used when the server gives no message. */
  errors: {
    network: 'Не удалось связаться с сервером. Проверьте подключение и попробуйте ещё раз.',
    unexpected: 'Произошла непредвиденная ошибка.',
    formGeneric: 'Что-то пошло не так. Попробуйте ещё раз.',
  },

  status: {
    checking: 'Проверяем статус',
    operational: 'Все системы работают',
    degraded: 'Повышенное время отклика',
  },
};
