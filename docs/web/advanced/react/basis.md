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

### render
`render` 其实是 `React` 中的一个生命周期，它里面存放的是渲染到 `DOM` 中的 `JSX`。

#### 何时更新
`render` 会响应 `state` 和 `props` 的更新，如果这两个东西更新的话，那么 `render` 就会被触发执行。

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
`React` 中不能像 `Vue` 那样直接对一个 `state` 进行赋值，如果要修改一个 `state` ，需要使用 `setState` 方法。
`setState` 接受两个参数，一个是需要修改的数据（更推荐写函数该返回返回一个对象），二是回调函数。
::: warning 需要注意
`setState` 是一个异步函数，如果要依赖更新后的 `state`，那需要将之后的操作写到回调函数内。
:::
``` javascript {5,8}
this.state = {
  content: ''
}

this.setState((prevState) => {
  content: prevState.content
}, () => {
  console.log(this.content);
})
```
::: tip 为什么 setState 是异步的
一种说法是提高性能，大概的意思是 `setState` 在执行的时候会等一下，看是否有其他的 `setState` 需要执行，如果有的话就一起执行，没有就自己执行。 
:::

### key
`React` 中的列表在渲染的时候需要有一个唯一的 `key` 值。
``` javascript
this.state = {
  list: [
    {
      content: 'aaa',
      key: 'a1'
    },
    {
      content: 'bbb',
      key: 'b1'
    }
  ]
}

function list() {
  return this.state.list.map(item => (
    <div key={ item.key }>{ item.content }</div>
  ))
}
```
::: warning 不要将下标（index）作为 key 来使用
使用 `index` 作为 `key` 会影响性能。


`key` 的作用是唯一标识符。假设有一个列表，里面有标准的 `key`，这时候列表内某一项被删除了，那么 `React` 只需要检查 `key` 的完整性，然后对应的删除 `key` 对应的 `DOM` 就行了，但是使用 `index` 会使这个检查变得无效，因为 `index` 会随着列表的数量而变化。

假设内容 `a` 的 `key` 是 `a`，`b` 的 `key` 是 `b`，删除 `a` 后，他检查 `a` 这个 `key` 被删除了，然后就删除 `a` 对应的 `DOM`，但是如果是使用 `index` 的话，你删除了 `a` 的 `key` `0`，那重新渲染后 `b` 的 `key` 就变成了 `0`，那么就意味着整个列表将会全部重新渲染。
:::

## 组件
::: tip 组件的命名规则
统一以大驼峰风格来命名
:::

### 组件拆分
组件拆分可以有效的提高代码的复用性和可维护性。

### 父组件给子组件传值
``` javascript
// 父组件
this.state = {
  text: 'sss'
}

<Child
  content={ this.state.text }
/>

// 子组件
<p>{ this.props.content }</p>
```

### 子组件如何修改父组件的数据
::: warning 单向数据流
`React` 的单向数据流的意思是说，所有的数据都只能从父组件传递到子组件，子组件不能直接去修改父组件的数据。
:::
不能直接修改但是可以通过调用父组件传递过来的方法，让父组件去修改自己的 `state` ，从而触发 `render` 执行。
``` javascript
// 父组件
this.state = {
  inputValue: 'sss'
}

inputValueFunc(e) {
  const inputValue = e.target.value;
  this.setState(() => ({ inputValue }))
}

<Child
  inputValue={ this.inputValueFunc.bind(this, e) }
/>

// 子组件
<input onChange={ this.props.inputValue } />
```

这里需要去找找看答案：react 中什么时候使用箭头函数什么时候使用bind去绑定this
- 为了提高性能将所有的 this 绑定写在 constructor 里面


`React` 组件开发的优势
- 声明式开发相对于jquery可以使我们减少大量的dom操作
- react 可以和其他的框架并存
- 组件化可以让react更具维护性
- 单向数据流，父组件可以向子组件传递数据，但是子组件不能修改父组件的数据
- react 只是一个视图层的框架，大型项目还是需要搭配其他的一些插件
- 函数式编程可以更方便的自动化测试

虚拟DOM的理解和diff算法的基础

propTypes 和 defaultProps 的使用

ref 的使用

生命周期
- 声明周期是指在某一个时刻会自动调用执行的函数

初始加载
Initialization
- setup
- state
- props

Mounting
- ComponentWillMount
- render
- ComponentDidMount

组件更新
Updation
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- componentDidUpdate

组件卸载
- componentWillUnmount

react 的性能优化