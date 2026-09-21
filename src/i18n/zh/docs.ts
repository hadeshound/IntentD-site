import type { Dictionary } from '@/i18n';

/**
 * Documentation prose. Technical terms — API, SDK, Parquet, HMAC, S3, LZ4,
 * PII, field names, error codes, header names — stay in English.
 */
export const docs: Pick<Dictionary, 'docs'> = {
  docs: {
    layout: {
      eyebrow: 'Documentation',
      contents: '目录',
    },

    api: {
      metaTitle: 'API 与数据格式',
      metaDescription:
        'IntentD 技术规范：接入 edge SDK、带 HMAC 签名的 Ingest API、事件结构、Parquet + LZ4 格式以及 S3 导出的目录结构。',
      heading: 'IntentD 接入与数据格式',
      intro:
        '面向扩展开发者和买方数据工程师的技术规范。开始发送事件或读取导出所需的全部内容。',
      sections: {
        quickstart: { label: 'SDK Quickstart', audience: 'Publishers' },
        ingest: { label: 'Ingest API', audience: 'Publishers' },
        schema: { label: '数据结构', audience: 'Data Buyers' },
        provenance: { label: 'Data Provenance', audience: 'Data Buyers' },
        delivery: { label: '存储与交付', audience: 'Data Buyers' },
        examples: { label: '读取示例', audience: 'Data Buyers' },
      },

      quickstart: {
        title: 'SDK Quickstart',
        body: 'SDK 运行在扩展的 background script 中，不需要访问页面 DOM。打包文件在控制台中按扩展单独生成：密钥、加密密钥和扩展 ID 都已内置，无需手动调用 init。在用户同意之前，SDK 不采集任何数据 ——',
        consentLink: '同意流程是如何设计的',
        manifestTitle: '对 manifest 的要求',
        manifest: {
          version: '—— SDK 不使用 eval，也不从外部加载代码。',
          storage: '权限：事件在本地累积，每天打包发送一次。',
          navigation: '（或 tabs）—— 导航事件的来源。',
          host: '写入 host_permissions。',
        },
        note: '下载之前，请在控制台填写商店中的扩展 ID：打包文件会拒绝在任何其他扩展中运行，并给出提示。',
      },

      ingest: {
        title: 'Ingest API',
        baseUrl: 'Base URL',
        auth: '身份验证',
        authValue: 'X-API-Key + 对请求体的 HMAC-SHA256',
        endpointsTitle: '接口',
        tableMethod: '方法',
        tablePath: '路径',
        tablePurpose: '用途',
        tableLimit: '限额',
        requestTitle: '请求示例',
        errorsTitle: '错误码',
        tableHttp: 'HTTP',
        tableCode: '代码',
        tableMeaning: '含义',
        retryNote:
          '遇到网络错误、429 和 503 时，SDK 会保留队列并每小时重试一次。二进制数据包格式和加密方案已公开 ——',
        specLink: 'INTD v1 规范',
        endpoints: {
          register: {
            description: '注册安装实例：会话和数据包标识符。幂等。',
            limit: '每个 IP 120 次请求 / 分钟',
          },
          bucket: {
            description: '加密的事件数据包（X25519 + AES-256-GCM）。每天一次，或提前发送。',
            limit: '每个安装 48 个数据包 / 天',
          },
          tamper: {
            description: 'SDK 上报完整性校验失败。',
            limit: '每个 IP 30 次请求 / 分钟',
          },
        },
        errors: {
          BUCKET_INVALID_FORMAT: '数据包解密失败，或未通过格式与 CRC32 校验',
          API_KEY_REVOKED: '密钥已吊销 —— SDK 自行停用',
          INVALID_SIGNATURE: 'HMAC 签名与请求体不匹配',
          CLOCK_SKEW: '客户端时钟偏差超过 5 分钟；响应中带有 server_time',
          SUBSCRIPTION_INACTIVE: '没有有效订阅 —— 事件留在队列中',
          WRONG_EXTENSION: '打包文件运行在并非为其签发的扩展中',
          FINGERPRINT_MISMATCH: '运行环境与会话不符 —— SDK 重新注册',
          BUCKET_ALREADY_RECEIVED: '该数据包已被接收',
          BUCKET_TOO_LARGE: '超过 10,000 条事件或 10 MB —— SDK 会拆分数据包',
          RATE_LIMITED: '超出请求频率或每日数据包限额',
        },
      },

      schema: {
        title: '数据结构',
        body: '一行 Parquet 就是一条清洗后的事件。结构中按设计不含任何个人数据字段：它们在浏览器里、发送之前就被丢弃了。',
        caption: 'Parquet 导出中的事件字段',
        tableField: '字段',
        tableType: '类型',
        tableDescription: '说明',
        fields: {
          event_id: '事件的唯一 GUID',
          timestamp: 'Unix 时间戳，毫秒，UTC',
          anon_uid: '用户会话的 HMAC 哈希，不可逆',
          clean_url: '剥离 PII 参数后的 URL',
          search_query: '提取出的搜索意图（如果有）',
          lang: '浏览器语言，BCP 47',
          geo_country: 'ISO 国家代码，在 edge 层按 IP 解析',
          device_type: 'desktop / mobile / tablet',
          domain: '不含子域名的根域名',
        },
      },

      provenance: {
        title: 'Data Provenance',
        items: [
          '所有事件都只来自在同意提示中明确点击「允许」的用户（GDPR 第 6(1)(a) 条）。在同意之前，SDK 不创建标识符，也不存储事件。',
          '每个被接收的数据包都携带同意文本的版本号；服务器会拒绝不带版本号的数据包，并在接收日志中记录该版本。文本变更后会重新征求同意。',
          '用户撤回同意后，SDK 停止采集并删除设备上未发送的事件；下一次授予同意会生成一个与此前无关的新假名。',
          '服务器不存储某位用户是否同意以及何时同意：证据是被接收的数据包本身和其中记录的文本版本。',
        ],
      },

      delivery: {
        title: '存储与交付',
        facts: {
          format: '格式',
          storage: '存储',
          hot: '热存储访问',
          archive: '归档',
          hotValue: '30 天',
          archiveValue: '90 天',
        },
        pathsTitle: '路径结构',
        body: '按日期和租户分区，使您无需全量扫描 bucket 就能读取所需切片。Growth 及以上套餐还支持同步到您自己的 bucket。',
      },

      examples: {
        title: '读取示例',
        body: '导出文件可用任意标准 Parquet 技术栈读取。下面是 Python 和 Go 的最小示例。',
      },

      cta: {
        title: '准备好接入了吗？',
        body: '创建账户即可获取密钥并预留数据导出。如果需要在签约前看样本数据，请联系我们。',
        primary: '创建账户',
        secondary: '申请样本',
        note: '门户的完整 OpenAPI 规范位于仓库中：',
        noteAfter: '公开托管版本将随控制台一起推出 ——',
        noteLink: '告诉我们您需要它',
      },

      snippets: {
        install: `# 控制台 → 扩展 → SDK → 下载
# intentd-<name>.min.js 文件已包含您的密钥和配置。
cp ~/Downloads/intentd-my-extension.min.js ./extension/intentd.min.js`,
        init: `// background.js —— 第一行，顶层作用域。
// init 会自动调用；监听器必须在 service worker 启动时注册，
// 否则 Manifest V3 不会投递事件。
import './intentd.min.js';

// 可选：查询状态与手动发送。
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
  "ephemeral_public_key": "base64(32 字节)",
  "iv": "base64(12 字节)",
  "encrypted_key": "base64(48 字节)",
  "ciphertext": "base64(INTD 数据包的 AES-256-GCM 密文)",
  "events_count": 1234, "bytes_size": 45678, "bucket_version": 1,
  "client_ts": 1758000000, "fingerprint_hash": "5c9a96…"
}`,
        python: `import pandas as pd

# S3 中某个租户的日分区。
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

    // 之后用任意 Parquet 读取库即可，例如 parquet-go。
    log.Printf("已接收 %d 字节", *object.ContentLength)
}

func ptr(s string) *string { return &s }`,
      },
    },

    sdk: {
      metaTitle: 'SDK：接入与用户同意',
      metaDescription:
        '如何把 IntentD edge SDK 接入 Manifest V3 扩展，以及用户同意提示的工作方式：popup 内的提示条、同意标签页和撤回同意。',
      backToApi: '← API 文档',
      eyebrow: 'Publishers',
      title: 'SDK 接入与用户同意',
      intro:
        'SDK 会采集 URL 和搜索查询，因此依据 GDPR（第 6 条）和 ePrivacy（第 5(3) 条）需要用户的明确同意。在用户点击「允许」之前，SDK 不创建标识符、不存储事件、也不与服务器通信。您的扩展功能不受该选择影响。',

      install: {
        title: '安装',
        body: '在控制台中：扩展 → SDK → 「下载」。将压缩包解压到扩展根目录。',
        archiveLabel: '压缩包',
        files: `intentd.min.js        带有您扩展密钥的 SDK —— 请勿重命名
intentd-consent.html  面向无 popup 扩展的同意页面
intentd-consent.js    该页面的脚本（MV3 禁止内联脚本）`,
        manifest: `{
  "manifest_version": 3,
  "background": { "service_worker": "background.js", "type": "module" },
  "action": { "default_popup": "popup.html" },
  "permissions": ["storage", "webNavigation", "tabs", "alarms", "unlimitedStorage"],
  "host_permissions": ["https://api.intentd.io/*"]
}`,
        background: `// background.js —— 第一行，顶层作用域
import './intentd.min.js';`,
      },

      consent: {
        title: 'Consent Flow',
        withPopupTitle: '带 popup 的扩展',
        withPopupBodyBefore: '在 popup 中调用',
        withPopupBodyAfter:
          '。如果不调用，用户就只会在安装时看到同意标签页，而 SDK 会一直处于停用状态直到用户做出选择 —— 调用的责任在扩展一方。',
        popupHtml: `<div id="consent-root"></div>
<!-- ... 您的扩展界面 ... -->
<script src="intentd.min.js"></script>
<script src="popup.js"></script>`,
        popupJs: `// 只有在没有针对当前文本版本的同意时，提示条才会出现。
// Promise 以用户的选择解析：true —— 允许，false —— 拒绝。
IntentD.mountConsent(document.getElementById('consent-root'));`,
        shadowDom:
          '提示条渲染在封闭的 Shadow DOM 中：您的样式不会影响它，它的样式也不会影响您。主题（浅色或深色）根据 popup 背景选取，宽度介于 320 到 800 px 之间。「拒绝」和「允许」按钮尺寸相同，也没有预先勾选的选项。同意之后提示条消失且不再出现；拒绝之后会在下次打开 popup 时再次出现。',
        withoutPopupTitle: '不带 popup 的扩展',
        withoutPopupBody:
          '只要还没有同意，SDK 会在安装时和浏览器启动时自行打开 intentd-consent.html 标签页。不会打开第二个标签页 —— 已有的那个会获得焦点。用户做出选择后标签页会关闭。',
        triggersTitle: '何时显示提示',
        triggersHead: ['事件', '行为'],
        triggers: [
          ['安装或更新扩展', '若没有针对当前文本版本的同意，则打开同意标签页'],
          ['浏览器启动', '同意标签页 —— 仅限没有 popup 的扩展'],
          ['打开 popup', '若您调用了 mountConsent 且没有同意，则显示提示条'],
          ['service worker 的其他唤醒', '不显示任何内容'],
          ['已经给出同意', '不再显示提示条'],
          ['同意文本版本变更', '重新征求同意'],
        ],
        revokeTitle: '撤回同意',
        revokeBody:
          '同意文本向用户承诺可以在设置中撤回。请在您的设置页面加入一个开关：',
        optionsJs: `const allowed = await IntentD.hasConsent();

// 「撤回同意」按钮
await IntentD.revokeConsent();   // 停止采集，删除本地数据

// 「允许采集」按钮（例如在拒绝之后）
await IntentD.grantConsent();`,
        warningTitle: '请勿把同意页面加入 web_accessible_resources',
        warningBody:
          '扩展自身访问其页面并不需要这个列表。一旦该页面变为 web-accessible，任何网站都能把它放进 iframe 并悄悄骗取一次「允许」点击 —— 这样得到的同意是无效的。',
      },

      api: {
        title: 'API',
        head: ['方法', '用途'],
        rows: [
          ['IntentD.mountConsent(element)', '在没有同意时于 popup 中显示提示条。Promise<boolean>。'],
          ['IntentD.hasConsent()', '是否存在针对当前文本版本的同意。Promise<boolean>。'],
          ['IntentD.getConsentState()', "'approved' | 'declined' | null。"],
          ['IntentD.grantConsent()', '记录同意（来自您自己的界面）。'],
          ['IntentD.revokeConsent()', '撤回：停止采集，删除队列和安装标识符。'],
          ['IntentD.openConsentTab()', '手动打开同意标签页（或聚焦已打开的那个）。'],
          ['IntentD.status()', 'SDK 状态，包含 consent。'],
        ],
        storageNote:
          '该决定只保存在当前浏览器配置文件的 chrome.storage.local 中：每台设备单独询问，服务器不记录谁在何时同意。随每个数据包发往服务器的只有同意文本的版本号。',
      },
    },

    bucket: {
      metaTitle: 'INTD 数据包格式 v1',
      metaDescription:
        'IntentD SDK 二进制数据包格式的公开规范：头部、事件编码、CRC32、X25519 + HKDF + AES-256-GCM 加密以及测试向量。',
      backToApi: '← API 文档',
      eyebrow: 'Specification',
      title: 'INTD 数据包格式 v1',
      intro:
        '格式公开是有意为之：机密性和完整性来自对请求的加密和签名，而不是来自对布局的保密。固定结构和 CRC32 让服务器能在写入存储之前低成本地丢弃垃圾数据。',

      container: {
        title: '容器',
        head: ['偏移', '大小', '字段', '取值'],
        note: '总大小恰好为 26 + N 字节；多余字节视为错误。',
        rows: [
          ['0', '4', 'MAGIC', '0x49 0x4E 0x54 0x44（「INTD」）'],
          ['4', '1', 'VERSION', '0x01'],
          ['5', '1', 'FLAGS', '0x00，保留'],
          ['6', '8', 'TIMESTAMP', 'uint64 BE，unix 毫秒 —— 增量的基准'],
          ['14', '4', 'EVENTS_COUNT', 'uint32 BE'],
          ['18', '4', 'BLOB_LENGTH', 'uint32 BE，EVENTS_BLOB 的长度'],
          ['22', 'N', 'EVENTS_BLOB', '连续排列的事件'],
          ['22+N', '4', 'CRC32', 'uint32 BE，EVENTS_BLOB 的 CRC-32/IEEE'],
        ],
      },

      event: {
        title: '事件',
        head: ['大小', '字段', '取值'],
        rows: [
          ['1', 'TYPE', '0x01 pageview，0x02 search'],
          ['4', 'TS_DELTA', 'uint32 BE，TIMESTAMP 之后的毫秒数'],
          ['2 + var', 'DOMAIN', 'uint16 长度 ≤ 255，UTF-8'],
          ['2 + var', 'URL', 'uint16 长度 ≤ 2048，UTF-8'],
          ['2 + var', 'QUERY', 'uint16 长度 ≤ 500，没有时为 0'],
          ['1 + var', 'LANG', 'uint8 长度 ≤ 20，BCP 47'],
          ['1', 'DEVICE_TYPE', '0x00 unknown，0x01 desktop，0x02 mobile，0x03 tablet，0x04 bot'],
        ],
        note: '字符串按 UTF-8 字符边界截断。若长度超出限制、字符串不是合法 UTF-8、事件数与头部不符，或 CRC32 不匹配，服务器将拒绝该数据包。',
      },

      server: {
        title: '服务器会做什么',
        items: [
          '域名由 URL 重新计算（eTLD+1），不采用客户端提供的值。',
          '从 URL 和查询中剥离令牌、密码、电子邮件和卡号。',
          '丢弃超过 7 天的事件，以及来自未来（超过 10 分钟）的事件。',
          '国家按连接 IP 解析，安装标识符针对每个扩展单独哈希。',
        ],
      },

      crypto: {
        title: '加密与签名',
        note: '该方案在扩展私钥日后遭泄露时不提供前向保密，也无法防范持有打包副本的人：针对重新打包的防护来自按安装划分的会话、扩展 ID 校验和服务端校验。',
        envelope: `sessionKey   = random(32)
iv           = random(12)
ciphertext   = AES-256-GCM(sessionKey, iv, bucket)
ephemeral    = X25519 —— 每个数据包一对新密钥
shared       = X25519(ephemeral.private, extension.publicKey)
derivedKey   = HKDF-SHA256(IKM = shared, salt = iv, info = "intentd-bucket-v1", 32)
encryptedKey = AES-256-GCM(derivedKey, iv, sessionKey)   // 48 字节`,
        signature: `X-Signature = hex(HMAC-SHA256(secret,
  "intentd-v2|bucket|" + X-Timestamp + "|" + X-API-Key + "|" + hex(SHA-256(body))))`,
      },

      vectors: {
        title: '测试向量',
        bucket: `// 一条 search 事件：基准 1758000000000，增量 7，
// 域名 a.io，URL https://a.io/?q=x，查询 x，语言 en，desktop
494e5444 01 00 0000019950f72c00 00000001 00000025
02 00000007 0004 612e696f 0011 68747470733a2f2f612e696f2f3f713d78 0001 78 02 656e 01
cee33ee2`,
        hkdf: `HKDF-SHA256(IKM = 0x11 × 32, salt = 0x22 × 12, info = "intentd-bucket-v1", L = 32)
=> 4a359b8818fc073f6f81a3cb4acd9065302e285fbef0d35d2ff71fba107e6056`,
      },
    },
  },
};
