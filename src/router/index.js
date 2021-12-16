import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [
        { // 首页
            path: '/',
            name: 'index',
            component:  () => import('../views/index')
        },{ // 排队页
            path: '/lineUp',
            name: 'lineUp',
            component:  () => import('../views/lineUp/lineUp')
        },{ // 通话页面
            path: '/call',
            name: 'call',
            component:  () => import('../views/call/call')
        }
    ]
})
