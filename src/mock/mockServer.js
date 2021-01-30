// 专门来模拟mock数据接口的

// 引入mockjs
import Mock from 'mockjs';
import banner from './banner.json';
import floor from '@/mock/floor';


// 第一个参数代表以后请求的路径, 第二个参数代表返回的数据
// 下面两行模拟数据接口
Mock.mock('/mock/banner', {code:200, data:banner});
Mock.mock('/mock/floor', {code:200, data:floor});