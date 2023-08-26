//封装所有和管理员用户相关的接口函数
import request from '../utils/http';

export const fetchData = () => {
    return request({
        url: '/adminuser',
        method: 'get'
    });
};