import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';

export const metadata: Metadata = {
  title: 'SDK: подключение и согласие пользователя',
  description:
    'Как подключить IntentD edge-SDK к расширению Manifest V3 и как работает запрос согласия пользователя: плашка в popup, вкладка согласия, отзыв согласия.',
};

const FILES = `intentd.min.js        SDK с ключами вашего расширения — не переименовывать
intentd-consent.html  страница согласия для расширений без popup
intentd-consent.js    скрипт этой страницы (MV3 запрещает inline-скрипты)`;

const MANIFEST = `{
  "manifest_version": 3,
  "background": { "service_worker": "background.js", "type": "module" },
  "action": { "default_popup": "popup.html" },
  "permissions": ["storage", "webNavigation", "tabs", "alarms", "unlimitedStorage"],
  "host_permissions": ["https://api.intentd.io/*"]
}`;

const BACKGROUND = `// background.js — первой строкой, на верхнем уровне
import './intentd.min.js';`;

const POPUP_HTML = `<div id="consent-root"></div>
<!-- ... интерфейс вашего расширения ... -->
<script src="intentd.min.js"></script>
<script src="popup.js"></script>`;

const POPUP_JS = `// Плашка появится, только если согласия на текущую версию текста нет.
// Промис разрешается выбором пользователя: true — разрешил, false — отказался.
IntentD.mountConsent(document.getElementById('consent-root'));`;

const OPTIONS_JS = `const allowed = await IntentD.hasConsent();

// Кнопка «Отозвать согласие»
await IntentD.revokeConsent();   // сбор остановлен, локальные данные удалены

// Кнопка «Разрешить сбор» (например, после отказа)
await IntentD.grantConsent();`;

const API = [
  ['IntentD.mountConsent(element)', 'Показать плашку в popup, если согласия нет. Promise<boolean>.'],
  ['IntentD.hasConsent()', 'Есть ли согласие на текущую версию текста. Promise<boolean>.'],
  ['IntentD.getConsentState()', "'approved' | 'declined' | null."],
  ['IntentD.grantConsent()', 'Записать согласие (из вашего собственного UI).'],
  ['IntentD.revokeConsent()', 'Отзыв: сбор останавливается, очередь и идентификатор установки удаляются.'],
  ['IntentD.openConsentTab()', 'Открыть вкладку согласия вручную (или сфокусировать открытую).'],
  ['IntentD.status()', 'Состояние SDK, включая consent.'],
];

const TRIGGERS = [
  ['Установка или обновление расширения', 'Вкладка согласия, если нет согласия на текущую версию'],
  ['Старт браузера', 'Вкладка согласия — только у расширений без popup'],
  ['Открытие popup', 'Плашка, если вы вызываете mountConsent и согласия нет'],
  ['Любое другое пробуждение service worker', 'Ничего не показывается'],
  ['Согласие уже дано', 'Плашка больше не показывается'],
  ['Смена версии текста согласия', 'Согласие запрашивается заново'],
];

