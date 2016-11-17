# Backbone command line tool
## 概述
创建一个基于 backbone 的 web application

## 安装
`npm i -g generator-webapp-cli`

## 示例
* 新建项目：`mkdir application && cd application && webapp new spa`
* 创建view： `webapp g view list`
* 创建model： `webapp g model detail`
* 启动：`webapp run`
* 构建：`webapp build` 构建后的文件在 ./dist/tmp

## 帮助
* `webapp new <appName>` 创建一个新的目录并且运行 npm install 和 npm start。
* `webapp generate <blueprint> <name>` 从模板生成代码。alias: g。可用的模板：view  <name>  生成 view。model <name>  生成 model。

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
* 启动端口可配置
* new 之前读取配置文件
* 文件目录依照 cloud-web V2.0
