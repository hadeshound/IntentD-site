import type { Dictionary } from '@/i18n';

/** Terms and privacy policy. Bodies are HTML; see the English original for why. */
export const legal: Pick<Dictionary, 'legal'> = {
  legal: {
    eyebrow: 'Legal',
    updatedAt: '最后更新：',
    updatedPlaceholder: '[PLACEHOLDER —— 发布日期]',
    contents: '章节',
    draftLabel: '草稿。',

    terms: {
      metaTitle: '使用条款',
      metaDescription:
        'IntentD 平台使用条款：扩展开发者的规则、数据买方的规则、计费、责任以及访问终止。',
      title: '使用条款',
      intro:
        '本条款规范对 IntentD 平台的访问，既适用于接入 SDK 的扩展开发者，也适用于接收意图数据导出的组织。',
      notice:
        '法律实体信息、适用法律和管辖地标记为 <span class="font-mono">[PLACEHOLDER]</span>，将在法务审核后补充。本文件当前版本不构成公开要约。',
      sections: {
        definitions: {
          title: '术语',
          body: `<p><strong>平台</strong> —— IntentD 服务，包含 edge SDK、事件接收与清洗基础设施，以及导出交付通道。</p>
<p><strong>发布者（Publisher）</strong> —— 接入了 SDK 的浏览器扩展开发者。</p>
<p><strong>数据买方（Data Buyer）</strong> —— 按其中一种套餐获得导出访问权限的组织。</p>
<p><strong>事件</strong> —— 一条经过过滤的匿名化记录，其结构在<a href="{{schema}}">数据结构</a>中说明。</p>`,
        },
        account: {
          title: '账户与访问',
          body: `<p>使用平台需要账户。您需对密码的安全以及在您账户下进行的所有操作负责。</p>
<p>发布者 API 密钥单独签发，不得转交第三方。密钥泄露须立即通知 <a href="mailto:{{support}}">{{support}}</a> —— 我们会吊销该密钥并签发新的。</p>
<p>当我们怀疑账户被盗用、限额被滥用或本条款被违反时，可以暂停访问。</p>`,
        },
        publishers: {
          title: '发布者的义务',
          body: `<p>接入 SDK 即表示您确认：</p>
<ul>
<li>您有权分发该扩展并修改其代码；</li>
<li>您已按 Chrome Web Store 和 Mozilla Add-ons 的规则，在扩展的隐私政策和商店页面中披露匿名遥测的采集；</li>
<li>您不会为绕过隐私过滤器而修改 SDK，也不会向其传入通过其他途径获得的数据；</li>
<li>未经单独约定，您不会在面向儿童的扩展，以及医疗、金融或其他敏感主题的扩展中使用本平台。</li>
</ul>
<p>违反其中任何一项，都构成停用密钥并扣留违规期间未支付分成的依据。</p>`,
        },
        buyers: {
          title: '数据买方的义务',
          body: `<p>获得导出访问权限即表示您承诺：</p>
<ul>
<li>不尝试去匿名化 —— 即把 <code class="font-mono">anon_uid</code> 与某个人、设备或其他系统中的账户对应起来；</li>
<li>未经单独书面协议，不转售、不向第三方转交原始导出；</li>
<li>按您所在司法辖区适用的数据保护法律使用这些数据；</li>
<li>对收到的文件采取不低于贵组织机密信息标准的保护措施。</li>
</ul>`,
        },
        billing: {
          title: '套餐与计费',
          body: `<p>现行套餐发布在<a href="{{pricing}}">定价页面</a>。价格不含适用税费。</p>
<p>每个套餐都包含在开通数据流时收取的一次性开通费，以及按月收取的订阅费。开通费覆盖专用 bucket、密钥和交付配置，开通完成后不予退还。</p>
<p>现阶段访问通过申请办理：您选择套餐，我们与您联系并签署文件。通过支付服务商自动扣款将另行接入，在此之前本网站不接受任何支付信息。</p>
<p>超出活跃用户限额不会中断数据流。我们会记录超量，并建议从下一计费周期起升级到下一档套餐。</p>`,
        },
        availability: {
          title: '服务可用性',
          body: `<p>我们努力保持事件接收与导出交付的持续运行。有保障的可用性水平（SLA）按套餐标注，Enterprise 还会在单独协议中另行约定。</p>
<p>计划内的技术维护会提前公告。短时故障期间，SDK 会在本地保留事件队列并重试发送。</p>`,
        },
        liability: {
          title: '责任',
          body: `<p>平台按「现状」提供。对于因使用或无法使用本服务而产生的利润损失、间接损失和偶然损失，我们不承担责任。</p>
<p>合同项下的累计责任以您在引发索赔的事件发生前三个月实际支付的金额为上限。</p>`,
        },
        termination: {
          title: '访问终止',
          body: `<p>您可以随时停止使用平台：从扩展中移除 SDK，或不再续订。</p>
<p>在发生重大违约时，我们可以终止访问，并通过账户中登记的电子邮箱通知您。已交付的数据按交付时生效的条款留在买方处。</p>`,
        },
        changes: {
          title: '条款变更',
          body: `<p>我们可能更新本条款。重大变更将在生效前至少 14 天通过电子邮件通知。在该日期之后继续使用平台即表示接受新版本。</p>
<p>关于本文件的问题请联系：<a href="mailto:{{support}}">{{support}}</a>。</p>`,
        },
        requisites: {
          title: '主体信息与适用法律',
          body: `<p>平台运营方：<span class="font-mono">[PLACEHOLDER]</span></p>
<p>注册地址：<span class="font-mono">[PLACEHOLDER]</span></p>
<p>适用法律与争议管辖地：<span class="font-mono">[PLACEHOLDER]</span></p>`,
        },
      },
    },

    privacy: {
      metaTitle: '隐私政策',
      metaDescription:
        'IntentD 如何处理数据：SDK 采集什么、设备上剥离什么、我们保存哪些账户数据，以及数据主体权利如何实现。',
      title: '隐私政策',
      intro:
        'IntentD 的设计目标之一，就是让个人数据不进入数据流。本页说明我们在门户上采集什么、SDK 在浏览器中采集什么，以及什么在发送前被丢弃。',
      notice:
        '运营方信息、子处理方清单和发布日期在法务审核前标记为 <span class="font-mono">[PLACEHOLDER]</span>。',
      sections: {
        scope: {
          title: '适用范围',
          body: `<p>本文件描述两条相互独立的数据流：</p>
<ul>
<li><strong>账户数据</strong> —— 您自己告诉我们的内容：邮箱、以哈希形式保存的密码、公司名称、联系表单的内容。</li>
<li><strong>扩展遥测</strong> —— edge SDK 在已接入扩展的用户浏览器中采集的匿名信号。</li>
</ul>
<p>第二条数据流适用下文所述的单独规则：其设计目标就是让个人数据不进入其中。</p>`,
        },
        'account-data': {
          title: '账户数据',
          body: `<p>在您注册和使用门户时，我们保存：</p>
<ul>
<li>电子邮箱地址 —— 账户标识和联系渠道；</li>
<li>密码哈希（bcrypt）—— 原始密码我们无法获取，也无法还原；</li>
<li>公司名称和您选择的角色 —— 数据买方或发布者；</li>
<li>技术操作日志：登录、退出、修改密码、套餐申请，并附带 IP 地址和 user-agent —— 用于调查安全事件；</li>
<li>您提交的联系表单内容。</li>
</ul>
<p>会话以携带 refresh token 的 HttpOnly cookie 保存；数据库中只存其哈希。访问令牌只存在于标签页内存中，绝不写入 localStorage。</p>`,
        },
        telemetry: {
          title: 'SDK 采集什么',
          body: `<p>SDK 由一次访问的技术元数据构造事件。字段清单公布在<a href="{{schema}}">数据结构</a>中，包括清洗后的 URL、根域名、提取出的搜索查询、浏览器语言、设备类型和国家代码。</p>
<p>发送之前会在设备上完成过滤：</p>
<ul>
<li>剥离看起来像标识符、令牌、邮箱和电话号码的 query 参数；</li>
<li>完全丢弃来自银行、支付系统、邮件服务、医疗和政府门户等域名的事件；</li>
<li>丢弃身份验证、找回密码和支付结算页面；</li>
<li>会话标识符被转换为不可逆的 HMAC 哈希 <code class="font-mono">anon_uid</code>。</li>
</ul>
<p>我们既不读取也不设置扩展用户的 cookie。页面内容、输入的文字、密码和文件都不会以任何形式被采集。</p>`,
        },
        'legal-basis': {
          title: '处理的法律依据',
          body: `<p>账户数据基于履行与您的合同，以及我们在保障服务安全方面的正当利益而处理。</p>
<p>扩展遥测仅基于用户的明确同意处理（GDPR 第 6(1)(a) 条；就设备上的存储而言，为 ePrivacy 第 5(3) 条）。SDK 会在扩展安装时或其 popup 中显示同意提示，在用户点击「允许」之前不采集、不存储、也不发送任何数据。拒绝不会限制扩展本身的功能。</p>
<p><strong>撤回同意。</strong>同意可随时在扩展设置中撤回。撤回后采集即停止，未发送的事件和安装标识符会从设备上删除。撤回不影响撤回之前已进行处理的合法性。已传输的匿名数据将在下文所列保留期届满后删除；相关请求可发送至 <a href="mailto:{{privacy}}">{{privacy}}</a>。</p>
<p>用户的决定只保存在其浏览器中。当同意文本发生变化时（例如新增数据类别），会重新征求同意。</p>
<p>扩展发布者负责在自己的界面中调起同意提示，并在商店页面的说明中披露数据采集。</p>
<p><span class="font-mono">[LEGAL REVIEW NEEDED]</span></p>`,
        },
        retention: {
          title: '保留期限',
          body: `<ul>
<li>账户数据 —— 账户存续期间，以及删除后的 12 个月。</li>
<li>操作日志 —— 12 个月。</li>
<li>匿名导出 —— 热存储 30 天，归档最长 90 天。</li>
<li>联系表单留言 —— 24 个月。</li>
</ul>`,
        },
        sharing: {
          title: '向第三方的提供',
          body: `<p>匿名导出按<a href="{{terms}}">使用条款</a>提供给数据买方，其中明确禁止去匿名化。</p>
<p>我们不出售您的账户数据，也不会为广告目的转交。仅可能提供给基础设施处理方（托管、存储），以及依据有权机关的正当要求提供。</p>
<p>子处理方清单：<span class="font-mono">[PLACEHOLDER]</span>。</p>`,
        },
        rights: {
          title: '您的权利',
          body: `<p>您可以请求访问、更正、删除或导出您的账户数据，也可以撤回对邮件订阅的同意。请从账户中登记的地址发送请求至 <a href="mailto:{{privacy}}">{{privacy}}</a>。</p>
<p>对于遥测数据流，删除某一条具体记录在技术上不可行：其中没有任何字段能把事件与某个人关联起来。这是设计带来的结果，而不是对该项权利的拒绝。</p>
<p>数据处理协议（DPA）可按需提供 —— 请在<a href="{{contact}}">联系表单</a>中注明。</p>`,
        },
        security: {
          title: '安全',
          body: `<ul>
<li>密码以 bcrypt 哈希形式保存；</li>
<li>refresh token 以哈希形式保存，并在修改密码时吊销；</li>
<li>所有 API 调用都有频率限制并记录日志；</li>
<li>导出访问通过按租户划分的独立密钥授予。</li>
</ul>
<p>如怀疑发生数据泄露，请通知 <a href="mailto:{{privacy}}">{{privacy}}</a>。</p>`,
        },
        contacts: {
          title: '联系方式与主体信息',
          body: `<p>数据控制者：<span class="font-mono">[PLACEHOLDER]</span></p>
<p>地址：<span class="font-mono">[PLACEHOLDER]</span></p>
<p>数据保护负责人：<a href="mailto:{{privacy}}">{{privacy}}</a></p>`,
        },
      },
    },
  },
};
