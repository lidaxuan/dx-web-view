/**
 * 主页 Bento 区块配置：文案、链接、下方卡片顺序都可以只改这里。
 * @typedef {{ kind: 'pdf' | 'github' | 'email'; href: string; ariaLabel: string; title?: string }} ProfileLink
 */

const workYears = new Date().getFullYear() - 2017;


/** @type {{
 *   hint?: string
 *   profile: {
 *     avatarEmoji: string
 *     name: string
 *     tagline: string
 *     bio: string
 *     resumeHint: string
 *     badgeLabel: string
 *     resumePath: string
 *     openResumeAriaLabel: string
 *     links: ProfileLink[]
 *   }
 *   blocks: Array<
 *   | { type: 'stat'; key: string; gridClass?: string; label: string; value: string; description: string }
 *   | { type: 'tags'; key: string; gridClass?: string; title: string; tags: string[] }
 *   | { type: 'project'; key: string; gridClass?: string; eyebrow: string; title: string; description: string; linkTo: string; cta: string }
 *   | { type: 'status'; key: string; gridClass?: string; title: string; value: string; subtitle: string }
 *   | { type: 'note'; key: string; gridClass?: string; eyebrow: string; title: string; accent: string; variant?: 'notion' }
 *   | { type: 'time'; key: string; gridClass?: string; title: string }
 *   >
 * }} */
export const homePageConfig = {

// 💡 职业关键词：
  profile: {
    avatarEmoji: '👋',
    name: `我是李继玄，一名工作${workYears}年的前端开发`,
    tagline: '组件化工程化 · 性能优化 · 可视化开发 · 团队协作 · 北京',
    bio: `用代码搭建用户体验的桥梁，从组件封装到性能优化，从交互细节到工程化体系，我始终相信「好的前端，是让用户感受不到技术的存在」。\n
    ${workYears}年里，我主导过公司前端框架开发与落地；写过复杂的可视化大屏，也维护过稳定迭代的组件库。
    比起「全栈」，我更愿意做前端领域的「深耕者」，用严谨的逻辑和细腻的审美，交付稳定、高效、好用的产品。`,
    resumeHint: '点击查看完整简历 →',
    // badgeLabel: '简历',
    resumePath: '/resume',
    openResumeAriaLabel: '查看完整简历',
    links: [
      {
        kind: 'pdf',
        href: '/resume.pdf',
        ariaLabel: '下载简历 PDF',
        title: '下载 PDF（将 resume.pdf 放到 public 目录）'
      },
      {
        kind: 'github',
        href: 'https://github.com/',
        ariaLabel: 'GitHub'
      },
      {
        kind: 'email',
        href: 'mailto:hello@example.com',
        ariaLabel: '邮箱'
      }
    ]
  },

  blocks: [
    {
      type: 'stat',
      key: 'focus',
      gridClass: 'lg:col-span-1',
      label: 'Focus',
      value: '2026',
      description: '持续迭代个人站点与设计系统'
    },
    {
      type: 'tags',
      key: 'stack',
      gridClass: 'lg:col-span-1',
      title: '技术栈',
      tags: ['Vue2 / Vue3', 'TypeScript', 'ElementUI', 'Lodash', 'Echarts', '微信小程序', 'React']
    },
    {
      type: 'project',
      key: 'demo',
      gridClass: 'lg:col-span-2',
      eyebrow: 'Project',
      title: '地图可视化 Demo',
      description: '占位卡片：可替换为截图或项目链接。先跳到「关于」页占位。',
      linkTo: '/about',
      cta: '了解更多'
    },
    {
      type: 'status',
      key: 'status-about',
      gridClass: 'lg:col-span-1',
      title: '工作状态',
      value: 'Available',
      subtitle: '可接咨询 / 远程合作'
    },
    // 对应主页 Notes 卡片
    {
      type: 'note',
      key: 'belief',
      gridClass: 'lg:col-span-1',
      eyebrow: 'Philosophy',
      title: '前端理念：体验至上',
      accent: '🎯',
      variant: 'notion'
    },
    {
      type: 'time',
      key: 'current-time',
      gridClass: 'lg:col-span-1',
      title: '当前时间'
    }
  ]
}

// ========== 码心页面 配置 ==========
// ==============================================
// 码心页面配置【一套数据 = PC + 移动端】
// ==============================================
export const codeHeartConfig = {
  title: "码 心",
  subtitle: `择一事 · 终一生 | ${workYears}年前端，以代码守初心`,
  mobileSubtitle: "择一事 · 终一生",
  section: {
    timeline: "职业历程",
    belief: "我的开发信条"
  },
  timeline: [
    { year: "2018", title: "入行起点", desc: "踏入前端领域，深耕页面基础与交互开发" },
    { year: "2020", title: "工程化进阶", desc: "搭建组件库、统一开发规范、落地工程化流程" },
    { year: "2021", title: "可视化与性能深耕", desc: "主导中台系统、数据大屏，专注性能优化与复杂交互" },
    { year: "2026", title: "十年沉淀", desc: "不追浮躁风口，坚持长期主义，打磨技术与产品细节" }
  ],

  beliefs: [
    { title: "体验至上，细节为王", desc: "前端不止写页面，更要守护用户每一次交互体验" },
    { title: "极简克制，拒绝冗余", desc: "代码追求简洁可读，不做无意义的过度设计" },
    { title: "规范先行，可维护为本", desc: "重视工程规范，为团队协作和长期迭代负责" },
    { title: "持续深耕，长期成长", desc: "深耕前端领域，保持学习，沉淀核心竞争力" }
  ],

  summary: `${workYears}年前端路，从切图布局到架构工程，从简单页面到企业级中台。
             我始终认为：技术是工具，体验是核心，靠谱是底色。
             不跟风内卷，不浮夸炫技，只专注把每一行代码写干净，把每一个产品做好用。
             以匠心写代码，以初心做产品。`,
  buttons: {
    home: "← 返回首页",
    resume: "查看完整简历"
  }
}

