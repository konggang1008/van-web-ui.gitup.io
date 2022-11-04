const path = require('path')
module.exports = {
  //有两处：这里一处，还有一处在api.js的helpdocs
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_SERVER, //我们的接口域名地址
        ws: true,
        logLevel: 'debug',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' // 替换target中的请求地址
        }
      }
    }
  },
  // 可以用来传递任何第三方插件选项

}
