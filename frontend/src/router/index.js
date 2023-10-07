import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import SigninSignup from '@/views/SigninSignup.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninSignup
    },
    {
      path: '/signup',
      name: 'signup',
      component: SigninSignup
    },
  ]
});

export const publicUrls = ['signin', 'signup'];

// router.beforeEach((to) => {

// })

export default router
