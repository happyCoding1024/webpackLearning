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
    usedExports: true,
    splitChunks: {
      chunks: 'async', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 30000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      maxSize: 0, // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
      automaticNameDelimiter: '~', // 文件生成时的连接符
      automaticNameMaxLength: 30, // 自动生成的文件名的最大长度
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
          priority: -10, // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
          filename: 'vendor.js'
        }, // 分割，，既满足 vendors，又满足 default，那么根据优先级会打包到 vendors 组中。
        default: { // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
          priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
          reuseExistingChunk: true, // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
          filename: 'common.js'
        }
      }
    }
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  }
};

module.exports = merge(devConfig, commonConfig);