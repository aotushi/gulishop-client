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

//全局注册组件: 如果一个非路由组件被多个组件使用,那么定义在components,注册在全局
Vue.component('TypeNav', TypeNav);
Vue.component('SlideLoop', SlideLoop);
Vue.component('Pagination', Pagination);

// element-ui 两种组件引入方式
Vue.component(Button.name, Button);
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