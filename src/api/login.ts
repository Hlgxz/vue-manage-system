//登录接口
import request from '../utils/http';

interface LoginPayload {
   username: string;
   password: string;
 }
export const loginAPI = ({username,password}:LoginPayload) =>{
   return request({
       url: '/login',
       method: 'post',
       data: {
          username,
          password,
       }
   })
}