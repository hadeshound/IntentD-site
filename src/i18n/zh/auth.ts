import type { Dictionary } from '@/i18n';

/** Sign-in, registration and password recovery screens. */
export const auth: Pick<Dictionary, 'auth'> = {
  auth: {
    guard: {
      checking: '正在验证会话…',
      redirecting: '正在跳转到登录…',
    },

    login: {
      metaTitle: '登录',
      metaDescription: '登录您的 IntentD 账户以管理数据流访问权限。',
      eyebrow: '登录',
      title: '欢迎回来',
      description: '登录后可继续办理访问申请，或查看申请状态。',
      noAccount: '还没有账户？',
      createAccount: '创建账户',
      asideTitle: '会话是如何工作的',
      aside: [
        {
          strong: '访问令牌只存在于标签页内存中。',
          body: '它不会进入 localStorage，因此第三方脚本无法取走。',
        },
        {
          strong: '刷新通过 HttpOnly cookie 完成。',
          body: '无论在我们这边还是别处，JavaScript 都读不到它。',
        },
        {
          strong: '修改密码会结束全部会话。',
          body: '旧的 refresh token 会被立即吊销。',
        },
      ],
      form: {
        email: '邮箱',
        password: '密码',
        remember: '记住我',
        forgot: '忘记密码？',
        submit: '登录',
        submitting: '正在登录…',
      },
    },

    register: {
      metaTitle: '注册',
      metaDescription: '创建 IntentD 账户：获取数据流访问权限，或开始让您的扩展变现。',
      eyebrow: '注册',
      title: '创建您的 IntentD 账户',
      description: '今天就获取数据流访问权限，或开始让您的扩展变现。',
      haveAccount: '已经有账户？',
      login: '登录',
      asideEyebrow: '接下来会怎样',
      asideTitle: '注册后我们会与您联系',
      asideBody:
        '当前阶段由经理发放密钥和交付参数：这样我们能在签署文件之前确认您的场景是否匹配。',
      benefits: [
        'SDK 接入大约需要五分钟',
        '扩展中没有广告，也不替换内容',
        'Parquet + LZ4 格式的数据，可直接进入您的数仓',
        'PII 过滤在事件发送之前完成',
      ],
      form: {
        roleLegend: '您为什么而来？',
        roleBuyer: '我想购买数据',
        roleBuyerHint: '访问 Parquet 格式的意图信号流。',
        rolePublisher: '我是扩展开发者',
        rolePublisherHint: '通过 edge SDK 实现无广告变现。',
        email: '工作邮箱',
        password: '密码',
        passwordHint: '至少 10 个字符，且至少包含一个字母和一个数字。',
        company: '公司名称',
        companyHint: '预留数据导出时会用到——可以稍后填写。',
        acceptBefore: '我同意',
        acceptTerms: '使用条款',
        acceptAnd: '和',
        acceptPrivacy: '隐私政策',
        submit: '创建账户',
        submitting: '正在创建账户…',
      },
    },

    forgot: {
      metaTitle: '找回密码',
      metaDescription: '申请重置 IntentD 账户密码的链接。',
      eyebrow: '找回密码',
      title: '重置密码',
      description: '填写账户绑定的邮箱。我们会发送一个用于设置新密码的链接。',
      remembered: '想起密码了？',
      backToLogin: '返回登录',
      asideTitle: '为什么回复总是一样的',
      asideBody:
        '无论该地址是否已注册，表单的回复都完全相同。否则它就会变成一本名录：逐个试地址，再根据回复差异判断谁有账户。',
      asideBody2:
        '链接有效期为一小时，且只能使用一次。修改密码后，该账户的所有活跃会话都会结束。',
      form: {
        email: '账户邮箱',
        submit: '发送说明',
        submitting: '发送中…',
        successTitle: '请查收邮件',
        successBody:
          '如果该邮箱已注册，我们已发送密码找回说明。链接有效期为一小时。',
        tryAnother: '换一个地址',
      },
    },

    reset: {
      metaTitle: '新密码',
      metaDescription: '使用邮件中的链接为您的 IntentD 账户设置新密码。',
      eyebrow: '新密码',
      title: '设置新密码',
      description: '请设置一个该账户从未用过的密码。链接只会生效一次。',
      expired: '链接过期了？',
      requestNew: '申请新链接',
      form: {
        newPassword: '新密码',
        passwordHint: '至少 10 个字符，且至少包含一个字母和一个数字。',
        confirmPassword: '再次输入密码',
        submit: '设置新密码',
        submitting: '保存中…',
        incompleteTitle: '链接不完整',
        incompleteBodyBefore: '链接中缺少找回令牌。请在',
        incompleteLink: '找回密码页面',
        successTitle: '密码已更新',
        successBody: '该账户的所有活跃会话都已结束。请用新密码登录。',
        goToLogin: '前往登录',
      },
    },

    errors: {
      emailRequired: '请填写工作邮箱',
      emailMax: '邮箱不超过 255 个字符',
      emailInvalid: '这个地址看起来有误',
      passwordRequired: '请输入密码',
      passwordMin: '至少 10 个字符',
      passwordMax: '不超过 72 个字符',
      passwordLetter: '请至少加入一个字母',
      passwordDigit: '请至少加入一个数字',
      max255: '不超过 255 个字符',
      roleRequired: '请选择您为什么而来',
      termsRequired: '未同意条款，我们无法为您创建账户',
      tokenInvalid: '链接已损坏——请申请新的',
      passwordsMismatch: '两次输入的密码不一致',
    },
  },
};
