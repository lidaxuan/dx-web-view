<script setup lang="ts">
import {RouterLink, useRouter} from 'vue-router'
import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue'
import Sortable from 'sortablejs'
import {homePageConfig} from '@/config.js'
import type {HomeBentoBlock} from '@/config.js'
import BentoDragHandle from './BentoDragHandle.vue'

const router = useRouter()
const {hint, profile, blocks} = homePageConfig

// Time module
const currentTime = ref(new Date())
const is12Hour = ref(true)
let timeInterval: number | null = null

const formattedTime = computed(() => {
  const now = currentTime.value
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  let hours = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  let ampm = ''
  if (is12Hour.value) {
    ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
  }
  const hourStr = String(hours).padStart(2, '0')

  const dateStr = `${year}-${month}-${day}`
  const timeStr = is12Hour.value ? `${hourStr}:${minutes}:${seconds} ${ampm}` : `${hourStr}:${minutes}:${seconds}`

  return {date: dateStr, time: timeStr}
})

function updateTime() {
  currentTime.value = new Date()
}

function toggleTimeFormat() {
  is12Hour.value = !is12Hour.value
}

const PROFILE_KEY = 'profile'
const STORAGE_KEY = 'dx-home-bento-order'

const gridEl = ref<HTMLElement | null>(null)
let sortable: Sortable | null = null

type ProfileSlot = { role: 'profile' }
type BlockSlot = { role: 'block' } & HomeBentoBlock
type HomeSlot = ProfileSlot | BlockSlot

function defaultOrder(): string[] {
  return [PROFILE_KEY, ...blocks.map((b) => b.key)]
}

function mergeSavedOrder(saved: string[], validKeys: Set<string>): string[] {
  const filtered = saved.filter((k) => validKeys.has(k))
  const missing = [...validKeys].filter((k) => !filtered.includes(k))
  return [...filtered, ...missing]
}

function loadOrder(): string[] {
  const def = defaultOrder()
  const valid = new Set(def)
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return def
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return def
    return mergeSavedOrder(parsed as string[], valid)
  } catch {
    return def
  }
}

const orderedKeys = ref<string[]>(loadOrder())

const blockMap = computed(() => {
  const m: Record<string, HomeBentoBlock> = {}
  for (const b of blocks) m[b.key] = b
  return m
})

const orderedSlots = computed((): HomeSlot[] => {
  const result: HomeSlot[] = []
  for (const k of orderedKeys.value) {
    if (k === PROFILE_KEY) {
      result.push({role: 'profile'})
      continue
    }
    const b = blockMap.value[k]
    if (b) result.push({role: 'block', ...b})
  }
  return result
})

function slotRowKey(row: HomeSlot): string {
  return row.role === 'profile' ? PROFILE_KEY : row.key
}

watch(() => blocks.map((b) => b.key).join('\0'), () => {
          orderedKeys.value = loadOrder()
          nextTick(() => setupSortable())
        }
)

function setupSortable() {
  sortable?.destroy()
  sortable = null
  const el = gridEl.value
  if (!el) return

  sortable = Sortable.create(el, {
    animation: 180,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    handle: '.bento-drag-handle',
    draggable: '.bento-item',
    ghostClass: 'bento-ghost',
    chosenClass: 'bento-chosen',
    dragClass: 'bento-drag',
    onEnd(evt) {
      const from = evt.oldIndex
      const to = evt.newIndex
      if (from === undefined || to === undefined || from === to) return
      const next = [...orderedKeys.value]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      orderedKeys.value = next
      // localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      nextTick(() => setupSortable())
    }
  })
}

onMounted(() => {
  orderedKeys.value = loadOrder()
  nextTick(() => setupSortable())
  // Start time update
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  sortable?.destroy()
  sortable = null
  // Clear time interval
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
})

function openResume() {
  router.push(profile.resumePath)
}

function onIntroKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    openResume()
  }
}
</script>

