//侧边栏获取api
import request from '../utils/http';

//代理余额查询
export const getMoney = () => {
   return request({
       url: '/Offline/getMoney',
       method: 'get',
       
   });
};

//代理充值申请
export const postRechargeAppliy = (czje:any,czmm:any) => {
   return request({
       url: '/Offline/RechargeAppliy',
       method: 'post',
       params:{
         password:czmm,
         amount:czje
       }
   });
};

//代理充值通过
export const postapproveRecharge = (id:any) => {
   return request({
       url: '/Offline/approveRecharge',
       method: 'post',
       params:{
         id
       }
   });
};

//代理提现申请
export const postWithdrawalAppliy = (czje:any,czmm:any) => {
   return request({
       url: '/Offline/WithdrawalAppliy',
       method: 'post',
       params:{
         password:czmm,
         amount:czje
       }
   });
};

//线下用户充值
export const postuserRecharge = (czje:any,czmm:any,id:any) => {
   return request({
       url: '/Offline/userRecharge',
       method: 'post',
       params:{
         transaction_password:czmm,
         amount:czje,
         userid:id
       }
   });
};

//线下用户提现
export const postuserWithdrawal = (czje:any,czmm:any,id:any) => {
   return request({
       url: '/Offline/userWithdrawal',
       method: 'post',
       params:{
         transaction_password:czmm,
         amount:czje,
         userid:id
       }
   });
};

//线下用户api信息
export const getuserMoney = (username:any) => {
   return request({
       url: '/Offline/userMoney',
       method: 'get',
       params:{
         user_name:username
       }
   });
};