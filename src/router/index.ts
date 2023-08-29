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
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
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
                path: '/charts',
                name: 'basecharts',
                meta: {
                    title: '图表',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
            },
            {
                path: '/form',
                name: 'baseform',
                meta: {
                    title: '表单',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "form" */ '../views/form.vue'),
            },
            {
                path: '/tabs',
                name: 'tabs',
                meta: {
                    title: 'tab标签',
                    permiss: '3',
                },
                component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
            },
            
            {
                path: '/upload',
                name: 'upload',
                meta: {
                    title: '上传插件',
                    permiss: '6',
                },
                component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue'),
            },
            
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心',
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/editor.vue'),
            },
            {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9',
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
            },
            {
                path: '/export',
                name: 'export',
                meta: {
                    title: '导出Excel',
                    permiss: '2',
                },
                component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
            },
            
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
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
