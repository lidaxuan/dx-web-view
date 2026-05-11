import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index.vue')
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('@/views/resume/index.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/projects/index.vue')
    }
  ]
})

export default router
