<script setup lang="ts">
import { ref, onMounted } from 'vue'
import music from '@/assets/music.mp3'
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
  // if (audioRef.value) {
  //   audioRef.value.play()
  //   isPlaying.value = true
  // }
})
</script>

<template>
  <div class="music-player fixed top-[80px] right-[70px] z-50">
    <audio ref="audioRef" :src="music" loop></audio>
    <button
      @click="togglePlay"
      class="w-12 h-12 rounded-full border transition-all"
      :class="{ 'rotating': isPlaying }"
      :title="isPlaying ? '暂停' : '播放'"
    >
      <img src="@/assets/images/music.png" alt="">
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
