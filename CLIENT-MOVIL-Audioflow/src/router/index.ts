import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import RegisterView from '../views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue';
import { useMainStore } from '@/stores/main';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    component: RegisterView,
  },
  {
    path: '/',
    component: LoginView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación para verificar autenticación
router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  /*
  if (to.meta.requiresAuth && !mainStore.token) {
    next('/login');
    return;
  } else if ((to.path === '/login' || to.path === '/register') && mainStore.token) {
    next('/');
    return;
  }
  else {
    next();
  }
  */
});

export default router