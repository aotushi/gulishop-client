<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path !== '/login' && $route.path!=='/search'"/> -->
    <Footer v-show="!$route.meta.isHidden"/>
    <!-- <Footer v-show="!$route.matched[0].meta.isHidden"/> -->
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import Header from '@/components/Header';
export default {
  name:'App',
  components:{Footer, Header},
  mounted(){
    // 请求三级分类的数据
    this.$store.dispatch('getCategoryList');
    // this.$store.dispatch("getBannerList");
}
}
</script>

<style>

</style>