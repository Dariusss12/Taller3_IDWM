import { defineStore } from 'pinia';
import router from '@/router';
import jwtDecode from "jwt-decode";

export const useMainStore = defineStore({
    id: 'main',

    state: (): {

    } => ({

    }),
    persist: true
});