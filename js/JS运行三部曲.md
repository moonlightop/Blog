# 运行过程分析
> JavaScript是解释性语言，它的执行分为：解释阶段和执行阶段
- 解释阶段
    - 词法分析
    - 语法分析
      - 全局扫描JavScript代码，检查是否有语法错误，若有则停止代码执行，反之则下一步
    - 作用域规则确定
      - JavaScript采用词法作用域（静态作用域）。而作用域分为全局作用域、函数作用域、块级作用域，
        它们在声明时就确定了
- 执行阶段
    - 创建上下文
    - 解释执行 + 预编译
      - 解释执行：读一条，执行一条
      - 预编译：发生在可执行代码执行前一刻，它生成相应的执行上下文(execute context)
      - JS的可执行代码(executable code)有：全局代码、函数代码、eval代码
      - 执行上下文栈：所有ECMAScript程序运行时均可以用执行上下文栈来表示，栈顶表示当前活跃的执行上下文，而栈底是全局上下文
         
         ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64db718e4b22458c8e41343ecf1e1859~tplv-k3u1fbpfcp-zoom-1.image) 
     - 垃圾回收

> 综上，运行一个JS文件的流程如下
  - 1、 进行解释阶段。检查代码有无语法错误，并且确定好作用域。
  - 2、 接着到执行阶段。在执行全局代码前，
        进行预编译根据全局作用域来生成全局上下文并将其压入执行上下文栈中
        loop: 然后开始读一条语句，执行一条。
             若执行到的一条语句是可执行代码时（一般是函数的调用），
                 那么就先进行预编译生成该函数执行上下文，接着将其压入执行上下文栈中执行。
                 等到该函数执行完后，将它的执行上下文出栈。
  - 3、 直到最后全部代码执行完毕，全局上下文出栈，该文件执行完毕。
    
# 预编译是如何生成执行上下文？
- 全局执行上下文（global execute context）从创建到执行的流程？
    - 创建Global Object
    - 往GO填写key-value
      - 先找变量声明。将变量名作为key，value为undefined
      - 再找函数声明。将函数名作为key，value为函数体
    - 将其压入执行上下文栈中执行

- 函数执行上下文（function execute context）从创建到执行的流程？
    - 创建Active Object
    - 往AO填写key-value
      - 先找形参和变量声明。将变量名和形参名作为AO的key，value为undefined
      - 再传递实参的值给形参变量中
      - 接着找函数声明。将函数名作为AO的key，value为函数体
    - 将其压入执行上下文栈中执行语句
      - 如：a = 123沿着作用域寻找变量a，在此函数生成的上下文中找到变量a，然后将a的值从function a(){}赋值为123。b = function(){}同理

- `案例`
```javascript
function my(a){
  console.log(a) // function a(){}

  var a = 123 // 变量声明
  console.log(a) // 123

  function a(){}
  console.log(a) // 123

  console.log(b) // undefined
  var b = function(){} // 属于变量声明
  console.log(b) // function(){}

  function d(){}
  console.log(d) // function d(){}
}
my(1)
```
- `分析过程`
```markdown
1. 解释阶段 - 已经把该函数的作用域确定了
2. 执行阶段 - 执行全局代码前先生成全局上下文，并将其压入栈中执行
                GO: {}
             下面的JS代码解释执行时，遇到了函数调用。先进行预编译根据在解释阶段确定的
             函数作用域来生成它的执行上下文，并将其压入栈中进行解释执行
                AO: {
                    a: undefined -> 1 -> function a(){},
                    b: undefined,
                    d: function(){}
                }
             先读到console.log(a)语句，执行它，在自身的执行上下文AO中找到该变量且为function a(){}，
                 就不用沿着作用域链上找了，因此该语句输出 function a(){}
             然后读到了a = 123赋值语句，执行它，在自身的执行上下文AO中找到该变量且为function a(){}，
                 然后将其赋值为123
               AO: {
                   a: undefined -> 1 -> function a(){} -> 123,
                   b: undefined,
                   d: function(){}
               }
             继续读，又遇到了console.log(a)语句，执行它，继续在自身的执行上下文中找到该变量且为123
                 因此该语句输出123
             继续往下，又遇到console.log(a)语句，同理输出123
             接着遇到的是console.log(b)语句，输出undefined

             然后遇到了赋值语句 b = function(){}，执行它，先在自身的执行上下文中寻找，找到了该变量，因此将其赋值为function(){}
               AO: {
                   a: undefined -> 1 -> 123,
                   b: undefined -> function(){},
                   d: function(){}
               }
            遇到console.log(b)语句，输出function(){}
            遇到console.log(d)语句，输出function d(){}
                     
```


