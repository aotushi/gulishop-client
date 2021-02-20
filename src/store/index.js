import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import home from './home';
import user from './user';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import trade from './trade';

const state={
    //存数据
    
};

const mutations={
    //直接修改数据
};

const actions={
    //与组件用户对接,一般是异步; 提交mutations
};

const getters={
    //可以处理state数据

    
}

const store=new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{ //modules代表模块化
        home,
        user,
        search,
        detail,
        shopcart,
        trade
    }
});

export default store;