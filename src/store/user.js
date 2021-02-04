//user模块对应的vuex模块

import {getUserTempId} from '@/utils/userabout';
const state={
    //存数据
    // 这个函数就是用来专门生成用户的临时标识
    userTempId:getUserTempId()
};

const mutations={
    //直接修改数据
};

const actions={
    //与组件用户对接,一般是异步; 提交mutations
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