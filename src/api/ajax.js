// axios的二次封装
import axios from 'axios';
import NProgress  from 'nprogress';
import "nprogress/nprogress.css";
import store from '@/store';

// 1.配置基础路径和超时限制
// create()方法创建一个新的和axios具有相同功能的一个实例
const service = axios.create({
    baseURL:'/api', //设置,当前项目中所有接口路径的公共路径部分,基础路径
    timeout:20000   //当ajax请求超过设置的时间就会报错
});

// 2.添加进度条信息  nprogress
// 如果以后对axios添加额外的功能或是给请求头添加额外的信息,必然用拦截器

service.interceptors.request.use(
    (config)=>{
    //config是我们的请求报文,最后需要返回去.
    NProgress.start(); //开启进度条

    // 请求头内部需要添加临时标识,后期每个请求都会带上这个临时标识
    let userTempId = store.state.user.userTempId;
    if(userTempId){
        config.headers.userTempId = userTempId;
    }

    // 登录成功后,需要把token添加到请求头当中. 今后所有的请求
    let token=store.state.user.token;
    if(token){
        config.headers.token = token;
    }
    return config;

},
    //请求拦截器中失败的回调一般不写. 
    (error)=>{
        alert(error.message)
    }  
 ); 

service.interceptors.response.use(
    (response)=>{
        //response是响应报文.可以添加额外功能/对报文进行处理
        NProgress.done();//停止进度条

        return response.data; // 返回的响应不再需要从data属性中拿数据,直接使用response即可.
    }, 
    (error)=>{
        NProgress.done();
        alert('ajax请求失败'+error.message||'未知错误');
        return new Promise(()=>{}) //后面继续处理这个错误,返回错误的promise
        // return Promise.reject(new Error('发送请求失败')) //返回pending状态的promise,终端promise链,没有下文
    }
);

// 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据

// 统一处理请求错误, 具体请求也可以选择处理或不处理

export default service; //暴露封装好的axios实例