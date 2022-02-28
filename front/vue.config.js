// webpack.config.js


module.exports ={

  devServer: {
    proxy: {
        '/api': {
            target: `http://localhost:3001/`,
            changeOrigin: true,
            pathRewrite: { //
                '^/api': ''
            }
        },

      },
  },
  // output:{
  //   globalObject: 'this'
  // },
  productionSourceMap: false, 
  // 修改默认打包入口
  chainWebpack:config=>{
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      // 通过 externals 加载外部 CDN 资源
      config.set('externals', {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios',
    })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })

  }

}