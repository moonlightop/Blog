# 1.React新的前端思维方式
## JSX是进步还是倒退？

- JSX中给很多Virtual DOM绑定事件处理函数，通过事件委托最终只会在最顶级的DOM上绑定一个事件处理函数。而jQuery中绑定一个事件处理函数对应了一个DOM
- react的组件在umount后，就会自动注销绑定的事件处理函数，而jQuery需要手动注销它
- 绑定的事件处理函数作用域均可以控制在react的组件内，而jQuery绑定的事件处理函数则在全局作用域中执行

## Reactive Programming

- ` UI = render(data)`
  - 在确定的render函数下，界面完全由输入的数据所决定，因此我们需要区分开data和render，而当我们需要更新界面时，只需要修改输入的数据，那么界面自然就会做出响应

## Feature of React

- Reactive Programming
  - UI = render(data)
- Functional Programming
  - 关注做什么，而不是怎么做
  - 函数第一位，可以出现在任何地方
- Declarative  Programming（声明式编程）
  - 告诉计算机做什么，但不将每一步的过程告诉它
- Imperative Programming（命令式编程）
  - 告诉计算机完成某件事的每一步应该如何做

## Virtual DOM

- 第五章有详细介绍
