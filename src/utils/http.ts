//引入axios
import axios from 'axios'
//引入vue
import {reactive} from 'vue'

import { useMainStore } from '../store/webselect';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: 'http://api.tp6.com:8000/admin',
    // 请求超时时间
    timeout: 5000
});
// 创建一个 Vue Router 实例
const router = useRouter();
// 请求拦截器
http.interceptors.request.use(res => {  
    const store = useMainStore();
    if(store.activeWebRoleId && store.activeWebRoleId !== '0'){
        res.url +=`/${store.activeWebRoleId}`;
    }
    res.headers!.Authorization = 'bearer ' + localStorage.token;
    
    return res
},err =>{
    reactive.prototype.$message({
        message: 'err.response.data.msg',
        type: 'error'
    })
    return Promise.reject(err)
}
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        // 如果响应正常，返回响应
        return response;
      },
      error => {
        // 如果返回的状态码为 401，弹出消息并重定向到登录页面
        if (error.response && error.response.data.code === 401) {
            ElMessage.error(error.response.data.message || '登陆状态失效，请重新登录')
            localStorage.clear();
		    router.push('/login');
            
        }else if (error.response && error.response.data.code === 0) {
            ElMessage.error(error.response.data.message || '登陆状态失效，请重新登录')
            router.push('/login'); // 假设 "Login" 是你登录页面的路由名
        }
    
        // 传递错误到下一个处理程序。
        return Promise.reject(error);
      }
);

export default http;
