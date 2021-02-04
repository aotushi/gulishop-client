import { reqAddOrUpdateShopCart, reqShopCartInfo, reqUpdateCartIsCheck } from '@/api'



const state={
  // 存储数据
  shopCartInfo:[]
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
     },

    async getShopCartInfo({commit}){
      let result = await reqShopCartInfo();
      if(result.code === 200){
        commit('RECEIVE_SHOPCARTINFO', result.data);
      }
    },

    // 更新商品多选框
    async updateCartIsCheck({commit}, {skuId, isChecked}){
      let result = await reqUpdateCartIsCheck(skuId, isChecked);
      if(result.code === 200){
        return 'ok'
      }else{
        return Promise.reject(new Error('failed'));
      }
    },

    // 点击多选框.实现全选/全不选  两种解决方案:1.一次性修改多个接口 2.使用单次修改的接口
    updateCartIsCheckAll({dispatch, commit, getters}, isChecked){
      let promises=[];
      // 获取购物车列表数据 getters.cartInfo.cartInfoList
      getters.cartInfo.cartInfoList.forEach((item)=>{
        // 排除相同的复选框
        if(item.isChecked === isChecked) return;
        // 将一次性更改复选框请求拆分并使用单一的更改请求函数
        let promise = dispatch('updateCartIsCheck', {skuId:item.skuId, isChecked});
        promises.push(promise)
      });
      return Promise.all(promises);
    }
};




const mutations={
  // 直接修改数据
  RECEIVE_SHOPCARTINFO(state, shopCartInfo){
    state.shopCartInfo= shopCartInfo
  }
};


const getters={
  // 简化数据
  cartInfo(state){
    return state.shopCartInfo[0] || {}
  }
};


export default {
    state,
    mutations,
    actions,
    getters,
}