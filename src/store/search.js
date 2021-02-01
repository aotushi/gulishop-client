// search组件对应的vuex模块
import {reqSearchInfo} from '@/api';

const state={
  //存数据 类型取决于最终拿的的数据是什么
  searchInfo:{}
};

const actions={
  async getSearchInfo({commit}, searchParams){
    let result =await reqSearchInfo(searchParams);
    if(result.code===200){
      commit('RECEIVE_SEARCHINFO', result.data);
    }
  }

};

const mutations={
  RECEIVE_SEARCHINFO(state, searchInfo){
    state.searchInfo=searchInfo;
  }
};

const getters={
  //可以处理state数据
  attrsList(state){
    return state.searchInfo.attrsList || []; //添加数组原因:为了后期不出现假报错.
  },
  goodsList(state){
    return state.searchInfo.goodsList || [];
  },
  trademarkList(state){
    return state.searchInfo.trademarkList || [];
  }
  
};

export default {
  state,
  mutations,
  actions,
  getters
}

