//home模块对应的vuex模块

import {reqCategoryList, reqBannerList, reqFloorList} from '@/api';

const state={
    //存数据
    categoryList:[],
    bannerList:[],
    floorList:[]
};

const actions={
    //与组件用户对接,一般是异步; 提交mutations
    async getCategoryList({commit}){  //解构赋值形式拿commit
        //发请求拿数据
        const result = await reqCategoryList();
        if(result.code === 200){
            commit('RECEIVE_CATEGORY', result.data);
        }
    },

    async getBannerList({commit}){  
        const result = await reqBannerList();
        if(result.code === 200){
            commit('RECEIVE_BANNERLIST', result.data);
        }
    },

    async getFloorList({commit}){
        const result = await reqFloorList();
        if(result.code === 200){
            commit('RECEIVE_FLOORLIST', result.data);
        }
    }
};

const mutations={
    RECEIVE_CATEGORY(state, categoryList){
        state.categoryList=categoryList;
    },
    RECEIVE_BANNERLIST(state, bannerList){
        state.bannerList=bannerList;
    },
    RECEIVE_FLOORLIST(state, floorList){
        state.floorList=floorList;
    },
};

const getters={
    //可以处理state数据
    
    
};

export default {
    state,
    mutations,
    actions,
    getters
  }