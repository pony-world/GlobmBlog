
const path = require('path')
const IS_DEV = process.env.NODE_ENV === 'development'

module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 9009,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://localhost:8888',
        target: 'http://www.globm.top:8888',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
      appleTouchIcon: 'favicon.png',
      maskIcon: 'favicon.png',
      msTileImage: 'favicon.png'
    }
  },
  chainWebpack: config => {
    // 首页不预先加载其他页面的css和js
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // splitChunks代码分割
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        commons: {
          name: 'chunk-commons',
          test: path.resolve(__dirname, '.src'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })
    // UglifyjsWebpackPlugin 压缩代码
    const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
    config.optimization.minimizer = [
      new UglifyjsWebpackPlugin({
        // 生产环境推荐关闭 sourcemap 防止源码泄漏
        // 服务端通过前端发送的行列，根据 sourcemap 转为源文件位置
        sourceMap: !IS_DEV,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ]
    // scss
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    function addStyleResource (rule) {
      rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, './src/assets/style/theme.scss')
          ]
        })
    }
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}
