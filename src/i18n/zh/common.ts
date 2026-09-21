import type { Dictionary } from '@/i18n';

/** Site chrome: navigation, footer, accessibility labels, shared form copy. */
export const common: Pick<Dictionary, 'common' | 'a11y' | 'nav' | 'footer' | 'errors' | 'status'> = {
  common: {
    loading: '加载中…',
    error: '出了点问题',
    retry: '重试',
    optional: '可选',
    required: '必填',
    send: '发送',
    sending: '发送中…',
    close: '关闭',
    backToHome: '返回首页',
    perMonth: '/ 月',
    setupOnce: '开通费，一次性',
    copy: '复制',
    copied: '已复制',
  },

  a11y: {
    skipToContent: '跳到正文',
    closeDialog: '关闭窗口',
    primaryNav: '主导航',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    homeLink: 'IntentD — 返回首页',
    languageSwitcher: '语言',
    included: '包含',
    notIncluded: '不包含',
    docsContents: '文档目录',
    legalSections: '文档章节',
    useCasesScroller: '数据应用场景，横向滚动',
  },

  nav: {
    pricing: '定价',
    docs: '文档',
    forPublishers: '面向开发者',
    forBuyers: '面向数据买方',
    dashboard: '控制台',
    login: '登录',
    logout: '退出',
    register: '创建账户',
    connectExtension: '接入您的扩展',
  },

  footer: {
    tagline:
      '意图数据基础设施：面向扩展开发者的 SDK，以及面向分析团队的纯净 PII-free 数据流。',
    copyright: 'IntentD。保留所有权利。',
    badge: 'PII-free · GDPR-safe',
    product: {
      title: '产品',
      pricing: '定价',
      api: 'API 与数据格式',
      sdk: 'SDK 与用户同意',
      howItWorks: '工作原理',
      faq: '常见问题',
    },
    company: {
      title: '公司',
      contact: '联系我们',
      dashboard: '控制台',
      login: '登录',
    },
    legal: {
      title: '法律',
      terms: '使用条款',
      privacy: '隐私政策',
      dpa: 'DPA（数据处理协议）',
    },
  },

  /** Transport-level fallbacks, used when the server gives no message. */
  errors: {
    network: '无法连接服务器。请检查网络后重试。',
    unexpected: '发生了未预期的错误。',
    formGeneric: '出了点问题，请重试。',
  },

  status: {
    checking: '正在检查状态',
    operational: '所有系统运行正常',
    degraded: '响应时间偏高',
  },
};
