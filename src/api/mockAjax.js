// axios的二次封装
import axios from 'axios';
import NProgress from 'nprogress';
import "nprogress/nprogress.css";


const service = axios.create({
    baseURL: '/mock', //设置,当前项目中所有接口路径的公共路径部分,基础路径
    timeout: 20000   //当ajax请求超过设置的时间就会报错
});



service.interceptors.request.use(
    (config) => {
        NProgress.start();
        return config;
    }, () => { });

service.interceptors.response.use(
    (response) => {
        NProgress.done();
        return response.data;
    },
    (error) => {
        NProgress.done();
        alert('请求失败' + error.message || '未知错误');
        return new Promise(() => { });
    }
);


export default service;



