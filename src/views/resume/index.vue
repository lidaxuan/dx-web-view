<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { resumePageConfig } from '@/config.js'

const router = useRouter()
const config = resumePageConfig
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
            <h1 class="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">{{ config.hero.name }}</h1>
            <p class="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-3">{{ config.hero.title }}</p>
            <div class="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>📱 {{ config.hero.phone }}</span>
              <span>📧 {{ config.hero.email }}</span>
              <a v-for="(link, index) in config.hero.links" :key="index" :href="link.href" target="_blank" class="hover:text-emerald-500" :aria-label="link.ariaLabel">{{ link.label }}</a>
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
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white mb-4">{{ config.sections.strengths.heading }}</h2>
        <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
          <ul class="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5">
            <li v-for="(item, index) in config.sections.strengths.items" :key="index">{{ item }}</li>
          </ul>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white mb-4">{{ config.sections.skills.heading }}</h2>
        <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
          <div class="flex flex-wrap gap-2">
            <span v-for="(tag, index) in config.sections.skills.tags" :key="index" class="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm">{{ tag }}</span>
          </div>
        </div>
      </section>

      <!-- 工作经历（可折叠） -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4 cursor-pointer" @click="expWork = !expWork">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">{{ config.sections.workExperience.heading }}</h2>
          <span class="text-emerald-600 dark:text-emerald-400">{{ expWork ? '收起' : '展开' }}</span>
        </div>
        <div v-if="expWork" class="space-y-4">
          <div v-for="(item, index) in config.sections.workExperience.items" :key="index" class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h3 class="font-semibold text-slate-800 dark:text-white">{{ item.company }}</h3>
              <span class="text-sm text-slate-500 dark:text-slate-400">{{ item.date }}</span>
            </div>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-2">{{ item.role }}</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 核心项目（可折叠） -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4 cursor-pointer" @click="expProject = !expProject">
          <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">{{ config.sections.coreProjects.heading }}</h2>
          <span class="text-emerald-600 dark:text-emerald-400">{{ expProject ? '收起' : '展开' }}</span>
        </div>
        <div v-if="expProject" class="space-y-4">
          <div v-for="(item, index) in config.sections.coreProjects.items" :key="index" class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
            <h3 class="font-semibold text-slate-800 dark:text-white mb-1">{{ item.title }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">{{ item.date }}</p>
            <p class="text-sm text-slate-700 dark:text-slate-300">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- 自我评价 -->
      <section>
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white mb-4">{{ config.sections.selfEvaluation.heading }}</h2>
        <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-white/[0.08] dark:bg-white/[0.06]">
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ config.sections.selfEvaluation.text }}</p>
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
  animation: rotate 3s linear infinite;
}
</style>
