# React 基础

## 基础的使用
一般情况下，`React` 的代码都是在一个类里面，但是也可以由一个单独的函数输出。

基础的事件绑定就不写了。

### 语法糖

#### Fargment
`React` 要求 `DOM` 根层级只能有一层，但是如果满足排版需求的话可以使用 `Fargment` 语法糖。
``` javascript
import React, { Fargment } from 'react';

function todoList() {
  return (
    <Fargment>
      <input type="text" />
      <button>提交</button>
    </Fargment>
  )
}
```
#### className
因为 `class` 是 `JavaScript` 的关键字，所以在 `JSX` 中的类名不允许使用 `class` ，而是使用 `className` 来代替。

#### for
因为 `for` 是 `JavaScript` 的关键字，所以在 `JSX` 中的类名不允许使用 `for` ，而是使用 `htmlFor` 来代替。

### JSX
在 `JSX` 中可以使用 `javascript` 表达式，但是需要使用 `{}` 圈起来。
``` javascript {3}
function todoList() {
  return (
    <p>{ isTrue ? '正确' : '错误' }</p>
  )
}
```

通常情况下，`JSX` 会将用户输入的 `html` 编译成字符串，这样做会更安全，可以防止 `XSS` 攻击。但是如果一定要把传入的变量进行编译的话可以使用 `dangerouslySetInnerHTML`。
``` javascript
function creactDOM() {
  return <div dangerouslySetInnerHTML={{ __html: '<h2>这是一个副标题</h2>' }}></div>
}
```

### this
区别于 `Vue`，`React` 的事件需要自己手动去绑定。

`this` 是在执行的时候才能决定指向的，所以在 `inputChangeFunc` 函数执行的时候 `this` 并没有指向 `todoList` 这个构造函数，因此在 `onChange` 的时候就使用 `bind` 将其的 `this` 绑定一下。
``` javascript {15}
class todoList {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  }

  render() {
    return(
      <div>
        <input 
          type="text" 
          value={this.state.inputValue} 
          onChange={this.inputChangeFunc.bind(this, e)}
        />
      </div>
    )
  }

  inputChangeFunc(e) {
    this.setState(() => {
      const inputValue = e.target.value;
      return { inputValue }
    })
  }
}
```

### state


笔记的关键字
- react 的事件绑定基础概念
- Fargment 的使用
- className 的使用
- htmlFor 的使用
- jsx 中注释的使用
- jsx 中使用js表达式
- dangerouslySetInnerHTML 的使用
- 事件绑定的 this 指向问题
- 列表要使用key
- 不能直接修改 state
- 定义组件的基础规范
- this.state 里面不要直接写对象，而是要使用新版语法写一个函数，通过函数返回对象

关于组件的拆分
- 组件的命名规则
- 为什么要拆分组件
- 父组件怎么给子组件传值
- 子组件如何去修改父组件的值
- 为了提高性能将所有的 this 绑定写在 constructor 里面

react 中什么时候使用箭头函数什么时候使用bind去绑定this

需要去看看 ES6 的解构赋值

声明式开发相对于jquery可以使我们减少大量的dom操作
react 可以和其他的框架并存
组件化可以让react更具维护性
单向数据流，父组件可以向子组件传递数据，但是子组件不能修改父组件的数据
react 只是一个视图层的框架，大型项目还是需要搭配其他的一些插件
函数式编程可以更方便的自动化测试