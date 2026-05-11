/// <reference types="vite/client" />

declare module '@/config.js' {
  export type HomeProfileLink = {
    kind: 'pdf' | 'github' | 'email'
    href: string
    ariaLabel: string
    title?: string
  }

  export type HomeBentoBlock =
    | {
        type: 'stat'
        key: string
        gridClass?: string
        label: string
        value: string
        description: string
      }
    | {
        type: 'tags'
        key: string
        gridClass?: string
        title: string
        tags: string[]
      }
    | {
        type: 'project'
        key: string
        gridClass?: string
        eyebrow: string
        title: string
        description: string
        linkTo: string
        cta: string
      }
    | {
        type: 'status'
        key: string
        gridClass?: string
        title: string
        value: string
        subtitle: string
      }
    | {
        type: 'note'
        key: string
        gridClass?: string
        eyebrow: string
        title: string
        accent: string
        variant?: 'notion'
      }

  export const homePageConfig: {
    hint?: string
    profile: {
      avatarEmoji: string
      name: string
      tagline: string
      bio: string
      resumeHint: string
      badgeLabel: string
      resumePath: string
      openResumeAriaLabel: string
      links: HomeProfileLink[]
    }
    blocks: HomeBentoBlock[]
  }

  // env.d.ts
/// <reference types="vite/client" />

// 码心页面 时间线项类型
  interface CodeHeartTimelineItem {
    year: string
    name: string
    desc: string
  }

// 码心页面 PC端信条项类型
  interface CodeHeartBeliefItem {
    title: string
    desc: string
  }

// 码心页面 模块标题类型
  interface CodeHeartSection {
    timeline: string
    belief: string
  }

// 码心页面 按钮文本类型
  interface CodeHeartButtons {
    home: string
    resume: string
    mobileHome: string
    mobileResume: string
  }

// 码心页面 完整配置类型
  export const codeHeartConfig: {
    // 头部标题
    title: string
    subtitle: string
    mobileSubtitle: string

    // 模块标题
    section: CodeHeartSection

    // PC端时间线
    pcTimeline: CodeHeartTimelineItem[]
    // 移动端时间线
    mobileTimeline: CodeHeartTimelineItem[]

    // PC端开发信条
    pcBeliefs: CodeHeartBeliefItem[]
    // 移动端开发信条
    mobileBeliefs: string[]

    // 个人感悟
    summary: string

    // 按钮文本
    buttons: CodeHeartButtons
  }


  /// <reference types="vite/client" />

// 👇 先定义子类型（和你项目风格一致）
  interface CodeHeartTimelineItem {
    year: string
    title: string
    desc: string
  }
  interface CodeHeartBeliefItem {
    title: string
    desc: string
  }
  interface CodeHeartButtons {
    home: string
    resume: string
  }
  interface CodeHeartSection {
    timeline: string
    belief: string
  }

// 👇 核心：一套数据 支持 PC + 移动端
  export const codeHeartConfig: {
    title: string
    subtitle: string
    mobileSubtitle: string
    section: CodeHeartSection
    timeline: CodeHeartTimelineItem[]   // 统一时间线（不再分PC/移动）
    beliefs: CodeHeartBeliefItem[]      // 统一信条（不再分PC/移动）
    summary: string
    buttons: CodeHeartButtons
  }
}
