import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'loginpage',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/todolist',
      name: 'TodoList',
      component: () => import('../views/TodoList.vue')
    }
  ]
})

export default router
