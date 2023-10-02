import  request  from "../utils/http";


export const getSportlist = (page:number | string) => {
   return request({
       url: '/Sport/getSportsList',
       method: 'get',
       params:{
        page
      }
   });
};