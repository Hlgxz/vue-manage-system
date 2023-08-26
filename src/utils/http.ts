//引入axios
import axios from 'axios'
//引入vue
import {reactive} from 'vue'

const http = axios.create({
    baseURL: 'http://api.tp6.com:8000/admin',
    // 请求超时时间
    timeout: 5000
});

// 请求拦截器
http.interceptors.request.use(res => {  
    res.headers.Authorization = 'bearer ' + localStorage.token
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
    
);

export default http;
