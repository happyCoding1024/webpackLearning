const path = require('path');

module.exports = {
  // 打包的模式,，默认的模式是 production
  mode: 'production',
  // 入口文件也就是要打包的文件
  entry: {
    main: './src/index.js',
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'postcss-loader',
      ]
    }, {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // 使用原文件的名字和后缀
          name: '[name].[ext]',
          // 将文件打包到指定的目录
          outputPath: './images/',
          // 设定文件的大小，如果小于limit的值就按url-loader的方式去处理
          // 如果大于 limit 的值那么就会按 file-loade 的方式去处理。
          limit: 20480,
        }
      }
    },]
  },
  // 打包好文件的信息
  output: {
    filename: 'bundle.js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};