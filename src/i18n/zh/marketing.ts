import type { Dictionary } from '@/i18n';

/** Landing page, FAQ, contact page and the 404 screen. */
export const marketing: Pick<Dictionary, 'home' | 'hero' | 'flow' | 'advertising' | 'howItWorks' | 'useCases' | 'why' | 'faq' | 'contact' | 'notFound'> = {
  home: {
    metaTitle: 'IntentD — 无需广告即可变现浏览器扩展',
    metaDescription:
      'IntentD 将匿名的用户点击流转化为稳定收入。为扩展开发者提供安全的 SDK，为分析团队提供 PII-free 的意图数据流。',
    keywords: [
      'intent data',
      '扩展变现',
      'browser extension SDK',
      'clickstream',
      'PII-free',
      'Parquet',
    ],
  },

  hero: {
    eyebrow: 'Infrastructure for intent data',
    titleBefore: '变现浏览器扩展，',
    titleAccent: '无需广告',
    titleAfter: '也不流失用户',
    subtitle:
      'IntentD 将匿名的用户点击流转化为稳定收入。一次接入即可获得安全的 SDK、完整的隐私保护（PII-free）和现成的数据销售渠道。',
    ctaPrimary: '接入您的扩展',
    ctaSecondary: '购买数据',
    trust: ['5 分钟完成接入', 'Manifest V3', 'Chrome Web Store 合规'],
  },

  flow: {
    caption: '数据流',
    live: 'live',
    nodes: [
      { title: '浏览器扩展', subtitle: 'background script' },
      { title: '@intentd/edge-sdk', subtitle: '< 15 KB · Manifest V3' },
      { title: 'IntentD Edge', subtitle: 'HMAC 哈希 · PII 过滤' },
      { title: 'AWS S3', subtitle: 'Parquet + LZ4' },
    ],
    edges: ['事件', '清洗', '导出'],
    stats: [
      { label: '数据流中的 PII', value: '0' },
      { label: 'SDK 体积', value: '< 15 KB' },
      { label: '格式', value: 'Parquet' },
    ],
    alt: '数据流示意图：浏览器扩展将事件发送到 SDK，SDK 再转发到 IntentD Edge，在那里完成哈希处理和个人数据清洗，随后清洗后的事件以 Parquet 格式导出到 AWS S3。',
  },

  advertising: {
    eyebrow: '面向扩展开发者',
    titleBefore: '不要再为了广告横幅',
    titleMuted: '而拿用户冒险',
    cards: [
      {
        title: '广告横幅赶走用户',
        body: '在扩展界面里植入广告会降低留存，并带来大量一星差评。',
      },
      {
        title: '审核会封禁你',
        body: 'Chrome 和 Firefox 会大幅降权甚至下架带有广告脚本和链接注入的扩展。',
      },
      {
        title: 'IntentD 的方案',
        body: '我们在后台采集匿名化的聚合信号。您的扩展界面保持 100% 干净。',
      },
    ],
  },

  howItWorks: {
    eyebrow: '工作原理',
    title: '一次接入，连接市场两端',
    description:
      '开发者接入 SDK 并获得收入。分析团队拿到现成的数据流。中间是我们的清洗基础设施。',
    publishers: {
      label: 'Publishers',
      audience: '面向扩展开发者',
      steps: [
        {
          title: '5 分钟完成接入',
          body: '把轻量 SDK（< 15 KB）放进扩展的 background script。',
        },
        {
          title: '后台采集信号',
          body: 'SDK 聚合访问模式和搜索意图，并排除 PII。',
        },
        {
          title: '被动收入',
          body: '按产生的数据量获得定期分成。',
        },
      ],
    },
    buyers: {
      label: 'Data Buyers',
      audience: '面向数据买方',
      steps: [
        {
          title: '新鲜的信号',
          body: '实时获取商业行为模式。',
        },
        {
          title: '干净的数据',
          body: '在 edge 层自动过滤银行、密码、邮箱和标识符。',
        },
        {
          title: '好用的格式',
          body: 'AWS S3 中的 Parquet + LZ4，或同步到您自己的 bucket。',
        },
      ],
    },
  },

  useCases: {
    eyebrow: '面向数据买方',
    title: '为您的业务提供最高质量的意图信号',
    cta: '查看数据结构',
    items: [
      {
        segment: 'E-commerce & Retail',
        title: '比竞争对手更早看见需求',
        body: '追踪用户此刻正在搜索哪些商品和品类——在他们去别处下单之前。',
      },
      {
        segment: 'AdTech & Programmatic',
        title: '不依赖第三方 cookie 的人群分层',
        body: '用精准的商业意图丰富受众分层，不必依赖第三方 cookie。',
      },
      {
        segment: 'Market Research & Analytics',
        title: '大样本下的兴趣迁移',
        body: '在数百万会话的样本上分析流量趋势和兴趣变化。',
      },
    ],
  },

  why: {
    eyebrow: '为什么选择 IntentD',
    title: '这是基础设施，不是又一个广告脚本',
    description:
      '四项工程决策，让扩展不流失用户，也让数据买方不必花几周做清洗。',
    items: [
      {
        title: 'Zero-PII，隐私优先',
        body: 'HMAC 哈希与内置过滤器。密码、令牌、个人数据和银行域名永远不会离开浏览器。',
        footnote: '过滤在设备上完成，早于数据包发送。',
      },
      {
        title: '轻量而快速的 SDK',
        body: '不拖慢浏览器，不占用内存，严格遵循 Manifest V3。',
        footnote: '',
      },
      {
        title: 'Chrome Web Store 合规',
        body: 'SDK 不使用 eval，也不从外部加载动态代码。完整通过 Google 和 Mozilla 的自动审核。',
        footnote: '',
      },
      {
        title: '机构级 Parquet',
        body: '压缩的结构化格式，可直接用于 ClickHouse、Snowflake 和 Databricks。',
        footnote: '默认按日期和租户分区。',
      },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: '常见问题',
    notFoundPrefix: '没找到答案？',
    writeUs: '联系我们',
    notFoundSuffix: '——我们在一个工作日内回复。',
    landing: [
      {
        question: '这会影响我的扩展在 Chrome Web Store 的排名吗？',
        answer:
          '不会。SDK 严格遵守 Developer Program Policies。我们不展示广告，不替换页面内容，只采集与个人身份无关的技术元数据。',
      },
      {
        question: '你们如何保证用户匿名？',
        answer:
          '所有个人标识符——邮箱、URL 中的令牌、私有参数——都在浏览器内打包阶段被剥离。进入数据库的只有哈希后的会话 ID 和清洗后的 URL。',
      },
      {
        question: '数据以什么格式交付给买方？',
        answer:
          '主要格式是带 LZ4 压缩的 Parquet，按时间区间和品类切分。您可以直接从我们的 AWS S3 拉取，也可以同步到自己的 bucket。',
      },
      {
        question: '作为开发者，我多久能开始获得收入？',
        answer:
          '接入 SDK 并在控制台激活 API 密钥之后即可。收入从用户的首批活跃会话开始累计。',
      },
    ],
  },

  contact: {
    metaTitle: '联系我们',
    metaDescription:
      '联系 IntentD 团队：数据流访问、扩展接入、技术支持以及数据处理相关问题。',
    eyebrow: '联系我们',
    heading: '给我们留言',
    intro:
      '请尽量具体地描述需求：需要哪一部分数据、多大规模、什么时间节点。这样第一封回复就能切中要点。',
    responseTitle: '响应时间',
    responseBody:
      '数据访问申请：一个工作日内。已接入发布者的技术请求：按套餐优先级处理。',
    directChannels: {
      sales: '销售与数据访问',
      privacy: '隐私与 DPA',
      support: '技术支持',
    },
    formTitle: '联系表单',
    formHint: '除公司名称外，所有字段均为必填。',
    faqEyebrow: '写信之前',
    faqTitle: '值得先了解的几点',
    faq: [
      {
        question: '多久能收到回复？',
        answer:
          '数据访问申请由经理在一个工作日内回复。已接入发布者的技术请求按您所在套餐的优先级顺序处理。',
      },
      {
        question: '付款之前能拿到测试数据吗？',
        answer:
          '可以。在留言中说明您关注的垂类和数据量，我们会准备一份结构与正式导出完全一致的 Parquet 样本文件。',
      },
      {
        question: '我们在欧盟运营，GDPR 怎么办？',
        answer:
          '数据流不包含个人数据：标识符在设备上完成哈希，过滤器会剔除敏感域名和参数。DPA 可按需签署——请在留言中注明。',
      },
    ],
    section: {
      eyebrow: '联系我们',
      title: '聊聊您的场景',
      body: '告诉我们您需要什么：接入扩展、获取样本数据，或讨论 Enterprise 规模。我们会给出实质性的回复。',
      salesTitle: '销售部门',
      salesBody: '数据流访问、测试导出、Enterprise 条款。',
      supportTitle: '技术支持',
      supportBody: 'SDK 接入、密钥、Parquet 格式相关问题。',
    },
    form: {
      name: '姓名',
      email: '工作邮箱',
      emailPlaceholder: 'you@company.com',
      company: '公司',
      topic: '请求类型',
      message: '留言',
      messagePlaceholder: '描述您的需求：关注的垂类、数据量、时间节点。',
      honeypotLabel: '请勿填写此字段',
      submit: '发送请求',
      submitting: '发送中…',
      consent: '提交表单即表示您同意我们按照隐私政策处理您的联系方式。',
      successTitle: '请求已发送',
      successBody:
        '我们已收到您的留言，会回复到您填写的邮箱。数据访问申请由经理在一个工作日内联系您。',
      sendAnother: '再发一条留言',
      topics: {
        buy_data: '购买数据',
        monetize_extension: '扩展变现',
        support: '技术支持',
        enterprise: 'Enterprise Data Pipeline',
      },
      errors: {
        nameMin: '我们该如何称呼您？',
        emailRequired: '请填写工作邮箱',
        emailMax: '邮箱不超过 255 个字符',
        emailInvalid: '这个地址看起来有误',
        max255: '不超过 255 个字符',
        topicRequired: '请选择请求类型',
        messageMin: '请再详细一点——至少 10 个字符',
        messageMax: '不超过 5000 个字符',
      },
    },
  },

  notFound: {
    metaTitle: '页面未找到',
    metaDescription: 'IntentD 网站上没有这个页面。',
    label: '404 · Not Found',
    title: '没有这个页面',
    body: '链接已经过期，或者地址有拼写错误。下面是失效链接最常指向的几个板块。',
    home: '返回首页',
    suggestions: {
      pricing: '定价',
      api: 'API 与数据格式',
      contact: '联系我们',
    },
  },
};
