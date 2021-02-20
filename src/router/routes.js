// router模块

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import Addcartsuccess from '@/pages/Addcartsuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';

export default [
    {
        path: '/center',
        component: Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },
    {
        path: '/trade',
        component: Trade
    },
    {
        path: '/pay',
        component: Pay
    },
    {
        path: '/paysuccess',
        component: PaySuccess
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/shopcart',
        component: ShopCart
    },
    {
        path: '/addcartsuccess',
        component: Addcartsuccess
    },
    {
        path: '/detail/:goodsId',
        component: Detail
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: {
            isHidden: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHidden: false
        }
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/',
        redirect: '/home'
    },
]

