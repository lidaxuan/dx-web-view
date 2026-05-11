<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
// 折叠控制
const expWork = ref(true)
const expProject = ref(true)

// 跳转
const goHome = () => router.push('/')
const goCodeHeart = () => router.push('/codeheart')
</script>

<template>
  <main class="bg-gradient-to-br
    from-slate-100/90 via-white to-emerald-50/40
    dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20
    pt-6 pb-20">
    <div class="mx-auto max-w-5xl">

      <!-- Hero 区：照片+个人信息 -->
      <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06] mb-10">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <!-- 照片：替换成你现在的照片 -->
          <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400/30 shadow-lg">
            <img src="@/assets/images/me.jpeg" alt="李继玄" class="header-img w-full h-full object-cover">
          </div>
          <!-- 基本信息 -->
          <div class="text-center sm:text-left">
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">李继玄</h1>
            <p class="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-3">9年前端开发工程师 | 北京</p>
            <div class="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>📱 15201002062</span>
              <span>📧 15201002062@163.com</span>
              <a href="https://blog.csdn.net/weixin_43553701" target="_blank" class="hover:text-emerald-500">📝 CSDN</a>
              <a href="https://www.npmjs.com/~lijixuan" target="_blank" class="hover:text-emerald-500">📦 npm</a>
            </div>
          </div>
        </div>
        <!-- 下载简历按钮 -->
        <div class="flex justify-center mt-6">
          <a href="/resume.pdf" download class="px-6 py-2.5 rounded-xl bg-emerald-400/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/20 hover:bg-emerald-400/20 transition">
            📄 下载完整简历
          </a>
        </div>
      </div>

      <!-- 个人优势 -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white mb-4">个人优势</h2>
        <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
          <ul class="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5">
            <li>主导公司前端技术框架封装与选型，落地标准化规范（ESLint、precommit），推行代码片段复用</li>
            <li>精通 Vue/React/TypeScript，手写 MVVM 原理，擅长 Webpack 优化与库构建</li>
            <li>深耕公共组件库封装，维护个人 npm 包，兼顾复用性、可维护性与扩展性</li>
            <li>擅长数据可视化（ECharts/AntV）、流程图二次封装，优化复杂场景性能</li>
            <li>独立学习能力强，技术社区博主，CSDN 粉丝过千，持续输出技术分享</li>
          </ul>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white mb-4">专业技能</h2>
        <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">Vue2/Vue3 全家桶</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">React + TypeScript</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">ElementUI/Ant Design</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">ECharts/AntV G2/G6</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">GoJS/流程图封装</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">微信小程序</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">微信/支付宝支付</span>
            <span class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">Webpack/Vite 工程化</span>
          </div>
        </div>
      </section>

      <!-- 工作经历（可折叠） -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4 cursor-pointer" @click="expWork = !expWork">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">工作经历</h2>
          <span class="text-emerald-600 dark:text-emerald-400">{{ expWork ? '收起' : '展开' }}</span>
        </div>
        <div v-if="expWork" class="space-y-4">
          <!-- 易聊科技 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 class="font-semibold text-slate-800 dark:text-white">北京易聊科技有限公司</h3>
              <span class="text-sm text-slate-500 dark:text-slate-400">2021/04 - 至今</span>
            </div>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-2">Web 前端开发</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              负责前端框架与公共组件库封装落地；主导前端技术分享与规范推行；负责项目搭建、任务划分与疑难问题解决；优化团队项目性能，开发 SaaS 后台管理系统。
            </p>
          </div>
          <!-- 趣云信息 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 class="font-semibold text-slate-800 dark:text-white">趣云信息技术有限公司</h3>
              <span class="text-sm text-slate-500 dark:text-slate-400">2020/03 - 2021/04</span>
            </div>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-2">Web 前端开发</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              负责项目搭建与开发；独立完成广告投放流程图功能设计、开发与优化；对接 UI 实现页面布局与交互效果。
            </p>
          </div>
          <!-- 秀健身 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 class="font-semibold text-slate-800 dark:text-white">北京秀健身网络科技有限公司</h3>
              <span class="text-sm text-slate-500 dark:text-slate-400">2018/11 - 2020/02</span>
            </div>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-2">前端开发组长</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              负责组员工作安排、开发协助与项目评审；对接产品/UI 完成页面开发；解决浏览器兼容性问题，实现页面特效与 JS 交互。
            </p>
          </div>
          <!-- 中科博润 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 class="font-semibold text-slate-800 dark:text-white">北京中科博润科技股份有限公司</h3>
              <span class="text-sm text-slate-500 dark:text-slate-400">2016/05 - 2018/08</span>
            </div>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-2">Web 前端开发</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              对接 UI 实现 W3C 标准页面；解决浏览器兼容性问题；开发页面特效与动态 JS 交互效果。
            </p>
          </div>
        </div>
      </section>

      <!-- 核心项目（可折叠） -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4 cursor-pointer" @click="expProject = !expProject">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">核心项目</h2>
          <span class="text-emerald-600 dark:text-emerald-400">{{ expProject ? '收起' : '展开' }}</span>
        </div>
        <div v-if="expProject" class="space-y-4">
          <!-- plat 框架封装 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <h3 class="font-semibold text-slate-800 dark:text-white mb-1">plat 前端框架封装（Vue2）</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">2023/05 - 至今</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              从 0 到 1 封装 Vue2 通用框架，集成路由/状态管理/接口请求/工具库；解决 SaaS 项目 iframe 通信与性能问题；支持项目互引、动态加载，已发布 npm 并在公司全量落地。
            </p>
          </div>
          <!-- 大纲编辑器 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <h3 class="font-semibold text-slate-800 dark:text-white mb-1">大纲编辑器（Vue2）</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">2023/10 - 至今</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              独立开发类飞书/钉钉文档的树形大纲编辑器；支持文档共享、@成员/GPT、光标精准定位；解决递归组件数据维护、光标丢失、事件冒泡等难点。
            </p>
          </div>
          <!-- AI6机器人 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <h3 class="font-semibold text-slate-800 dark:text-white mb-1">AI6 机器人管理系统（Vue2+GoJS）</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">2021/07 - 至今</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              重构万行代码旧项目，封装 GoJS 流程图组件；适配运营版/客户版多场景，支持百节点流畅加载；模块化设计对话流程节点，实现灵活配置。
            </p>
          </div>
          <!-- 公共组件库 -->
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <h3 class="font-semibold text-slate-800 dark:text-white mb-1">前端公共组件库（Vue）</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">2021/04 - 至今</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">
              封装原生组件 + ElementUI 二次组件；开发自定义指令；围绕复用性、可维护性、易用性持续迭代，支撑公司全项目使用。
            </p>
          </div>
        </div>
      </section>

      <!-- 自我评价 -->
      <section>
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white mb-4">自我评价</h2>
        <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            9年前端开发经验，从基础页面开发成长为框架设计者与技术负责人。擅长工程化搭建、组件库封装、复杂可视化与性能优化，具备独立解决疑难问题的能力。注重团队协作与技术分享，持续深耕前端领域，追求代码优雅与产品极致体验。
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
/* 统一卡片hover */
div:hover {
  transition: all 0.3s ease;
}

@keyframes rotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(359deg)
  }
}

.header-img:hover {
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  animation: rotate 3s linear infinite;
}
</style>
