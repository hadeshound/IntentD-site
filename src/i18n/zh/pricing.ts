import type { Dictionary } from '@/i18n';

/** Pricing copy. Plan names stay in English: Starter, Growth, Scale, Enterprise. */
export const pricing: Pick<Dictionary, 'pricing' | 'checkout'> = {
  pricing: {
    metaTitle: '定价',
    metaDescription:
      'IntentD 意图数据流访问的透明定价：Starter、Growth、Scale 和 Enterprise。对比活跃用户上限、交付频率和字段覆盖。',
    eyebrow: 'Pricing',
    titleBefore: '数据流访问的',
    titleAccent: '透明定价',
    subtitle: '选择您的分析系统所需的信号量。',
    subtitleLong: '选择您的分析系统所需的信号量。您为数据流付费，而不是为界面上的位置付费。',
    compareAll: '对比全部功能',
    fallbackNote: '当前目录来自本地副本——实际条款以经理确认为准。',

    setupFee: '开通费，一次性',
    perMonth: '/ 月',
    activeUsers: '活跃用户',
    unlimitedUsers: '活跃用户不限量',
    customVolume: '数据量单独商定',
    customPrice: '面议',

    /** API enum values, spelled out for a reader. */
    deliveryLabels: {
      daily: '每天一次',
      hourly: '每小时一次',
      hourly_direct: '每小时 + 直接 S3/GCS 访问',
      realtime: '实时 Firehose',
    },
    slaBestEffort: 'Best effort',
    supportLabels: {
      email: '电子邮件（24 小时）',
      priority_24_7: '24/7 优先',
      dedicated_manager: '专属经理',
      dedicated_team: '专属团队',
    },

    custom: {
      title: '需要非标准的数据量？',
      body: 'Raw Firehose、自定义过滤规则和直接的 bucket 访问单独商谈——同时确定 SLA 和法务方案。',
      cta: '洽谈 Enterprise',
    },

    cta: {
      subscribe: '订阅',
      contactSales: '联系销售',
    },

    plans: {
      starter: {
        audience: '初创公司和本地营销机构',
        features: [
          '最多 10,000 名活跃用户',
          '每日 S3 导出（Parquet）',
          '基础字段与 PII 清洗',
          '电子邮件支持',
        ],
        highlightLabel: '',
      },
      growth: {
        audience: 'AdTech 平台和中型电商',
        features: [
          '最多 100,000 名活跃用户',
          '每小时 S3 同步',
          '扩展字段（地理位置、设备、语言）',
          '24/7 优先支持',
        ],
        highlightLabel: '热门选择',
      },
      scale: {
        audience: '大型 AdTech、DSP、DMP、CDP 平台',
        features: [
          '最多 500,000 名活跃用户',
          '每小时 + 直接 S3/GCS 访问',
          '自定义过滤器',
          '专属经理',
        ],
        highlightLabel: '',
      },
      enterprise: {
        audience: '基金、研究机构、数据经纪商',
        features: [
          '无限事件流（原始 Firehose）',
          '自定义过滤规则',
          '专用 S3/GCS 通道',
          '99.9% SLA',
        ],
        highlightLabel: '',
      },
    },

    matrix: {
      eyebrow: '对比',
      title: '各套餐包含的内容',
      caption: 'Starter、Growth、Scale 和 Enterprise 套餐的功能对比',
      featureColumn: '功能',
      groups: [
        {
          title: '数据量与交付',
          rows: [
            {
              label: '每月活跃用户',
              values: {
                starter: '10,000',
                growth: '100,000',
                scale: '500,000',
                enterprise: '不限量',
              },
            },
            {
              label: '交付频率',
              values: {
                starter: '每天一次',
                growth: '每小时一次',
                scale: '每小时 + 直接访问',
                enterprise: '实时 Firehose',
              },
            },
            {
              label: '格式',
              values: {
                starter: 'Parquet + LZ4',
                growth: 'Parquet + LZ4',
                scale: 'Parquet + LZ4',
                enterprise: 'Parquet + LZ4 / Raw JSONL',
              },
            },
            {
              label: '交付到您自己的 bucket',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: 'S3 / GCS 直接访问',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: '数据内容',
          rows: [
            {
              label: '清洗后的 URL 与域名',
              values: { starter: true, growth: true, scale: true, enterprise: true },
            },
            {
              label: '搜索意图',
              values: {
                starter: '基础',
                growth: '完整 + 品类',
                scale: '完整 + 品类',
                enterprise: '完整 + 自定义',
              },
            },
            {
              label: '地理位置与设备类型',
              values: { starter: false, growth: true, scale: true, enterprise: true },
            },
            {
              label: '自定义过滤规则',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
            {
              label: '数据结构扩展',
              values: { starter: false, growth: false, scale: true, enterprise: true },
            },
          ],
        },
        {
          title: '支持与条款',
          rows: [
            {
              label: '支持渠道',
              values: {
                starter: '电子邮件（24 小时）',
                growth: '24/7 优先',
                scale: '专属经理',
                enterprise: '专属团队',
              },
            },
            {
              label: '可用性 SLA',
              values: {
                starter: 'Best effort',
                growth: '99.5%',
                scale: '99.7%',
                enterprise: '99.9%',
              },
            },
            {
              label: 'DPA 与法务支持',
              values: {
                starter: '标准',
                growth: '标准',
                scale: '标准',
                enterprise: '定制',
              },
            },
          ],
        },
      ],
    },

    faqEyebrow: '计费与限额',
    faqTitle: '关于定价的问题',
    faq: [
      {
        question: '活跃用户是怎么统计的？',
        answer:
          '一个活跃用户指在计费月内至少发送过一条清洗事件的安装实例。从未发送过数据的安装不计入。',
      },
      {
        question: '超出限额会怎样？',
        answer:
          '数据流不会中断。我们会记录超量并与您讨论升级到下一档套餐——不会追溯扣费。',
      },
      {
        question: '可以在月中更换套餐吗？',
        answer:
          '可以。变更从下一个交付周期生效，当前数据量的访问权保留到已付费周期结束。',
      },
      {
        question: '开通费包含什么？',
        answer:
          '它覆盖一次性的开通工作：专用 bucket、密钥、交付配置和过滤规则。仅在开通数据流时收取一次。',
      },
      {
        question: '合同怎么签？',
        answer:
          '收到申请后，经理会发送条款和 DPA。Enterprise 合同单独商定，包括 SLA 和过滤规则。',
      },
    ],
  },

  checkout: {
    metaTitle: '申请访问',
    metaDescription: '申请访问 IntentD Data Stream。',
    eyebrow: 'Checkout',
    title: '申请访问 IntentD Data Stream',
    intro: '申请确认后，我们会为您的账户预留一个专属的 S3 数据 bucket。',
    selectedPlan: '已选套餐',
    loading: '正在加载套餐条款…',
    volume: '活跃用户',
    usersPerMonth: '用户 / 月',
    unlimited: '不限量',
    delivery: '交付方式',
    audience: '适用对象',
    setupFee: '开通费（一次性）',
    monthlyFee: '月费',
    sla: 'SLA',
    support: '支持',
    noCharge: '此步骤不会扣款。我们只记录申请，并与您联系以发放测试密钥。',
    changePlan: '更换套餐',
    formTitle: '开通信息',
    formIntroPrefix: '申请将关联到账户',
    companyLabel: '公司名称',
    companyHintExisting: '已保存在资料中——如有需要可修改。',
    companyHintNew: '每家公司会预留独立的 S3 bucket，因此此字段为必填。',
    notesLabel: '给经理的备注',
    notesPlaceholder: '关注的垂类、期望的启动时间、过滤需求。',
    submit: '申请开通套餐',
    submitting: '正在提交申请…',
    guarantees: [
      '此阶段不会索取也不会接受任何支付信息。',
      '对同一套餐重复提交不会产生重复申请——我们会看到最初的那一条。',
    ],
    enterprise: {
      title: 'Enterprise 需单独办理',
      body: 'Raw Firehose、自定义过滤器和 SLA 都需单独商定，因此该套餐不走自助开通流程。',
      cta: '联系销售',
    },
    noPlan: {
      title: '尚未选择套餐',
      body: '请返回定价页面，选择您需要的数据流规模。',
      cta: '前往定价',
    },
    planError: {
      title: '无法加载套餐',
      body: '目录中没有这个套餐。请在定价页面另选一个。',
      cta: '前往定价',
      loadFailed: '无法加载套餐。请刷新页面。',
    },
    modal: {
      title: '申请已受理',
      description:
        '谢谢！我们的经理会通过您填写的邮箱与您联系，发放测试 API 密钥并配置数据导出。',
      planLabel: '套餐',
      contactLabel: '联系方式',
      home: '返回首页',
      docs: '打开文档',
    },
    errors: {
      planRequired: '请选择套餐',
      companyMin: '请填写公司的法定名称或常用名称',
      max255: '不超过 255 个字符',
      max2000: '不超过 2000 个字符',
    },
  },
};
