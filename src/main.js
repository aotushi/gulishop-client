import Vue from 'vue';
// import App from './App.vue';
import App from '@/App';
import router from '@/router';
import TypeNav from '@/components/TypeNav';
import store from '@/store';
// import '@/api';

//全局注册组件: 如果一个非路由组件被多个组件使用,那么定义在components,注册在全局
Vue.component('TypeNav', TypeNav);

Vue.config.productionTip =false;

new Vue({
  router, //所有组件内部可以使用this.$router, this.$route
  store, //所有的组件可以拿到this.$store
  render:h=>h(App)
}).$mount('#app')