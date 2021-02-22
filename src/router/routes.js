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
import store from '@/store';

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
        component: Trade,
        // beforeEnter: (to, from, next) => {
        //     // 只有从购物车界面才能跳转到交易页面
        //     if(from.path === '/shopcart'){
        //         next();
        //     }else{
        //         alert('只有从购物车界面才能跳转到交易页面');
        //         next(false);
        //     }
        //   }
    },
    {
        path: '/pay',
        component: Pay,
        beforeEnter: (to, from, next) => {
            // 只有从交易页面才能到支付页面
            if(from.path === '/trade'){
                next();
            }else{
                alert('只有从交易界面才能跳转到支付页面');
                next(false);
            }
          }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        beforeEnter: (to, from, next) => {
            // 只有从交易页面才能到支付页面
            if(from.path === '/pay'){
                next();
            }else{
                alert('只有从支付界面才能跳转到支付成功页面');
                next(false);
            }
          }
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
        component: Addcartsuccess,
        beforeEnter: (to, from, next) => {
            // 只有携带了skuNum和sessionStorage中有存储的skuInfo信息,才能访问添加成功页面
            let skuNum = to.query.skuNum;
            let skuInfo = sessionStorage.getItem('SKUINFO_KEY');
            if(skuNum && skuInfo){
                next();
            }else{
                alert('必须要携带skuNum和skuInfo参数, 准备跳往home页面');
                next('/');
                // next(false) 什么也不做,
            }
          }
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
        },
        // 路由独享守卫  注释,因为在路由器中已经设置过相同的功能
        // beforeEnter: (to, from, next) => {
        //     // 只有没有登录的才能访问登录页面
        //     let token = store.state.user.token;
        //     if(token){
        //         // 如果token存在(已经登录),那么访问login页面会直接跳往首页
        //         next('/');
        //     }else{
        //         next();
        //     }

        //   }
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

