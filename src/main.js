import Vue from 'vue';
// import App from './App.vue';
import App from '@/App';
import router from '@/router';
import TypeNav from '@/components/TypeNav';
import SlideLoop from '@/components/SlideLoop';
import store from '@/store';
import '@/mock/mockServer';  //引入mock接口
import 'swiper/css/swiper.css';
import Pagination from '@/components/Pagination';
import '@/api';
import * as API from '@/api';
import {Button, MessageBox, Message } from 'element-ui';
import '@/utils/validate'; //引入vee-validate相关配置

import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
// 在图片界面没有进入到可视范围前不加载, 在没有得到图片前先显示loading图片
Vue.use(VueLazyload, { // 内部自定义了一个指令lazy
  loading,  // 指定未加载得到图片之前的loading图片
})



//全局注册组件: 如果一个非路由组件被多个组件使用,那么定义在components,注册在全局
Vue.component('TypeNav', TypeNav);
Vue.component('SlideLoop', SlideLoop);
Vue.component('Pagination', Pagination);

// element-ui 两种组件引入方式
// 第一种类似Button, 可以引入全局注册,使用时直接写标签; 第二种类似messagebox, 引入后不能直接使用,而是挂载再Vue原型上,使用时用js代码使用
Vue.component(Button.name, Button);
// 或 Vue.use(Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;


Vue.config.productionTip =false;

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API = API;
  },
  router, //所有组件内部可以使用this.$router, this.$route
  store, //所有的组件可以拿到this.$store
  render:h=>h(App)
}).$mount('#app')