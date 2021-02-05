//1.安装插件
//2.引入并声明使用插件
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(VueRouter);

//将原有的push方法地址,保存起来,后期还能拿到原来的
const originPush=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;

//修改原型的push,让原型的push指向另一个函数
VueRouter.prototype.push=function(location,onResolve,onRejected){
    //接收3个参数: location就是调用this.$router.push传递过来的对象, 成功和失败的回调

    //判断
    if(onResolve === undefined && onRejected === undefined){
        //调用的时候只传递了个匹配路由器对象,没有传递成功和失败的回调 this是实例化对象? 不传会绑定window
        return originPush.call(this, location).catch(()=>{})
    }else{
        return originPush.call(this, location, onResolve, onRejected);
    }
}

VueRouter.prototype.replace=function(location,onResolve,onRejected){
    if(onResolve === undefined && onRejected === undefined){
        return originReplace.call(this, location).catch(()=>{})
    }else{
        return originReplace.call(this, location, onResolve, onRejected);
    }
}

const router=new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
})

// 注册全局导航首位-前置. 根据token获取用户信息
router.beforeEach( async(to, from, next)=>{
    // to 到哪里去.  from:从哪里来.  next:是一个函数,根据参数不同功能不同:
    // next() 无条件放行;  next('/')强制跳转到指定的位置
    // next(false) 原地不动

    // 第一步: 守卫拦截住.先去获取用户的token和信息
    let token = store.state.user.token;
    let userInfo = store.state.user.userInfo.name;
    if(token){
        // 如果token存在.代表用户登录过
        if(to.path === '/login'){ 
            // 用户已经登录了,还要向登录页面跳
            next('/')
        }else{
            // 如果用户已经登录.但是跳转的不是登录页,那需要看用户的信息获取了没有.如果信息已经获取,
            if(userInfo){
                next();
            }else{
                // 用户已经登录,但是用户还没有获取用户信息. 所以需要请求获取用户信息
                try {
                    // 如果获取用户信息成功, 用户信息拿到无条件放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 根据token获取用户信息失败.代表token可能过期
                    // 把用户的token过期token给清理掉,重新跳转到登录页面
                    store.dispatch('clearToken');
                    // store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        // 用户没有登录. 目前我们什么都不做,直接放行.后面再添加功能
        next();
    }
})


//3.向外暴露一个路由器对象
export default router;