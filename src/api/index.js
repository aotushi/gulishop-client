//此文件写的都是函数,叫做接口请求函数React.Component
//每个接口都对应了一个函数, 如果想要拿相关接口的数据,只需要调用相关的接口请求函数
import request from './ajax';
//请求三级分类列表数据
// 请求地址:/api/product/getBaseCategoryList  GET 无参
export const reqCategoryList=()=>{  //函数的返回值是promise
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
//验证方式2种: 1.直接调用;2.import {reqCategoryList} from '@/api' reqCategoryList()
//reqCategoryList(); //如果调用,需要把模块引入到main中 import '@/api';