# 作用域和作用域链
> 作用域分为全局作用域、函数作用域、块级作用域（ES6新增）<br>
> - 而且每一个作用域在JS的解释阶段就已经确定好了
> 上下文是在执行可执行代码前一刻生成的（常用的是全局上下文和函数上下文）
> - 而当在一个上下文中访问某个变量或函数时，JS内部机制是沿着预编译时确定好的作用域链往上找，直到找到该变量或函数才停止，然后访问它


- 上下文何时会销毁？    
    - 内层上下文不销毁时，包含它的外层上下文就不会被销毁
    - 如果有任何一个外部的变量指向一个可能创建上下文的函数时，这个函数所在的上下文就不会被销
```javascript
    function demo() {
        var f = function() {}
        return f
    }
    var test = demo() // 外部变量test指向可能创建上下文的函数f，所以函数demo的上下文不会被销毁，因此会导致内存泄漏
```


- 如下图所示，当内层上下文无法找到需要访问的变量或者函数，那么就往外层上下文中寻找，依次类推直到全局上下文中寻找，若都找不到则报错，若在某一外层上下文中找到则访问它。
    - 此处由内层上下文往外层上下文寻找的桥梁就是通过作用域链来搭建的
> [图片出处](https://www.zhihu.com/question/34547104)
 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b804caa5b30f4898ae821e8094ed7d05~tplv-k3u1fbpfcp-watermark.image)

- `案例`
```javascript
function a() {

  function b() {
    var b = 234
  } 
  var a = 123
  b()
  
}
var glob = 100
a()
```
- 实际上，每个作用域链是一个数组，里面每个元素指向一个生成的执行上下文
    - 作用域链在预编译时根据解释阶段确定好的作用域来生成。数组的第一个元素指向本身的上下文，后续元素根据作用域得知自己是内层上下文，因此就将数组的后续元素指向外层上下文的作用域链所指向的地方
> 全局代码执行前，生成全局上下文
        GO: { 
           glob: 100,
           a: function a(){}
        }
1. 在解释阶段中已经确定函数a的作用域。函数a的作用域链如下图所示
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/415813d232b64d039d082dd4c2471948~tplv-k3u1fbpfcp-zoom-1.image)

2. 函数a执行前，预编译生成执行上下文   
```
    GO: { 
        glob: 100,
        a: function a() 
    }  
    AO: { 
        a: undefined,
        b: function b() 
    }
```
   ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b017e13fe76f4146bc84cae749b9fda7~tplv-k3u1fbpfcp-zoom-1.image)

3. 同理函数b的作用域链 
```
    GO: { 
        glob: 100,
        a: function a() 
    }  
    AO: { 
        a: undefined,
        b: function b() 
    }
```
   ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ee416e50f3d4fb195030d1aff5f502c~tplv-k3u1fbpfcp-zoom-1.image)

4. 函数b执行前，预编译生成上下文，作用域链如下  
```
    GO: { 
        glob: 100,
        a: function a() 
    }  
    AO: { 
        a: undeined -> 123,
        b: function b() 
    }
        
    AO: { 
        b: undefined -> 234 
    } 
```

   ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0543b0dfa444b7d8cc16ec107501423~tplv-k3u1fbpfcp-zoom-1.image)

5. 函数b执行完，它的上下文出栈，接着函数a也执行完，上下文出栈。
> 因为没有外部变量保存函数b，也没有外部变量保存函数a，所以会将它们的上下文销毁。 
```
    GO: { 
        glob: 100,
        a: function a() 
    }  
```
6. ECMAScript程序继续执行栈顶的全局上下文，直到执行完后销毁
# 总结
- 切记，上述提到上下文销毁的时机，因为当出现闭包时，会导致内存泄漏 —— 本应该销毁的外部上下文，由于外部变量保存了该上下文中的函数，而导致不会销毁它。
- 上下文、作用域链间，其实可以将上下文比作生活当中的房子
```

    就如上述的例子中，首先建造了一间大房子GO（全局上下文执行前）
    然后又在这间房子内存在着卧室a（函数a执行前生成的上下文），
    在卧室中又存在洗手间b（函数b执行前生成的上下文）；
    
    试想一下，当我们在洗手间b中访问找衣服时，
        找不到，就打开大门走向卧室寻找，
        又找不到，则继续推开门寻找，直到找到为止，最后都找不到就gg
       （这期间推开的大门正是嫁接不同上下文的桥梁，即作用域链）

    但要注意，这只是类比，不要说先在大房子找，找不到往里找，哈哈！

    而作用域就好像，一个在外面人的指挥队伍在大房子内部（根据预先确定的作用域知道在此处，从而确定作用域链）
    建立一间房子，建好后，而当我们需要在这件房子寻找某件物品时，同样的道理去寻找
```
# 参考
- [执行上下文（execution context）相关总结](https://www.jianshu.com/p/a0e8182a8895)
- [深入理解JavaScript作用域和作用域链](https://segmentfault.com/a/1190000018513150)
- [如何通俗易懂的解释闭包](https://www.zhihu.com/question/34547104)
