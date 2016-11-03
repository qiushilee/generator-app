# Backbone command line tool
## 概述
创建一个基于 backbone 的 web application

## 安装
`npm i -g yo generator-app`

## 示例
`yo app <appName Default: current directory>`

创建一个新的目录并且运行 `npm install` 和 `npm start`，之后会自动打开浏览器。

`yo app:view <viewName Default: home>`

生成 view。

`yo app:model <modelName Default: home>`

生成 model。

## 命令
* 启动 `npm start`
* 构建 `webpack` 构建后的文件在 ./dist/tmp


## 功能
* ES6 语法支持
* JS 语法检查
* `.hbs` 模板
* 图表库
* 自动打开浏览器
* backbone
* sass
* jquery
* lodash

## TODO List
* 测试
* 部署
* Mock
