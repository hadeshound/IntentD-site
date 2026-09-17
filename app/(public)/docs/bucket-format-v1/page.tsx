import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'Формат пакета INTD v1',
  description:
    'Открытая спецификация двоичного формата пакетов IntentD SDK: заголовок, кодирование событий, CRC32, шифрование X25519 + HKDF + AES-256-GCM и тестовые векторы.',
};

const HEADER = [
  { offset: '0', size: '4', field: 'MAGIC', value: '0x49 0x4E 0x54 0x44 («INTD»)' },
  { offset: '4', size: '1', field: 'VERSION', value: '0x01' },
  { offset: '5', size: '1', field: 'FLAGS', value: '0x00, зарезервировано' },
  { offset: '6', size: '8', field: 'TIMESTAMP', value: 'uint64 BE, unix мс — база для дельт' },
  { offset: '14', size: '4', field: 'EVENTS_COUNT', value: 'uint32 BE' },
  { offset: '18', size: '4', field: 'BLOB_LENGTH', value: 'uint32 BE, длина EVENTS_BLOB' },
  { offset: '22', size: 'N', field: 'EVENTS_BLOB', value: 'события подряд' },
  { offset: '22+N', size: '4', field: 'CRC32', value: 'uint32 BE, CRC-32/IEEE от EVENTS_BLOB' },
];

const EVENT = [
  { size: '1', field: 'TYPE', value: '0x01 pageview, 0x02 search' },
  { size: '4', field: 'TS_DELTA', value: 'uint32 BE, мс после TIMESTAMP' },
  { size: '2 + var', field: 'DOMAIN', value: 'uint16 длина ≤ 255, UTF-8' },
  { size: '2 + var', field: 'URL', value: 'uint16 длина ≤ 2048, UTF-8' },
  { size: '2 + var', field: 'QUERY', value: 'uint16 длина ≤ 500, 0 если нет' },
  { size: '1 + var', field: 'LANG', value: 'uint8 длина ≤ 20, BCP 47' },
  { size: '1', field: 'DEVICE_TYPE', value: '0x00 unknown, 0x01 desktop, 0x02 mobile, 0x03 tablet, 0x04 bot' },
];

const ENVELOPE = `sessionKey   = random(32)
iv           = random(12)
ciphertext   = AES-256-GCM(sessionKey, iv, bucket)
ephemeral    = X25519 — новая пара на каждый пакет
shared       = X25519(ephemeral.private, extension.publicKey)
derivedKey   = HKDF-SHA256(IKM = shared, salt = iv, info = "intentd-bucket-v1", 32)
encryptedKey = AES-256-GCM(derivedKey, iv, sessionKey)   // 48 байт`;

const SIGNATURE = `X-Signature = hex(HMAC-SHA256(secret,
  "intentd-v2|bucket|" + X-Timestamp + "|" + X-API-Key + "|" + hex(SHA-256(body))))`;

const BUCKET_VECTOR = `// Одно событие search: база 1758000000000, дельта 7,
// домен a.io, URL https://a.io/?q=x, запрос x, язык en, desktop
494e5444 01 00 0000019950f72c00 00000001 00000025
02 00000007 0004 612e696f 0011 68747470733a2f2f612e696f2f3f713d78 0001 78 02 656e 01
cee33ee2`;

const HKDF_VECTOR = `HKDF-SHA256(IKM = 0x11 × 32, salt = 0x22 × 12, info = "intentd-bucket-v1", L = 32)
=> 4a359b8818fc073f6f81a3cb4acd9065302e285fbef0d35d2ff71fba107e6056`;

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-card border border-hairline">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-hairline bg-white/[0.02]">
            {head.map((h) => (
              <th key={h} scope="col" className="px-5 py-3.5 font-medium text-ink-faint">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-hairline last:border-b-0">
              {row.map((cell, i) => (
                <td key={i} className={i === row.length - 1 ? 'px-5 py-3.5 text-ink-muted' : 'px-5 py-3.5 font-mono text-ink'}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BucketFormatPage() {
  return (
    <div className="shell pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="max-w-3xl">
        <Link href="/docs/api" className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink">
          ← Документация API
        </Link>

        <p className="mt-8 eyebrow">Specification</p>
        <h1 className="mt-5 text-hero">Формат пакета INTD v1</h1>

        <p className="mt-8 text-lg leading-relaxed text-ink-muted text-pretty">
          Формат открыт намеренно: конфиденциальность и целостность дают шифрование и подпись
          запроса, а не неизвестность разметки. Фиксированная структура и CRC32 позволяют серверу
          дёшево отбрасывать мусор до записи в хранилище.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Badge tone="mint">Stable</Badge>
          <Badge>Big-endian</Badge>
          <Badge>CRC-32/IEEE</Badge>
          <Badge tone="violet">X25519 · HKDF · AES-256-GCM</Badge>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-ink">Контейнер</h2>
          <Table head={['Смещение', 'Размер', 'Поле', 'Значение']} rows={HEADER.map((r) => [r.offset, r.size, r.field, r.value])} />
          <p className="mt-4 text-sm text-ink-faint">Итоговый размер ровно 26 + N байт; лишние байты — ошибка.</p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-ink">Событие</h2>
          <Table head={['Размер', 'Поле', 'Значение']} rows={EVENT.map((r) => [r.size, r.field, r.value])} />
          <p className="mt-4 prose-body">
            Строки обрезаются по границе символа UTF-8. Сервер отклоняет пакет, если длина больше
            лимита, строка не является корректным UTF-8, число событий не совпадает с заголовком
            или CRC32 не сходится.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-ink">Что делает сервер</h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 prose-body">
            <li>Домен пересчитывается из URL (eTLD+1), значение клиента не используется.</li>
            <li>Из URL и запроса вырезаются токены, пароли, e-mail и номера карт.</li>
            <li>События старше 7 дней и из будущего (больше 10 минут) отбрасываются.</li>
            <li>Страна определяется по IP соединения, идентификатор установки хешируется отдельно для каждого расширения.</li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-ink">Шифрование и подпись</h2>
          <CodeBlock className="mt-5" label="envelope" code={ENVELOPE} />
          <CodeBlock className="mt-4" label="signature" code={SIGNATURE} />
          <p className="mt-5 prose-body">
            Схема не даёт прямой секретности при последующей компрометации приватного ключа
            расширения и не защищает от владельца копии бандла: от переупаковки защищают сессии на
            каждую установку, проверка ID расширения и проверки на сервере.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-ink">Тестовые векторы</h2>
          <CodeBlock className="mt-5" label="bucket (hex)" code={BUCKET_VECTOR} />
          <CodeBlock className="mt-4" label="hkdf" code={HKDF_VECTOR} />
        </section>
      </div>
    </div>
  );
}
