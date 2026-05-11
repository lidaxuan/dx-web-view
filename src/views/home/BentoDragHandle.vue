<template>
  <button @click.stop.prevent type="button" aria-label="拖动排序" title="拖动排序"
          class="bento-drag-handle absolute right-3 top-3 z-10 inline-flex h-8 w-8 cursor-grab items-center justify-center rounded-lg border border-black/[0.06] bg-[color:var(--color-background)]/90 text-[color:var(--color-text)]/55 shadow-sm backdrop-blur-sm transition hover:text-[color:var(--color-heading)] active:cursor-grabbing dark:border-white/[0.1] dark:bg-zinc-900/85"
  >
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="9" cy="8" r="1.35"/>
      <circle cx="15" cy="8" r="1.35"/>
      <circle cx="9" cy="12" r="1.35"/>
      <circle cx="15" cy="12" r="1.35"/>
      <circle cx="9" cy="16" r="1.35"/>
      <circle cx="15" cy="16" r="1.35"/>
    </svg>
  </button>
</template>

<script setup lang="ts"></script>
