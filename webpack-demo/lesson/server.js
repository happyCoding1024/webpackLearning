const express = require('express');
const webpack = require('webpack');
const webpackkDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const path = require('path');

// webpack(config) 会返回一个编译器，这个编译器执行一次就会重新打包一次.
const complier = webpack(config);

const app = express();
// 只要代码发生变化,那么就会执行 complier 重新将代码打包，并将打包好的代码
// 放在 localhost:3000 的 publicPath 下。 所以只有当这里的 publicPath和
// webpack.config.js 下的 public.config.js 一致时才能访问到文件。
app.use(webpackkDevMiddleware(complier, {
  publicPath: config.output.publicPath,
}));

app.listen(3000, () => {
  console.log('server is running on 3000');
  console.log(path.resolve(__dirname));
});

