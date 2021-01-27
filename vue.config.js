module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {// 匹配所有以 '/api'开头的请求路径
                target: 'http://182.92.128.115/',// 代理目标的基础路径 转发的目标服务器地址
                changeOrigin: true,
                //pathRewrite: { '^/api': '' } 是否把路径中的api替换成空串. 要不要去掉取决于接口路径有没有
            }
        }
    }
}


