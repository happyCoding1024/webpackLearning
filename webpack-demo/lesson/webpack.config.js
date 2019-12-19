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
    },]
  },
  // 打包好文件的信息
  output: {
    filename: 'bundle.js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};