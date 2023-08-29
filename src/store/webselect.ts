
import { defineStore } from 'pinia';

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        activeWebRoleId:"",
    }),
    actions: {
        setActiveWebRoleId(id:any) {
            this.activeWebRoleId = id;
        },
    },
    persist: true,
});
