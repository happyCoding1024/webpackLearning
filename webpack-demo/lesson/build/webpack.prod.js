const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
  // 打包的模式,，默认的模式是 production, development 模式下打包后的代码不会被压缩
  mode: 'production',
  // none -> 不使用 sourceMap
  // cheap： 生成 source-map 只有行信息，不带列信息，同时不需要包含 loader 里面代码的 source-map，只需要生成业务代码的 source-map 就可以了。
  // module：对 loader 里面的业务代码也生成 source-map
  // eval: 一种执行方式
  devtool: 'cheap-module-source-map',
};

module.exports = merge(prodConfig, commonConfig);