//user模块对应的vuex模块

import {getUserTempId} from '@/utils/userabout';
import {reqGetCode, reqUserRegister} from '@/api';
const state={
    //存数据
    // 这个函数就是用来专门生成用户的临时标识
    userTempId:getUserTempId(),
    code:''
};

const mutations={
    //直接修改数据
    RECEIVE_CODE(state, code){
        state.code = code;
    }
};

const actions={
    //与组件用户对接,一般是异步; 提交mutations

    async userRegister({commit}, userInfo){
        const result = await reqUserRegister(userInfo);
        if(result.code === 200){
            return 'ok';
        }else{
            // 此处要注意
            console.log(result)
            return Promise.reject(result);
        }
    },
    // 请求获取code
    async  getCode({commit}, phone){
        const result = await reqGetCode(phone);
        if(result.code === 200){
            commit('RECEIVE_CODE', result.data)
        }
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