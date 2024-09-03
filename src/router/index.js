import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: () => import('../views/TodoList.vue'),
      children: [
        {
          path: '/todoall',
          name: 'todoAll',
          component: () => import('../views/TodoAll.vue')
        },
        {
          path: '/todook',
          name: 'todoOk',
          component: () => import('../views/TodoOk.vue')
        },
        {
          path: '/todonot',
          name: 'todoNot',
          component: () => import('../views/TodoNot.vue')
        }
      ]
    }
  ]
})

export default router
