# webpack 4.0 慕课课程笔记

> 1. webpack 是一个模块打包工具。

## 1. 课程导学

**为什么要学`webpack`？ `webpack` 有什么作用？**

由于项目一般比较大，为了项目的可维护性和可扩展性，我们一般需要把代码分成好多个模块，但是一个大型的项目模块有特别多甚至有几千个，我们不可能通过手工引入这几千个模块，需要借助工具来管理我们的模块，`webpack` 就是一个这样的工具。

类似 `webpack` 的工具还有 `Gulp， browserify`，最火的是 `webpack`，目前三大框架都在使用 `webpack` 作为脚手架工具。

**`webpack` 和其它脚手架工具相比有哪些优势？**

- Tree Shaking
- 懒加载
- 代码分割
- ......

## 2. webpack 初探

### 2-1 webpack 究竟是什么？

> 总结： 使得浏览器认识 import 语句了，webpack 是一个模块打包工具。

没有 webpack 之前浏览器不认识 import 语句，引入 js 文件时需要利用 script 标签的形式在 html 文件中引入，这种做法有很多弊端，比如代码不利于维护，而且会显得 html 文件比较乱。

有了 webpack 之后，浏览器可以识别 import 语句了，所以有些 js 文件可以在某个 js 文件中通过 import 的方式进行引入，而不需要在 HTML 文件中引入了。

经过这节课的学习之后会认为 webpack 是一个 js 的翻译器，实际上是不对的，因为 webpack 只是翻译 import 其它的语法它做不到翻译。

### 2-2 什么是模块打包工具？

**Bundler： 模块打包工具**

**怎样理解模块打包工具呢？**

从字面意义上就是可以将一些模块( js 文件)在一个 js 文件中引入，也就是将一些模块打包到一个 js 文件中，即模块打包工具。

通常我们在 react 或者 Vue 中使用的 import 属于 ES Module 规范，对于 node 采用的 CommonJS 模块引入规范，还有 CMD，ADM 模块引入规范都是有效的。‘

除此之外，webpack 还可以打包 css 文件等。

### 2-3 搭建 webpack 环境

1. 创建一个项目，进入到这个项目中，运行 `npm init ` 如果想直接使用默认配置可以加上 `-y` 参数，即 `npm init -y` 。

   **为什么要运行 npm init ？** 

   和 git init 结合起来理解，如果不执行这条语句，接下来的操作不知道按照哪个规范来执行，执行完 npm init 之后就可以按照 npm 规范来管理这个项目了，由于 npm 是 node 开发的，也就是按照 node 的规范来管理这个项目。

2. 全局安装 webpack(不推荐使用，因为有可能有webpak3的项目)

   `npm install webpack webpack-cli -g`

   卸载全局安装的 webpack。

   `npm uninstall webpack webpack-cli -g`

   **在某个项目中安装 webpack：**

   - 进入到那个项目中所在的目录，然后

   ```bash
   npm install webpack webpack-cli -save-dev
   # 等价于
   npm install webpack webpack-cli -D
   
   # 自动安装依赖包
   npm install
   
   # 查看版本
   webpack -v
   ```

   这时候会出现 `bash: webpack: command not found`，原因就在于运行 webpack 时系统会去找全局的 webpack 。

   但是我们可以通过 

   ```bash
   npx webpack 
   ```

   这种形式来运行 webpack 命令， `npx` 会帮助我们去找当前项目下的 webpack 命令(在 node_modules 中就有)。

   **安装特定版本的 webpack 。**

   - 查看某个版本是否存在

     ```bash
     # 显示 webpack 现在可用的所有版本号，想查看其它的将 webpack 替换掉即可
     npm info webpack
     ```

   - 安装特定版本的 webpack

     ```bash
     npm install webpack@3.12.0 webpack-cli -D
     ```

### 2-4 使用 webpack 的配置文件

> 使用 webpack 的配置文件可以在项目下新建 webpack.config.js 文件，对 webpack 进行配置。

如果没有 webpack.config.js 文件，那么在没有人为指定入口文件时，运行 `npx webpack` 会报错，因为 webpack 并不知道将哪一个文件作为入口文件。

当有 webpack.config.js 文件，在运行 `npx webpack` 时，webpack 会去查看webpack.config.js 文件的配置信息，找到其中的入口文件等信息，并按照其中的配置进行打包。

```js
const path = require('path');

module.exports = {
  // 打包的模式,，默认的模式是 production，还有一种是 development 模式，该模式下生成的输出文件不会被压缩。
  mode: 'production',
  // 入口文件也就是要打包的文件
  entry: {
    main: './src/index.js',
  },
  // 打包好文件的信息
  output: {
    filename: 'bundle.js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};
```

> 注意：
>
> - output 中的 path 不能写相对路径只能利用 node 提供的 path 模块将其转换为绝对路径。
> - 在定义 entry 时就算是相同的的目录下，`./` 也一定要写上，如果不写 webpack 会提示找不到入口文件。

在默认情况下，webpack 只会将 webpack.config.js 作为配置文件，如果想指定某个文件作为 webpack 的配置文件可以使用下面这条命令。

