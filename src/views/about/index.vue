<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { codeHeartConfig } from '@/config.js'

const router = useRouter()
const isMobileView = ref(false)
const config = codeHeartConfig

const toggleView = () => isMobileView.value = !isMobileView.value
const goHome = () => router.push('/')
const goResume = () => router.push('/resume')
</script>

<template>
  <main class="min-h-screen bg-gradient-to-br
    from-slate-100/90 via-white to-emerald-50/40
    dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20
    pt-6 pb-20 px-4 sm:px-6 transition-all duration-500">

    <div class="mx-auto max-w-5xl">
      <!-- 切换按钮 -->
      <div class="flex justify-center mb-10">
        <button @click="toggleView"
                class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full
          border border-white/50 bg-white/55 backdrop-blur-xl
          shadow-[0_8px_30px_rgb(0,0,0,0.06)]
          dark:border-white/[0.08] dark:bg-white/[0.06]
          transition-all duration-300 hover:shadow-lg">
          <span class="text-sm font-medium" :class="!isMobileView ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'">
            💻 PC 视图
          </span>
          <div class="w-10 h-5 rounded-full bg-slate-200 dark:bg-slate-700 relative">
            <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform"
                 :class="isMobileView ? 'translate-x-5' : 'translate-x-0'"></div>
          </div>
          <span class="text-sm font-medium" :class="isMobileView ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'">
            📱 移动端视图
          </span>
        </button>
      </div>

      <!-- PC 端：完整展示1 -->
      <div v-if="!isMobileView" class="transition-opacity">
        <div class="text-center mb-16">
          <h1 class="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white">{{ config.title }}</h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 mt-2">{{ config.subtitle }}</p>
        </div>

        <!-- 时间线 -->
        <section class="mb-16 max-w-3xl mx-auto">
          <h2 class="text-2xl font-semibold mb-6">{{ config.section.timeline }}</h2>
          <div class="border-l-2 border-emerald-400/40 pl-6 space-y-8">
            <div v-for="(item, i) in config.timeline" :key="i" class="relative">
              <div class="absolute -left-[33px] w-4 h-4 rounded-full bg-emerald-400"></div>
              <h3 class="text-xl font-medium">{{ item.year }} · {{ item.title }}</h3>
              <p class="text-slate-600 dark:text-slate-400 mt-1">{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <!-- 信条 -->
        <section class="mb-16 max-w-3xl mx-auto">
          <h2 class="text-2xl font-semibold mb-6">{{ config.section.belief }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(item, i) in config.beliefs" :key="i"
                 class="rounded-2xl border bg-white/55 backdrop-blur-xl  p-5 dark:border-white/[0.08]">
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="text-sm text-slate-600 mt-2">{{ item.desc }}</p>
            </div>
          </div>
        </section>

        <!-- 感悟 -->
<!--        <section class="mb-16 max-w-3xl mx-auto">
          <div class="rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl p-6 dark:border-white/[0.08]">
            <p class="leading-relaxed">{{ config.summary }}</p>
          </div>
        </section>-->

        <div class="flex justify-center gap-4">
          <button @click="goHome" class="px-6 py-2.5 rounded-xl border transition">{{ config.buttons.home }}</button>
          <button @click="goResume" class="px-6 py-2.5 rounded-xl bg-emerald-400/15 border transition">{{ config.buttons.resume }}</button>
        </div>
      </div>

      <!-- 移动端：简化展示（共用同一套数据） -->
      <div v-if="isMobileView" class="flex justify-center">
        <div class="w-[375px] h-[700px] rounded-[3rem] border-8 border-slate-800 overflow-hidden shadow-2xl relative">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
          <div class="h-full overflow-y-auto pt-8 px-3 text-sm">
            <div class="text-center mb-6">
              <h1 class="text-3xl font-bold">{{ config.title }}</h1>
              <p class="text-xs text-slate-500">{{ config.mobileSubtitle }}</p>
            </div>

            <!-- 时间线（简化） -->
            <div class="mb-6">
              <h2 class="text-lg font-semibold mb-3">{{ config.section.timeline }}</h2>
              <div class="border-l-2 border-emerald-400/40 pl-4 space-y-3">
                <div v-for="(item, i) in config.timeline" :key="i" class="relative">
                  <div class="absolute -left-[22px] w-3 h-3 rounded-full bg-emerald-400"></div>
                  <h3 class="font-medium">{{ item.year }} {{ item.title }}</h3>
                  <p class="text-xs text-slate-500">{{ item.desc.slice(0, 16) }}...</p>
                </div>
              </div>
            </div>

            <!-- 信条（简化） -->
            <div class="mb-6 space-y-2">
              <h2 class="text-lg font-semibold mb-2">{{ config.section.belief }}</h2>
              <div v-for="(item, i) in config.beliefs" :key="i"
                   class="rounded-xl border p-3 dark:border-white/[0.08]">
                <p class="text-sm font-medium">{{ item.title }}</p>
              </div>
            </div>

            <div class="flex justify-center gap-3 mt-6">
              <button @click="goHome" class="px-3 py-1.5 rounded-lg text-xs border">{{ config.buttons.home }}</button>
              <button @click="goResume" class="px-3 py-1.5 rounded-lg text-xs bg-emerald-400/15">{{ config.buttons.resume }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
div::-webkit-scrollbar { display: none; }
div { -ms-overflow-style: none; scrollbar-width: none; }
</style>
