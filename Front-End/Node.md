# 版本

* v14（新增功能比较多，可能去除某功能）.15（加入新功能）.1（修复bug）
# 参考

* b站视频：[https://www.bilibili.com/video/BV1Ns411N7HU?from=search&seid=12257501171240892977](https://www.bilibili.com/video/BV1Ns411N7HU?from=search&seid=12257501171240892977)
* 官网：[https://nodejs.org/en/](https://nodejs.org/en/)
* **书籍：**深入浅出Node.js - 朴灵
# 命令行命令

* dir：列出当前路径的所有文件和目录
* cd . / .. / 目录
* md 目录名：创建文件夹
* rd 目录名：删除文件夹
* cls - clear
# 目的

* 实现前端、后端、运维部署（个人博客的搭建）
* 学习 B/S 编程模型
# 意义

* 有很多后端语言：Java、PHP、Python...那为什么学Node.js呢？
    * Node.js采用了JavaScript编程
# Node是什么？

* Node.js® is a JavaScript runtime built on[Chrome's V8 JavaScript engine](https://v8.dev/).
    * Node不是一门框架、一门语言，仅是JavaScript运行时的环境，因此js可以完全脱离浏览器来运行
        * V8引擎可以解析具有特定格式的字符串（JavaScript）
    * 浏览器中的JavaScript
        * EcmaScript
        * **BOM、DOM**
    * Node中的JavaScript
        * EcmaScript
        * 服务器级别的API：读写文件、构建网络服务、网络通信...
* Node是最大的开源生态库（第三方包）
    * API：fs、http、path、os......
    * npm install jquery
    * 命令行工具
        * npm（node）
        * git（c语言）
        * hexo（node）
        * ......
# 运行

## node

* node 文件名
## nodemon

* npm i -g nodemon
* nodemon app.js
    * 每次代码修改就会重新启动服务
# ![图片](https://uploader.shimo.im/f/iIwCiAlqqQ2OgdNK.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

# REPL

* read、eval、print、loop
    * node命令行的测试命令，其实没什么用
# 其它成员

* __dirname：当前文件所属目录的绝对路径
* __filename：当前文件的绝对路径
    * 要注意模块中的路径标识就是相对当前文件模块
    * 而文件操作如：readFile()这些路径标识是相对执行Node命令所处的路径

![图片](https://uploader.shimo.im/f/y1yPwbjv7QIe2sA8.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

# API（核心模块）

## fs（file-system）

* **这是异步事件，并非单线程，而JavaScript本身是单线程**
    * 注意response.write()和response.end()间的配合
* fs.readFile或fs.writeFile中需要使用data.toString()将二进制文本数据转成字符串文本数据
    * 如果指明第二个参数utf8编码，那么 data就是utf8编码的字符串了，不需要再data.toString()
```javascript
const fs = require('fs')
fs.readFile('./data.txt','utf8',(error,data) => {
  /*
    成功：error -> null
         data -> 读取到的文本数据
    失败：error -> 错误对象
         data -> undefined
  */
})
// 文件不存在，则进行文件的创建，但文件的路径和命令要正确哟 
fs.writeFile('./newFile.txt','write content',(error) => {
  /*
    成功：error -> null
    失败：error -> 错误对象
  */
})
```
* fs.readdir
```javascript
fs.readdir('F:/front-end/Node/apache/',(err,files) => {
  /*
    成功：error -> null
         files -> ['appache.js','WWW']
    失败：error -> 错误对象
         files -> undefined
  */
})
```
![图片](https://uploader.shimo.im/f/tab6vKYi4XPCElKb.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## http

* ip定位计算机，port对应该计算机的服务
* JSON.parse()
* JSON.stringify()
```javascript
// 1、导入http模块
const http = require('http')
// 2、创建服务器对象
const server = http.createServe()
// 3、开启端口监听服务
server.listen(3000,() => {
  console.log('服务器启动成功，到http://localhost:3000/访问')
})
// 4、监听网络请求时间
server.on('require',(require,response) => {
   const url = require.url
   const remotePort = require.socket.remotePort
   
   response.setHeader('Content-Type','text/plain; charset=utf-8')
   response.write('send data')
   response.end('send over')
})
```
* 服务器端默认发送的utf-8编码的数据，但是浏览器会按照本机操作系统的默认编码去解析，中文操作系统默认编码为gbk
* [https://my.oschina.net/nyniuch/blog/185308](https://my.oschina.net/nyniuch/blog/185308)
    * **Content-Type**：图片就不需要指定编码，一般是字符编码需要指定，也可以在html页面中用<meta charset="utf-8">来指定编码
```javascript
/*
   Content-Type：text/plain（告诉浏览器响应的内容是普通文本）
                 text/html（告诉浏览器响应的内容是html文本）
                 charset=utf-8（告诉浏览器响应的内容是utf-8）
*/
```
* **Locatioin：**服务端通过响应头的Location告诉浏览器应该往哪重定向（3xx），浏览器收到3xx状态码后，就会去响应头找Location
    * 301 - 永久
    * 302 - 临时
        * 区别在于301浏览器缓存此页面
## url

```javascript
const url = require('url')
// 将第一个字符参数，解析地址出来，true表示将query转成对象
url.parse('http://www.baidu.com?name=hao&age=19',true)
```
## ![图片](https://uploader.shimo.im/f/LbeutyUJ8IveA0YO.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## path

* 操作文件路径的模块

![图片](https://uploader.shimo.im/f/WuKOM91wbS27tr8F.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

```plain
path.parse()
path.dirname()
path.basename('F:/a/b/index.js','.js')
  第二个参数可以消除后缀
path.extname()
```
## os（operation system）

# Node模块化（CommonJS）

## 作用和原理

* Node中，没有全局作用域，只有模块作用域
    * 消除变量命名冲突，造成的污染
    * 模块依赖清晰
    * 自己创建的文件也可以叫模块
* **Node模块原理**
    * Node中的每个模块，都会有下面注释的隐藏代码
        * 模块初始exports和module.exports指向同一个地址空间，最后返回的是module.exports
```javascript
/*
  var module = {
    exports: {
    }
  }
  // 官方为了让我们少写点字母（优雅的代码）
  var exports = module.exports
*/
module.exports.foo = 'bar'
/*
  return module.exports
*/
```
## 用法

* **require模块加载**
    * 首次加载并执行文件，然后缓存记录导出的对象
    * 再次导入时，require优先从缓存中取出导出对象module.exports，不会再执行此文件
    * 缓存无，再依次去核心模块、路径形式加载的模块、第三方模块找，均无报错
```javascript
require('fs') // 核心模块
require('art-template') // 第三方模块
require('./b') // 路径形式的模块
```
    * 加载并执行文件，但导出对象为{ }
```javascript
// 1、加载并执行b.js，可以省略.js - a.js
require('./b.js')
require('./b')
```
    * 加载并执行文件，且导出对象不为{ }
```javascript
// 1、获取导出对象module.exports - a.js
var b = require('./b')
```
```javascript
// 2、导出module.exports对象 - b.js
exports.foo = 'hello'
exports.add = (x,y) => x+y
```
```javascript
// 1、获取导出对象module.exports - a.js
var add = require('./b.js')
```
```javascript
// 2、导出module.exports对象 - b.js
funciton add(x,y) {
  return x + y
}
module.exports = add
```
# 第三方模块

## art-template（模板引擎）

* 最早使用于服务器领域，后面发展到了前端
    * 安装：npm i art-template --save（先下载art-template代码文件）
        * 最后加载到的还是文件哟！
    * 使用方法就是vue的插值表达式
    * [http://aui.github.io/art-template/zh-cn/docs/index.html](http://aui.github.io/art-template/zh-cn/docs/index.html)
```javascript
/* 
  引入art-template模块
  先找当前文件所属目录中的node_modules 目录
    -> node_modules/art-template
    -> node_modules/art-template/package.json
    -> node_modules/art-template/package.json的 main属性
    - main属性记录了 art-template 的入口模块 index.js
    - package.json无 或 main属性错误 或 无，就加载index.js
   仍无，往父目录按上述规则找，一直到根目录，都找不到报错！
   然后就加载执行此文件
*/
const template = require('art-template')
// 返回通过解析对象解析后的模板字符串
const ret = template.render('模板字符串',{ 解析对象 })
```
* art-template的模板语法
```xml
{{ each 数组 }}  {{ $value }}  {{ /each }}
- layout.html
{{ include './header.html' }}
{{ block 'content'}} 
  <h1> 默认内容 </h1>
{{ /block }}
{{ include './footer.html' }}
- index.html
{{ extend './layout.html' }}
{{ block 'content' }}
  <div>我在填content的坑！</div>
{{ /block }}
```
# npm

* node package manager：[https://www.npmjs.com/](https://www.npmjs.com/)
* npm config list 查看npm配置文件

![图片](https://uploader.shimo.im/f/S7TbjA4mgWUCavip.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## cnpm

* china node package manager：[https://developer.aliyun.com/mirror/NPM?from=tnpm](https://developer.aliyun.com/mirror/NPM?from=tnpm)
    * 安装：npm install --global cnpm
    * 卸载：npm uninstall --global cnpm
## 常用命令

```javascript
npm --version  -v
npm install(i)  包名 
    --global(全局安装)  -g
    --dev     -D
    --save    -S
    --no-save
npm  uninstall(un)  包名 
npm  help
npm  命令  --help
```
* 默认是局部安装，-g全局安装
* **-D、-S的区别**：[https://blog.csdn.net/qq_35410544/article/details/82965830](https://blog.csdn.net/qq_35410544/article/details/82965830)
## package.json

* 包描述文件
    * npm init创建此 package.json文件
    * 通过--save选项，在"dependencies"上记录依赖的第三方包（**node5后默认加上 -S**）

![图片](https://uploader.shimo.im/f/s09hNDr9LUxeJBAF.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

    * 通过npm install 根据package.json来下载依赖的模块

![图片](https://uploader.shimo.im/f/9TJvwjkUMVJhE14E.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## package-lock.json

* npm5以后才加入了此文件，存放node_modules中所有包的依赖信息，下找地址，版本...，有此文件重新下载有记录的包（npm install）速度会加快
* 文件中的**lock**表示锁：重新下载时一定根据package-lock.json文件所指定的信息去下载，比如：通过package-lock.json来指定某个包的具体版本号（锁住具体版本号）等
# Apache（Node.js实现）

* 如：京东的商品列表采用服务端渲染，可以被爬虫抓到，就跟容易搜索出来，而像商品评论列表为了用户的体验，以及它不需要SEO优化，因此是客户端渲染
* apache.js
```javascript
const http = require('http')
const fs = require('fs')
const template = require('art-template')
const server = http.createServer()
const basePath = 'F:/front-end/Node/apache/WWW'
server.on('request',(req,res) => {
  let def_url = '/index.html'
  let url = req.url
  if(url === '/') {
    url = def_url
  }
 
// 针对/art-template来测试
  fs.readFile(basePath + url,(err,data) => {
    if(err) {
      return res.end('No Such Dir')
    }
    res.write(data)
// 获取文件路径
    fs.readdir(basePath,(err,files) => {
      if(err) {
        return res.end('No Such Dir')
      }    
      // 用模板引擎处理files路径数组的元素
      const ret = template.render(data.toString(),{
        files:files,
      })
      res.end(ret)
    })
    
  })
  
})
server.listen(3000,() => {
  console.log('服务启动成功，请前往http://172.29.236.174:3000'访问)
})
```
* art-template.html
```xml
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <h1>{{each files}} {{ $value }} {{/each}}</h1>
</body>
</html>
```
## ![图片](https://uploader.shimo.im/f/1P9FPEaFO1HCgpxz.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## 客户端渲染

* 以前：浏览器首先从服务器拿到页面，然后渲染页面，如果页面中触发事件从而需要请求数据，则继续向服务器发送网络请求获取数据，才能将数据在页面中渲染出来，效率慢但能尽早看到页面，只是数据还需要请求
    * 页面不会刷新
    * 不需要SEO，为了更好的用户体验

![图片](https://uploader.shimo.im/f/ywmXwwgjBfo1yERd.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

![图片](https://uploader.shimo.im/f/7rBnvwQpuNOedHi9.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## 服务端渲染

* 浏览器得到的页面是已经通过模板引擎（或用框架）渲染好的页面，由服务器端进行不需要触发特定事件数据的请求，客户端无须再对此页面操作，虽然效率较快，看到的是最终页面，但服务器的压力太大了
    * 页面会刷新
    * 为了SEO（搜索引擎优化）- 是一种利用搜索引擎的搜索规则来提高目前网站在有关搜索引擎内的自然排名的方式，采用服务器端渲染 - 可以被爬虫抓取到

![图片](https://uploader.shimo.im/f/maKTbUdHrsdx1hqU.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

### 访问文件

* index.html、art-template.html.....

![图片](https://uploader.shimo.im/f/iuf4j8BnMOFBKSfp.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## ![图片](https://uploader.shimo.im/f/1P9FPEaFO1HCgpxz.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

# Express

## What

* Fast, unopinionated, minimalist web framework for[Node.js](https://nodejs.org/en/)
    * 高度封装http...模块的框架
    * 作者：TJ Holowaychuk
## Use

### express

* npm i express --save
```javascript
const express = require('express')
const app = express()
/*
  更方便的去服务器寻找静态资源
  app.use(pathname,express.static('views'))
    第一个参数不写默认为 '/'
  如：
      http://172.29.236.174/views/login.html
     -> ./views/login.html 此路径找资源
      http://172.29.236.174/login.html
     -> ./views/login.html 此路径找资源
*/
app.use('/views',express.static('/views'))
app.use(express.static('/views'))
/*
  建立路由映射表
    pathname -> (req,res) => {}
        /    -> (req,res) => {}
      /login -> (req,res) => {}
  app.get(pathname,(req,res) => {})：处理GET请求
  app.post(pathname,(req,res) => {})：处理POST请求
  可链式调用，类似jquery
*/
app
  .get('/',(req,res) => {
    console.log(req.query) // 获取GET请求的参数，已由JSON转成Object
    // 会将对象转成JSON响应给Browser,并修改了状态码
    res.status(202).send('二进制数据、字符串、对象') 
  })
  .get('/login',(req,res) => {})
app
  .post('/register',(req,res) => {})
  
app.listen(80,() => {
  console.log('running...')
})
```
### express-art-template

* npm i express-art-template -S art-template -S
    * 因为express-art-template包依赖art-template

![图片](https://uploader.shimo.im/f/XuOfD92NcPEFnX96.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

```javascript
const express = require('require')
const app = express()
// 用express-art-template渲染 .art后缀的文件，默认也会去views目录下找
// 通过app.set('views','修改后的路径') 来修改res.render('',{})的默认路径
app.engine('art',require('express-art-template'))
app.get('/',(req,res) => {
//    res.send()：响应 渲染好的模板字符串 或 JSON字符串 
// +  require('art-template').render('',{}) 
  res.render('login.art',{
    message:'第一个参数不用写路径，默认会去服务器的./views目录下找'
  })
})
```
### body-parser

* 获取POST请求的参数
# ![图片](https://uploader.shimo.im/f/OhvsaZlrKBkCStX8.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

```javascript
const app = require('express')()
const bodyParser = require('body-parser')
/*
  配置 body-parse: 
    使得res多一个body对象来记录POST请求的参数
*/
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app
  .post('/',(req,res) => {
    console.log(req.body)
  })
```
## crud

* 练习上述知识的案例：F:\front-end\Node\crud
    * 主要还是路由设计难到了自己
```javascript
GET请求复制渲染，POST负责表单提交后的操作
```
## express-middleware

* 其实就是封装好的API，通过解析POST、GET、Cookies...使得更方便处理后续业务
    * 将处理过程划分多个环节去解决
```markdown
# example
- 处理请求地址，解析出router需要的数据，然后再将router挂载
- 最后进行全局错误处理
# 第三方中间件
- body-parse
  - 动态给req添加了一个body属性，根据请求地址解析出来的post请求数据
- express-session
  - 动态给req添加session属性
```
### 规则

* **next()进入下一个能匹配的middleware，不调用则停留在当前middleware**
    * 依次按代码顺序寻找第一个匹配的middleware
    * 如果最后没有匹配的中间件，Express默认展示cannot GET/
* **不关心请求路径和方法都会触发的middleware**
```javascript
const express = require('express')
const app = express()
app.use((req,res,next) => {
// next：调用下一个中间件的函数
  console.log("1")
  next() 
})
```
* **以 /xxx开头的请求路径才会触发的middleware**
    * /b/c/g
```javascript
app.use('/b',(req,res,next) => {
  console.log(req.url) //       /c/g
  next() 
})
```
* **严格匹配请求方法和请求路径的中间件**
    * app.get、app.post
    * 访问/login时，此时都触发了
```javascript
app.get('/login',(req,res,next) => {
  console.log('app.get')
  next()
})
app.get('/login',(req,res,next) => {
  console.log('app.get')
})
```
### 配置一个404中间件

```javascript
app.use((req,res) => {
  res.render('404.html')
})
```
### 配置全局错误处理中间件

* 调用next(err)会直接找到此middleware，因为有err错误对象参数
    * 此middleware写到最后面
```javascript
app.use((err,req,res,next) => {
  console.log("全局错误处理middleware")
})
```
Navicat Premium
* 用于连接数据库的软件
## MongoDB

### what

* 非关系型数据库，分布式文件存储（无须sql语句，因为不是用数据库存储）
    * c++ 写的
    * [The most popular database for modern apps | MongoDB](https://www.mongodb.com/)
    * 一个数据库可以有多个集合（表）
    * 一个集合可以有多个文档（表记录）
    * 文档结构灵活，没有任何限制（但要是Object）
```javascript
db文件：有qq、weixin、dingding...数据库，
       而qq数据库中有user、products...表，而表中又有许多数据
{
  qq:{ // 表
    user:[ // 表记录
      {name:"hao",age:20} // 文档
      ...
    ],
    products:[
      {name:"口红",price:1000}
      ...
    ],
    ...
  },
  weixin:{
    
  },
  dingding:{
    
  },
  ...
}
```
### use in cmd

#### how to run

* 开启MongoDB服务（默认就开启了）
    * 默认存储在MongoDB所处盘符根目录下的data/db

![图片](https://uploader.shimo.im/f/wySTS4ZMeoeIJwcl.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

```plain
mongod --version
* 必须指定路径哦，不然无法开启！
mongod --dbpath=F:\front-end\MongoDB\data\db
mongod -f F:\front-end\MongoDB\mongodb.conf
```
* 默认连接本地MongoDB服务，在cmd里面测试命令
    * 没开启服务就连接会报错

![图片](https://uploader.shimo.im/f/75oIyKvuOoS4cMED.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

```shell
mongo --version
mongo
```
#### base command（*only need know）

* show dbs
    * 显示所有数据库
* db
    * 查看当前操作的数据库
* use 数据库名称
    * 切换到指定的数据库（没有就新建）

![图片](https://uploader.shimo.im/f/ILywDsyiQdVXcMRH.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

* db.students.insertOne({"name"："hao"})
    * 在当前操作的数据库的students中插入数据{"name"："hao"}
* show collections
    * 展示当前所有存储数据的文件名（如：students）
* db.students.find()
    * 查询students的所有数据

![图片](https://uploader.shimo.im/f/N6hPQ7g7RrtgQ1aW.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

![图片](https://uploader.shimo.im/f/e5ZWxxbTHR7PSBH6.png!thumbnail?fileGuid=j8KxjqtdPPyKwhyV)

## mongoose（Node.js）

* 首先使用**mongod -f F:\front-end\MongoDB\mongodb.conf**开启服务
    * 才能使用mongoose连接
### API

* 基于官方的mongodb包再进行了封装，使其变得更简单
    * [Mongoose v5.10.15: Connecting to MongoDB (mongoosejs.com)](https://mongoosejs.com/docs/connections.html)
```javascript
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const mySchema = new mongoose.Schema({
  username:{
    type:String,
    default:"",
    required:true
  },
  password:{
    type:String
  },
  email:String
})
const User = mongoose.model('User',mySchema)
// 添加数据
new User({
  username:"moon",
  password:"12345",
  email:"8721351@13.com"
}).save() // 返回值为Promise()对象
// 修改数据
User.updateOne({
  _id:"65dfgfd4564651fgd"
},{
  username:"modify",
  password:"516fdg"
}).then((res) => {
  console.log("修改成功")
},(err) => {
  console.log("修改失败：",err)
})
User.updateMany({},{}).then()
// 删除数据项
User.deleteOne({}).then()
User.deleteMany({
  username:// 正则表达式
}).then()
// 查询数据
User.findOne({
  username:"hao"
}).then((res) => {
  console.log("查询成功，返回第一个找到的")
})
User.find({
  username:"hao"
}).then((res) => {
  console.log("查询成功，返回所有符合条件的数据项")
})
```
## MySQL

### what

* 关系型数据库，需要使用sql语句进行数据库的操作
### use in cmd

* 找到mysql包就行，再下载一个mysql
```plain
mysql -u root -p
```
### MySQLWorkBench

* MySQL的可视化界面
# 实战练习

* 实现注册、登录、评论、留言...简单博客的搭建的练习
* 主要是连接mongodb数据库，然后进行crud
    * 需要建立的表多了，就新建一个文件夹models，里面每个文件负责每个表的设计和建立
```javascript
const mongoose = require('mongoose')
const my_Schema = new mongoose.Schema({
  
})
cosnt User = mongoose.model(my_Schema)
```
* 异步请求的服务端重定向，浏览器不会跳转，需要Browser接受到响应数据后，自身使用location.href之类的进行跳转
```plain
1、最开始的时候，表单的提交行为，只能是同步请求，就是Browser会锁死（转圈），而无论最终服务端会响应什么数据，Browser都会把响应的结果覆盖掉当前的页面
2、后面有人提出，这样覆盖当前页面不太好，希望还是同一页面中，于是服务端就通过模板引擎，将渲染好的页面返回给Browser展示出来（Browser依然锁死，转圈）
（更安全，但服务器压力加大，如：github登录界面，有错误信息和登录页面）
3、现在就是ajax，前后端分离
```
* 返回的信息可以通过状态码加信息来组织，并且route设计中，可以用GET请求来渲染页面，POST请求来做具体操作
    * 如：登录（/login）
```javascript
const express = require('express')
const router = express.Router()
```
|    |请求方式|触发事件|功能|
|:----:|:----|:----:|:----|:----:|:----|:----:|:----|
|/login|GET|访问/login|渲染登录页面|
|/login|POST|已在/login，在输入信息后，点击登录按钮|验证用户信息，判断是否登录成功|

* Promise、await、async
    * 防止callback ball
    * 解决try...catch无法监听异步事件抛出错误
    * 同步执行的代码，却是并发的异步结果

---
# https状态码

* 301和302区分不是很清楚
    * [https://segmentfault.com/a/1190000012282437](https://segmentfault.com/a/1190000012282437)
* 304是客户端已经有缓存，202是客户端无缓存
# session、cookie

* **参考**
    * [Cookie和Session视频教程（完）_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1s4411z7zq?p=9)
    * 掘金好文：[https://juejin.cn/post/6844904034181070861](https://juejin.cn/post/6844904034181070861)

---


* **cookie本地存储，服务端生成**
    * 第一次请求：服务端生成cookie封装到响应头，返回到客户端，然后客户端存储到本地磁盘上，等第二次发送请求时，再携带此cookie发送到服务端中

---


* **session列表**
    * 第一次请求：服务端生成SessionID和HttpSession的引用后，将SessionID=32位的随机串存入到Cookie中，然后将它发送到客户端，客户端将其存入到浏览器缓存中
    * 第二次请求：客户端携带拥有SessionID的Cookie发送请求，服务端查session列表找到之前的会话
        * 根据SessionId实现会话跟踪
|key|value|
|:----:|:----|:----:|:----|
|SessionID1|HttpSession的引用1|
|......|......|
|SessionIDn|HttpSession的引用n|

* **session失效**
    * 对于用户来说关闭浏览器，但是真正的结束是session失效，如：退出登录，服务端会解绑所有的session属性，并且将相应的数据存入到数据库中
* 但是如果**禁用cookie**的话，需要使用方法在url拼接
    * 但更加不安全
```plain
https://www.bilibili.com/video/BV1s4411z7zq?p=13;sessionid="fd6g4d56g65fd4g65fd45g"
```
