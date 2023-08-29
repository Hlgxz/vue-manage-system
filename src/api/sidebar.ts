//侧边栏获取api
import request from '../utils/http';

export const getSidebar = () => {
   return request({
       url: '/Sidebar/getSidebar',
       method: 'get'
   });
};