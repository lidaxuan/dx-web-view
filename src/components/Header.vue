<template>
  <header class="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/80 backdrop-blur-md transition-colors">
    <div class=" flex justify-between h-[3.25rem] w-full items-center  lg:px-8">

      <RouterLink to="/" class="group flex shrink-0 items-center gap-2.5 rounded-lg outline-none ring-[color:var(--color-border-hover)] transition hover:opacity-90 focus-visible:ring-2">
        <span class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 ring-1 ring-emerald-500/20 dark:from-emerald-400/10 dark:to-cyan-400/10 dark:ring-emerald-400/25">
          <img :src="logoUrl" alt="" class="h-6 w-6 object-contain" width="24" height="24"/>
        </span>
        <span class="hidden font-semibold tracking-tight text-[color:var(--color-heading)] sm:inline sm:text-[15px]">
          DX Web
        </span>
      </RouterLink>

      <!-- Center tabs -->
      <nav class="flex min-w-0 flex-1 justify-center" aria-label="主导航">
        <div class="inline-flex rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.06] dark:bg-white/[0.06] dark:ring-white/[0.08]">
          <RouterLink v-for="item in navItems" :key="item.name" :to="item.to" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="(e) => navigate(e)"
               class="relative whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/70 sm:px-4 sm:text-sm"
               :class="isActive ? 'text-[color:var(--color-heading)]' : 'text-[color:var(--color-text)]/75 hover:text-[color:var(--color-heading)]'"
            >
              <span v-if="isActive"
                    class="absolute inset-0 -z-10 rounded-full bg-[color:var(--color-background)] shadow-sm ring-1 ring-black/[0.06] dark:bg-[color:var(--color-background-soft)] dark:ring-white/[0.12]"/>
              {{ item.label }}
            </a>
          </RouterLink>
        </div>
      </nav>

      <!-- Theme toggle -->
      <div class="flex shrink-0 items-center">
        <button type="button" :title="isDark ? '浅色' : '深色'" :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
                @click="toggleTheme"
                class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-background-soft)] text-[color:var(--color-heading)] shadow-sm transition hover:border-[color:var(--color-border-hover)] hover:bg-[color:var(--color-background-mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]">
          <!-- Sun -->
          <svg v-if="isDark" class="h-[18px] w-[18px] text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </svg>
          <!-- Moon -->
          <svg
                  v-else
                  class="h-[18px] w-[18px] text-slate-600 dark:text-slate-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import logoUrl from '@/assets/images/logo.png';

const STORAGE_KEY = 'dx-theme'

const navItems = [
  {name: 'home', label: '首页', to: '/'},
  {name: 'resume', label: '简历', to: '/resume'},
  {name: 'about', label: '码心', to: '/about'},
  {name: 'about', label: '项目', to: '/projects'},
] as const

const theme = ref<'light' | 'dark'>('light')

const isDark = computed(() => theme.value === 'dark')

function readStoredTheme(): 'light' | 'dark' | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === 'light' || raw === 'dark' ? raw : null
}

function applyDomTheme(mode: 'light' | 'dark') {
  const root = document.documentElement
  root.setAttribute('data-theme', mode)
  root.classList.toggle('dark', mode === 'dark')
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const stored = readStoredTheme()
  if (stored) {
    theme.value = stored
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  applyDomTheme(theme.value)
})

watch(theme, (mode) => {
  localStorage.setItem(STORAGE_KEY, mode)
  applyDomTheme(mode)
})
</script>