```bash
npx webpack --config 配置文件名
```

**修改 webpack 打包的指令：**

> 项目下的 package.json 文件中的 scripts 定义了一些常用命令的简化形式。

```js
"scripts": {
  // 注意在这里写 webpack 时，会先在本项目下找是否有 webpack，而并不会直接就去找全局的 webpack
  "bundle": "webpack"
}
```

经过上面的修改之后，以后就可以利用 `npm run bundle` 命令来替代 `npx webpack` 命令。

### 2.5 浅谈 webpack 打包知识点

运行打包命令后的输出内容：

```js
Hash: 0071acf88b3dabc88234 // 此次打包独一无二的哈希值
Version: webpack 4.41.3
Time: 133ms
Built at: 2019-12-18 4:19:29 PM
// Chunks：存放的是输出文件的id值，在大型项目中输出文件不止一个，里面还会存放与之相关联的输出文件的id值。
// Chunks Name：和Chunks同理，只是里面存放的是名字，名字的来源就是entry中的属性名。
    Asset      Size  Chunks             Chunk Names
bundle.js  1.29 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js + 3 modules 707 bytes {0} [built]
    | ./src/index.js 140 bytes [built]
    | ./src/header.js 185 bytes [built]
    | ./src/sidebar.js 191 bytes [built]
    | ./src/content.js 191 bytes [built]
```

## 3. webpack 的核心概念

### 3.1 什么是 Loader？

**loader 其实就是一个打包方案，由于 webpack  只能识别出 js 文件，本身只能对 js 文件进行打包，当遇到其它类型的文件时，loader 的作用就是告诉 webpack 针对这种类型的文件应该如何去进行打包。**

以后只要遇到打包的文件不是 js 文件，就需要引入相应的 loader 在 webpack 中进行打包了。

> loader 中的 fileloader 实际上干了两件事：
>
> - 将要打包的文件复制到指定的路径中
>
> - 获得文件的引用
>
> ```js
> // blockchain 就是一个对象，代表这张 jpg 图片。
> const blockchain = require('./blockchain,jpg') 
> // 使用 blockchain
> const img = new Image();
> img.src = blockchain.default; 
> // 展示在页面上
> const root = document.getElementById('root');
> root.append(img);
> ```

### 3.2 使用 loader 打包静态资源（图片篇）

主要介绍了 `file-loader` 和 `url-loader` 这两种方式来打包图片资源。

`url-loader` 是将一个图片转换为 base64 字符串的形式，这个字符串解析完后就是这张图片，img 标签的 src 属性的值是 base64 字符串，因此不用发起http请求就可以将图片展示出来。但是问题是如果图片很大，那么这个js文件就非常大，那么请求这个js文件过来再加载出来这张图片的时间会很长。

所以，对于 `url-loader` 最合理的使用方法是在配置 webpack 时使用 limit 属性，当图片小于 limit 时，就按 `url-loader` 将图片转换为 base64 字符串的方式进行加载，如果大于 limit 就按 `file-loader` 将图片的 url 赋值给 img 的 src 属性的方式进行加载，但时候请求图片时需要发送 http 请求。

在处理大于 limit 的图片时可以说 `url-loader` 和 `file-loader` 是一模一样的。

`url-loader` webpack 配置：

```js
module: {
  rules: [{
    test: /\.(jpg|png|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        // 使用原文件的名字和后缀
        name: '[name].[ext]',
        // 将文件打包到指定的目录
        outputPath: './images/',
        // 设定文件的大小，如果小于limit的值就按url-loader的方式去处理
        // 如果大于 limit 的值那么就会按 file-loader 的方式去处理。
        // 单位为字节(B)
        limit: 20480,
      }
    }
  }]
}
```

### 3.3 使用 loader 打包静态资源(样式篇上)

**css 文件的打包：**

style-loader 和 css-loader 配合使用，css-loader 通过 css 文件之间的引用关系负责将 css 文件整合起来，style-loader 将整合好的 css 文件挂载到 html 文件 head 中的 style 上。

**sass 文件的打包：**

需要安装 `sass-loader` 和 `node-sass` 这两个 loader。

在配置文件中 style-loader , css-loader, sass-loader 结合使用。

**在 webpack 中使用 loader 的顺序是从下往上，从右到左。**

```js
module: {
  rules: [{
    test: /\.scss$/,
    use: [
      'style-loader', 'css-loader', 'sass-loader'
    ]
  }
```

因此，sass-loader 先将 sass 文件转换成 css 文件，进而交给 css-loader 和 style-loader 去处理。

对于 css3 一些新增加的标签我们一般会加上厂商前缀， `postcss-loader` 会自动帮我们加上厂商前缀。

**CSS3 属性自动添加厂商前缀方法：**

- 安装 postcss-loader。

  ```js
  npm i -D postcss-loader
  ```

- 创建 postcss.config.js 文件，做一些配置。

  使用 autoprefixer 插件，安装 autoprefixer， `npm install autoprefixer -D`

  ```js
  // postcss.config.js 
  module.exports = {
    plugins: [
      require('autoprefixer')
    ]
  }
  ```

### 3.4 使用 loader 打包静态资源(样式篇下)

