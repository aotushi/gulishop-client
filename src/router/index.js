//1.安装插件
//2.引入并声明使用插件
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
Vue.use(VueRouter);

const router=new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/search',
            component:Search
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})

//3.向外暴露一个路由器对象
export default router;