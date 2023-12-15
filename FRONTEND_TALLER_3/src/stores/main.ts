import { defineStore } from 'pinia';
import router from '@/router';
import jwtDecode from "jwt-decode";

export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        token: string;
        githubToken: string;
        githubUsername: string;
        userId: string;
    } => ({
        token: '',
        githubToken: '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',
        githubUsername: '',
        userId: ''
    }),
    persist: true
});