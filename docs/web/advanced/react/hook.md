# Hooks
::: tip 什么是 Hooks
Hooks 就是让一个函数组件具有类组件的能力
:::
区别于之前写的组件，使用 `Hooks` 可以不使用 `Component` 定义组件，而是直接使用函数来定义。

在此之前，函数返回的组件只能是一个 [无状态组件](/web/advanced/react/component.html#无状态组件)。 

::: warning 命名方式
函数组件的命名必须以大驼峰的方式命名。
:::

## useState
使用 `useState` 可以创建一个状态，这个状态等同于之前使用 `class` 时使用 `this.state` 的状态
``` javascript {4}
import React, { useState } from 'react';

function MyHooks() {
  const [count] = useState(0); 
  return <div>{ count }</div>
}

export default MyHooks;
```
<br />

`useState` 会返回两个参数，通过解构的方式赋值给两个变量，第一个变量是状态，第二个变量是修改个状态的方法
``` javascript {4,5}
import React, { useState } from 'react';

function MyHooks() {
  const [count, setCount] = useState(0);
  return <div onClick={ () => setCount( count + 1 ) } >{ count }</div>
}

export default MyHooks;
```
<br />

`useState` 的第二个方法有两种使用场景
- 直接将设置的值传入括号内进行设置，如上例中的 `setCount`，这样的话，括号内的 `count` 并不会获取到当前最新的值
- 接受一个函数，函数的参数就是当前该状态的最新值。
``` javascript
setCount(count => count + 1);
```

## useReducer
`useReducer` 是 `useState` 的一个基类方法。 `useState` 其实就是 `useReducer` 的一个封装。它的使用方式类似 `redux` 的 `reducer`。

`useReducer` 接受两个参数
- 第一个是定义的 `dispatch` 方法
- 第二个是首次定义的值。

``` javascript {17,18}
import React, { useReducer } from 'react';

function countReducer(state, action) {
  switch(action.type) {
    case 'add':
      return state + 1;

    case 'minus':
      return state - 1;

    default:
      return state;
  }
}

function myHooks() {
  const [count, dispatchCount] = useReducer(countReducer, 0);
  return <div onClick={ () => dispatchCount({ type: 'add' }) }>{ count }</div>
}
```
区别于 `useState` ,`useReducer` 根据 `dispatchCount` 传入的不同 `type` 来决定当前的操作，适用范围会更广一些。


## useEffect
`useEffect` 类似之前的声明周期函数，他会在组件 **挂载后** 或者 **函数内定义的值发生变化时** 执行。可以在这里面写一个异步请求函数。

`useEffect` 接受两个参数。
- 第一个参数是函数，函数内写着你要修改的值，函数还接受一个返回值，该返回值也是一个函数，而返回的这个函数会在组件卸载的时候执行。可以在返回的这个函数里写一些终止异步请求的方法，以防内存泄漏。
- 第二个参数是一个数组，数组内接受一个值，这个值的作用是如果值没有发生变化的话，那么该 `useEffect` 将不会被运行。`react` 官方建议将这个 `useEffect` 使用到的所有状态值都写到这个数组内，以防止状态更新不及时。也不能不写，不写的话会造成性能的浪费，如果该 `useEffect` 没有使用到状态值的话，就直接传一个空数组即可。

``` javascript {6,11,12}
import React, { useState, useEffect } from 'react';

function MyHooks() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intelval = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);

    return () => clearInterval(intelval);
  }, [count])

  return <div>{ count }</div>
}
```

## useRef
使用 `useRef` 可以获取到 `DOM` 节点。

``` javascript {4,5}
import React, { useRef } from 'react';

function GetRef() {
  const divRef = useRef();
  return <div ref={ divRef }>test content</div>
}
```