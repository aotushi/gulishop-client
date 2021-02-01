//此文件写的都是函数,叫做接口请求函数React.Component
//每个接口都对应了一个函数, 如果想要拿相关接口的数据,只需要调用相关的接口请求函数
import request from './ajax';
import mockAjax from './mockAjax';
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


export const reqBannerList=()=>{
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}
export const reqFloorList=()=>{
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}


// 请求获取search页面的动态数据 /api/list post
// 请求体参数,默认是一个空对象

// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
  
export const reqSearchInfo=(searchParams)=>{
    return request({
        url:'/list',
        method:'post',
        data:searchParams //用户搜索的参数,必须是一个对象,可以是空对象但必须传. 是用户发请求的时候给传递的
    })
}
// reqSearchInfo();