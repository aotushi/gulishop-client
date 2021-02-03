import {reqDetailInfo} from '@/api'



const state={
  // 存储数据
  detailInfo:{}
};


const actions={
  // 与组件中用户对接
  // 一般是异步发请求
  // 提交mutations
     async getDetailInfo({commit}, skuId){
         let result = await reqDetailInfo(skuId);
         if(result.code === 200){
             commit('RECEIVE_DETAILINFO', result.data);
         }
     }
};


const mutations={
  // 直接修改数据
  RECEIVE_DETAILINFO(state, detailInfo){
      state.detailInfo = detailInfo;
  }
};


const getters={
  // 简化数据
  categoryView(state){
    return state.detailInfo.categoryView || {};
  },
  // 请求的数据回来skuInfo才是真的对象
  // 请求的数据没回来,是undefined
  skuInfo(state){
    return state.detailInfo.skuInfo || {};
  },
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList || [];
  }
};


export default {
    state,
    mutations,
    actions,
    getters,
}