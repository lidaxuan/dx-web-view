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
