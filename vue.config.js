const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 排除默认的 svg 处理规则
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons'))
      .end()

    // 使用 svg-sprite-loader 处理 svg 图标
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]' // 使用文件名作为 symbolId
      })
      .end()
  },
  lintOnSave:false,
  productionSourceMap: false,
  devServer: {
    port: '7217',
    client: {
      overlay: {
        runtimeErrors: false
      }
    }
  }
})
