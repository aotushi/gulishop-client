import { reqAddOrUpdateShopCart } from '@/api'



const state={
  // 存储数据
};


const actions={
  // 与组件中用户对接
  // 一般是异步发请求
  // 提交mutations
     async addOrUpdateShopCart({commit}, {skuId, skuNum}){
         let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //  第一种写法,async函数返回的永远是成功的promise. 不合理. 但功能可实现
        // if(result.code === 200){
        //     return 'ok';
        // }else{
        //     return 'failed';
        // }
        // 第二种写法, 返回
         if(result.code === 200){
             return 'ok';
         }else{
             return Promise.reject(new Error('failed'))
         }
     }
};


const mutations={
  // 直接修改数据
};


const getters={
  // 简化数据
};


export default {
    state,
    mutations,
    actions,
    getters,
}