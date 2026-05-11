<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header></Header>
  <div style="height: calc(100% - 53px); overflow-y: auto">
    <RouterView />
  </div>

</template>

<style scoped>
#app {
  height: 100%;
}
</style>
