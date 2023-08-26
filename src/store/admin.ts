//管理登录管理员数据相关
import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from '../api/login';


export const useAdminStore = defineStore("admin",()=>{
//定义管理管理员数据的state
const adminInfo = ref();
//定义获取接口数据的action函数
const getAdminInfo:any = async(param:any)=>{

  const res = await loginAPI(param)
  adminInfo.value = res.data
  return res
}
//以对象的格式把state和action return
return{
   adminInfo,
   getAdminInfo
}
})