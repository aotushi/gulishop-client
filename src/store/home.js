//home模块对应的vuex模块

import {reqCategoryList} from '@/api';

const state={
    //存数据
    categoryList:[]
};

const actions={
    //与组件用户对接,一般是异步; 提交mutations
    async getCategoryList({commit}){  //解构赋值形式拿commit
        //发请求拿数据
        const result = await reqCategoryList();
        if(result.code === 200){
            commit('RECEIVE_CATEGORY', result.data);
        }
    }
};

const mutations={
    //直接修改数据
    RECEIVE_CATEGORY(state, categoryList){
        state.categoryList=categoryList;
    }
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