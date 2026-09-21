import type { Dictionary } from '@/i18n';

/** Pricing copy. Plan names stay in English: Starter, Growth, Scale, Enterprise. */
export const pricing: Pick<Dictionary, 'pricing' | 'checkout'> = {
  pricing: {
    metaTitle: 'Тарифы',
    metaDescription:
      'Прозрачные тарифы на доступ к потоку intent-данных IntentD: Starter, Growth, Scale и Enterprise. Сравнение лимитов пользователей, частоты выгрузки и состава полей.',
    eyebrow: 'Pricing',
    titleBefore: 'Прозрачные тарифы для доступа к',
    titleAccent: 'потоку данных',
    subtitle: 'Выберите объём сигналов, необходимый для ваших аналитических систем.',
    subtitleLong:
      'Выберите объём сигналов, необходимый для ваших аналитических систем. Платите за поток, а не за место в интерфейсе.',
    compareAll: 'Сравнить все возможности',
    fallbackNote:
      'Каталог временно отдаётся из локальной копии — актуальные условия подтвердит менеджер.',

    setupFee: 'подключение, разово',
    perMonth: '/ мес',
    activeUsers: 'активных пользователей',
    unlimitedUsers: 'Без лимита пользователей',
    customVolume: 'Объём согласуется индивидуально',
    customPrice: 'Индивидуально',

    /** API enum values, spelled out for a reader. */
    deliveryLabels: {
      daily: 'Раз в сутки',
      hourly: 'Раз в час',
      hourly_direct: 'Раз в час + прямой доступ к S3/GCS',
      realtime: 'Real-time Firehose',
    },
    slaBestEffort: 'Best effort',
    supportLabels: {
      email: 'Email (24 ч)',
      priority_24_7: 'Приоритетный 24/7',
      dedicated_manager: 'Выделенный менеджер',
      dedicated_team: 'Выделенная команда',
    },

    custom: {
      title: 'Нужен нестандартный объём?',
      body: 'Raw Firehose, собственные правила фильтрации и прямой доступ к bucket обсуждаются отдельно — вместе с SLA и юридическим контуром.',
      cta: 'Обсудить Enterprise',
    },

    cta: {
      subscribe: 'Оформить подписку',
      contactSales: 'Связаться с менеджером',
    },

    plans: {
      starter: {
        audience: 'Стартапы и локальные маркетинговые агентства',
        features: [
          'До 10 000 активных юзеров',
          'Ежедневная выгрузка в S3 (Parquet)',
          'Базовые поля и очистка PII',
          'Email-поддержка',
        ],
        highlightLabel: '',
      },
      growth: {
        audience: 'AdTech-платформы и средние E-commerce',
        features: [
          'До 100 000 активных юзеров',
          'Почасовая синхронизация S3',
          'Расширенные поля (гео, устройство, язык)',
          'Приоритетная поддержка 24/7',
        ],
        highlightLabel: 'Популярный выбор',
      },
      scale: {
        audience: 'Крупные AdTech, DSP, DMP, CDP платформы',
        features: [
          'До 500 000 активных юзеров',
          'Почасовая + прямой доступ к S3/GCS',
          'Кастомные фильтры',
          'Выделенный менеджер',
        ],
        highlightLabel: '',
      },
      enterprise: {
        audience: 'Фонды, исследовательские институты, data brokers',
        features: [
          'Неограниченный поток событий (Raw Firehose)',
          'Настраиваемые правила фильтрации',
          'Выделенный канал S3/GCS',
          'SLA 99.9%',
        ],
        highlightLabel: '',
      },
    },

    matrix: {
      eyebrow: 'Сравнение',
      title: 'Что входит в каждый тариф',
      caption: 'Сравнение возможностей тарифов Starter, Growth, Scale и Enterprise',
      featureColumn: 'Возможность',
      groups: [
        {
          title: 'Объём и доставка',
          rows: [
            {
              label: 'Активных пользователей в месяц',
              values: {
                starter: '10 000',
                growth: '100 000',
                scale: '500 000',
                enterprise: 'Без лимита',
              },
            },
            {
              label: 'Частота выгрузки',
              values: {
                starter: 'Раз в сутки',
                growth: 'Раз в час',
                scale: 'Раз в час + прямой доступ',
                enterprise: 'Real-time Firehose',
              },
            },
            {
              label: 'Формат',
              values: {
                starter: 'Parquet + LZ4',
                growth: 'Parquet + LZ4',
                scale: 'Parquet + LZ4',
                enterprise: 'Parquet + LZ4 / Raw JSONL',
              },
            },
            {
              label: 'Доставка в собственный bucket',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'S3 / GCS Direct Access',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: 'Состав данных',
          rows: [
            {
              label: 'Очищенный URL и домен',
              values: { starter: true, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'Поисковые интенты',
              values: {
                starter: 'Базовые',
                growth: 'Полные + категории',
                scale: 'Полные + категории',
                enterprise: 'Полные + кастомные',
              },
            },
            {
              label: 'Гео и тип устройства',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'Кастомные правила фильтрации',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
            {
              label: 'Расширение схемы данных',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: 'Поддержка и условия',
          rows: [
            {
              label: 'Канал поддержки',
              values: {
                starter: 'Email (24 ч)',
                growth: 'Приоритетный 24/7',
                scale: 'Выделенный менеджер',
                enterprise: 'Выделенная команда',
              },
            },
            {
              label: 'SLA доступности',
              values: {
                starter: 'Best effort',
                growth: '99.5%',
                scale: '99.7%',
                enterprise: '99.9%',
              },
            },
            {
              label: 'DPA и юридическое сопровождение',
              values: {
                starter: 'Стандартный',
                growth: 'Стандартный',
                scale: 'Стандартный',
                enterprise: 'Индивидуальный',
              },
            },
          ],
        },
      ],
    },

    faqEyebrow: 'Оплата и лимиты',
    faqTitle: 'Вопросы по тарифам',
    faq: [
      {
        question: 'Как считаются активные пользователи?',
        answer:
          'Активный пользователь — это одна установка, отправившая хотя бы одно очищенное событие за расчётный месяц. Установки, ничего не отправившие, не учитываются.',
      },
      {
        question: 'Что происходит при превышении лимита?',
        answer:
          'Поток не обрывается. Мы фиксируем перерасход и обсуждаем переход на следующий тариф — задним числом ничего не списывается.',
      },
      {
        question: 'Можно ли сменить тариф в середине месяца?',
        answer:
          'Да. Смена вступает в силу со следующего цикла выгрузки, а доступ к текущему объёму сохраняется до конца оплаченного периода.',
      },
      {
        question: 'За что берётся плата за подключение?',
        answer:
          'Она покрывает разовую настройку: выделенный bucket, ключи, конфигурацию доставки и правила фильтрации. Списывается один раз, при открытии потока.',
      },
      {
        question: 'Как оформляется договор?',
        answer:
          'После заявки менеджер присылает условия и DPA. Enterprise-контракты согласуются индивидуально, включая SLA и правила фильтрации.',
      },
    ],
  },

  checkout: {
    metaTitle: 'Оформление доступа',
    metaDescription: 'Оформление доступа к IntentD Data Stream.',
    eyebrow: 'Checkout',
    title: 'Оформление доступа к IntentD Data Stream',
    intro:
      'После подтверждения заявки за вашим аккаунтом будет зарезервирован индивидуальный S3-бакет с данными.',
    selectedPlan: 'Выбранный тариф',
    loading: 'Загружаем условия тарифа…',
    volume: 'Активные пользователи',
    usersPerMonth: 'пользователей / мес',
    unlimited: 'Без лимита',
    delivery: 'Формат доставки',
    audience: 'Для кого',
    setupFee: 'Плата за подключение (разово)',
    monthlyFee: 'Ежемесячный платёж',
    sla: 'SLA',
    support: 'Поддержка',
    noCharge:
      'Оплата на этом шаге не списывается. Мы фиксируем заявку и связываемся с вами для выдачи тестовых ключей.',
    changePlan: 'Сменить тариф',
    formTitle: 'Данные для активации',
    formIntroPrefix: 'Заявка привяжется к аккаунту',
    companyLabel: 'Название компании',
    companyHintExisting: 'Название сохранено в профиле — при необходимости поправьте.',
    companyHintNew: 'За компанией резервируется отдельный S3-бакет, поэтому поле обязательно.',
    notesLabel: 'Комментарий для менеджера',
    notesPlaceholder: 'Интересующие вертикали, желаемые сроки старта, требования к фильтрации.',
    submit: 'Запросить активацию тарифа',
    submitting: 'Отправляем заявку…',
    guarantees: [
      'Платёжные данные на этом этапе не запрашиваются и не принимаются.',
      'Повторная заявка на тот же тариф не создаёт дубликат — мы увидим исходную.',
    ],
    enterprise: {
      title: 'Enterprise оформляется отдельно',
      body: 'Raw Firehose, кастомные фильтры и SLA согласуются индивидуально, поэтому этот тариф не проходит через самостоятельное оформление.',
      cta: 'Связаться с менеджером',
    },
    noPlan: {
      title: 'Тариф не выбран',
      body: 'Вернитесь к тарифам и выберите объём потока, который вам нужен.',
      cta: 'Перейти к тарифам',
    },
    planError: {
      title: 'Не удалось загрузить тариф',
      body: 'Такого тарифа нет в каталоге. Выберите другой на странице тарифов.',
      cta: 'К тарифам',
      loadFailed: 'Не удалось загрузить тарифы. Обновите страницу.',
    },
    modal: {
      title: 'Заявка принята',
      description:
        'Спасибо! Наш менеджер свяжется с вами по указанному email для выдачи тестовых API-ключей и настройки выгрузки.',
      planLabel: 'Тариф',
      contactLabel: 'Контакт',
      home: 'Вернуться на главную',
      docs: 'Открыть документацию',
    },
    errors: {
      planRequired: 'Выберите тариф',
      companyMin: 'Укажите юридическое или рабочее название компании',
      max255: 'Не длиннее 255 символов',
      max2000: 'Не длиннее 2000 символов',
    },
  },
};