function Table({ head, rows, mono = false }: { head: string[]; rows: string[][]; mono?: boolean }) {
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
            <tr key={row[0]} className="border-b border-hairline last:border-b-0">
              <td className={mono ? 'px-5 py-3.5 font-mono text-ink' : 'px-5 py-3.5 text-ink'}>{row[0]}</td>
              <td className="px-5 py-3.5 text-ink-muted">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SdkDocsPage() {
  return (
    <div className="shell pb-24 pt-16 lg:pb-32 lg:pt-24">
      <div className="max-w-3xl">
        <Link href="/docs/api" className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink">
          ← Документация API
        </Link>

        <p className="mt-8 eyebrow">Publishers</p>
        <h1 className="mt-5 text-hero">Подключение SDK и согласие пользователя</h1>

        <p className="mt-8 text-lg leading-relaxed text-ink-muted text-pretty">
          SDK собирает URL и поисковые запросы, поэтому по GDPR (ст. 6) и ePrivacy (ст. 5(3)) ему нужно
          явное согласие пользователя. Пока пользователь не нажал «Разрешить», SDK не создаёт
          идентификатор, не хранит события и не обращается к серверу. Функциональность вашего
          расширения от выбора не зависит.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Badge tone="mint">Manifest V3</Badge>
          <Badge>Opt-in</Badge>
          <Badge tone="violet">Shadow DOM</Badge>
        </div>

        <section id="install" className="mt-16 scroll-mt-28">
          <h2 className="font-display text-3xl text-ink">Установка</h2>
          <p className="mt-5 prose-body">
            В кабинете: Расширения → SDK → «Скачать». Архив распакуйте в корень расширения.
          </p>
          <CodeBlock className="mt-5" label="архив" code={FILES} />
          <CodeBlock className="mt-4" label="manifest.json" code={MANIFEST} />
          <CodeBlock className="mt-4" label="background.js" code={BACKGROUND} />
        </section>

        <section id="consent-flow" className="mt-16 scroll-mt-28">
          <h2 className="font-display text-3xl text-ink">Consent Flow</h2>

          <h3 className="mt-8 font-display text-xl text-ink">Расширение с popup</h3>
          <p className="mt-4 prose-body">
            Вызовите <code className="font-mono">IntentD.mountConsent()</code> в popup. Если вы этого не
            сделаете, пользователь увидит только вкладку согласия при установке, а SDK останется
            неактивным до его выбора — ответственность за вызов лежит на расширении.
          </p>
          <CodeBlock className="mt-5" label="popup.html" code={POPUP_HTML} />
          <CodeBlock className="mt-4" label="popup.js" code={POPUP_JS} />
          <p className="mt-4 prose-body">
            Плашка рендерится в закрытом Shadow DOM: ваши стили на неё не влияют, её стили не влияют на
            вас. Тема (светлая или тёмная) подбирается по фону popup, ширина — от 320 до 800 px. Кнопки
            «Отказаться» и «Разрешить» одного размера, предустановленных галочек нет. После согласия
            плашка исчезает и больше не показывается; после отказа появляется при следующем открытии popup.
          </p>

          <h3 className="mt-10 font-display text-xl text-ink">Расширение без popup</h3>
          <p className="mt-4 prose-body">
            SDK сам открывает вкладку <code className="font-mono">intentd-consent.html</code> при установке и
            при старте браузера, пока согласия нет. Вторая вкладка не открывается — существующая получает
            фокус. После выбора вкладка закрывается.
          </p>

          <h3 className="mt-10 font-display text-xl text-ink">Когда показывается запрос</h3>
          <Table head={['Событие', 'Поведение']} rows={TRIGGERS} />

          <h3 className="mt-10 font-display text-xl text-ink">Отзыв согласия</h3>
          <p className="mt-4 prose-body">
            Текст согласия обещает пользователю возможность отозвать его в настройках. Добавьте в
            страницу настроек переключатель:
          </p>
          <CodeBlock className="mt-5" label="options.js" code={OPTIONS_JS} />

          <div className="surface-card mt-8 p-6">
            <h3 className="font-display text-lg text-ink">Не добавляйте страницу согласия в web_accessible_resources</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
              Страницы расширения доступны ему самому без этого списка. Если страница станет
              web-accessible, любой сайт сможет встроить её во фрейм и незаметно получить клик
              «Разрешить» — такое согласие недействительно.
            </p>
          </div>
        </section>

        <section id="api" className="mt-16 scroll-mt-28">
          <h2 className="font-display text-3xl text-ink">API</h2>
          <Table head={['Метод', 'Назначение']} rows={API} mono />
          <p className="mt-5 prose-body">
            Решение хранится только в <code className="font-mono">chrome.storage.local</code> этого профиля
            браузера: каждое устройство спрашивает отдельно, сервер не хранит, кто и когда согласился. На
            сервер с каждым пакетом уходит лишь версия текста согласия.
          </p>
        </section>
      </div>
    </div>
  );
}
