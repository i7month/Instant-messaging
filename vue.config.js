const path = require('path');
function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  // assetsDir: 'assets',
  publicPath: '/ddswDome/h5',
  lintOnSave: false, // 是否开启编译时是否不符合eslint提示
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/ddsw': {
        target: 'https://taxdemo.lnch-tech.com:17990/',
        changeOrigin: true
      }
    }
  },
  // 配置别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('utils', resolve('src/utils'))
      .set('static', resolve('src/static'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `
               @import "@/assets/css/variable.scss"; 
               @import "@/assets/css/common.scss";
               @import "@/assets/css/mixin.scss";
              `
      },
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            propList: ['*'],
          }),
        ]
      }
    }
  },
}
