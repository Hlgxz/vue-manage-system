//封装所有和会员用户相关的接口函数
import request from '../utils/http';

//获取所有用户数据
export const fetchData = () => {
    return request({
        url: '/User',
        method: 'get',
        
    });
};

//获取单用户数据
export const getuserData = (id: number) => {
   return request({
       url: `/User/read/${id}`,
       method: 'get',
       params:{
        id
       }
   });
};

//分页获取所有交易数据
export const MoneyData = (page:number | string) => {
   return request({
       url: '/user/moneylog',
       method: 'get',
       params:{
         page
       }
   });
};

//分页获取所有bet数据
export const BetData = (status:number | string,page:number | string) => {
   return request({
       url: `/User/BetLog/${status}`,
       method: 'get',
       params:{
         page
       }
   });
};

//分页获取所有bet数据
export const getbets = () => {
   return request({
       url: `/User/getbets`,
       method: 'get',
       
   });
};

//分页获取所有积分数据
export const ScoreData = () => {
   return request({
       url: '/user/scorelog',
       method: 'get'
   });
};

//定义获取新用户值类型
interface LoginPayload {
   username: string;
   password: string;
   
   // 其他可能的字段
  nickname?: string;
  email?: string;
  mobile?: string;
	group_id?: string,
   avatar?: string,
   gender?: string,
   birthday?: Date,
   motto?: string,
   status?: string,
   referral_code?:string,
 }

//添加新用户
export const AddUser = ({username,password,...rest}:LoginPayload) =>{
   return request({
       url: '/user/adduser',
       method: 'post',
       data: {
          username,
          password,
          ...rest
       }
   })
}

//查询指定用户
export const GetUser = (id:string) =>{
   return request({
       url: `/User/read/${id}`, 
       method: 'get'
   })
}

interface MoneyPayload{
   user_id:string;
   money:number;
   memo:string;
}
//用户余额修改
export const MoneySave = ({user_id,money,memo}:MoneyPayload) =>{
   return request({
       url: "/User/MoneySave", 
       method: 'post',
       data: {
         user_id,
         money,
         memo
       }
   })
}

//用户推荐人关系图表查询
export const Referrs = () => {
   return request({
       url: '/User/referrer',
       method: 'get'
   });
};

//查询用户数量
export const count = () => {
   return request({
       url: '/User/count',
       method: 'get'
   });
};

//查询请求充值用户表
export const depositAPI = (status:number | string,page:number | string) => {
   return request({
       url: `/User/getMoneyList/${status}`,
       method: 'get',
       params:{
         page
       }
   });
};

//批准请求充值
export const depositokAPI = (id:any) => {
   return request({
       url: '/User/MoneyOk',
       method: 'post',
       data:{
         id,
       }
   });
};

//拒绝请求充值
export const depositnoAPI = (id:any) => {
   return request({
       url: '/User/Moneyno',
       method: 'post',
       data:{
         id,
       }
   });
};
//撤回请求充值
export const qx3API = (id:any) => {
   return request({
       url: '/User/qx3',
       method: 'post',
       data:{
         id,
       }
   });
};

//查询请求提现用户表
export const withdrawalAPI = (status:number | string,page:number | string) => {
   return request({
      url: `/User/getwRequests/${status}`,
       method: 'get',
       params:{
         page
       }
   });
};

//批准请求提现
export const withdrawalokAPI = (id:any) => {
   return request({
       url: '/User/wRecharge',
       method: 'post',
       data:{
         id,
       }
   });
};
//拒绝请求提现
export const withdrawalnoAPI = (id:any) => {
   return request({
       url: '/User/wRechargeno',
       method: 'post',
       data:{
         id,
       }
   });
};

//查询提现和充值总人数
export const countAPI = () => {
   return request({
       url: '/User/getCounts',
       method: 'get',
       
   });
};