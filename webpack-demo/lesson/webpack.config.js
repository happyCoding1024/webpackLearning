const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
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
  // 入口文件也就是要打包的文件
  entry: {
    // main 指的是打包后文件的名字，如果output配置中有指定filename那么就用output中指定的名字。
    main: './src/index.js',
  },
  // module: 遇到一个文件(模块)时怎样去打包，告诉webpack遇到哪种文件时应该如何去打包。
  // rules: webpack 进行打包的规则
  // test: 后面跟的是一种文件类型
  // use: 使用哪些loader
  // loader：使用哪一种loader
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader',
      }
    }, {
      test: /\.js$/,
      // 第三方的代码没必要进行转换，其实那些代码已经做好了转换。
      // 使用 babel-loader 时，options 项可以写在根目录下的 .babelrc 文件下
      // exclude 除去什么模块
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  // plugin: 插件
  // HtmlWebpackPlugin 自动生成一个 index.html 文件
  // CleanWebpackPlugin  自动删除上一次打包生成的文件
  // webpack.HotModuleReplacementPlugin 实现 HMR(热更新)功能
  plugins: [
    new HtmlWebpackPlugin({
    template: 'src/index.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 打包好文件的信息
  // publicPath: 打包后文件的前缀，如 /main.js
  // filename: 打包后的文件名，[name] 是一个占位符，[name]的值就是前面entry中的main
  // path： 生成的打包文件的存放路径，注意必须借助node中的path模块。并且在使用 npx webpack 执行打包时才会生成dist目录
  // 在使用 dev-server 时生成的打包文件直接保存在内存中，不会存放在dist目录下。
  output: {
    publicPath: '/',
    filename: '[name].js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};