//封装所有和代理用户相关的接口函数
import request from '../utils/http';

export const addAgentAPI = (user_id:Number,agent:any) => {
    return request({
        url: '/Agent/addAgent',
        method: 'post',
        params:{
         user_id,
         scheme1_commission_rate:agent.type1,
         scheme1_commission_rate_slot:agent.type1_slot,
         scheme1_commission_rate_sport:agent.type1_sport,
         scheme2_commission_rate:agent.type2,
         scheme2_commission_rate_slot:agent.type2_slot,
         scheme2_commission_rate_sport:agent.type2_sport,
         settlement_threshold:agent.type2_base,
         settlement_date:agent.type2_day
        }
    });
};

export const closeAgentAPI = (user_id:Number) => {
   return request({
       url: '/Agent/closeAgent',
       method: 'post',
       params:{
        user_id
       }
   });
};

export const getAgentLogAPI = (page:number) => {
   return request({
       url: '/Agent/getAgentLog',
       method: 'get',
       params:{
         page
       }
   });
};