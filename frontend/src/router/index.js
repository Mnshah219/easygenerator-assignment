import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import useAuthStore from '../stores/auth-store';
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
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
  ]
});

export const publicUrls = ['signin', 'signup'];
router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  if (!publicUrls.includes(to.name) && !authStore.isAuth()) {
    return next('/signin');
  }
  let redirectPath;
  if (publicUrls.includes(to.name) && authStore.isAuth()) {
    redirectPath = '/';
  }
  if (authStore.isAuth() && !authStore.user) {
    await authStore.fetchUserProfile(); 
  }
  return next(redirectPath);
})

export default router