export const resumePageConfig = {
  hero: {
    name: "李继玄",
    title: `${workYears}年前端开发工程师 | 北京`,
    phone: "xxx-xxxx-xxxx",
    email: "15201002062@163.com",
    links: [
      { label: "📝 CSDN", href: "https://blog.csdn.net/weixin_43553701", ariaLabel: "CSDN 博客" },
      { label: "📦 npm", href: "https://www.npmjs.com/~lijixuan", ariaLabel: "npm 个人主页" }
    ]
  },
  resumePdf: "/resume.pdf",
  sections: {
    strengths: {
      heading: "个人优势",
      items: [
        "主导公司前端技术框架封装与选型，落地标准化规范（ESLint、precommit），推行代码片段复用",
        "熟练使用 Vue/React/TypeScript，手写 MVVM 原理，擅长 Webpack 优化与库构建",
        "公共组件库封装，维护个人 npm 包，兼顾复用性、可维护性与扩展性",
        "擅长数据可视化（ECharts/AntV）、流程图二次封装，优化复杂场景性能",
        "独立学习能力强，技术社区博主，CSDN 粉丝过千，持续输出技术分享"
      ]
    },
    skills: {
      heading: "专业技能",
      tags: [
        "Vue2/Vue3 全家桶",
        "React",
        "ElementUI/Ant Design",
        "ECharts/AntV G2/G6",
        "GoJS/流程图封装",
        "微信小程序",
        "Webpack/Vite 工程化"
      ]
    },
    workExperience: {
      heading: "工作经历",
      items: [
        {
          company: "北京易聊科技有限公司",
          date: "2021/04 - 至今",
          role: "Web 前端开发",
          desc: "负责前端框架与公共组件库封装落地；主导前端技术分享与规范推行；负责项目搭建、任务划分与疑难问题解决；优化团队项目性能，开发 SaaS 后台管理系统。"
        },
        {
          company: "趣云信息技术有限公司",
          date: "2020/03 - 2021/04",
          role: "Web 前端开发",
          desc: "负责项目搭建与开发；独立完成广告投放流程图功能设计、开发与优化；对接 UI 实现页面布局与交互效果。"
        },
        {
          company: "北京秀健身网络科技有限公司",
          date: "2018/11 - 2020/02",
          role: "前端开发组长",
          desc: "负责组员工作安排、开发协助与项目评审；对接产品/UI 完成页面开发；解决浏览器兼容性问题，实现页面特效与 JS 交互。"
        },
        {
          company: "北京唐合易成科技股份有限公司",
          date: "2016/05 - 2018/09",
          role: "Web 前端开发",
          desc: "对接 UI 实现 W3C 标准页面；解决浏览器兼容性问题；开发页面特效与动态 JS 交互效果。"
        }
      ]
    },
    coreProjects: {
      heading: "核心项目",
      items: [
        {
          title: "plat 前端框架封装（Vue2）",
          date: "2023/05 - 至今",
          desc: "从 0 到 1 封装 Vue2 通用框架，集成路由/状态管理/接口请求/工具库；解决 SaaS 项目 iframe 通信与性能问题；支持项目互引、动态加载，已发布 npm 并在公司全量落地。"
        },
        {
          title: "大纲编辑器（Vue2）",
          date: "2023/10 - 至今",
          desc: "独立开发类飞书/钉钉文档的树形大纲编辑器；支持文档共享、@成员/GPT、光标精准定位；解决递归组件数据维护、光标丢失、事件冒泡等难点。"
        },
        {
          title: "AI6 机器人管理系统（Vue2+GoJS）",
          date: "2021/07 - 至今",
          desc: "重构万行代码旧项目，封装 GoJS 流程图组件；适配运营版/客户版多场景，支持百节点流畅加载；模块化设计对话流程节点，实现灵活配置。"
        },
        {
          title: "前端公共组件库（Vue）",
          date: "2021/04 - 至今",
          desc: "封装原生组件 + ElementUI 二次组件；开发自定义指令；围绕复用性、可维护性、易用性持续迭代，支撑公司全项目使用。"
        }
      ]
    },
    selfEvaluation: {
      heading: "自我评价",
      text: "9年前端开发经验，从基础页面开发成长为框架设计者与技术负责人。擅长工程化搭建、组件库封装、复杂可视化与性能优化，具备独立解决疑难问题的能力。注重团队协作与技术分享，持续深耕前端领域，追求代码优雅与产品极致体验。"
    }
  }
}
