//注册接口
import request from '../utils/http';


//第一步验证
export const stepOne = (username:any) =>{
   return request({
       url: '/Register/stepOne',
       method: 'post',
       data: {
          username,
          
       }
   })
}

//第二步验证
export const stepTwo = (nickname:any) =>{
   return request({
       url: '/Register/stepTwo',
       method: 'post',
       data: { 
         nickname
       }
   })
}

//注册事件
export const register = (data:any) =>{
   return request({
       url: '/Register/register',
       method: 'post',
       data:data
   })
}