import Vue from "vue"
import Router from "vue-router"

import login from "../pages/login"
import home from "../pages/home/home"
import yypf from "../pages/yypf/yypf"

Vue.use(Router)



const routes = [
    {
        path: '/',
        name: 'login',
        component: login
    }, {
        path: '/home',
        name: 'home',
        component: home
    }, {
        path: '/yypf',
        name: 'yypf',
        component: yypf
    }
];

const router = new Router({
    mode: 'history',
    routes
});

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
    // to将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示方行
    // next() 放行    next(/login) 强行跳转

    // if (to.path === '/login') {
    //     return next()
    // }

    // const tokenStr = window.localStorage.getItem('token')
    // if (!tokenStr) {
    //     return next('/login')
    // }
    next()
})

export default router;