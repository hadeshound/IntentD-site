import type { Dictionary } from '@/i18n';

/** Pricing copy. Plan names stay in English: Starter, Growth, Scale, Enterprise. */
export const pricing: Pick<Dictionary, 'pricing' | 'checkout'> = {
  pricing: {
    metaTitle: 'Тарифи',
    metaDescription:
      'Прозорі тарифи на доступ до потоку intent-даних IntentD: Starter, Growth, Scale та Enterprise. Порівняння лімітів користувачів, частоти вигрузки й складу полів.',
    eyebrow: 'Pricing',
    titleBefore: 'Прозорі тарифи для доступу до',
    titleAccent: 'потоку даних',
    subtitle: 'Оберіть обсяг сигналів, необхідний для ваших аналітичних систем.',
    subtitleLong:
      'Оберіть обсяг сигналів, необхідний для ваших аналітичних систем. Платіть за потік, а не за місце в інтерфейсі.',
    compareAll: 'Порівняти всі можливості',
    fallbackNote:
      'Каталог тимчасово віддається з локальної копії — актуальні умови підтвердить менеджер.',

    setupFee: 'підключення, разово',
    perMonth: '/ міс',
    activeUsers: 'активних користувачів',
    unlimitedUsers: 'Без ліміту користувачів',
    customVolume: 'Обсяг узгоджується індивідуально',
    customPrice: 'Індивідуально',

    /** API enum values, spelled out for a reader. */
    deliveryLabels: {
      daily: 'Раз на добу',
      hourly: 'Раз на годину',
      hourly_direct: 'Раз на годину + прямий доступ до S3/GCS',
      realtime: 'Real-time Firehose',
    },
    slaBestEffort: 'Best effort',
    supportLabels: {
      email: 'Email (24 год)',
      priority_24_7: 'Пріоритетний 24/7',
      dedicated_manager: 'Виділений менеджер',
      dedicated_team: 'Виділена команда',
    },

    custom: {
      title: 'Потрібен нестандартний обсяг?',
      body: 'Raw Firehose, власні правила фільтрації та прямий доступ до bucket обговорюються окремо — разом із SLA та юридичним контуром.',
      cta: 'Обговорити Enterprise',
    },

    cta: {
      subscribe: 'Оформити підписку',
      contactSales: 'Зв’язатися з менеджером',
    },

    plans: {
      starter: {
        audience: 'Стартапи та локальні маркетингові агенції',
        features: [
          'До 10 000 активних користувачів',
          'Щоденна вигрузка в S3 (Parquet)',
          'Базові поля та очищення PII',
          'Email-підтримка',
        ],
        highlightLabel: '',
      },
      growth: {
        audience: 'AdTech-платформи та середні E-commerce',
        features: [
          'До 100 000 активних користувачів',
          'Погодинна синхронізація S3',
          'Розширені поля (гео, пристрій, мова)',
          'Пріоритетна підтримка 24/7',
        ],
        highlightLabel: 'Популярний вибір',
      },
      scale: {
        audience: 'Великі AdTech, DSP, DMP, CDP платформи',
        features: [
          'До 500 000 активних користувачів',
          'Погодинна + прямий доступ до S3/GCS',
          'Кастомні фільтри',
          'Виділений менеджер',
        ],
        highlightLabel: '',
      },
      enterprise: {
        audience: 'Фонди, дослідницькі інститути, data brokers',
        features: [
          'Необмежений потік подій (Raw Firehose)',
          'Налаштовувані правила фільтрації',
          'Виділений канал S3/GCS',
          'SLA 99.9%',
        ],
        highlightLabel: '',
      },
    },

    matrix: {
      eyebrow: 'Порівняння',
      title: 'Що входить у кожен тариф',
      caption: 'Порівняння можливостей тарифів Starter, Growth, Scale та Enterprise',
      featureColumn: 'Можливість',
      groups: [
        {
          title: 'Обсяг і доставка',
          rows: [
            {
              label: 'Активних користувачів на місяць',
              values: {
                starter: '10 000',
                growth: '100 000',
                scale: '500 000',
                enterprise: 'Без ліміту',
              },
            },
            {
              label: 'Частота вигрузки',
              values: {
                starter: 'Раз на добу',
                growth: 'Раз на годину',
                scale: 'Раз на годину + прямий доступ',
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
              label: 'Доставка у власний bucket',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'S3 / GCS Direct Access',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: 'Склад даних',
          rows: [
            {
              label: 'Очищений URL і домен',
              values: { starter: true, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'Пошукові інтенти',
              values: {
                starter: 'Базові',
                growth: 'Повні + категорії',
                scale: 'Повні + категорії',
                enterprise: 'Повні + кастомні',
              },
            },
            {
              label: 'Гео і тип пристрою',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'Кастомні правила фільтрації',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
            {
              label: 'Розширення схеми даних',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: 'Підтримка й умови',
          rows: [
            {
              label: 'Канал підтримки',
              values: {
                starter: 'Email (24 год)',
                growth: 'Пріоритетний 24/7',
                scale: 'Виділений менеджер',
                enterprise: 'Виділена команда',
              },
            },
            {
              label: 'SLA доступності',
              values: {
                starter: 'Best effort',
                growth: '99.5%',
                scale: '99.7%',
                enterprise: '99.9%',
              },
            },
            {
              label: 'DPA і юридичний супровід',
              values: {
                starter: 'Стандартний',
                growth: 'Стандартний',
                scale: 'Стандартний',
                enterprise: 'Індивідуальний',
              },
            },
          ],
        },
      ],
    },

    faqEyebrow: 'Оплата і ліміти',
    faqTitle: 'Питання щодо тарифів',
    faq: [
      {
        question: 'Як рахуються активні користувачі?',
        answer:
          'Активний користувач — це одна установка, яка надіслала щонайменше одну очищену подію за розрахунковий місяць. Установки, які нічого не надсилали, не враховуються.',
      },
      {
        question: 'Що відбувається при перевищенні ліміту?',
        answer:
          'Потік не обривається. Ми фіксуємо перевитрату й обговорюємо перехід на наступний тариф — заднім числом нічого не списується.',
      },
      {
        question: 'Чи можна змінити тариф у середині місяця?',
        answer:
          'Так. Зміна набуває чинності з наступного циклу вигрузки, а доступ до поточного обсягу зберігається до кінця оплаченого періоду.',
      },
      {
        question: 'За що береться плата за підключення?',
        answer:
          'Вона покриває разове налаштування: виділений bucket, ключі, конфігурацію доставки та правила фільтрації. Списується один раз, при відкритті потоку.',
      },
      {
        question: 'Як оформлюється договір?',
        answer:
          'Після заявки менеджер надсилає умови та DPA. Enterprise-контракти узгоджуються індивідуально, разом із SLA і правилами фільтрації.',
      },
    ],
  },

  checkout: {
    metaTitle: 'Оформлення доступу',
    metaDescription: 'Оформлення доступу до IntentD Data Stream.',
    eyebrow: 'Checkout',
    title: 'Оформлення доступу до IntentD Data Stream',
    intro:
      'Після підтвердження заявки за вашим акаунтом буде зарезервовано індивідуальний S3-бакет з даними.',
    selectedPlan: 'Обраний тариф',
    loading: 'Завантажуємо умови тарифу…',
    volume: 'Активні користувачі',
    usersPerMonth: 'користувачів / міс',
    unlimited: 'Без ліміту',
    delivery: 'Формат доставки',
    audience: 'Для кого',
    setupFee: 'Плата за підключення (разово)',
    monthlyFee: 'Щомісячний платіж',
    sla: 'SLA',
    support: 'Підтримка',
    noCharge:
      'Оплата на цьому кроці не списується. Ми фіксуємо заявку та зв’язуємося з вами для видачі тестових ключів.',
    changePlan: 'Змінити тариф',
    formTitle: 'Дані для активації',
    formIntroPrefix: 'Заявка прив’яжеться до акаунта',
    companyLabel: 'Назва компанії',
    companyHintExisting: 'Назву збережено в профілі — за потреби виправте.',
    companyHintNew: 'За компанією резервується окремий S3-бакет, тому поле обов’язкове.',
    notesLabel: 'Коментар для менеджера',
    notesPlaceholder: 'Цікаві вертикалі, бажані терміни старту, вимоги до фільтрації.',
    submit: 'Запросити активацію тарифу',
    submitting: 'Надсилаємо заявку…',
    guarantees: [
      'Платіжні дані на цьому етапі не запитуються і не приймаються.',
      'Повторна заявка на той самий тариф не створює дубліката — ми побачимо початкову.',
    ],
    enterprise: {
      title: 'Enterprise оформлюється окремо',
      body: 'Raw Firehose, кастомні фільтри та SLA узгоджуються індивідуально, тому цей тариф не проходить через самостійне оформлення.',
      cta: 'Зв’язатися з менеджером',
    },
    noPlan: {
      title: 'Тариф не обрано',
      body: 'Поверніться до тарифів і оберіть обсяг потоку, який вам потрібен.',
      cta: 'Перейти до тарифів',
    },
    planError: {
      title: 'Не вдалося завантажити тариф',
      body: 'Такого тарифу немає в каталозі. Оберіть інший на сторінці тарифів.',
      cta: 'До тарифів',
      loadFailed: 'Не вдалося завантажити тарифи. Оновіть сторінку.',
    },
    modal: {
      title: 'Заявку прийнято',
      description:
        'Дякуємо! Наш менеджер зв’яжеться з вами за вказаним email для видачі тестових API-ключів і налаштування вигрузки.',
      planLabel: 'Тариф',
      contactLabel: 'Контакт',
      home: 'Повернутися на головну',
      docs: 'Відкрити документацію',
    },
    errors: {
      planRequired: 'Оберіть тариф',
      companyMin: 'Вкажіть юридичну або робочу назву компанії',
      max255: 'Не довше за 255 символів',
      max2000: 'Не довше за 2000 символів',
    },
  },
};
