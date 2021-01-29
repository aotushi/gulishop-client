<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 新建一个div 包含h2和sort  绑定移出事件-->
            <div @mouseleave="moveOutDiv" @mouseenter="isShow=true">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                <div class="sort" v-show="isShow">
                    <div class="all-sort-list2" @click="toSearch">
                        <div
                            class="item"
                            :class="{ item_on: currentIndex === index }"
                            v-for="(c1, index) in categoryList"
                            :key="c1.categoryId"
                            @mouseenter="moveInItem(index)"
                        >
                            <h3>
                                <!-- <a href="">图书、音像、数字商品</a> -->
                                <!-- <a href="">{{ c1.categoryName }}</a> -->
                                <!-- 第一种链接方式 声明式路由导航 组件标签太多,导致内存中组件对象太多,效率低 -->
                                <!-- <router-link 
                                :to="{
                                    name:'search', 
                                    query:{category1Id:c1.category1Id, categoryName:c1.categoryName}}"
                            >{{ c1.categoryName }}</router-link> -->
                                <!-- 编程式路由导航  相比声明路由效率高&灵活-->
                                <!-- 事件委托处理: 找公共的离自己最近的祖先元素, 且这个元素只能有一个,不能带for循环 -->
                                <!-- <a href="javascript:;" @click="$router.push({
                                name:'search', 
                                query:{
                                    category1Id:c1.categoryId, 
                                    categoryName:c1.categoryName}
                            })">{{ c1.categoryName }}</a> -->
                                <a
                                    href="javascript:;"
                                    :data-category1Id="c1.categoryId"
                                    :data-categoryName="c1.categoryName"
                                    >{{ c1.categoryName }}</a
                                >
                            </h3>
                            <div class="item-list clearfix">
                                <div class="subitem">
                                    <dl
                                        class="fore"
                                        v-for="(c2, index) in c1.categoryChild"
                                        :key="c2.categoryId"
                                    >
                                        <dt>
                                            <!-- <a href="">电子书</a> -->
                                            <!-- <a href="">{{ c2.categoryName }}</a> -->
                                            <!-- <router-link 
                                            :to="{name:'search', query:{category2Id:c2.category2Id, categoryName:c2.categoryName}}"
                                        >{{ c2.categoryName }}</router-link> -->
                                            <!-- <a href="javascript:;" @click="$router.push({
                                            name:'search', 
                                            query:{
                                                category2Id:c2.categoryId, 
                                                categoryName:c2.categoryName}
                                        })">{{ c2.categoryName }}</a> -->
                                            <a
                                                href="javascript:;"
                                                :data-category2Id="
                                                    c2.categoryId
                                                "
                                                :data-categoryName="
                                                    c2.categoryName
                                                "
                                                >{{ c2.categoryName }}</a
                                            >
                                        </dt>
                                        <dd>
                                            <em
                                                v-for="(
                                                    c3, index
                                                ) in c2.categoryChild"
                                                :key="c3.categoryId"
                                            >
                                                <!-- <a href="">婚恋/两性</a> -->
                                                <!-- <a href="">{{ c3.categoryName }}</a> -->
                                                <!-- <router-link 
                                                :to="{name:'search', query:{category3Id:c3.category3Id, categoryName:c3.categoryName}}"
                                            >{{ c3.categoryName }}</router-link> -->
                                                <!-- <a href="javascript:;" @click="$router.push({
                                                name:'search', 
                                                query:{
                                                    category3Id:c3.categoryId, 
                                                    categoryName:c3.categoryName}
                                            })">{{ c3.categoryName }}</a> -->
                                                <a
                                                    href="javascript:;"
                                                    :data-category3Id="
                                                        c3.categoryId
                                                    "
                                                    :data-categoryName="
                                                        c3.categoryName
                                                    "
                                                    >{{ c3.categoryName }}</a
                                                >
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'; //这是引入会把整个lodash全部引入,打包后体积比较大
import throttle from "lodash/throttle";
export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            isShow:true
        };
    },
    methods: {
        // _.throttle(renewToken, 300000, { 'trailing': false });

        //没有节流的时候
        // moveInItem(index){
        //     this.currentIndex = index
        // }

        //节流 传递的函数不能使用箭头函数,其内部的this不是组件实例对象
        // 节流问题: 1.鼠标在20毫秒内移走,最后一次的调用才出来: 使用第三个参数trailing  . 2.时间太长出现卡顿:计算机运行是微秒,20毫秒相对微秒已经很长
        moveInItem: throttle(
            function (index) {
                this.currentIndex = index;
                console.log(index);
            },
            20,
            { trailing: false }
        ),
        //事件委托 click的回调函数
        toSearch(event) {
            let targetNode = event.target; //获取真正发生事件的目标元素
            let data = targetNode.dataset; //获取当前目标元素身上的data-属性组成的对象,data-必须这么写,大写会转换成小写
            // console.log(eventTarget.dataset)
            // 如果是a标签,data对象会有categoryid和categoryName;若是其他标签,则data没有这俩属性.
            let { category1id, category2id, category3id, categoryname } = data;
            if (categoryname) {
                //为true,表明点击的就是a标签
                let location = {
                    name: "search",
                };
                let query = {
                    categoryName: categoryname,
                };
                // 判断是不是一,二,三级的id
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                // 找到所有的query参数,传递今location
                location.query = query;

                // 判断有没有params参数. 多级搜索后需要合并query+params参数
                if(this.$route.params){
                    location.params=this.$route.params;
                }


                // 编程式路由导航
                this.$router.push(location);
            }
        },
        moveOutDiv(){
            this.currentIndex = -1;
            if(this.$route.path !== '/home'){
                this.isShow=false
            }
        }
    },
    mounted() {
        // 发送请求的位置不合适.因为切换多个页面时候,会重新发送.所以放在只请求一次的app组件中最合适.
        // this.$store.dispatch("getCategoryList");

        if(this.$route.path !=='/home'){
            this.isShow=false;
        };
    },
    //从vuex中把数据拿到vue组件中.
    //以后只要从vuex中拿数据(state, getters),都在computed中拿
    //以后只要从vuex中拿数据(actions, mutations),都在methods中拿

    computed: {
        //两种形式;数组写法的条件
        ...mapState({
            categoryList: (state) => state.home.categoryList,
        }),
    },
};
</script>

<style lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            &.sort-enter{
                height:0px;
                opacity:0;
            }
            &.sort-enter-active{
                transition:all 2s ;
            }
            &.sort-enter-to{
                height:461px;
                opacity:1;
            }

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 17px;
                                        line-height: 17px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                        &:hover {
                                            background: #ddd;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    &.item_on {
                        background: #ddd;
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>
