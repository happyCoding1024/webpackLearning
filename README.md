[TOC]

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

1. 创建一个项目，进入到这个项目中，运行 `npm init `。

   为什么要运行 npm init ？ 和 git init 结合起来理解，如果不执行这条语句，接下来的操作不知道按照哪个规范来执行，执行完 npm init 之后就可以按照 npm 规范来管理这个项目了，由于 npm 是 node 开发的，也就是按照 node 的规范来管理这个项目。

2. 全局安装 webpack(不推荐使用，因为有可能有webpak3的项目)

   `npm install webpack webpack-cli -g`

   卸载全局安装的 webpack。

   `npm uninstall webpack webpack-cli -g`

   **在某个项目中安装 webpack：**

   进入到那个项目中所在的目录，然后

   ```bash
   npm install webpack webpack-cli -save-dev
   # 等价于
   npm install webpack webpack-cli -D
   ```

   这个时候运行

   ```bash
   webpack -v
   ```

   会出现 `bash: webpack: command not found`，原因就在于运行 webpack 时系统会去找全局的 webpack 。

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

     

   

   