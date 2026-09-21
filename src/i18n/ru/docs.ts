import type { Dictionary } from '@/i18n';

/**
 * Documentation prose. Technical terms — API, SDK, Parquet, HMAC, S3, LZ4,
 * PII, field names, error codes, header names — stay in English.
 */
export const docs: Pick<Dictionary, 'docs'> = {
  docs: {
    layout: {
      eyebrow: 'Documentation',
      contents: 'Содержание',
    },

    api: {
      metaTitle: 'API и формат данных',
      metaDescription:
        'Технические спецификации IntentD: подключение edge-SDK, Ingest API с HMAC-подписью, схема события, формат Parquet + LZ4 и структура выгрузок в S3.',
      heading: 'Интеграция и формат данных IntentD',
      intro:
        'Технические спецификации для разработчиков расширений и дата-инженеров на стороне покупателя. Всё, что нужно, чтобы начать отправлять события или читать выгрузки.',
      sections: {
        quickstart: { label: 'SDK Quickstart', audience: 'Publishers' },
        ingest: { label: 'Ingest API', audience: 'Publishers' },
        schema: { label: 'Схема данных', audience: 'Data Buyers' },
        provenance: { label: 'Data Provenance', audience: 'Data Buyers' },
        delivery: { label: 'Хранение и доставка', audience: 'Data Buyers' },
        examples: { label: 'Примеры чтения', audience: 'Data Buyers' },
      },

      quickstart: {
        title: 'SDK Quickstart',
        body: 'SDK работает в background script расширения и не требует доступа к DOM страницы. Бандл собирается в кабинете персонально для расширения: ключи, ключ шифрования и ID расширения уже внутри, вызывать init вручную не нужно. До согласия пользователя SDK ничего не собирает —',
        consentLink: 'как устроен запрос согласия',
        manifestTitle: 'Требования к манифесту',
        manifest: {
          version: '— SDK не использует eval и не подгружает код извне.',
          storage: '— события копятся локально и уходят пакетом раз в сутки.',
          navigation: '(или tabs) — источник событий навигации.',
          host: 'в host_permissions.',
        },
        note: 'Перед скачиванием укажите в кабинете ID расширения из магазина: бандл отказывается работать внутри любого другого расширения и сообщает об этом.',
      },

      ingest: {
        title: 'Ingest API',
        baseUrl: 'Base URL',
        auth: 'Аутентификация',
        authValue: 'X-API-Key + HMAC-SHA256 по телу',
        endpointsTitle: 'Эндпоинты',
        tableMethod: 'Метод',
        tablePath: 'Путь',
        tablePurpose: 'Назначение',
        tableLimit: 'Лимит',
        requestTitle: 'Пример запроса',
        errorsTitle: 'Коды ошибок',
        tableHttp: 'HTTP',
        tableCode: 'Код',
        tableMeaning: 'Значение',
        retryNote:
          'На сетевых ошибках, 429 и 503 SDK сохраняет очередь и повторяет отправку раз в час. Двоичный формат пакета и схема шифрования описаны открыто —',
        specLink: 'спецификация INTD v1',
        endpoints: {
          register: {
            description: 'Регистрация установки: сессия и идентификатор пакета. Идемпотентна.',
            limit: '120 запросов / мин с IP',
          },
          bucket: {
            description: 'Зашифрованный пакет событий (X25519 + AES-256-GCM). Раз в сутки или досрочно.',
            limit: '48 пакетов / сутки на установку',
          },
          tamper: {
            description: 'Сообщение SDK о проваленной проверке целостности.',
            limit: '30 запросов / мин с IP',
          },
        },
        errors: {
          BUCKET_INVALID_FORMAT: 'Пакет не расшифровался или не прошёл проверку формата и CRC32',
          API_KEY_REVOKED: 'Ключ отозван — SDK отключается',
          INVALID_SIGNATURE: 'HMAC-подпись не совпала с телом запроса',
          CLOCK_SKEW: 'Часы клиента расходятся больше чем на 5 минут; в ответе server_time',
          SUBSCRIPTION_INACTIVE: 'Нет активной подписки — события остаются в очереди',
          WRONG_EXTENSION: 'Бандл запущен не в том расширении, для которого выпущен',
          FINGERPRINT_MISMATCH: 'Окружение не совпадает с сессией — SDK регистрируется заново',
          BUCKET_ALREADY_RECEIVED: 'Этот пакет уже принят',
          BUCKET_TOO_LARGE: 'Больше 10 000 событий или 10 МБ — SDK делит пакет',
          RATE_LIMITED: 'Превышен лимит запросов или пакетов в сутки',
        },
      },

      schema: {
        title: 'Схема данных',
        body: 'Одна строка Parquet — одно очищенное событие. Полей с персональными данными в схеме нет по построению: они отбрасываются в браузере, до отправки.',
        caption: 'Поля события в выгрузке Parquet',
        tableField: 'Поле',
        tableType: 'Тип',
        tableDescription: 'Описание',
        fields: {
          event_id: 'Уникальный GUID события',
          timestamp: 'Unix Timestamp в миллисекундах, UTC',
          anon_uid: 'HMAC-хеш сессии пользователя, необратимый',
          clean_url: 'URL после вырезания PII-параметров',
          search_query: 'Извлечённый поисковый интент, если он есть',
          lang: 'Язык браузера, BCP 47',
          geo_country: 'ISO-код страны, определяется по IP на edge',
          device_type: 'desktop / mobile / tablet',
          domain: 'Корневой домен без поддоменов',
        },
      },

      provenance: {
        title: 'Data Provenance',
        items: [
          'Все события приходят только от пользователей, явно нажавших «Разрешить» в запросе согласия (GDPR ст. 6(1)(a)). До согласия SDK не создаёт идентификатор и не хранит события.',
          'Каждый принятый пакет несёт версию текста согласия; сервер отклоняет пакеты без неё и фиксирует версию в журнале приёма. При смене текста согласие запрашивается заново.',
          'При отзыве согласия SDK прекращает сбор и удаляет неотправленные события на устройстве; следующая выдача согласия создаёт новый, не связанный с прежним псевдоним.',
          'Факт и время согласия конкретного пользователя на сервере не хранятся: доказательством служит сам принятый пакет и зафиксированная версия текста.',
        ],
      },

      delivery: {
        title: 'Хранение и доставка',
        facts: {
          format: 'Формат',
          storage: 'Хранилище',
          hot: 'Hot-доступ',
          archive: 'Архив',
          hotValue: '30 дней',
          archiveValue: '90 дней',
        },
        pathsTitle: 'Структура путей',
        body: 'Партиционирование по дате и арендатору позволяет читать нужный срез без полного скана бакета. Growth и выше дополнительно поддерживают синхронизацию в ваш собственный bucket.',
      },

      examples: {
        title: 'Примеры чтения',
        body: 'Выгрузка читается любым стандартным Parquet-стеком. Ниже — минимальные примеры на Python и Go.',
      },

      cta: {
        title: 'Готовы подключиться?',
        body: 'Создайте аккаунт, чтобы получить ключи и зарезервировать выгрузку. Если нужен сэмпл данных до подписания — напишите нам.',
        primary: 'Создать аккаунт',
        secondary: 'Запросить сэмпл',
        note: 'Полная OpenAPI-спецификация портала лежит в репозитории:',
        noteAfter: 'Публичный hosted-вариант появится вместе с личным кабинетом —',
        noteLink: 'сообщить о необходимости',
      },

      snippets: {
        install: `# Кабинет → Расширения → SDK → Скачать
# Файл intentd-<name>.min.js уже содержит ключи и конфигурацию.
cp ~/Downloads/intentd-my-extension.min.js ./extension/intentd.min.js`,
        init: `// background.js — первой строкой, на верхнем уровне.
// init вызывается автоматически; слушатели должны регистрироваться
// при старте service worker, иначе Manifest V3 не доставит события.
import './intentd.min.js';

// Необязательно: статус и ручная отправка.
// const status = await IntentD.status();
// await IntentD.flush();`,
        request: `POST /v1/telemetry/bucket HTTP/1.1
Host: api.intentd.io
Content-Type: application/json
X-API-Key: ext_...
X-Timestamp: 1758000000
# hex(HMAC-SHA256(secret, "intentd-v2|bucket|<X-Timestamp>|<X-API-Key>|" + hex(SHA-256(body))))
X-Signature: d49d3b20...

{
  "bucket_id": "7c0e…", "session_id": "2b91…",
  "ephemeral_public_key": "base64(32 байта)",
  "iv": "base64(12 байт)",
  "encrypted_key": "base64(48 байт)",
  "ciphertext": "base64(AES-256-GCM пакета INTD)",
  "events_count": 1234, "bytes_size": 45678, "bucket_version": 1,
  "client_ts": 1758000000, "fingerprint_hash": "5c9a96…"
}`,
        python: `import pandas as pd

# Дневная партиция арендатора в S3.
path = "s3://intentd-delivery/year=2026/month=09/day=11/tenant=ext_acme__7c0e.parquet.lz4"

frame = pd.read_parquet(
    path,
    columns=["timestamp", "domain", "search_query", "geo_country"],
    storage_options={
        "key": "YOUR_ACCESS_KEY",
        "secret": "YOUR_SECRET_KEY",
    },
)

top_domains = frame.groupby("domain").size().sort_values(ascending=False).head(20)
print(top_domains)`,
        go: `package main

import (
    "context"
    "log"

    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
    ctx := context.Background()

    cfg, err := config.LoadDefaultConfig(ctx)
    if err != nil {
        log.Fatal(err)
    }

    client := s3.NewFromConfig(cfg)

    object, err := client.GetObject(ctx, &s3.GetObjectInput{
        Bucket: ptr("intentd-delivery"),
        Key:    ptr("year=2026/month=09/day=11/tenant=ext_acme__7c0e.parquet.lz4"),
    })
    if err != nil {
        log.Fatal(err)
    }
    defer object.Body.Close()

    // Дальше — любой Parquet-ридер, например parquet-go.
    log.Printf("получено %d байт", *object.ContentLength)
}

func ptr(s string) *string { return &s }`,
      },
    },

    sdk: {
      metaTitle: 'SDK: подключение и согласие пользователя',
      metaDescription:
        'Как подключить IntentD edge-SDK к расширению Manifest V3 и как работает запрос согласия пользователя: плашка в popup, вкладка согласия, отзыв согласия.',
      backToApi: '← Документация API',
      eyebrow: 'Publishers',
      title: 'Подключение SDK и согласие пользователя',
      intro:
        'SDK собирает URL и поисковые запросы, поэтому по GDPR (ст. 6) и ePrivacy (ст. 5(3)) ему нужно явное согласие пользователя. Пока пользователь не нажал «Разрешить», SDK не создаёт идентификатор, не хранит события и не обращается к серверу. Функциональность вашего расширения от выбора не зависит.',

      install: {
        title: 'Установка',
        body: 'В кабинете: Расширения → SDK → «Скачать». Архив распакуйте в корень расширения.',
        archiveLabel: 'архив',
        files: `intentd.min.js        SDK с ключами вашего расширения — не переименовывать
intentd-consent.html  страница согласия для расширений без popup
intentd-consent.js    скрипт этой страницы (MV3 запрещает inline-скрипты)`,
        manifest: `{
  "manifest_version": 3,
  "background": { "service_worker": "background.js", "type": "module" },
  "action": { "default_popup": "popup.html" },
  "permissions": ["storage", "webNavigation", "tabs", "alarms", "unlimitedStorage"],
  "host_permissions": ["https://api.intentd.io/*"]
}`,
        background: `// background.js — первой строкой, на верхнем уровне
import './intentd.min.js';`,
      },

      consent: {
        title: 'Consent Flow',
        withPopupTitle: 'Расширение с popup',
        withPopupBodyBefore: 'Вызовите',
        withPopupBodyAfter:
          'в popup. Если вы этого не сделаете, пользователь увидит только вкладку согласия при установке, а SDK останется неактивным до его выбора — ответственность за вызов лежит на расширении.',
        popupHtml: `<div id="consent-root"></div>
<!-- ... интерфейс вашего расширения ... -->
<script src="intentd.min.js"></script>
<script src="popup.js"></script>`,
        popupJs: `// Плашка появится, только если согласия на текущую версию текста нет.
// Промис разрешается выбором пользователя: true — разрешил, false — отказался.
IntentD.mountConsent(document.getElementById('consent-root'));`,
        shadowDom:
          'Плашка рендерится в закрытом Shadow DOM: ваши стили на неё не влияют, её стили не влияют на вас. Тема (светлая или тёмная) подбирается по фону popup, ширина — от 320 до 800 px. Кнопки «Отказаться» и «Разрешить» одного размера, предустановленных галочек нет. После согласия плашка исчезает и больше не показывается; после отказа появляется при следующем открытии popup.',
        withoutPopupTitle: 'Расширение без popup',
        withoutPopupBody:
          'SDK сам открывает вкладку intentd-consent.html при установке и при старте браузера, пока согласия нет. Вторая вкладка не открывается — существующая получает фокус. После выбора вкладка закрывается.',
        triggersTitle: 'Когда показывается запрос',
        triggersHead: ['Событие', 'Поведение'],
        triggers: [
          ['Установка или обновление расширения', 'Вкладка согласия, если нет согласия на текущую версию'],
          ['Старт браузера', 'Вкладка согласия — только у расширений без popup'],
          ['Открытие popup', 'Плашка, если вы вызываете mountConsent и согласия нет'],
          ['Любое другое пробуждение service worker', 'Ничего не показывается'],
          ['Согласие уже дано', 'Плашка больше не показывается'],
          ['Смена версии текста согласия', 'Согласие запрашивается заново'],
        ],
        revokeTitle: 'Отзыв согласия',
        revokeBody:
          'Текст согласия обещает пользователю возможность отозвать его в настройках. Добавьте в страницу настроек переключатель:',
        optionsJs: `const allowed = await IntentD.hasConsent();

// Кнопка «Отозвать согласие»
await IntentD.revokeConsent();   // сбор остановлен, локальные данные удалены

// Кнопка «Разрешить сбор» (например, после отказа)
await IntentD.grantConsent();`,
        warningTitle: 'Не добавляйте страницу согласия в web_accessible_resources',
        warningBody:
          'Страницы расширения доступны ему самому без этого списка. Если страница станет web-accessible, любой сайт сможет встроить её во фрейм и незаметно получить клик «Разрешить» — такое согласие недействительно.',
      },

      api: {
        title: 'API',
        head: ['Метод', 'Назначение'],
        rows: [
          ['IntentD.mountConsent(element)', 'Показать плашку в popup, если согласия нет. Promise<boolean>.'],
          ['IntentD.hasConsent()', 'Есть ли согласие на текущую версию текста. Promise<boolean>.'],
          ['IntentD.getConsentState()', "'approved' | 'declined' | null."],
          ['IntentD.grantConsent()', 'Записать согласие (из вашего собственного UI).'],
          ['IntentD.revokeConsent()', 'Отзыв: сбор останавливается, очередь и идентификатор установки удаляются.'],
          ['IntentD.openConsentTab()', 'Открыть вкладку согласия вручную (или сфокусировать открытую).'],
          ['IntentD.status()', 'Состояние SDK, включая consent.'],
        ],
        storageNote:
          'Решение хранится только в chrome.storage.local этого профиля браузера: каждое устройство спрашивает отдельно, сервер не хранит, кто и когда согласился. На сервер с каждым пакетом уходит лишь версия текста согласия.',
      },
    },

    bucket: {
      metaTitle: 'Формат пакета INTD v1',
      metaDescription:
        'Открытая спецификация двоичного формата пакетов IntentD SDK: заголовок, кодирование событий, CRC32, шифрование X25519 + HKDF + AES-256-GCM и тестовые векторы.',
      backToApi: '← Документация API',
      eyebrow: 'Specification',
      title: 'Формат пакета INTD v1',
      intro:
        'Формат открыт намеренно: конфиденциальность и целостность дают шифрование и подпись запроса, а не неизвестность разметки. Фиксированная структура и CRC32 позволяют серверу дёшево отбрасывать мусор до записи в хранилище.',

      container: {
        title: 'Контейнер',
        head: ['Смещение', 'Размер', 'Поле', 'Значение'],
        note: 'Итоговый размер ровно 26 + N байт; лишние байты — ошибка.',
        rows: [
          ['0', '4', 'MAGIC', '0x49 0x4E 0x54 0x44 («INTD»)'],
          ['4', '1', 'VERSION', '0x01'],
          ['5', '1', 'FLAGS', '0x00, зарезервировано'],
          ['6', '8', 'TIMESTAMP', 'uint64 BE, unix мс — база для дельт'],
          ['14', '4', 'EVENTS_COUNT', 'uint32 BE'],
          ['18', '4', 'BLOB_LENGTH', 'uint32 BE, длина EVENTS_BLOB'],
          ['22', 'N', 'EVENTS_BLOB', 'события подряд'],
          ['22+N', '4', 'CRC32', 'uint32 BE, CRC-32/IEEE от EVENTS_BLOB'],
        ],
      },

      event: {
        title: 'Событие',
        head: ['Размер', 'Поле', 'Значение'],
        rows: [
          ['1', 'TYPE', '0x01 pageview, 0x02 search'],
          ['4', 'TS_DELTA', 'uint32 BE, мс после TIMESTAMP'],
          ['2 + var', 'DOMAIN', 'uint16 длина ≤ 255, UTF-8'],
          ['2 + var', 'URL', 'uint16 длина ≤ 2048, UTF-8'],
          ['2 + var', 'QUERY', 'uint16 длина ≤ 500, 0 если нет'],
          ['1 + var', 'LANG', 'uint8 длина ≤ 20, BCP 47'],
          ['1', 'DEVICE_TYPE', '0x00 unknown, 0x01 desktop, 0x02 mobile, 0x03 tablet, 0x04 bot'],
        ],
        note: 'Строки обрезаются по границе символа UTF-8. Сервер отклоняет пакет, если длина больше лимита, строка не является корректным UTF-8, число событий не совпадает с заголовком или CRC32 не сходится.',
      },

      server: {
        title: 'Что делает сервер',
        items: [
          'Домен пересчитывается из URL (eTLD+1), значение клиента не используется.',
          'Из URL и запроса вырезаются токены, пароли, e-mail и номера карт.',
          'События старше 7 дней и из будущего (больше 10 минут) отбрасываются.',
          'Страна определяется по IP соединения, идентификатор установки хешируется отдельно для каждого расширения.',
        ],
      },

      crypto: {
        title: 'Шифрование и подпись',
        note: 'Схема не даёт прямой секретности при последующей компрометации приватного ключа расширения и не защищает от владельца копии бандла: от переупаковки защищают сессии на каждую установку, проверка ID расширения и проверки на сервере.',
        envelope: `sessionKey   = random(32)
iv           = random(12)
ciphertext   = AES-256-GCM(sessionKey, iv, bucket)
ephemeral    = X25519 — новая пара на каждый пакет
shared       = X25519(ephemeral.private, extension.publicKey)
derivedKey   = HKDF-SHA256(IKM = shared, salt = iv, info = "intentd-bucket-v1", 32)
encryptedKey = AES-256-GCM(derivedKey, iv, sessionKey)   // 48 байт`,
        signature: `X-Signature = hex(HMAC-SHA256(secret,
  "intentd-v2|bucket|" + X-Timestamp + "|" + X-API-Key + "|" + hex(SHA-256(body))))`,
      },

      vectors: {
        title: 'Тестовые векторы',
        bucket: `// Одно событие search: база 1758000000000, дельта 7,
// домен a.io, URL https://a.io/?q=x, запрос x, язык en, desktop
494e5444 01 00 0000019950f72c00 00000001 00000025
02 00000007 0004 612e696f 0011 68747470733a2f2f612e696f2f3f713d78 0001 78 02 656e 01
cee33ee2`,
        hkdf: `HKDF-SHA256(IKM = 0x11 × 32, salt = 0x22 × 12, info = "intentd-bucket-v1", L = 32)
=> 4a359b8818fc073f6f81a3cb4acd9065302e285fbef0d35d2ff71fba107e6056`,
      },
    },
  },
};
