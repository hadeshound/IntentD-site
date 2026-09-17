/** Reference tables rendered on /docs/api. */

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  /** Marks fields that are only present on higher tiers. */
  tier?: 'growth' | 'enterprise';
}

export const EVENT_SCHEMA: SchemaField[] = [
  { name: 'event_id', type: 'String', description: 'Уникальный GUID события' },
  { name: 'timestamp', type: 'Int64', description: 'Unix Timestamp в миллисекундах, UTC' },
  { name: 'anon_uid', type: 'String', description: 'HMAC-хеш сессии пользователя, необратимый' },
  { name: 'clean_url', type: 'String', description: 'URL после вырезания PII-параметров' },
  { name: 'search_query', type: 'String', description: 'Извлечённый поисковый интент, если он есть' },
  { name: 'lang', type: 'String', description: 'Язык браузера, BCP 47' },
  { name: 'geo_country', type: 'String', description: 'ISO-код страны, определяется по IP на edge', tier: 'growth' },
  { name: 'device_type', type: 'String', description: 'desktop / mobile / tablet', tier: 'growth' },
  { name: 'domain', type: 'String', description: 'Корневой домен без поддоменов' },
];

export interface EndpointSpec {
  method: 'POST' | 'GET';
  path: string;
  description: string;
  limit: string;
}

export const INGEST_ENDPOINTS: EndpointSpec[] = [
  {
    method: 'POST',
    path: '/sdk/register',
    description: 'Регистрация установки: сессия и идентификатор пакета. Идемпотентна.',
    limit: '120 запросов / мин с IP',
  },
  {
    method: 'POST',
    path: '/telemetry/bucket',
    description: 'Зашифрованный пакет событий (X25519 + AES-256-GCM). Раз в сутки или досрочно.',
    limit: '48 пакетов / сутки на установку',
  },
  {
    method: 'POST',
    path: '/sdk/report-tamper',
    description: 'Сообщение SDK о проваленной проверке целостности.',
    limit: '30 запросов / мин с IP',
  },
];

export interface ErrorCodeSpec {
  status: number;
  code: string;
  meaning: string;
}

export const INGEST_ERRORS: ErrorCodeSpec[] = [
  { status: 400, code: 'BUCKET_INVALID_FORMAT', meaning: 'Пакет не расшифровался или не прошёл проверку формата и CRC32' },
  { status: 401, code: 'API_KEY_REVOKED', meaning: 'Ключ отозван — SDK отключается' },
  { status: 401, code: 'INVALID_SIGNATURE', meaning: 'HMAC-подпись не совпала с телом запроса' },
  { status: 401, code: 'CLOCK_SKEW', meaning: 'Часы клиента расходятся больше чем на 5 минут; в ответе server_time' },
  { status: 402, code: 'SUBSCRIPTION_INACTIVE', meaning: 'Нет активной подписки — события остаются в очереди' },
  { status: 403, code: 'WRONG_EXTENSION', meaning: 'Бандл запущен не в том расширении, для которого выпущен' },
  { status: 403, code: 'FINGERPRINT_MISMATCH', meaning: 'Окружение не совпадает с сессией — SDK регистрируется заново' },
  { status: 409, code: 'BUCKET_ALREADY_RECEIVED', meaning: 'Этот пакет уже принят' },
  { status: 413, code: 'BUCKET_TOO_LARGE', meaning: 'Больше 10 000 событий или 10 МБ — SDK делит пакет' },
  { status: 429, code: 'RATE_LIMITED', meaning: 'Превышен лимит запросов или пакетов в сутки' },
];

// --- Code samples -----------------------------------------------------------

export const SDK_INSTALL_SNIPPET = `# Кабинет → Расширения → SDK → Скачать
# Файл intentd-<name>.min.js уже содержит ключи и конфигурацию.
cp ~/Downloads/intentd-my-extension.min.js ./extension/intentd.min.js`;

export const SDK_INIT_SNIPPET = `// background.js — первой строкой, на верхнем уровне.
// init вызывается автоматически; слушатели должны регистрироваться
// при старте service worker, иначе Manifest V3 не доставит события.
import './intentd.min.js';

// Необязательно: статус и ручная отправка.
// const status = await IntentD.status();
// await IntentD.flush();`;

export const INGEST_REQUEST_SNIPPET = `POST /v1/telemetry/bucket HTTP/1.1
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
}`;

export const PYTHON_READ_SNIPPET = `import pandas as pd

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
print(top_domains)`;

export const GO_READ_SNIPPET = `package main

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

func ptr(s string) *string { return &s }`;
