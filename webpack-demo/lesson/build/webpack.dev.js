const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  // 打包的模式,，默认的模式是 production, development 模式下打包后的代码不会被压缩
  mode: 'development',
  // none -> 不使用 sourceMap
  // cheap： 生成 source-map 只有行信息，不带列信息，同时不需要包含 loader 里面代码的 source-map，只需要生成业务代码的 source-map 就可以了。
  // module：对 loader 里面的业务代码也生成 source-map
  // eval: 一种执行方式
  devtool: 'cheap-module-eval-source-map',
  // 配置 devServer, devServer可以使我们开启一个服务器当代码变化时，自动打包并刷新浏览器。
  // contnetBase: 在哪一个目录下去启动服务器
  // open：启动服务器时会帮我们自动打开一个页面
  // port: 端口号
  // hot: 是否启用热更新，true 启用
  // hotOnly: true 表示即使热更新出现了问题也不帮我们刷新浏览器。
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true
  },


  // plugin: 插件
  // HtmlWebpackPlugin 自动生成一个 index.html 文件
  // CleanWebpackPlugin  自动删除上一次打包生成的文件
  // webpack.HotModuleReplacementPlugin 实现 HMR(热更新)功能
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
};

module.exports = merge(devConfig, commonConfig);