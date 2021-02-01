<template>
    <!--banner轮播-->
    <div class="swiper-container" id="mySwiper" ref="bannerSwiper">
        <div class="swiper-wrapper">
            <div
                class="swiper-slide"
                v-for="(banner, index) in bannerList"
                :key="banner.id"
            >
                <img :src="banner.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    props:['bannerList'],
    watch: {
        // 为了实现不同组件里相同资源的组件化,需要将组件里的html+css+js变得一致. 所以floor组件中需要放弃最简单的mounted.改用与listcontainer组件中相同的watch.
        // floor里的监视是监视不到数据变化的,因为数据通过props早已经过来了.而listContainer是可以见到0-4的变化过程,而这里总是3-3的. 所以使用immediate.
        // 当数据发生变化,就去实例化swiper.,但还是不行
        // 所以,页面还是没完整形成. 使用nextTick方法
        bannerList: {
            immediate: true, // 此处添加为了与floor中的watch相同
            handler(newValue, oldValue) {
                this.$nextTick(() => {
                    new Swiper(this.$refs.bannerSwiper, {
                        // direction: "vertical", // 垂直切换选项 默认水平
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },

                        // 如果需要滚动条
                        scrollbar: {
                            el: ".swiper-scrollbar",
                        },
                    });
                });
            },
        },
    },
};
</script>

<style></style>