<template>
  <main
          class="home-bento min-h-[calc(100vh-3.25rem)] bg-gradient-to-br from-slate-100/90 via-white to-emerald-50/40 pb-12 pt-6 dark:from-zinc-950 dark:via-zinc-900 dark:to-emerald-950/20 sm:min-h-[calc(100vh-3.5rem)] sm:pt-8"
  >
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!--      <div v-if="hint" class="mb-6 space-y-1 text-center">-->
      <!--        <p class="text-sm text-[color:var(&#45;&#45;color-text)]/70">-->
      <!--          {{ hint }}-->
      <!--        </p>-->
      <!--        <p class="text-xs text-[color:var(&#45;&#45;color-text)]/55">-->
      <!--          按住卡片右上角 ⋮⋮ 手柄拖动排序，顺序会保存在本机-->
      <!--        </p>-->
      <!--      </div>-->

      <div
              ref="gridEl"
              class="grid auto-rows-[minmax(7rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        <template v-for="row in orderedSlots" :key="slotRowKey(row)">
          <!-- 个人信息 -->
          <div v-if="row.role === 'profile'"
               class="bento-item group relative cursor-default overflow-hidden rounded-[1.35rem] border border-white/50 bg-white/55 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl transition hover:border-emerald-400/35 hover:shadow-[0_12px_40px_rgb(16,185,129,0.12)] dark:border-white/[0.08] dark:bg-white/[0.06] dark:shadow-none dark:hover:border-emerald-400/25 sm:p-6 lg:col-span-2 lg:row-span-2 lg:min-h-[280px]">
            <BentoDragHandle/>
            <div class="cursor-pointer" role="link" tabindex="0" :aria-label="profile.openResumeAriaLabel" @keydown="onIntroKeydown">
              <div class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-400/25 to-cyan-400/15 blur-2xl transition group-hover:opacity-90 dark:from-emerald-400/15 dark:to-cyan-500/10"/>
              <div class="relative flex h-full flex-col gap-4 pr-10">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-center gap-3">
                    <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-2xl shadow-inner ring-2 ring-white/80 dark:from-amber-400/20 dark:to-orange-500/20 dark:ring-white/10"
                          aria-hidden="true">
                      {{ profile.avatarEmoji }}
                    </span>
                    <div>
                      <h1 class="text-lg font-semibold tracking-tight text-[color:var(--color-heading)]">
                        {{ profile.name }}
                      </h1>
                      <p class="text-xs text-[color:var(--color-text)]/65">
                        {{ profile.tagline }}
                      </p>
                    </div>
                  </div>
                  <span
                          class="pointer-events-none inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-[color:var(--color-text)]/70 ring-1 ring-black/[0.06] dark:bg-white/[0.06] dark:ring-white/[0.08]"
                  >
                    <svg class="h-3 w-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ profile.badgeLabel }}
                  </span>
                </div>

                <p class="max-w-prose flex-1 text-[14px] leading-relaxed text-[color:var(--color-text)]/85">
                  {{ profile.bio }}
                </p>

                <div class="flex flex-wrap items-center justify-between border-t dark:border-white/[0.08]">
                  <span @click="openResume" class="mt-2 block text-[13px] font-medium text-emerald-600/90 dark:text-emerald-400/90">
                    {{ profile.resumeHint }}
                  </span>
                  <div class="flex">


                    <div class="mr-[10px] border-black/[0.06] pt-4" v-for="link in profile.links" :key="link.kind + link.href">
                      <a
                              :href="link.href"
                              :target="link.kind === 'email' ? undefined : '_blank'"
                              :rel="link.kind === 'email' ? undefined : 'noopener noreferrer'"
                              class="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.04] text-[color:var(--color-heading)] ring-1 ring-black/[0.06] transition hover:bg-black/[0.07] dark:bg-white/[0.06] dark:ring-white/[0.1] dark:hover:bg-white/[0.1]"
                              :title="link.title"
                              :aria-label="link.ariaLabel"
                              @click.stop
                      >
                        <svg v-if="link.kind === 'pdf'" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <svg v-else-if="link.kind === 'github'" class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"/>
                        </svg>
                        <svg v-else class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- stat -->
          <div v-else-if="row.role === 'block' && row.type === 'stat'"
               :class="[
              'bento-item relative rounded-[1.35rem] border border-white/50 bg-white/50 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.05]',
              row.gridClass
            ]"
          >
            <BentoDragHandle/>
            <div class="pr-10">
              <p class="text-[11px] font-medium uppercase tracking-wider text-[color:var(--color-text)]/55">
                {{ row.label }}
              </p>
              <p class="mt-2 font-mono text-3xl font-semibold tabular-nums tracking-tight text-[color:var(--color-heading)]">
                {{ row.value }}
              </p>
              <p class="mt-1 text-xs text-[color:var(--color-text)]/65">
                {{ row.description }}
              </p>
            </div>
          </div>

          <!-- tags -->
          <div v-else-if="row.role === 'block' && row.type === 'tags'"
               :class="[
              'bento-item relative rounded-[1.35rem] border border-white/50 bg-gradient-to-br from-violet-500/12 to-fuchsia-500/10 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.08] dark:from-violet-500/15 dark:to-fuchsia-500/10',
              row.gridClass
            ]"
          >
            <BentoDragHandle/>
            <div class="">
              <p class="text-sm font-semibold text-[color:var(--color-heading)]">
                {{ row.title }}
              </p>
              <div class="mt-3 flex flex-wrap gap-1">
                <span v-for="tag in row.tags" :key="tag"
                      class="rounded-lg bg-white/70 px-2.5 py-1 text-xs font-medium text-violet-800 shadow-sm dark:bg-black/30 dark:text-violet-200"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- project -->
          <div v-else-if="row.role === 'block' && row.type === 'project'"
               :class="[
              'bento-item group/project relative flex flex-col justify-between rounded-[1.35rem] border border-white/50 bg-white/45 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] backdrop-blur-xl transition hover:border-sky-400/35 hover:shadow-[0_12px_36px_rgb(14,165,233,0.12)] sm:flex-row sm:items-center sm:gap-6',
              row.gridClass
            ]"
          >
            <BentoDragHandle/>
            <RouterLink :to="row.linkTo" class="flex min-h-0 flex-1 flex-col justify-between gap-4 pr-10 sm:flex-row sm:items-center sm:gap-6">
              <div>
                <p class="text-xs font-medium text-sky-600 dark:text-sky-400">
                  {{ row.eyebrow }}
                </p>
                <h2 class="mt-1 text-base font-semibold text-[color:var(--color-heading)]">
                  {{ row.title }}
                </h2>
                <p class="mt-2 max-w-md text-sm text-[color:var(--color-text)]/75">
                  {{ row.description }}
                </p>
              </div>
              <span class="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-700 dark:text-sky-300 sm:self-center">
                {{ row.cta }}
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </RouterLink>
          </div>

          <!-- status -->
          <div v-else-if="row.role === 'block' && row.type === 'status'"
               :class="[
              'bento-item relative rounded-[1.35rem] border border-white/50 bg-gradient-to-br from-amber-400/20 to-orange-400/15 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.08]',
              row.gridClass
            ]"
          >
            <BentoDragHandle/>
            <div class="pr-10">
              <p class="text-sm font-semibold text-[color:var(--color-heading)]">
                {{ row.title }}
              </p>
              <p class="mt-3 text-2xl font-bold tabular-nums text-amber-900/90 dark:text-amber-100/90">
                {{ row.value }}
              </p>
              <p class="mt-1 text-xs text-[color:var(--color-text)]/65">
                {{ row.subtitle }}
              </p>
            </div>
          </div>

          <!-- note -->
          <div
                  v-else-if="row.role === 'block' && row.type === 'note'"
                  :class="[
              'bento-item relative flex items-center justify-between rounded-[1.35rem] border border-black/[0.06] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:border-white/[0.08]',
              row.variant === 'notion' ? 'bg-[#f7f6f3] dark:bg-zinc-800/80' : 'border-white/50 bg-white/50 backdrop-blur-xl dark:bg-white/[0.05]',
              row.gridClass
            ]"
          >
            <BentoDragHandle/>
            <div class="flex min-w-0 flex-1 items-center justify-between gap-3 pr-10">
              <div>
                <p class="text-xs text-[color:var(--color-text)]/55">
                  {{ row.eyebrow }}
                </p>
                <p class="mt-1 text-sm font-medium text-[color:var(--color-heading)]">
                  {{ row.title }}
                </p>
              </div>
              <span class="text-2xl font-black text-[color:var(--color-heading)]/80">{{ row.accent }}</span>
            </div>
          </div>

          <!-- time -->
          <div v-else-if="row.role === 'block' && row.type === 'time'"
               :class="[
              'bento-item relative rounded-[1.35rem] border border-white/50 bg-gradient-to-br from-blue-500/12 to-cyan-500/10 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.08] dark:from-blue-500/15 dark:to-cyan-500/10',
              row.gridClass
            ]"
          >
            <BentoDragHandle/>
            <div class="pr-10">
              <p class="text-sm font-semibold text-[color:var(--color-heading)]">
                {{ row.title }}
              </p>
              <div class="mt-3">
                <p class="font-mono text-lg font-semibold tabular-nums tracking-tight text-[color:var(--color-heading)]">
                  {{ formattedTime.date }}
                </p>
                <p class="mt-1 font-mono text-2xl font-bold tabular-nums text-blue-900/90 dark:text-blue-100/90">
                  {{ formattedTime.time }}
                </p>
              </div>
              <button
                      @click="toggleTimeFormat"
                      class="mt-3 inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-blue-800 shadow-sm transition hover:bg-white/80 dark:bg-black/30 dark:text-blue-200 dark:hover:bg-black/40"
              >
                {{ is12Hour ? '24H' : '12H' }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-bento :deep(.bento-ghost) {
  opacity: 0.45;
}

.home-bento :deep(.bento-chosen) {
  cursor: grabbing;
}

.home-bento :deep(.bento-drag) {
  opacity: 0.92;
}
</style>
