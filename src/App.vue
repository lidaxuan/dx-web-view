<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<template>
  <Header></Header>
  <MusicPlayer></MusicPlayer>
  <div style="height: calc(100% - 53px); overflow-y: auto">
    <RouterView />
  </div>

</template>

<style scoped>
#app {
  height: 100%;
}
</style>
