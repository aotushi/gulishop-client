//user模块对应的vuex模块

import {getUserTempId} from '@/utils/userabout';
import {reqGetCode, reqGetUserInfo, reqUserLogin, reqUserLogout, reqUserRegister} from '@/api';
const state={
    //存数据
    // 这个函数就是用来专门生成用户的临时标识
    userTempId:getUserTempId(),
    code:'',
    // 登录成功返回token. 第一次登录时初始化为空串,若从localstorage拿会不合理. 如果拿不到初始化的值会是null
    // token:'',
    token: localStorage.getItem('TOKEN_KEY'), //自动登录从localStorage获取.拿到就不需要请求

    // 根据token获取用户信息
    userInfo:{}
};

const mutations={
    //直接修改数据
    RECEIVE_CODE(state, code){
        state.code = code;
    },
    RECEIVE_TOKEN(state, token){
        state.token = token;
    },
    RECEIVE_USERINFO(state, userInfo){
        state.userInfo = userInfo;
    },
    // token过期需要重新清空
    // RESET_TOKEN(state){
    //     state.token = '';
    // },

    // 退出登录需要清空用户信息及token. 它可以和上面的token过期共用一个
    RESET_USER(state){
        state.token='';
        state.userInfo={}
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
            //console.log(result)
            return Promise.reject(result);
        }
    },
    // 请求获取code
    async  getCode({commit}, phone){
        const result = await reqGetCode(phone);
        if(result.code === 200){
            commit('RECEIVE_CODE', result.data)
        }
    },
    // 请求获取token登录
    async userLogin({commit}, userInfo){
        const result = await reqUserLogin(userInfo);
        if(result.code === 200){
            commit('RECEIVE_TOKEN', result.data.token);
            // 获取到token后,将token存储到localStorage中
            // 自动登录就是需要保存token到localStorage中
            localStorage.setItem('TOKEN_KEY', result.data.token);
            return 'ok';
        }else{
            return Promise.reject(result)
        }
    },

    // 请求获取用户信息
    async getUserInfo({commit}){
        const result = await reqGetUserInfo();
        if(result.code === 200){
            commit('RECEIVE_USERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(result)
        }
    },

    // 清除用户的token信息   clearToken可以使用userLogout代替. 同时router中的dispatch替换为userLogout
    async clearToken({commit}){
        commit('RESET_USER')
        localStorage.removeItem('TOKEN_KEY'); //当token过期,需要把过期的token清掉. 既要清除state中的,也要清除本地的.
    },

    // 退出登录
    async userLogout({commit}){
        const result = await reqUserLogout();
        if(result.code === 200){
            // 退出成功 清空数据:state的token, state的用户信息, 清空localStorage的token
            commit('RESET_USER')
            localStorage.removeItem('TOKEN_KEY');
            return 'ok';
        }else{
            return Promise.reject(result)
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