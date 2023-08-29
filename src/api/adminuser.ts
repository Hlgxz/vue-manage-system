//封装所有和管理员用户相关的接口函数
import request from '../utils/http';

export const fetchData = () => {
    return request({
        url: '/AdminUser',
        method: 'get'
    });
};

export const rolesData = () => {
    return request({
        url: '/AdminUser/roles',
        method: 'get'
    });
};

export const logData = (page:number | string) => {
    return request({
        url: '/AdminUser/getlogs',
        method: 'get',
        params: {
            page
        }
    });
};