# 运行过程分析
- 1. 语法分析
  - 全局扫描javascript代码，检查是否有语法错误，若有则停止代码执行，反之则下一步
- 2. 解释执行 + 预编译
  - 解释执行：读一条，执行一条
  - 预编译：发生在可执行代码执行前一刻，它生成相应的执行上下文(execute context)
  - JS的可执行代码(executable code)有：全局代码、函数代码、eval代码
  - 执行上下文栈：所有ECMAScript程序运行时均可以用执行上下文栈来表示，栈顶表示当前活跃的上下文，栈顶是全局上下文
  
  	![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64db718e4b22458c8e41343ecf1e1859~tplv-k3u1fbpfcp-zoom-1.image) 
  
  - 由于jS是**解释执行**的，因此在可执行代码执行前会
    - 先进行**预编译**
    - 然后再将生成的执行上下文压入执行上下文栈（execute context stack）
    - 接着将它包含的语句压入栈中运行，直到所有语句执行完毕后，出栈并销毁它
    
# 预编译如何生成执行上下文？
- 全局执行上下文（global execute context）从创建到执行的过程？
    - 1. 创建Global Object
    - 2. 往GO填写key-value
      - 先找变量声明。将变量名作为key，value为undefined
      - 再找函数声明。将函数名作为key，value为函数体
    - 3. 将其压入执行上下文栈中执行

- 函数执行上下文（function execute context）从创建到执行的过程？
    - 1. 创建Active Object
    - 2. 往AO填写key-value
      - 先找形参和变量声明。将变量名和形参名作为AO的key，value为undefined
      - 再传递实参的值给形参
      - 接着找函数声明。将函数名作为AO的key，value为函数体
    - 3. 将其压入执行上下文栈中执行语句
      - 如：a = 123使得AO['a']从function a(){}变为123，b = function(){}同理
```javascript
  function my(a){
  console.log(a)

  var a = 123 // 变量声明
  console.log(a)

  function a(){}
  console.log(a)

  console.log(b)
  var b = function(){} // 属于变量声明
  console.log(b)

  function d(){}
  console.log(d)
}
my(1)
```
```
  /*
  fn doing 
    GO
    AO: 
      1. { a: undefined,b: undefined }
      2. { a: 1,b:undefined }
      3. { a: function a(){},b: undefined,d: function d(){} }
      // function a(){}

      4. { a: 123,b: undefined,d: function d(){}}
      // 123
      // 123
      // undefined
      5. { a: 123,b: function(){},d: function d(){} }
      // function(){}
      // function d(){}
*/
```
# [[scope]]
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
- 执行上下文变化过程如下：
  - 1 . a defined 
    - GO：{ glob:100,a:function a() }
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/415813d232b64d039d082dd4c2471948~tplv-k3u1fbpfcp-zoom-1.image)
  - 2 . a doing   
      - GO：{ glob:100,a:function a() }  AO：{ a:undefined,b:function b() }
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b017e13fe76f4146bc84cae749b9fda7~tplv-k3u1fbpfcp-zoom-1.image)

  - 3 . b defined 
      - GO：{ glob:100,a:function a() }  AO：{ a:undefined,b:function b() }
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ee416e50f3d4fb195030d1aff5f502c~tplv-k3u1fbpfcp-zoom-1.image)


  - 4 . b doing  
      - GO：{ glob:100,a:function a() }  AO：{ a:undeined->123,b:function b() }
        AO：{ b:undefined->234 } 
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0543b0dfa444b7d8cc16ec107501423~tplv-k3u1fbpfcp-zoom-1.image)

  - 5 . b done 
      - GO：{ glob:100,a:function a() }  AO：{ a:123,b:function b() }
      - b函数的执行上下文执行完后，出栈并销毁
  - 6 . a done 
      - GO：{ glob:100,a:function a() }
      - 继续执行栈顶的a函数的执行上下文，发现它也执行完，出栈并销毁
  - 7 . 整个ECMAScript程序执行完
        空
      - ECMAScript程序继续执行栈顶的全局上下文，直到执行完后销毁

# 注意		
- **执行上下文执行完后会出栈并销毁**
- imply global：变量未经声明就赋值，此变量为全局对象所有
  - **demo = 123**
  - var t = **test = 123**
- if 里面不能声明 function
- var声明的变量不可以delete
  - var a = 1，delete window.a（删除不了）

# 参考
- [执行上下文（execution context）相关总结](https://www.jianshu.com/p/a0e8182a8895)
