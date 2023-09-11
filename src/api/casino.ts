//封装所有和casino相关的接口函数
import request from '../utils/http';
//获取列表
export const LobbyListData = () => {
    return request({
        url: '/Casino/getLobby',
        method: 'get'
    });
};
//更新api里的列表
export const updataLobby = () => {
   return request({
       url: '/Casino/updataLobby',
       method: 'get'
   });
};
//更改状态，类型
export const upLobby = (id:any,type:any,data:any) => {
   return request({
       url: '/Casino/upLobby',
       method: 'post',
       data:{
         id,
         type,
         data

       }
   });
};