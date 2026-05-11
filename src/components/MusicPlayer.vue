<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audioRef = ref<HTMLAudioElement | null>(null)

const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play()
    isPlaying.value = true
  }
}

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.play()
    isPlaying.value = true
  }
})
</script>

<template>
  <div class="music-player fixed top-[80px] right-[70px] z-50">
    <audio ref="audioRef" src="@/assets/music.mp3" loop></audio>
    <button
      @click="togglePlay"
      class="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center cursor-pointer transition-all hover:bg-emerald-500/30 hover:border-emerald-500/60"
      :class="{ 'rotating': isPlaying }"
      :title="isPlaying ? '暂停' : '播放'"
    >
      <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
        <path d="M12 8c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.rotating {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
