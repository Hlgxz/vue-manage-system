import  request  from "../utils/http";


export const getTodayAPI = (type:any) => {
   return request({
       url: `/Statistics/statistics/${type}`,
       method: 'get',
       
   });
};

export const getnccAPI = (start_date:any,end_date:any,type:any) => {
   return request({
       url: '/Statistics/ncc',
       method: 'get',
       params:{
         start_date,
         end_date,
         type
       }
       
   });
};