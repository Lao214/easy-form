const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    port: '7217',
    client: {
      overlay: {
        runtimeErrors: false
      }
    }
  }
})
