import type { Plan, PlanCode } from '@/lib/api/plans';

/**
 * Marketing copy for the catalogue. Prices and event limits are NOT duplicated
 * here: they come from GET /public/plans so the page can never advertise a
 * number the backend would not honour.
 */
export interface PlanPresentation {
  code: PlanCode;
  /** Who the tier is for, shown under the title. */
  audience: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
  /** Only one tier may carry the highlight. */
  highlighted?: boolean;
  highlightLabel?: string;
}

export const PLAN_PRESENTATION: Record<PlanCode, PlanPresentation> = {
  starter: {
    code: 'starter',
    audience: 'Стартапы и локальные маркетинговые агентства',
    features: [
      'До 5 000 000 событий в месяц',
      'Ежедневные выгрузки в S3 (Parquet)',
      'Базовая очистка PII и стандартные категории',
      'Email-поддержка',
    ],
    cta: { label: 'Оформить подписку', href: '/checkout?plan=starter' },
  },
  growth: {
    code: 'growth',
    audience: 'AdTech-платформы и средне-крупные E-commerce',
    features: [
      'До 30 000 000 событий в месяц',
      'Почасовая синхронизация S3 / MinIO',
      'Извлечение ключевых поисковых запросов и категорий',
      'Приоритетная поддержка 24/7',
    ],
    cta: { label: 'Оформить подписку', href: '/checkout?plan=growth' },
    highlighted: true,
    highlightLabel: 'Популярный выбор',
  },
  enterprise: {
    code: 'enterprise',
    audience: 'Фонды, исследовательские институты, data brokers',
    features: [
      'Неограниченный поток (Raw Firehose)',
      'Кастомные правила фильтрации',
      'Выделенный канал S3 / GCS Direct Access',
      'SLA 99.9%',
    ],
    cta: { label: 'Связаться с менеджером', href: '/contact?topic=enterprise' },
  },
};

/** Order used when the API is unreachable and the grid renders from copy alone. */
export const PLAN_ORDER: PlanCode[] = ['starter', 'growth', 'enterprise'];

// --- Feature matrix (/pricing) ---------------------------------------------

export interface MatrixRow {
  label: string;
  /** A string renders as text; a boolean renders as an included/excluded mark. */
  values: Record<PlanCode, string | boolean>;
}

export interface MatrixGroup {
  title: string;
  rows: MatrixRow[];
}

export const FEATURE_MATRIX: MatrixGroup[] = [
  {
    title: 'Объём и доставка',
    rows: [
      {
        label: 'События в месяц',
        values: { starter: '5 000 000', growth: '30 000 000', enterprise: 'Без лимита' },
      },
      {
        label: 'Частота выгрузки',
        values: { starter: 'Раз в сутки', growth: 'Раз в час', enterprise: 'Near real-time' },
      },
      {
        label: 'Формат',
        values: {
          starter: 'Parquet + LZ4',
          growth: 'Parquet + LZ4',
          enterprise: 'Parquet + LZ4 / Raw JSONL',
        },
      },
      {
        label: 'Доставка в собственный bucket',
        values: { starter: false, growth: true, enterprise: true },
      },
      {
        label: 'S3 / GCS Direct Access',
        values: { starter: false, growth: false, enterprise: true },
      },
    ],
  },
  {
    title: 'Состав данных',
    rows: [
      {
        label: 'Очищенный URL и домен',
        values: { starter: true, growth: true, enterprise: true },
      },
      {
        label: 'Поисковые интенты',
        values: { starter: 'Базовые', growth: 'Полные + категории', enterprise: 'Полные + кастомные' },
      },
      {
        label: 'Гео и тип устройства',
        values: { starter: false, growth: true, enterprise: true },
      },
      {
        label: 'Кастомные правила фильтрации',
        values: { starter: false, growth: false, enterprise: true },
      },
    ],
  },
  {
    title: 'Поддержка и условия',
    rows: [
      {
        label: 'Канал поддержки',
        values: { starter: 'Email', growth: 'Приоритетный 24/7', enterprise: 'Выделенный менеджер' },
      },
      {
        label: 'SLA доступности',
        values: { starter: '—', growth: '—', enterprise: '99.9%' },
      },
      {
        label: 'DPA и юридическое сопровождение',
        values: { starter: 'Стандартный', growth: 'Стандартный', enterprise: 'Индивидуальный' },
      },
    ],
  },
];

/**
 * Mirror of the seed rows in portal/internal/db/migrations/000003_seed_plans.up.sql.
 * Used only when the catalogue endpoint is unreachable at render time, so the
 * pricing page degrades to our own published figures rather than to an empty
 * section. Update both files together.
 */
export const FALLBACK_PLANS: Plan[] = [
  {
    code: 'starter',
    name: 'Starter Data Stream',
    price_cents: 49900,
    currency: 'USD',
    events_limit: 5_000_000,
    features: { target: 'startups', delivery: 'daily', support: 'email' },
    display_order: 1,
    is_custom_priced: false,
  },
  {
    code: 'growth',
    name: 'Growth Stream',
    price_cents: 199900,
    currency: 'USD',
    events_limit: 30_000_000,
    features: { target: 'adtech', delivery: 'hourly', support: 'priority_24_7' },
    display_order: 2,
    is_custom_priced: false,
  },
  {
    code: 'enterprise',
    name: 'Enterprise Data Pipeline',
    price_cents: 0,
    currency: 'USD',
    events_limit: 0,
    features: { target: 'enterprise', delivery: 'realtime', support: 'dedicated', sla: '99.9' },
    display_order: 3,
    is_custom_priced: true,
  },
];
