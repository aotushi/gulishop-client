// router模块

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import Addcartsuccess from '@/pages/Addcartsuccess';

export default [
            {
                path:'/home',
                component:Home
            },
            {
                path:'/addcartsuccess',
                component:Addcartsuccess
            },
            {
                path:'/detail/:goodsId',
                component:Detail
            },
            {
                name:'search',
                path:'/search/:keyword?',
                component:Search,
                meta:{
                    isHidden:false
                }
            },
            {
                path:'/login',
                component:Login,
                meta:{
                    isHidden:false
                }
            },
            {
                path:'/register',
                component:Register
            },
            {
                path:'/',
                redirect:'/home'
            },
        ]
       
