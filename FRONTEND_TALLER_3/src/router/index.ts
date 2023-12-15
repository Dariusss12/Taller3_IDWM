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
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});







export default router