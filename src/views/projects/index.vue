<script setup lang="ts">
import { computed } from 'vue'
import { projectsConfig } from '@/config.js'

const config = projectsConfig

// 自动拆分 工作/个人 项目
const workProjects = computed(() => config.list.filter(i => i.type === 'work'))
const personalProjects = computed(() => config.list.filter(i => i.type === 'personal'))
</script>

<template>
  <!-- 全局主题适配背景（和你的网站完全统一） -->
  <main class="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-zinc-950 dark:to-black py-8 px-4 sm:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- 页面头部（极简大气，有辨识度） -->
      <div class="text-center mb-8">
        <p class="text-slate-500 dark:text-slate-400 text-lg">
          {{ config.pageDesc }}
        </p>
      </div>

      <!-- 分类标签：企业实战（青） + 个人原创（紫） -->
      <div class="flex justify-center gap-4 mb-10">
        <button class="px-5 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-medium">
          {{ config.workLabel }}
        </button>
        <button class="px-5 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
          {{ config.personalLabel }}
        </button>
      </div>

      <!-- 错落瀑布流布局（核心个性点！非死板网格） -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <!-- 企业项目卡片 -->
        <div
                v-for="item in workProjects"
                :key="item.id"
                class="group rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
          <h3 class="text-xl font-semibold text-slate-800 dark:text-white mb-2">
            {{ item.title }}
          </h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
            {{ item.desc }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="px-2 py-1 rounded-lg text-xs bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 个人项目卡片 -->
        <div
                v-for="item in personalProjects"
                :key="item.id"
                class="group rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-full h-1 bg-purple-400"></div>
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-semibold text-slate-800 dark:text-white">
              {{ item.title }}
            </h3>
            <a
                    :href="item.github"
                    target="_blank"
                    class="text-xs text-purple-500 hover:text-purple-600 dark:text-purple-400"
            >
              GitHub →
            </a>
          </div>
          <p class="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
            {{ item.desc }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="px-2 py-1 rounded-lg text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
