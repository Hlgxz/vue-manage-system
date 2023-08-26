//封装所有网站管理相关的接口函数
import request from '../utils/http';

export const getSitesData = () => {
    return request({
        url: '/Sites',
        method: 'get'
    });
};