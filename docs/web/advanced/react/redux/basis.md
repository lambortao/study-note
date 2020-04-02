# Redux
::: tip 为什么要用 Redux
`React` 只是一个视图层的框架，如果涉及到层级非常多的大型项目，那么管理数据将会是非常麻烦的事情，这时候就需要使用到 `Redux`
:::
**使用 `Redux` 和不使用 `Redux` 的区别**
<br />

<img :src="$withBase('/react/redux/index.png')">

在使用 `Redux` 之前，如果下面的一个组件修改了一个数据，而这个数据需要相应到其他层级的组件时，就需要一步步的通过组件去传递。这样是非常麻烦且不利于维护的。

如果使用 `Redux` 的以后， `Redux` 提供了一个公共的 `Store` 来存储所有的公共数据。这时候如果有一个组件修改了数据，那么他会将数据更新到 `Store` ，而其他组件会自动感知到数据的修改，然后从 `Store` 拉取最新的数据。这样的话，不管层级有多深，逻辑都会变得简单明了。

## 三大原则
::: tip Redux 三大原则
1、`store` 必须是唯一的 <br />
2、只有 `store` 可以改变 `store` 的内容 <br />
3、`Reducers` 必须是纯函数。
:::

**什么是纯函数？**<br />
纯函数就是指只要给定固定输入，就一定会有固定输出，且没有副作用的函数。纯函数不会有异步操作和获取时间的操作。`reducer` 中也不允许直接修改 `store` 的内容，只可以返回给 `store` 内容。
## 工作流程
首先来看一张图
<img :src="$withBase('/react/redux/redux-flow.png')">
这张图一共有四个部分
- `React Components` 即组件，为了方便理解可以想象为`借书的人`
- `Action Creators` 即获取 `store` 数据的操作，为了方便理解可以想象成`借书的动作`
- `Store` 即数据存放处，为了方便理解可以想象为`图书馆管理员`
- `Reducers` 即用来保存数据的地方，为了方便理解可以想象为`记录图书存放位置的册子`

首先`借书的人`需要对`图书管理员`说一句话，以用来表达我要借什么书，`图书管理员`听到借书的请求后，他需要去查阅`记录图书存放位置的册子`来找到这本书，找到这边书后，`图书管理员`再将书交给`借书的人`。


## 基础使用
- 作为 `Redux` 中最关键的部件，需要先建立一个 `store` 文件

``` javascript
// store.js

// 首先引入 redux
import { createStore } from 'redux';
// reducers 是用来存放数据的地方
import reducers from './reducers';

// createStore 方法创建一个 store，然后将 reducers 传进去，store 就能获取到数据了，后面那句是开启 Chrome 的 redux-devtools
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);

export default store;
```

- 创建好 `store` 文件后，再来创建一个 `reducers` 文件用来存放数据
::: warning 不要直接在 reducers 中修改 state
`reducers` 可以用来接收数据，接收后将数据进行深拷贝，再对新的数据进行修改，最后返回新的数据，数据将会自动返回给 `store`
:::
``` javascript {16,17}
// reducers.js

// 初始化数据
const defaultState = {
  inputValue: '',
  list: []
}

/**
 * reducers 会返回一个数组，数组接受两个参数
 * state 记录是上一次操作的数据
 * action 是个对象，键名type记录是的用户当前的操作，键名value是操作返回的新数据
 */
export const (state, action) => {
  // 检测用户传过来的操作名称，依次来确定操作哪个数据
  if (action.type === 'change_input_value') {
    // 需要注意的是这里不能直接修改 state，可以将元数据深拷贝一份出来操作
    const newState = _.cloneDeep(state);
    newState.inputValue = action.value;
    // 修改好新的数据后将数据直接返回到 store
    return newState;
  }
}
```

- 组件里面也要进行对应的操作
``` javascript {10,13,32,33,36,42}
// AntdTodo.js 组件

// 获取 store
import store from './store';

class AntdTodo extends React.Component {
  constructor(props) {
    super(props);
    // getState() 方法是 store 的一个方法，他会返回 store 获取到的数据，将 getState() 赋值给 this.state 可以让组件直接获取到 redux 中的值
    this.state = store.getState();
    
    // 一旦store发生变化，store.subscribe 会感知到
    store.subscribe(this.handleStoreChange);

    // 使用 bind 将 this 的指向固定
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
  }

  render() {
    <input
      type="text"
      value={ this.state.inputValue }
      onChange={ this.handleInputChange }
    />
  }

  // input onchange 触发的函数
  handleInputChange(e) {
    // 生成 action，type 对应的是 reducers 中的 action.type
    const action = {
      type: "change_input_value",
      value: e.target.value
    }
    // 固定格式，将 action 传给 store
    store.dispatch(action);
  }

  // store.subscribe 触发的函数，该函数会在 store 发生改变的时候触发
  handleStoreChange() {
    // 直接将 store.getState() 函数直接赋值给 state 即可
    this.setState(store.getState());
  }
}
```

## 抽离 

### actionTypes
从上面的例子我们看到，组件内 `action` 的 `type` 和 `reducers` 中的 `action` 的 `type` 的名字必须要完全吻合，否则 `reducers` 就没有办法知道你需要更新哪一个 `state`。

那这样就会碰到一个问题，因为这里的 `type` 都是使用字符串来定义的，而字符串一旦拼错，在代码中是不会报错的。这样可能会无意识间增加编码成本。

这时候就可以将 `types` 抽离出来作为一个公共的文件来使用。

``` javascript
// redux/actionTypes.js 

export const CHANGE_INPUT_VALUE = 'change_input_value';
```

使用一个常量来定义它，并将它分别引入组件和 `reducers` 内部。

### actionCretor
在上面那个例子中，我们将 `action` 直接定义在了组件中，如果实际业务就像这个例子一样就还好，但是一旦业务复杂起来，这样做将会变得很难维护。这时候就需要将所有的 `action` 抽离出来到一个公共的文件。

``` javascript
// redux/actionCreator.js
import { CHANGE_INPUT_VALUE } from './actionTypes.js'

export const getInputChangeValueFunc = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})
```
这个函数直接返回一个 `action` 对象，他接受一个参数，就是需要修改的 `action` 的值。而组件只需要直接引入该函数，然后将值传进来就好了。

这样的代码相对于上例中的代码，可维护性要提高很多。

## 核心 API 归纳
### createStore
`createStore` 可以帮助我们创建一个 `store`，该函数一般是在 `store.js` 内定义使用。

### store.dispatch
`store.dispatch` 是 `store` 的方法，它用来派发 `action` 给 `store`，这个方法一般是在组件内使用。

### store.getState
`store.getState` 用来获取 `store` 中的所有内容。这个方法一般是在组件内 `constructor` 中直接赋值给 `this.state`。

### store.subscribe
`store.subscribe` 用来订阅监听 `store` 的变化，这个方法接受一个函数，一旦 `store` 发生变化，该方法就会执行接受的函数以响应数据。