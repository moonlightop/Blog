* Talk is cheap，Show me the code(Linus)

[https://www.bilibili.com/video/BV15741177Eh?from=search&seid=5040348672751529993](https://www.bilibili.com/video/BV15741177Eh?from=search&seid=5040348672751529993)

# 代码规范

* 缩进2个空格
# MVVM

![图片](https://uploader.shimo.im/f/qAvKdj5vQ440J8m2.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/VZ8aEhNUx7KT9fUU.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/XaHhk4PODVrCMPTP.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

# 虚拟dom

* **尽可能复用已存在的元素来实现view的渲染**
    * **input输入框复用**
    * **可用不同key值避免复用**
```plain
<div id="If">
<span v-if="isUsername">
 <label for="use">username</label>
   <input type="text" id="use" placeholder="请输入用户账号" key="username">
</span>
<span v-else-if="!isUsername">
  <label for="email">email</label>
    <input type="text" id="email" placeholder="请输入email" key="email">
</span>
<button @click="loginWay()">切换登录方式</button>
    </div>
```
# 特点

## 渐进式

* 一点一点的对jQuery、原生js构建的项目，用vue渐渐重构页面（一次改一点）
## 声明式编程

* vue、angular均使用它
* 原生js、jQuery使用命令式编程
## 响应式

### 挂载

vue实例控制网页中某一个区域，将真实dom交给它管理

```xml
var vm = new Vue(){
  el:"css选择器"，
}
vm.$mount("css选择器")

```
# new Vue(option)

## el、data、methods

```plain
1、el:'css选择器' | HTMLElement
   .mount('css选择器')
2、data：{} | Function
3、methods：{}
```
## 生命周期

* Vue到了生命周期某个阶段
    * 进行CallHook()
# ![图片](https://uploader.shimo.im/f/qyo9xtEG68KpMAUh.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## filters

* **我们希望展示的是做过一些变化的原数据**
    * **用filters来进行处理，用{{ （属性| 计算属性 | 带有返回值的函数） | filters的过滤器    }}**

![图片](https://uploader.shimo.im/f/0RJOyQM7eHXyRBfm.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)![图片](https://uploader.shimo.im/f/f6GJmsQBRoCN7KMN.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## ![图片](https://uploader.shimo.im/f/NGZYp08D6bKTcYn2.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## 计算属性（computed）

* **和函数区别**
```plain
1、没有()
2、有缓存，依赖不变用缓存
3、可写（一般无set方法，有set才可赋值，否则报错）
computed：{
  fullName：{
    set(val){
      
    }，
    get(){
      return ?；
    }
  }，
*简写
  totalPrice：{
    get(){
      return ?；
    }
  }，
  totalPrice(){
    return ?；
  }
}
```


# 插值语法

* index修改数组中的元素，非响应式
    * **arr[i] = 123 ， 可用arr.splice(i,0,123)**
* **数组方法:push、pop、shift、unshift、splice、sort、reverse会响应数据**
```plain
Vue.set(要修改的对象，索引值，修改后的值)
```
![图片](https://uploader.shimo.im/f/IS3HuEQo8RkEfNu8.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## Mustache

**{{  简单表达式 |****属性 | computed |带有返回值的函数  }}  —****展示字符串**

* **单向数据绑定**
    * {{ firstName + ‘ ’ + lastName }}
    * {{ counter * 2 }}
## v-

* **" "中的非字符串会当成变量，去实例中找相应数据**
    * **结合methods使用，减少view中代码量，已经方便动态修改，而非写死data**
    * **methods中一定不要忘了加this才能访问data！!**
* **插值进模板内容**
```xml
1、v-once：仅改一次
<h1 v-once>{{message}}</h1>
2、v-pre：忽略{{}}
<div v-pre>{{text}}</div>
  显示text，不显示hello
  
*3、v-cloak：Vue解析前存在，完成后消失
[v-cloak]{
  display:none;
}
<div id="app" v-cloak>{{text}}</div>
防止{{text}} -> hello 的过程给用
*4、v-html：innerHTML()
url:'<a href="https://www.baidu.com">百度一下</a>'
<div v-html="url"></div>
5、 v-text：innerText()
text:'hello'
<div v-text="text"></div>
```
* **绑定属性**
```xml
1、v-bind：Vue实例解析此指令，进行单向数据绑定
src或href：
  imageURL:"https://taobao.com"
  <a v-bind:href="imageURL"></a>
    imageURL改变  ->  href更新
class：
  *<div class="hello" :class="{类名1:boolean，类名2:boolean...}"></div>
  <div :class="[类名1，类名2]"></div>
 
style:  属性名用大驼峰命名
  *<div :class="{属性名:'值'}">
  <div :class="[{属性名，'值'}，{属性名，'值'}]">
语法糖：<a :href="imageURL"></a>

2、 v-for="(item，index) in movies"   
    v-for="(value，key，index) in obj"
movies：列表，["haizai"，"moon"]
obj:{name:"hao"，id:56}
*key="item.id"，可以根据唯一的key值来复用元素，若用index作为key值，不行
 因为数组变化后，同一个元素的index可能会发生变化 
 
* 遍历列表，同时将标签和内容渲染出来
```
![图片](https://uploader.shimo.im/f/wiWt55zC8EzzZMFf.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/UKDev6l78agVU73S.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)


```xml
*3、v-on:click="increment(参数)或increment或increment()或js
increment是methods中的函数，dom绑定事件
js：++ 、-- 、& 、| = ......
* 无()，默认第一个参数传event
  有()，参数 + 用$event传事件源对象
* .stop:阻止冒泡，.prevent，.enter，.once，.native
** 语法糖：@click=""

4、v-if、v-else、v-else-if = "最终值为boolean"
  可用变量、函数、表达式......
区别：v-show是用display：none来隐藏元素，而v-if...直接去除
```
```xml
*5、v-model：用于表单的双向数据绑定
            触发事件后，Vue实例的数据根据value 或 boolean 更新
            Vue实例的数据渲染 或 选中
5.1
ms:"moon"
<input type="text" :value="message" @input="ms = $event.target.value">
sex:"" ， v-model绑定相同数据即可互斥（无v-model时，需相同name才互斥）
<input type="radio" v-model="sex" value="male">male
<input type="radio" v-model="sex" value="female">female
isAgree:false
game:[]
单选框：<input type="checkbox" v-model="isAgree">
多选框：<input type="checkbox" v-model="game" value="war1">
       <input type="checkbox" v-model="game" value="war2">
       <input type="checkbox" v-model="game" value="war3">

fruits:'apple'，默认选中
单选框：
<select name="Select" v-model="fruits">
    <option value="apple">apple</option>
    <option value="banana">banana</option>
</select>
多选框：multiple，fruits：['apple'，'banana']
5.2
v-model.lazy | number | trim
回车或脱离焦点 | 数据的类型转为number | 去除input框首尾whitespace
```
## 函数式编程

* **区别命令式编程**
```plain
for(index in arr){
  console.log(index)；
}；
......
```
### filter、map、reduce

![图片](https://uploader.shimo.im/f/veNU4soP3Fmh9KJx.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## 购物车实例

```plain
F:\font-end\vue\v-\app.html
```
![图片](https://uploader.shimo.im/f/WphIfB5uDrWA9nHR.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

# 
# 模板

* **通过将真实dom构成虚拟dom，然后按需更新页面数据**
## el和template

* 抽离代码，避免写着一个页面导致拥挤
    * **外部写**

![图片](https://uploader.shimo.im/f/gOF3zRvJFcsgNXmY.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

    * **将template的root element 完全替换挂载的元素**

![图片](https://uploader.shimo.im/f/9NAMEbuzkA7iNwRn.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/WsUwSynGRdIo6A8m.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/b3BHONYghH1m3Rs0.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

    * **用render(createElement)：**替换挂载元素
        * **createElement("标签"，"{标签的属性}"，['标签的内容'])**

![图片](https://uploader.shimo.im/f/CyvI3L9SEwWln2J9.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/wieqGekJ38v4whOc.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

        * **createElement("组件对象")**
## 模板书写的内容？

* **{{}} 和 v-bind、v-if... 这些指令中写js代码的**
    * js代码运行环境为vue实列
        * **{{title}}  => vm.title**

[file:///F:/font-end/vue/vue/vue.](file:///F:/font-end/vue/vue/vue.html)js

# 组件（component）

## 注意

* **组件内部不能访问new Vue()实例中的data，需访问自己的data函数的返回值**
    * **而组件内部的data是一个Function，且返回值是一个Object**
    * **区别Vue实例，没有el**
    * 组件的template必须有一个root element
## 定义、注册组件

* **局部注册的组件仅用于所在的Vue实例，而全局注册，所有Vue实例都可以用**
* **组件中的data是一个函数，且返回值是新对象**
    * 防止引用值指向同一个地址，导致数据共享，从而牵一发动全身
```plain
<script type="text/x-template" id="cpn"></script>
template:"#cpn"
<template id="cpn">
  <div></div>......
</template>
template:"#cpn"
```
```plain

1、创建构造器对象
const c1 = Vue.extend({
  template:""，
  data(){
     return {
       
     }
  }，
  methods:{
    
  }，
  components：{
    自定义名：构造器对象
  }
})
2、全局注册component：Vue.component('自定义名'，构造器对象)
* 构造器对象可以是c1，或语法糖直接省略Vue.extend，让Vue内部帮忙调用Vue.extend()
局部注册：new Vue({
  el:""，
  data:{
    
  }，
  components：{
    自定义名：构造器对象
  }
})
```
## 组件通信

* 子传事件、父传相应数据

![图片](https://uploader.shimo.im/f/UR68kZqKkt1y4c76.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### props的大驼峰标识

* **v-不支持大驼峰标识，cInfo -> c-info**
* **Vue官方推荐用父组件修改子组件的props，不推荐子组件修改自身props**
    * **子组件可以用data(){ return { } }  接收  props**

![图片](https://uploader.shimo.im/f/O4HteV5DsYame2NX.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/MpNn15hvXKLVPifq.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

```plain
* 子组件的属性绑定父组件的数据
props：{
  // cGame：Array，
  // cGame：[Array，String]，
  cGame：{
    type：Array，
    // 默认值为引用值，必须用函数返回
    default(){
      return ['www']；
    }
  }，
  cMessage：{
    type：String，
    default：'hello wrold',
    required：true，// 父组件必须传值
    // 自定义检验函数，如果cMessage的值不符合，仍然可渲染，只是提供参考给我们
     validator:function(value){
       return ['war1'，'game'，'sf'].indexOf(value) !== -1；
     }
  }
}
```
### $emit event

* **自定义事件不支持驼峰标识**
* **this.$emit("自定义事件名"，传输的数据)**
    * **传输的数据 是默认作为 父组件绑定此自定义事件 所调用的函数的第一个参数**
    * 类似于$event，作为第一个默认参数
    * **子组件传事件后要在应用它的父组件中用子组件进行接收**

![图片](https://uploader.shimo.im/f/j6F87Fk87BuMW0Jd.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/gPLXBZOiqM5pYLId.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/PtgVUqszn6bj4tft.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/ihlYQHQjCl3Xqj6t.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### refs

* **{ }，绑定在组件上**

![图片](https://uploader.shimo.im/f/Vm5vXlJCh0jwRF7b.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **绑定在普通元素，通过this.$refs.cName拿到是元素对象**
### this.$root、this.$father、this.children[i]

* **{ }、{ }、[ ]**
## slot

* **给组件预留插条，实现组件的复用**
    * 抽取共性，预留插条
    * **子组件单向绑定自身数据和slot中属性的关系，然后在父组件展示slot时，用template选中相应的slot，然后进行数据的获取，或者补充插条的功能**
* **组件模板的作用域在自身Vue | VueComponent里**
```xml
default slot  &&  具名组件：name
子组件的data(){
  return {
    data:['war1'，'game1'，'happy1']，
  }
}
<slot name="first"  ：data="moives">
  <h1>slot1默认内容</h1>
</slot>
<slot-cpn>
  <template slot-scope="slot" slot="first">
     <span slot="first"></span>
     <span v-for="item in slot.data">{{item}} * </span>
  </template>
</slot-cpn>
```
# Webpack4.x

* 后面补回来，先灵活应用
# Vue CLI

```plain
import Vue from 'vue'
  直接从node_modules中获取vue模块
```
[https://cli.vuejs.org/](https://cli.vuejs.org/)
## 概念

* **脚手架包含webpack、babel等技术，用命令来自动生成开发环境和webpack的配置**
    * **Webpack需要我们手动配置package.json、webpack.json.js......**
* **依赖node、webpack**

cnpm i -g @vue/cil

vue --version

## Vue CLI 2.x目录结构

* **代码规范配置文件**

![图片](https://uploader.shimo.im/f/j6OCJknjoCUinWNH.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/i2qq1fYflfiZWzXp.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)![图片](https://uploader.shimo.im/f/ASbSpFi5g4qdwqww.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## Vue CLI 3.x - 4.x目录结构

![图片](https://uploader.shimo.im/f/hLVdO3tnMTJYxnGL.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## Eslint

* 检测代码是否符合它的规范
    * config/index.js中找useEslint修改是否使用
## runtime

![图片](https://uploader.shimo.im/f/0HGiVbqRtSR6Mvrz.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **runtime-compiler：template -> act ->render ->vdom -> UI**
* **runtime-only：render -> vdom -> UI**
    * 内部代码量少，性能高
## ![图片](https://uploader.shimo.im/f/C2PjLSolKQcWkkEN.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## 命令

**Vue CLI 3.x - 4.x 下安装 2.x**

* npm i @vue/cli-init -g

vue init（2.x）

vue (3.x - 4.x)

* **vue ui**
    * 图形化界面管理
* **创建项目**
    * vue init webpack 项目名称（2.x）
    * **vue create 项目名称（3.x - 4.x）**
        * 在git bash上选择Manually select feature应用
            * `winpty vue.cmd create 项目名称`
    * 通过选择命令，来自动配置相关的webpack......等参数

![图片](https://uploader.shimo.im/f/IyXjomJKyMHnnZ0G.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **npm run build （解析为原始代码，打包）**

![图片](https://uploader.shimo.im/f/S1z9YNtzWxlhItKS.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/B2OERjKqZO6WjUuf.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **本地服务器运行**
    * **npm run dev（2.x）**
    * **npm run serve（3.x - 4.x）**

![图片](https://uploader.shimo.im/f/GCwYaV7plEaES9TV.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/EQrtaDx7dou6GrjS.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

**ctrl + c （停止）**


# Vue-Router

## 发展过程

### 后端渲染

* **后端处理URL和页面之间的映射关系 - 后端路由**

![图片](https://uploader.shimo.im/f/rKY3nOZPjoQHpiAL.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### 前后端分离

#### 前端渲染

* **Browser执行****js代码****时，会有ajax请求，拿到数据，再将获取的数据渲染到网页上**
    * **多个html + css + js对应多个页面**
### SPA

```plain
单页面富应用：
   index.html + css 
   + js（已请求全部资源，根据前端路由来渲染不同的资源）
     访问不同子页面（url），执行不同的js代码来渲染到index.html上
     
前端路由：url和页面的映射关系，执行不同的js代码将已经请求到了资源渲染到页面上
```
## 修改URL，页面不刷新

### location.hash

### history

```plain
history.pushState({}，""，"/moon")：进栈
history.replaceState({}，""，"/replace")：直接替换当前页面
history.go(n)：移动n步
history.forward()：相当于history.go(1)
history.back()：history.go(-1)
```
## 安装与配置router

* npm install vue-router --save（运行时需要）
### router-link实现

```plain
1、Vue.use(Vue-Router)：用use插件安装Vue-Router插件
2、创建VueRouter对象并export default
const routes = {
  routes:[
    {
    // 默认路径，重定向
      path：""，
      redirect："/home"
    }，
    {
      path："/home"，
      component：Home
    }，
    {
      path："/about"，
      component：About
    }，
    {
    // 可以在User.vue中通过this.$route.params.UserId获取值
      path："/user/:UserId"，
      component：User
    }
  ]
}
export default new VueRouter({
  routes，
  // 默认hash模式
  mode：'history'，
  // 给活跃状态的元素设置此类名，默认router-link-active
  linkActiveClass：'active'，
}
3、Vue中注册 
import router from "./router"
new Vue({
   router，
})
4、在App.vue中使用此路由
   <router-view/>：显示path映射到的组件内容 
   
   <router-link to="home"></router-link>
      tag：默认渲染成a标签，button，span...
      active-class:'active'，匹配成功的元素给于类名
   <router-link to="about"></router-link>
   <router-link v-bind:to="'user/' + UserId">
     UserId是App.vue的数据
     
```
### button按钮实现

**router：**new VueRouter（）的对象

![图片](https://uploader.shimo.im/f/pMI3WfDQS3yfORqX.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **用this.$router.push('\home')、this.$router.replace('\home')**

![图片](https://uploader.shimo.im/f/3UT5m4cUQBsRDTby.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/ioOIxDJdDk3j8xcZ.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/ulyqTLuJvNHGCuA9.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/wFEvGWBB4qVjBxNS.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### 传递参数

**$route：**获取活跃状态的route

![图片](https://uploader.shimo.im/f/zN49kr4ZO8W8cc0l.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **this.$route.params.**
    * 需要在router文件的index.js文件中配置

![图片](https://uploader.shimo.im/f/HSKWo6P9oFkcMcfS.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **query**
    * **在router-link传，this.$route.query**

![图片](https://uploader.shimo.im/f/uJSdXUcRVdtY4L6m.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### 懒加载和路由嵌套使用

* **所有组件打包到app.35aac596.js文件中，需要请求的文件过多，加载慢**

![图片](https://uploader.shimo.im/f/bPDtwfs7s4Plqdl9.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **ES6动态导入模块**
    * import("路径")
```plain
const Home = () => import("../components/Home")；
const routes = [
  {
    path：'/home'，
    components：Home，
    //  没有 /
    children：[
      {
        path：''，
        redirect：'news'，
      }，
      {
        path：'news'，
        component：HomeMessage
      }
    ]
  }
]
// 必须有 /
<router-link to="/home/news">News</router-link>
```
## 导航守卫

### 路由独享、组件内守卫

* **通过路由导航来记录访问过的页面**

![图片](https://uploader.shimo.im/f/q4EeO6tPy14ljhtF.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)![图片](https://uploader.shimo.im/f/2Re4y42wFKz11xqV.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/AVAZQcnVyVUpqJuU.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### 全局

* **route跳转前调用router.beforeEach()**

![图片](https://uploader.shimo.im/f/tZv1Z3pKgKEfjIVV.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)![图片](https://uploader.shimo.im/f/Jtgb0oujzxLUSucP.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)![图片](https://uploader.shimo.im/f/2dPVUslo3aYPnvDd.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)![图片](https://uploader.shimo.im/f/YYfWZqSDmFCQDKtA.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/TSBX61ujTzt69BCW.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/ismsuGrw3BrCbEfQ.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **route跳转后调用router.afterEach()**
    * **无须调用next()**
## keep-alive

* **避免destroyed()，在切换页面减少页面的重新渲染，处于activated、deactivated状态**
    * **exclude="Home，User"**
    * **include="Home，User"**
    * **对应组件中的name属性Home、User**
# TabBar

## 弹性布局

* **@：src路径，配置文件中设置的、**

# Vuex

## 概念

* **组件间共享的变量（状态）的插件**
    * 由一个公共对象管理，且是响应式的
    * 例如：存储用户登录状态、名称、头像、地理位置

![图片](https://uploader.shimo.im/f/QECLzPquExNX69wt.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

## store

### file dir

![图片](https://uploader.shimo.im/f/FlHx8bsl95nxhgM2.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

### Devtools

* **只能监听mutation的同步事件**
    * 如setTimeout()异步事件，无法监听到数据的变化
### Single Source of Truth

* State单一状态树(**单一的数据源**)
    * only one store、可以写多个modules
### state

* **放在index.js中，方便用户查看**
```plain
响应式原理：
    1、定义store时，已定义的state内部的数据，都具有响应式
    2、vue.set(target，key，value)、vue.delete(target，key)
       来操作object、array
```
### mutations

* **mutations没有return ， 其余可return**
    * **通过commit给mutations，让其修改state的属性和值**
```plain
参数：第一个自动传state，后面只能再传一个自定义参数（Payload）
调用：this.$store.commit('increment'，自定义参数传值Payload)
     this.$store.commit({
       type：'increment'，
       自定义变量
     })
```
### getters

* **根据status的内容，将其进行变化返回出去**
    * **可以通过return function(){ }来实现传参调用**
```plain
参数：第一个和第二个自动传state、getters，后面不能传别的参数了
调用：this.$store.getters.powerCounter(state，getters)
      {{$store.getters.powerCounter(state，getters)}}
```
### actions

* **处理异步事件，Devtools无法监听到mutations中的异步事件，但可以通过在action中处理异步事件，然后commit同步事件给mutattions来监听**
```plain
// context是执行上下文
this.$store.dispatch('actionData'，Payload)；
this.$store.dispatch({
  type：'actionData'，
  ...
}).then(res => {
  ...
})
// 只能接收一个自定义参数
actionData(context，Payload){
  return new Promise((resolve，reject) => {
    setTimeout(() => {
      context.commit('increment'，...)；
    }，1000)
  })
}
```
### modules

* **让state里面的内容别这么冗余，一类的可以写在模块里**

**1、modules中的属性的state会写进store的state中**

![图片](https://uploader.shimo.im/f/K9JVbSlrna49bjwQ.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

**2、****同名时****先找store的mutations、actions，再来此处找**

![图片](https://uploader.shimo.im/f/wUritXtdf96xLvzZ.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/UmGmvWu01uGMEDqE.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

**3、getters多了一个rootState参数、actions的context指此模块对象**

![图片](https://uploader.shimo.im/f/pBmiB9n5Yz5FPHkN.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

![图片](https://uploader.shimo.im/f/sGmFGWVSRYZe2ix7.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

# request

* **为了项目的维护，若axios不维护了，也只需修改一个文件网络请求的封装**

![图片](https://uploader.shimo.im/f/ELzdDftIGdx9KTTJ.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

```plain
思路：网络请求成功回调success、失败回调failure
     1、网络请求成功调用传进来的success、失败调用failure函数
        instance().then(res => { success(res) })
                  .catch(err => { failure(err) })
     2、通过返回new Promise，网络请求成功Promise -> resolve()，失败reject()
        new Promise().then().catch()
        
best way：
      instance.interceptors.request(config => {
      // 拦截正确的请求
        return config；
      }，err => {
      // 拦截失败的请求
        return err；
      })
      instance.interceptors.response(config => {
      // 拦截服务器返回的正确信息
        return config；
      }，err => {
      // 拦截服务器返回的错误信息
        return err；
      })      
      return instance(config)
```
![图片](https://uploader.shimo.im/f/mAyUh3xJFxIWY5MS.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)


## axios

```plain
cnpm i axios --save
```
* **全局配置**
```plain
axios.defaults.baseURL = ''
axios.timeout = 5  // ms
axios({
  url：'/home/multidata'，
  method：'GET'，
  params：{
    callback：'jsonp'
  }
  /*
  method：'POST'，
  data：{
    callback：'jsonp'
  }
  */
}).then(res => {
  console.log(res)；
}).catch(err => {
  console.log(err)；
})
axios.all([axios，axios])
  .then(results => {
    console.log(...results)
  })
  .catch(results => {
    console.log(...results)
  })
```
* axios实例的独立配置
```plain
const instance = axios.create({
  baseURL：''，
  timeout：... 
})
instance({
  url：'/home/multidata'
}).then(res => {
  console.log(res)；
}).catch(err => {
  console.log(err)；
})
```
# 事件总线

```plain
@load => onload事件
main.js 
  // 默认没有$bus这个对象
  Vue.prototype.$bus = new Vue()；
  
GoodListItem.vue
  this.$bus.$emit('自定义事件名R1'，参数)；
Home.vue
  this.$bus.$on('R1'，（）=> {
    this.$refs.Scroll.refresh()；
  })
```
# 注意

* **routes中的component**

![图片](https://uploader.shimo.im/f/ok8tVY51h6CbY7Bk.png!thumbnail?fileGuid=TkXGPP3gGPYDpDH6)

* **.vue文件将style标签，写成了script标签**
* npm install报错
    * 先删packlocak.json，再npm install
    * --save：运行依赖
    * --save dev：生产依赖
* css中用不了webpack的alias
    * dom用别名要加~
    * 每次修改别名后，都要重新npm run serve
* .navtive在需要监听组件的原生父元的事件
* 父传子，用props，别写到data里面了！
# Vue响应式原理

* 
