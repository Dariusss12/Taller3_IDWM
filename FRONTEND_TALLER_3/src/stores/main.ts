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