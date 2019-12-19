const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 打包的模式,，默认的模式是 production
  mode: 'production',
  // 入口文件也就是要打包的文件
  entry: {
    main: './src/index.js',
    sub: './src/index.js',
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'sass-loader',
        'postcss-loader',
      ]
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader',
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: 'src/index.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
    })
  ],
  // 打包好文件的信息
  output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};