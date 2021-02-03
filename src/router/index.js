//1.安装插件
//2.引入并声明使用插件
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

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


//3.向外暴露一个路由器对象
export default router;