import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '홈 페이지',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/Users.vue'),
            },
            {
                path: '/adminuser',
                name: 'adminuser',
                meta: {
                    title: '관리자 설정',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/AdminUsers.vue'),
            },
            {
                path: '/roles',
                name: 'roles',
                meta: {
                    title: '관리자 그룹',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/roles.vue'),
            },
            {
                path: '/AdminLogs',
                name: 'adminLogs',
                meta: {
                    title: '관리자 로그',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/AdminLogs.vue'),
            },
            {
                path: '/Users',
                name: 'Users',
                meta: {
                    title: '회원 설정',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/Users.vue'),
            },
            {
                path: '/referr',
                name: 'referr',
                meta: {
                    title: '추천인 관계도',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/referr.vue'),
            },
            {
                path: '/MoneyLog',
                name: 'MoneyLog',
                meta: {
                    title: '회원 잔액',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/MoneyLog.vue'),
            },
            {
                path: '/ScoreLog',
                name: 'ScoreLog',
                meta: {
                    title: '회원 포인트',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/ScoreLog.vue'),
            },
            {
                path: '/level',
                name: 'level',
                meta: {
                    title: '등급 관리',
                    permiss: '6',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/level.vue'),
            },
            {
                path: '/system',
                name: 'system',
                meta: {
                    title: '시스템 구성',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/system.vue'),
            },
            {
                path: '/web',
                name: 'web',
                meta: {
                    title: '사이트 구성',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/web.vue'),
            },
            {
                path: '/pzsdb',
                name: 'pzsdb',
                meta: {
                    title: '메뉴 구성',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/pzsdb.vue'),
            },
            {
                path: '/game_info',
                name: 'game_info',
                meta: {
                    title: '게임결과',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/game_info.vue'),
            },
            {
                path: '/tabs',
                name: 'tabs',
                meta: {
                    title: '회원 메시지',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
            },
            {
                path: '/deposit',
                name: 'deposit',
                meta: {
                    title: '충전/환전',
                    permiss: '16',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/deposit.vue'),
            },
            
            {
                path: '/notice',
                name: 'notice',
                meta: {
                    title: '公告管理',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/notice.vue'),
            },
            {
                path: '/LobbyList',
                name: 'LobbyList',
                meta: {
                    title: 'LobbyList',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/LobbyList.vue'),
            },
            {
                path: '/integrated',
                name: 'integrated',
                meta: {
                    title: 'integrated',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/integrated.vue'),
            },
            {
                path: '/messages',
                name: 'messages',
                meta: {
                    title: 'messages',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/messages.vue'),
            },
            {
                path: '/logoff',
                name: 'logoff',
                meta: {
                    title: 'logoff',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/logoff.vue'),
            },
            {
                path: '/ipset',
                name: 'ipset',
                meta: {
                    title: 'ipset',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/ipset.vue'),
            },
            {
                path: '/ip',
                name: 'ip',
                meta: {
                    title: 'ip',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/ip.vue'),
            },
            {
                path: '/statistics',
                name: 'statistics',
                meta: {
                    title: 'statistics',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/statistics.vue'),
            },
            {
                path: '/statistics2',
                name: 'statistics2',
                meta: {
                    title: 'statistics2',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/statistics2.vue'),
            },
            {
                path: '/agentLog',
                name: 'agentLog',
                meta: {
                    title: 'agentLog',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/agentLog.vue'),
            },
            
            
            
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

//导航守卫
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('token');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
