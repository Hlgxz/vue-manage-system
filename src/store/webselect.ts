
import { defineStore } from 'pinia';

export const useMainStore = defineStore({
    id: 'main',
    state: ():{activeWebRoleId:any,headerNav:boolean,number:boolean} => ({
        activeWebRoleId:"",
        headerNav:true,
        number:false,
    }),
    actions: {
        setActiveWebRoleId(id:any) {
            this.activeWebRoleId = id;
        }
        
    },
    persist: true,
});
