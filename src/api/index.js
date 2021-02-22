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

// 详情页detail请求数据函数
export const reqDetailInfo=(skuId)=>{
    return request({
        url:`/item/${ skuId }`,
        method:'get'
    })
}

// 请求添加购物车
// cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId, skuNum)=>{
    return request({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

// 请求获取购物车页面
// /api/cart/cartList
export const reqShopCartInfo = ()=>{
    return request({
        url:'/cart/cartList',
        method:'get'
    })
}

// 修改商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked} get

export const reqUpdateCartIsCheck=(skuId, isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}


// 请求删除购物车数据 
// /api/cart/deleteCart/{skuId} delete

export const reqDeleteShopCart = (skuId)=>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:"delete"
    })
}

// 请求注册用户
// /api/user/passport/register post
// 参数路径里没有,使用请求体参数

export const reqUserRegister=(userInfo)=>{
    return request({
        url:'/user/passport/register',
        method:'post',
        data:userInfo
    })
}

// 获取验证码
// api/user/passport/sendCode/{phone}  get

export const reqGetCode=(phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 请求用户登录
// /api/user/passport/login post
// 返回内容. 但是不严谨,登录以后应只返回token数据,其他用户数据应重新根据token发请求获取
// {
//     code: 200
//     message: "成功"
//     data:{
//     nickName:"Administrator",
//     name:"Admin",
//     token: 90aa16f24d04c7d882051412f9ec45b"
//     }
//     ok: true 
//     }
// }   

export const reqUserLogin=(userInfo)=>{
    return request({
        url:'/user/passport/login',
        method:'post',
        data:userInfo
    })
}

// 根据token请求获取用户的信息
// /api/user/passport/auth/getUserInfo
// 参数是token已经在请求头中添加
export const reqGetUserInfo=()=>{
    return request({
        url:"/user/passport/auth/getUserInfo",
        method:'get'
    })
}
// 请求退出登录
// /api/user/passport/logout get
export const reqUserLogout=()=>{
    return request({
        url:'/user/passport/logout',
        method:'get'
    })
}

//请求获取用户的收货地址信息
///api/user/userAddress/auth/findUserAddressList
//get

export const reqUserAddressList = () => {
    return request({
      url:'/user/userAddress/auth/findUserAddressList',
      method:'get'
    })
  }
  
  //请求获取订单交易页面信息
  ///api/order/auth/trade
  //get
  
  export const reqTradeInfo = () => {
    return request({
      url:'/order/auth/trade',
      method:'get'
    })
  }

//   请求创建订单页面
///api/order/auth/submitOrder?tradeNo={tradeNo}
//post
export const reqSubmitOrder= (tradeNo, tradeInfo)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:tradeInfo
    })
}

//请求获取支付信息
// /api/payment/weixin/createNative/{orderId}
//get
export const reqPayInfo = (orderId) => {
    return request({
      url:`/payment/weixin/createNative/${orderId}`,
      method:'get'
    })
  }


// 14 查询支付的订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus=(orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// 请求获取我的订单列表数据
// /api/order/auth/{page}/{limit}
export const reqMyOrderInfo=(page, limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}