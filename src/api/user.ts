//封装所有和会员用户相关的接口函数
import request from '../utils/http';

//分页获取所有数据
export const fetchData = (page: number | string) => {
    return request({
        url: '/User',
        method: 'get',
        params:{
         page
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
//分页获取所有积分数据
export const ScoreData = () => {
   return request({
       url: '/user/scorelog',
       method: 'get'
   });
};

//定义获取值类型
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

//用户推荐人关系查询
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