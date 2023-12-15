import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue';
import { useMainStore } from '@/stores/main';
import HomeView from '@/views/HomeView.vue';
import ReposView from '@/views/ReposView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/register',
    component: RegisterView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/repos',
    component: ReposView,
    meta: { requiresAuth: true},
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (to.meta.requiresAuth && !mainStore.token) {
    next('/');
    return;
  } else if ((to.path === '/login' || to.path === '/register' || to.path === '/') && mainStore.token) {
    next('/repos');
    return;
  }
  else {
    next();
  }
});




export default router