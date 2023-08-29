//封装所有和等级相关的接口函数
import request from '../utils/http';

export const levelData = () => {
    return request({
        url: '/level',
        method: 'get'
    });
};