//管理登录管理员数据相关
import { defineStore } from 'pinia';

export const useAdminStore = defineStore('adminUser', {
  state: () => ({
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
  }),
  actions: {
    setUserData(data: any) {  // 使用精确的数据类型替代 `any`
      this.userData = data;
      localStorage.setItem('userData', JSON.stringify(data));
    },
    clearUserData() {
      this.userData = null;
      localStorage.removeItem('userData');
    }
  },
});