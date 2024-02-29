
const px2rem = require('postcss-px2rem')

module.exports = {
    // css: {
    //     modules: false, // 启用 CSS modules
    //     extract: true, // 是否使用css分离插件
    //     sourceMap: false, // 开启 CSS source maps?
    //     loaderOptions: {
    //         postcss: {
    //             // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
    //              plugins: [
    //                 require("postcss-px2rem-exclude")({
    //                     remUnit: 37.5,
    //                     exclude: /node_modules|folder_name/i
    //                 })
    //             ]
    //         }
    //     } // css预设器配置项
    // },
    lintOnSave: false,
    devServer: {
        host:'0.0.0.0', //可以忽略不写
        port: 8080,//它是用来修改你打开后的端口号的
        open: true,//值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
        proxy:{
            '/api':{
                target:'http://124.71.173.208',//跨域请求的公共地址
                ws:false, //也可以忽略不写，不写不会影响跨域
                changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
                pathRewrite:{
                    // '^/api': '/api'//注册全局路径， 但是在你请求的时候前面需要加上 /api  
                }
            }
        }
    },
}