import type { Metadata } from 'next';
import Link from 'next/link';

import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import {
  EVENT_SCHEMA,
  GO_READ_SNIPPET,
  INGEST_ENDPOINTS,
  INGEST_ERRORS,
  INGEST_REQUEST_SNIPPET,
  PYTHON_READ_SNIPPET,
  SDK_INIT_SNIPPET,
  SDK_INSTALL_SNIPPET,
} from '@/lib/content/docs';

export const metadata: Metadata = {
  title: 'API и формат данных',
  description:
    'Технические спецификации IntentD: подключение edge-SDK, Ingest API с HMAC-подписью, схема события, формат Parquet + LZ4 и структура выгрузок в S3.',
};

const SECTIONS = [
  { id: 'quickstart', label: 'SDK Quickstart', audience: 'Publishers' },
  { id: 'ingest-api', label: 'Ingest API', audience: 'Publishers' },
  { id: 'data-schema', label: 'Схема данных', audience: 'Data Buyers' },
  { id: 'provenance', label: 'Data Provenance', audience: 'Data Buyers' },
  { id: 'delivery', label: 'Хранение и доставка', audience: 'Data Buyers' },
  { id: 'examples', label: 'Примеры чтения', audience: 'Data Buyers' },
];

export default function ApiDocsPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-16 lg:pt-24">
        <div className="hairline-grid-overlay" />
        <AmbientGlow className="-left-24 top-0 h-96 w-96" drift />

        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3">
              <span className="eyebrow">Documentation</span>
              <span className="h-px w-12 bg-hairline-strong" />
            </p>

            <h1 className="mt-7 text-hero">Интеграция и формат данных IntentD</h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted text-pretty">
              Технические спецификации для разработчиков расширений и дата-инженеров
              на стороне покупателя. Всё, что нужно, чтобы начать отправлять события
              или читать выгрузки.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Badge tone="mint">Manifest V3</Badge>
              <Badge>HMAC-SHA256</Badge>
              <Badge>X25519 + AES-GCM</Badge>
              <Badge>Parquet + LZ4</Badge>
              <Badge tone="violet">PII-free</Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="shell grid gap-12 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        {/* Sticky table of contents. Real anchors, so the page is usable with
            JavaScript disabled and each section is linkable. */}
        <nav aria-label="Содержание документации" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
              Содержание
            </p>

            <ol className="mt-5 space-y-1">
              {SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-3 rounded-control px-2.5 py-2 text-sm text-ink-muted transition-colors duration-200 hover:bg-white/5 hover:text-ink"
                  >
                    <span className="font-mono text-xs text-ink-faint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      {section.label}
                      <span className="mt-0.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                        {section.audience}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="space-y-20 lg:col-span-8 lg:col-start-5">
          {/* --- 1. SDK Quickstart ------------------------------------------ */}
          <section id="quickstart" className="scroll-mt-28">
            <p className="eyebrow">01 · Publishers</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">SDK Quickstart</h2>

            <p className="mt-5 prose-body max-w-2xl">
              SDK работает в background script расширения и не требует доступа к DOM
              страницы. Бандл собирается в кабинете персонально для расширения: ключи,
              ключ шифрования и ID расширения уже внутри, вызывать init вручную не нужно.
              До согласия пользователя SDK ничего не собирает —{' '}
              <Link href="/docs/sdk" className="text-mint-300 underline underline-offset-4">
                как устроен запрос согласия
              </Link>
              .
            </p>

            <div className="mt-8 space-y-4">
              <CodeBlock code={SDK_INSTALL_SNIPPET} label="bash" />
              <CodeBlock code={SDK_INIT_SNIPPET} label="background.js" />
            </div>

            <div className="surface-card mt-8 p-6">
              <h3 className="font-display text-lg text-ink">Требования к манифесту</h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-muted">
                <li>
                  <code className="font-mono text-mint-300">manifest_version: 3</code> — SDK
                  не использует <code className="font-mono">eval</code> и не подгружает код извне.
                </li>
                <li>
                  Разрешения <code className="font-mono text-mint-300">storage</code>,{' '}
                  <code className="font-mono text-mint-300">alarms</code> и{' '}
                  <code className="font-mono text-mint-300">unlimitedStorage</code>: события
                  копятся локально и уходят пакетом раз в сутки.
                </li>
                <li>
                  <code className="font-mono text-mint-300">webNavigation</code> (или{' '}
                  <code className="font-mono">tabs</code>) — источник событий навигации.
                </li>
                <li>
                  Домен <code className="font-mono text-mint-300">api.intentd.io</code> в
                  <code className="font-mono"> host_permissions</code>.
                </li>
              </ul>
            </div>

            <p className="mt-6 text-sm text-ink-faint">
              Перед скачиванием укажите в кабинете ID расширения из магазина: бандл
              отказывается работать внутри любого другого расширения и сообщает об этом.
            </p>
          </section>

          {/* --- 2. Ingest API ---------------------------------------------- */}
          <section id="ingest-api" className="scroll-mt-28">
            <p className="eyebrow">02 · Publishers</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Ingest API</h2>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface-card p-5">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
                  Base URL
                </dt>
                <dd className="mt-2 break-all font-mono text-sm text-mint-300">
                  https://api.intentd.io/v1
                </dd>
              </div>

              <div className="surface-card p-5">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
                  Аутентификация
                </dt>
                <dd className="mt-2 font-mono text-sm text-ink-muted">
                  X-API-Key + HMAC-SHA256 по телу
                </dd>
              </div>
            </dl>

            <h3 className="mt-10 font-display text-xl text-ink">Эндпоинты</h3>

            <div className="mt-5 overflow-x-auto rounded-card border border-hairline">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline bg-white/[0.02]">
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Метод</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Путь</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Назначение</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Лимит</th>
                  </tr>
                </thead>
                <tbody>
                  {INGEST_ENDPOINTS.map((endpoint) => (
                    <tr key={endpoint.path} className="border-b border-hairline last:border-b-0">
                      <td className="px-5 py-4">
                        <Badge tone="mint">{endpoint.method}</Badge>
                      </td>
                      <td className="px-5 py-4 font-mono text-ink">{endpoint.path}</td>
                      <td className="px-5 py-4 text-ink-muted">{endpoint.description}</td>
                      <td className="px-5 py-4 font-mono text-xs text-ink-faint">{endpoint.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-10 font-display text-xl text-ink">Пример запроса</h3>
            <CodeBlock className="mt-5" code={INGEST_REQUEST_SNIPPET} label="http" />

            <h3 className="mt-10 font-display text-xl text-ink">Коды ошибок</h3>

            <div className="mt-5 overflow-x-auto rounded-card border border-hairline">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline bg-white/[0.02]">
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">HTTP</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Код</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Значение</th>
                  </tr>
                </thead>
                <tbody>
                  {INGEST_ERRORS.map((error) => (
                    <tr key={error.code} className="border-b border-hairline last:border-b-0">
                      <td className="px-5 py-3.5 font-mono text-ink-faint">{error.status}</td>
                      <td className="px-5 py-3.5 font-mono text-ink">{error.code}</td>
                      <td className="px-5 py-3.5 text-ink-muted">{error.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-faint">
              На сетевых ошибках, 429 и 503 SDK сохраняет очередь и повторяет отправку
              раз в час. Двоичный формат пакета и схема шифрования описаны открыто —{' '}
              <Link href="/docs/bucket-format-v1" className="text-mint-300 underline underline-offset-4">
                спецификация INTD v1
              </Link>
              .
            </p>
          </section>

          {/* --- 3. Data schema --------------------------------------------- */}
          <section id="data-schema" className="scroll-mt-28">
            <p className="eyebrow">03 · Data Buyers</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Схема данных</h2>

            <p className="mt-5 prose-body max-w-2xl">
              Одна строка Parquet — одно очищенное событие. Полей с персональными данными
              в схеме нет по построению: они отбрасываются в браузере, до отправки.
            </p>

            <div className="mt-8 overflow-x-auto rounded-card border border-hairline">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <caption className="sr-only">Поля события в выгрузке Parquet</caption>
                <thead>
                  <tr className="border-b border-hairline bg-white/[0.02]">
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Поле</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Тип</th>
                    <th scope="col" className="px-5 py-3.5 font-medium text-ink-faint">Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {EVENT_SCHEMA.map((field) => (
                    <tr key={field.name} className="border-b border-hairline last:border-b-0">
                      <th scope="row" className="px-5 py-3.5 text-left font-mono font-normal text-mint-300">
                        {field.name}
                      </th>
                      <td className="px-5 py-3.5 font-mono text-ink-faint">{field.type}</td>
                      <td className="px-5 py-3.5 text-ink-muted">
                        {field.description}
                        {field.tier ? (
                          <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-violet-400">
                            {field.tier}+
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* --- Provenance ------------------------------------------------ */}
          <section id="provenance" className="scroll-mt-28">
            <p className="eyebrow">Data Buyers</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Data Provenance</h2>

            <ul className="mt-6 max-w-2xl list-disc space-y-3 pl-5 prose-body">
              <li>
                Все события приходят только от пользователей, явно нажавших «Разрешить» в запросе
                согласия (GDPR ст. 6(1)(a)). До согласия SDK не создаёт идентификатор и не хранит события.
              </li>
              <li>
                Каждый принятый пакет несёт версию текста согласия; сервер отклоняет пакеты без неё и
                фиксирует версию в журнале приёма. При смене текста согласие запрашивается заново.
              </li>
              <li>
                При отзыве согласия SDK прекращает сбор и удаляет неотправленные события на устройстве;
                следующая выдача согласия создаёт новый, не связанный с прежним псевдоним.
              </li>
              <li>
                Факт и время согласия конкретного пользователя на сервере не хранятся: доказательством
                служит сам принятый пакет и зафиксированная версия текста.
              </li>
            </ul>
          </section>

          {/* --- 4. Delivery ------------------------------------------------ */}
          <section id="delivery" className="scroll-mt-28">
            <p className="eyebrow">04 · Data Buyers</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Хранение и доставка</h2>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { term: 'Формат', value: 'Parquet + LZ4' },
                { term: 'Хранилище', value: 'AWS S3' },
                { term: 'Hot-доступ', value: '30 дней' },
                { term: 'Архив', value: '90 дней' },
              ].map((item) => (
                <div key={item.term} className="surface-card p-5">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint">
                    {item.term}
                  </dt>
                  <dd className="mt-2 font-display text-lg text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 font-display text-xl text-ink">Структура путей</h3>
            <CodeBlock
              className="mt-5"
              label="s3"
              code={'year=YYYY/month=MM/day=DD/tenant=<key_id>__<bucket_id>.parquet.lz4'}
            />

            <p className="mt-6 prose-body max-w-2xl">
              Партиционирование по дате и арендатору позволяет читать нужный срез без
              полного скана бакета. Growth и Enterprise дополнительно поддерживают
              синхронизацию в ваш собственный bucket.
            </p>
          </section>

          {/* --- 5. Examples ------------------------------------------------ */}
          <section id="examples" className="scroll-mt-28">
            <p className="eyebrow">05 · Data Buyers</p>
            <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Примеры чтения</h2>

            <p className="mt-5 prose-body max-w-2xl">
              Выгрузка читается любым стандартным Parquet-стеком. Ниже — минимальные
              примеры на Python и Go.
            </p>

            <div className="mt-8 space-y-6">
              <CodeBlock code={PYTHON_READ_SNIPPET} label="python" />
              <CodeBlock code={GO_READ_SNIPPET} label="go" />
            </div>
          </section>

          <section className="surface-card surface-card-accent scroll-mt-28 p-8 lg:p-10">
            <div className="ambient-glow -right-16 -top-16 h-56 w-56 bg-mint-500/25" />

            <h2 className="font-display text-2xl text-ink">Готовы подключиться?</h2>
            <p className="mt-3 max-w-xl prose-body">
              Создайте аккаунт, чтобы получить ключи и зарезервировать выгрузку. Если
              нужен сэмпл данных до подписания — напишите нам.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/auth/register">Создать аккаунт</ButtonLink>
              <ButtonLink href="/contact?topic=support" variant="secondary">
                Запросить сэмпл
              </ButtonLink>
            </div>

            <p className="mt-6 text-sm text-ink-faint">
              Полная OpenAPI-спецификация портала лежит в репозитории:{' '}
              <span className="font-mono">portal/docs/swagger.yaml</span>. Публичный
              hosted-вариант появится вместе с личным кабинетом —{' '}
              <Link href="/contact?topic=support" className="link-underline underline underline-offset-4">
                сообщить о необходимости
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
