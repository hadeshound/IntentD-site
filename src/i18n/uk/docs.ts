import type { Dictionary } from '@/i18n';

/**
 * Documentation prose. Technical terms — API, SDK, Parquet, HMAC, S3, LZ4,
 * PII, field names, error codes, header names — stay in English.
 */
export const docs: Pick<Dictionary, 'docs'> = {
  docs: {
    layout: {
      eyebrow: 'Documentation',
      contents: 'Зміст',
    },

    api: {
      metaTitle: 'API і формат даних',
      metaDescription:
        'Технічні специфікації IntentD: підключення edge-SDK, Ingest API з HMAC-підписом, схема події, формат Parquet + LZ4 і структура вигрузок у S3.',
      heading: 'Інтеграція та формат даних IntentD',
      intro:
        'Технічні специфікації для розробників розширень і дата-інженерів на боці покупця. Усе, що потрібно, щоб почати надсилати події або читати вигрузки.',
      sections: {
        quickstart: { label: 'SDK Quickstart', audience: 'Publishers' },
        ingest: { label: 'Ingest API', audience: 'Publishers' },
        schema: { label: 'Схема даних', audience: 'Data Buyers' },
        provenance: { label: 'Data Provenance', audience: 'Data Buyers' },
        delivery: { label: 'Зберігання і доставка', audience: 'Data Buyers' },
        examples: { label: 'Приклади читання', audience: 'Data Buyers' },
      },

      quickstart: {
        title: 'SDK Quickstart',
        body: 'SDK працює в background script розширення і не потребує доступу до DOM сторінки. Бандл збирається в кабінеті персонально для розширення: ключі, ключ шифрування та ID розширення вже всередині, викликати init вручну не потрібно. До згоди користувача SDK нічого не збирає —',
        consentLink: 'як влаштований запит згоди',
        manifestTitle: 'Вимоги до маніфесту',
        manifest: {
          version: '— SDK не використовує eval і не підвантажує код ззовні.',
          storage: '— події накопичуються локально й ідуть пакетом раз на добу.',
          navigation: '(або tabs) — джерело подій навігації.',
          host: 'у host_permissions.',
        },
        note: 'Перед завантаженням вкажіть у кабінеті ID розширення з магазину: бандл відмовляється працювати всередині будь-якого іншого розширення і повідомляє про це.',
      },

      ingest: {
        title: 'Ingest API',
        baseUrl: 'Base URL',
        auth: 'Автентифікація',
        authValue: 'X-API-Key + HMAC-SHA256 по тілу',
        endpointsTitle: 'Ендпоінти',
        tableMethod: 'Метод',
        tablePath: 'Шлях',
        tablePurpose: 'Призначення',
        tableLimit: 'Ліміт',
        requestTitle: 'Приклад запиту',
        errorsTitle: 'Коди помилок',
        tableHttp: 'HTTP',
        tableCode: 'Код',
        tableMeaning: 'Значення',
        retryNote:
          'На мережевих помилках, 429 і 503 SDK зберігає чергу й повторює надсилання раз на годину. Двійковий формат пакета та схема шифрування описані відкрито —',
        specLink: 'специфікація INTD v1',
        endpoints: {
          register: {
            description: 'Реєстрація установки: сесія та ідентифікатор пакета. Ідемпотентна.',
            limit: '120 запитів / хв з IP',
          },
          bucket: {
            description: 'Зашифрований пакет подій (X25519 + AES-256-GCM). Раз на добу або достроково.',
            limit: '48 пакетів / добу на установку',
          },
          tamper: {
            description: 'Повідомлення SDK про провалену перевірку цілісності.',
            limit: '30 запитів / хв з IP',
          },
        },
        errors: {
          BUCKET_INVALID_FORMAT: 'Пакет не розшифрувався або не пройшов перевірку формату і CRC32',
          API_KEY_REVOKED: 'Ключ відкликано — SDK вимикається',
          INVALID_SIGNATURE: 'HMAC-підпис не збігся з тілом запиту',
          CLOCK_SKEW: 'Годинник клієнта розходиться більше ніж на 5 хвилин; у відповіді server_time',
          SUBSCRIPTION_INACTIVE: 'Немає активної підписки — події залишаються в черзі',
          WRONG_EXTENSION: 'Бандл запущено не в тому розширенні, для якого його випущено',
          FINGERPRINT_MISMATCH: 'Оточення не збігається з сесією — SDK реєструється заново',
          BUCKET_ALREADY_RECEIVED: 'Цей пакет уже прийнято',
          BUCKET_TOO_LARGE: 'Більше ніж 10 000 подій або 10 МБ — SDK ділить пакет',
          RATE_LIMITED: 'Перевищено ліміт запитів або пакетів на добу',
        },
      },

      schema: {
        title: 'Схема даних',
        body: 'Один рядок Parquet — одна очищена подія. Полів із персональними даними в схемі немає за побудовою: вони відкидаються в браузері, до надсилання.',
        caption: 'Поля події у вигрузці Parquet',
        tableField: 'Поле',
        tableType: 'Тип',
        tableDescription: 'Опис',
        fields: {
          event_id: 'Унікальний GUID події',
          timestamp: 'Unix Timestamp у мілісекундах, UTC',
          anon_uid: 'HMAC-хеш сесії користувача, незворотний',
          clean_url: 'URL після вирізання PII-параметрів',
          search_query: 'Витягнутий пошуковий інтент, якщо він є',
          lang: 'Мова браузера, BCP 47',
          geo_country: 'ISO-код країни, визначається за IP на edge',
          device_type: 'desktop / mobile / tablet',
          domain: 'Кореневий домен без піддоменів',
        },
      },

      provenance: {
        title: 'Data Provenance',
        items: [
          'Усі події надходять лише від користувачів, які явно натиснули «Дозволити» в запиті згоди (GDPR ст. 6(1)(a)). До згоди SDK не створює ідентифікатор і не зберігає події.',
          'Кожен прийнятий пакет несе версію тексту згоди; сервер відхиляє пакети без неї і фіксує версію в журналі прийому. При зміні тексту згоду запитують заново.',
          'При відкликанні згоди SDK припиняє збір і видаляє ненадіслані події на пристрої; наступна видача згоди створює новий, не пов’язаний із попереднім псевдонім.',
          'Факт і час згоди конкретного користувача на сервері не зберігаються: доказом слугує сам прийнятий пакет і зафіксована версія тексту.',
        ],
      },

      delivery: {
        title: 'Зберігання і доставка',
        facts: {
          format: 'Формат',
          storage: 'Сховище',
          hot: 'Hot-доступ',
          archive: 'Архів',
          hotValue: '30 днів',
          archiveValue: '90 днів',
        },
        pathsTitle: 'Структура шляхів',
        body: 'Партиціонування за датою та орендарем дозволяє читати потрібний зріз без повного сканування бакета. Growth і вище додатково підтримують синхронізацію у ваш власний bucket.',
      },

      examples: {
        title: 'Приклади читання',
        body: 'Вигрузка читається будь-яким стандартним Parquet-стеком. Нижче — мінімальні приклади на Python і Go.',
      },

      cta: {
        title: 'Готові підключитися?',
        body: 'Створіть акаунт, щоб отримати ключі та зарезервувати вигрузку. Якщо потрібен семпл даних до підписання — напишіть нам.',
        primary: 'Створити акаунт',
        secondary: 'Запросити семпл',
        note: 'Повна OpenAPI-специфікація порталу лежить у репозиторії:',
        noteAfter: 'Публічний hosted-варіант з’явиться разом з особистим кабінетом —',
        noteLink: 'повідомити про потребу',
      },

      snippets: {
        install: `# Кабінет → Розширення → SDK → Завантажити
# Файл intentd-<name>.min.js уже містить ключі та конфігурацію.
cp ~/Downloads/intentd-my-extension.min.js ./extension/intentd.min.js`,
        init: `// background.js — першим рядком, на верхньому рівні.
// init викликається автоматично; слухачі мають реєструватися
// при старті service worker, інакше Manifest V3 не доставить події.
import './intentd.min.js';

// Необов'язково: статус і ручне надсилання.
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
  "ephemeral_public_key": "base64(32 байти)",
  "iv": "base64(12 байтів)",
  "encrypted_key": "base64(48 байтів)",
  "ciphertext": "base64(AES-256-GCM пакета INTD)",
  "events_count": 1234, "bytes_size": 45678, "bucket_version": 1,
  "client_ts": 1758000000, "fingerprint_hash": "5c9a96…"
}`,
        python: `import pandas as pd

# Денна партиція орендаря в S3.
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

    // Далі — будь-який Parquet-рідер, наприклад parquet-go.
    log.Printf("отримано %d байтів", *object.ContentLength)
}

func ptr(s string) *string { return &s }`,
      },
    },

    sdk: {
      metaTitle: 'SDK: підключення і згода користувача',
      metaDescription:
        'Як підключити IntentD edge-SDK до розширення Manifest V3 і як працює запит згоди користувача: плашка в popup, вкладка згоди, відкликання згоди.',
      backToApi: '← Документація API',
      eyebrow: 'Publishers',
      title: 'Підключення SDK і згода користувача',
      intro:
        'SDK збирає URL і пошукові запити, тому за GDPR (ст. 6) та ePrivacy (ст. 5(3)) йому потрібна явна згода користувача. Поки користувач не натиснув «Дозволити», SDK не створює ідентифікатор, не зберігає події й не звертається до сервера. Функціональність вашого розширення від вибору не залежить.',

      install: {
        title: 'Встановлення',
        body: 'У кабінеті: Розширення → SDK → «Завантажити». Архів розпакуйте в корінь розширення.',
        archiveLabel: 'архів',
        files: `intentd.min.js        SDK з ключами вашого розширення — не перейменовувати
intentd-consent.html  сторінка згоди для розширень без popup
intentd-consent.js    скрипт цієї сторінки (MV3 забороняє inline-скрипти)`,
        manifest: `{
  "manifest_version": 3,
  "background": { "service_worker": "background.js", "type": "module" },
  "action": { "default_popup": "popup.html" },
  "permissions": ["storage", "webNavigation", "tabs", "alarms", "unlimitedStorage"],
  "host_permissions": ["https://api.intentd.io/*"]
}`,
        background: `// background.js — першим рядком, на верхньому рівні
import './intentd.min.js';`,
      },

      consent: {
        title: 'Consent Flow',
        withPopupTitle: 'Розширення з popup',
        withPopupBodyBefore: 'Викличте',
        withPopupBodyAfter:
          'у popup. Якщо ви цього не зробите, користувач побачить лише вкладку згоди при встановленні, а SDK залишиться неактивним до його вибору — відповідальність за виклик лежить на розширенні.',
        popupHtml: `<div id="consent-root"></div>
<!-- ... інтерфейс вашого розширення ... -->
<script src="intentd.min.js"></script>
<script src="popup.js"></script>`,
        popupJs: `// Плашка з'явиться, лише якщо згоди на поточну версію тексту немає.
// Проміс вирішується вибором користувача: true — дозволив, false — відмовився.
IntentD.mountConsent(document.getElementById('consent-root'));`,
        shadowDom:
          'Плашка рендериться в закритому Shadow DOM: ваші стилі на неї не впливають, її стилі не впливають на вас. Тема (світла чи темна) добирається за фоном popup, ширина — від 320 до 800 px. Кнопки «Відмовитися» і «Дозволити» однакового розміру, попередньо встановлених галочок немає. Після згоди плашка зникає і більше не показується; після відмови з’являється при наступному відкритті popup.',
        withoutPopupTitle: 'Розширення без popup',
        withoutPopupBody:
          'SDK сам відкриває вкладку intentd-consent.html при встановленні та при старті браузера, поки згоди немає. Друга вкладка не відкривається — наявна отримує фокус. Після вибору вкладка закривається.',
        triggersTitle: 'Коли показується запит',
        triggersHead: ['Подія', 'Поведінка'],
        triggers: [
          ['Встановлення або оновлення розширення', 'Вкладка згоди, якщо немає згоди на поточну версію'],
          ['Старт браузера', 'Вкладка згоди — лише в розширень без popup'],
          ['Відкриття popup', 'Плашка, якщо ви викликаєте mountConsent і згоди немає'],
          ['Будь-яке інше пробудження service worker', 'Нічого не показується'],
          ['Згоду вже надано', 'Плашка більше не показується'],
          ['Зміна версії тексту згоди', 'Згоду запитують заново'],
        ],
        revokeTitle: 'Відкликання згоди',
        revokeBody:
          'Текст згоди обіцяє користувачеві можливість відкликати її в налаштуваннях. Додайте на сторінку налаштувань перемикач:',
        optionsJs: `const allowed = await IntentD.hasConsent();

// Кнопка «Відкликати згоду»
await IntentD.revokeConsent();   // збір зупинено, локальні дані видалено

// Кнопка «Дозволити збір» (наприклад, після відмови)
await IntentD.grantConsent();`,
        warningTitle: 'Не додавайте сторінку згоди до web_accessible_resources',
        warningBody:
          'Сторінки розширення доступні йому самому без цього списку. Якщо сторінка стане web-accessible, будь-який сайт зможе вбудувати її у фрейм і непомітно отримати клік «Дозволити» — така згода недійсна.',
      },

      api: {
        title: 'API',
        head: ['Метод', 'Призначення'],
        rows: [
          ['IntentD.mountConsent(element)', 'Показати плашку в popup, якщо згоди немає. Promise<boolean>.'],
          ['IntentD.hasConsent()', 'Чи є згода на поточну версію тексту. Promise<boolean>.'],
          ['IntentD.getConsentState()', "'approved' | 'declined' | null."],
          ['IntentD.grantConsent()', 'Записати згоду (з вашого власного UI).'],
          ['IntentD.revokeConsent()', 'Відкликання: збір зупиняється, черга та ідентифікатор установки видаляються.'],
          ['IntentD.openConsentTab()', 'Відкрити вкладку згоди вручну (або сфокусувати відкриту).'],
          ['IntentD.status()', 'Стан SDK, включно з consent.'],
        ],
        storageNote:
          'Рішення зберігається лише в chrome.storage.local цього профілю браузера: кожен пристрій питає окремо, сервер не зберігає, хто і коли погодився. На сервер із кожним пакетом іде лише версія тексту згоди.',
      },
    },

    bucket: {
      metaTitle: 'Формат пакета INTD v1',
      metaDescription:
        'Відкрита специфікація двійкового формату пакетів IntentD SDK: заголовок, кодування подій, CRC32, шифрування X25519 + HKDF + AES-256-GCM і тестові вектори.',
      backToApi: '← Документація API',
      eyebrow: 'Specification',
      title: 'Формат пакета INTD v1',
      intro:
        'Формат відкритий навмисно: конфіденційність і цілісність дають шифрування та підпис запиту, а не невідомість розмітки. Фіксована структура і CRC32 дозволяють серверу дешево відкидати сміття до запису в сховище.',

      container: {
        title: 'Контейнер',
        head: ['Зміщення', 'Розмір', 'Поле', 'Значення'],
        note: 'Підсумковий розмір рівно 26 + N байтів; зайві байти — помилка.',
        rows: [
          ['0', '4', 'MAGIC', '0x49 0x4E 0x54 0x44 («INTD»)'],
          ['4', '1', 'VERSION', '0x01'],
          ['5', '1', 'FLAGS', '0x00, зарезервовано'],
          ['6', '8', 'TIMESTAMP', 'uint64 BE, unix мс — база для дельт'],
          ['14', '4', 'EVENTS_COUNT', 'uint32 BE'],
          ['18', '4', 'BLOB_LENGTH', 'uint32 BE, довжина EVENTS_BLOB'],
          ['22', 'N', 'EVENTS_BLOB', 'події поспіль'],
          ['22+N', '4', 'CRC32', 'uint32 BE, CRC-32/IEEE від EVENTS_BLOB'],
        ],
      },

      event: {
        title: 'Подія',
        head: ['Розмір', 'Поле', 'Значення'],
        rows: [
          ['1', 'TYPE', '0x01 pageview, 0x02 search'],
          ['4', 'TS_DELTA', 'uint32 BE, мс після TIMESTAMP'],
          ['2 + var', 'DOMAIN', 'uint16 довжина ≤ 255, UTF-8'],
          ['2 + var', 'URL', 'uint16 довжина ≤ 2048, UTF-8'],
          ['2 + var', 'QUERY', 'uint16 довжина ≤ 500, 0 якщо немає'],
          ['1 + var', 'LANG', 'uint8 довжина ≤ 20, BCP 47'],
          ['1', 'DEVICE_TYPE', '0x00 unknown, 0x01 desktop, 0x02 mobile, 0x03 tablet, 0x04 bot'],
        ],
        note: 'Рядки обрізаються по межі символу UTF-8. Сервер відхиляє пакет, якщо довжина більша за ліміт, рядок не є коректним UTF-8, кількість подій не збігається із заголовком або CRC32 не сходиться.',
      },

      server: {
        title: 'Що робить сервер',
        items: [
          'Домен перераховується з URL (eTLD+1), значення клієнта не використовується.',
          'З URL і запиту вирізаються токени, паролі, e-mail і номери карток.',
          'Події, старші за 7 днів, і з майбутнього (більше ніж 10 хвилин) відкидаються.',
          'Країна визначається за IP з’єднання, ідентифікатор установки хешується окремо для кожного розширення.',
        ],
      },

      crypto: {
        title: 'Шифрування і підпис',
        note: 'Схема не дає прямої секретності при подальшій компрометації приватного ключа розширення і не захищає від власника копії бандла: від перепакування захищають сесії на кожну установку, перевірка ID розширення та перевірки на сервері.',
        envelope: `sessionKey   = random(32)
iv           = random(12)
ciphertext   = AES-256-GCM(sessionKey, iv, bucket)
ephemeral    = X25519 — нова пара на кожен пакет
shared       = X25519(ephemeral.private, extension.publicKey)
derivedKey   = HKDF-SHA256(IKM = shared, salt = iv, info = "intentd-bucket-v1", 32)
encryptedKey = AES-256-GCM(derivedKey, iv, sessionKey)   // 48 байтів`,
        signature: `X-Signature = hex(HMAC-SHA256(secret,
  "intentd-v2|bucket|" + X-Timestamp + "|" + X-API-Key + "|" + hex(SHA-256(body))))`,
      },

      vectors: {
        title: 'Тестові вектори',
        bucket: `// Одна подія search: база 1758000000000, дельта 7,
// домен a.io, URL https://a.io/?q=x, запит x, мова en, desktop
494e5444 01 00 0000019950f72c00 00000001 00000025
02 00000007 0004 612e696f 0011 68747470733a2f2f612e696f2f3f713d78 0001 78 02 656e 01
cee33ee2`,
        hkdf: `HKDF-SHA256(IKM = 0x11 × 32, salt = 0x22 × 12, info = "intentd-bucket-v1", L = 32)
=> 4a359b8818fc073f6f81a3cb4acd9065302e285fbef0d35d2ff71fba107e6056`,
      },
    },
  },
};
