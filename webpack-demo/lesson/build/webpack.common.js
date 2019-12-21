const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin/dist/clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
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
      use: [
        {
          loader: 'babel-loader',
        }, {
          loader: 'imports-loader?this=>window'
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _join: ['lodash', 'join']
    }),
  ],

  // splitChunks 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },

  // 忽略警告
  performance: false,

  // 打包好文件的信息
  // publicPath: 打包后文件的前缀，如 /main.js
  // filename: 打包后的文件名，[name] 是一个占位符，[name]的值就是前面entry中的main
  // path： 生成的打包文件的存放路径，注意必须借助node中的path模块。并且在使用 npx webpack 执行打包时才会生成dist目录
  // 在使用 dev-server 时生成的打包文件直接保存在内存中，不会存放在dist目录下。
  output: {
    path: path.resolve(__dirname, '../dist'),
  }
};