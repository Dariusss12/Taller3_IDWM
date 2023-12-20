import { defineStore } from 'pinia';
import { User } from '@/interfaces/user';


export const useMainStore = defineStore({
    id: 'main',

    state: (): {
        user:  User | null;
        token: string;
        githubToken: string;
        githubUsername: string;
    } => ({
        user: null,
        token: '',
        githubToken: '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',
        githubUsername: '',
    }),
    persist: true
});