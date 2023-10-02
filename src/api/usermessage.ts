

//处理用户消息
import request from '../utils/http';

export const getMessages = () => {
   return request({
       url: '/userMessage/getmessages',
       method: 'get'
   });
};
//指定单条信息
export const getMessage = (id:number) => {
   return request({
       url: `/userMessage/GetMessage/${id}`,
       method: 'get'
   });
};
//未读信息查询
export const getwdMessage = () => {
    return request({
        url: '/userMessage/getwdMessage',
        method: 'get'
    });
 };


 //发布公告
 export const postNotice = ({title,content}:any) => {
    return request({
        url: '/Notice',
        method: 'post',
        data:{
            title,
            content
        }
    });
 };

 //获取公告
 export const getNotice = () => {
    return request({
        url: '/Notice',
        method: 'get'
    });
 };

  //发布消息
  export const postMessage = ({title,content,user_id}:any) => {
    return request({
        url: '/Notice/getMessage',
        method: 'post',
        data:{
            title,
            content,
            user_id
        }
    });
 };

 //获取消息
 export const getuserMessages = () => {
    return request({
        url: '/Notice/getMessage',
        method: 'get'
    });
 };