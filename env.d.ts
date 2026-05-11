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


  // 项目卡片类型
  interface ProjectItem {
    id: number
    title: string
    desc: string
    tags: string[]
    github?: string // 个人项目独有
    type: 'work' | 'personal' // 区分类型
  }

// 项目页面配置
  export const projectsConfig : {
    pageDesc: string
    workLabel: string
    personalLabel: string
    list: ProjectItem[]
  }
}
