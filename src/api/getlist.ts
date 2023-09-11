import  request  from "../utils/sport";


export const getfootballlist = () => {
   return request({
       url: '/soccer/list?token=wllGhKLO8ewelWSUfL0CYNYmB5Nusiix',
       method: 'get'
   });
};