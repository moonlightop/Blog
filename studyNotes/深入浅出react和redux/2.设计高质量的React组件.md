# 软件设计准则

- react的设计秉持高内聚，低耦合的设计思想。一个功能的实现，以前需要分别用html表示内容，css处理样式，Javascript进行交互来完成它。而现在react将它们聚合到一个组件中去完成。而开发人员通过对不同的组件划分，使得它们所实现的功能各不相同。从而实现高内聚，低耦合

# state 和 props

* state代表一个组件内部状态，而组件与外界进行交互则需要通过props这个信使
* 一个类组件中props是如何初始化的呢？
  * React内部通过将Component这个类的props属性写入this.props中
  * render是唯一一个React内部没有默认定义的生命周期函数

```javascript  
import React,{ Component } from 'react';

class MyComponent extends Component {
    constructor (props) {
   		super(props)
        ...
    }
    render() {
        return (
        	<h1>hello_react</h1>
        )
    }
}
```

# propTypes何时使用？

- 建议在开发环境中使用它，可以帮助我们解决bug，但是千万不要在产品上线的环境使用它，给组件添加静态属性浪费性能，消耗cpu的时间
- babel有插件可以自动帮我们在打包时去除它

# 纯函数

- 给定相同的输入，始终返回相同的输出
- 纯函数不会产生任何副作用，意味着它无法更改任何外部状态

- 参考文章
  - [[译]掌握 JavaScript 面试：什么是纯函数？](https://zhuanlan.zhihu.com/p/121627485)
  - [JavaScript----什么是纯函数](https://blog.csdn.net/c_kite/article/details/79138814)

# 巧用shouldComponentUpdate

- 因为setState的调用，导致父组件更新，从而导致它的子组件也会更新。但如果此时更新后的state 或 props对比之前的并没有发生变化，而导致了它们的更新，这无疑是没有必要的。
  - 因此我们可以通过修改React中默认定义并唯一有返回值且为true的shouldComponentUpdate函数，来判断state 或 props更新前后是否发生变化，从而决定是否更新它！

```javascript 
	shouldComponentUpdate(nextProps,nextState) {
        return this.props.Pname !== nextProps.Pname || this.props.state.Sname !== nextState.Sname
    }
```

# setState何时生效?

- setState函数看起来是异步执行的，但实际上是因为React考虑了性能优化方面，所以setState的执行会等到将所有更新的state对象合并后才会执行

  ```javascript 
  	for (var i = 0; i < 100000; i ++) {
          this.setState({
              `${i}`: i
          })
      }
  ```

  - 如上例子，如果setState函数采用的是同步执行，那么这个循环有多少次，它就要执行多少次，十分浪费性能。但是如果是先将所有需要更新的state对象先合并后，最后在执行一次从而更新，明显好很多
  - 而当我们通过发送一个异步任务，里面执行setState函数，它就能同步执行了。因为这样它不处于React内部，所以可以同步执行

  ```javascript 
  	setTimeout(() => {
      	this.setState({
              name: 'changeName'
          })
      },2000)
  ```

  
