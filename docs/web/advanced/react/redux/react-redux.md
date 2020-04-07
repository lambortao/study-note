# React-redux
`React-redux` 优化了 `redux` 的使用体验。它封装了很多 `API` 来帮助使用 `redux`。

## Provider
`Provider` 是 `react-redux` 提供的核心 `API` ，他可以直接连接 `store` 。

下面这段代码的意思是说在 `Provider` 内部的组件都能获取到 `store` 里面的数据。
``` javascript
// 入口的 index.js 文件

import { Provider } from 'react-redux';
import store from './store';

const App = (
  <Provider store={store} >
    <ReactRedux />
  </Provider>
);

ReactDOM.render( App, document.getElementById('root') );
```

## connect
**组件的代码**
::: tip 详解
- **使用 `connect` 方法让组件和 `store` 做链接。组件是 `connect` 的第三个参数** 
- **`mapStateToProps` 是他们的映射关系。负责把 `store` 里面的数据映射到组件的 `props` 里面** 
- **`mapDispatchToProps` 是记录组件如何修改 `props` 的数据**
:::
``` javascript
// 组件
import { connect } from 'react-redux';

function TodoList (props) {
  return (
    <div>
      <div>
        <input 
          type="text" 
          value={ props.inputValue } 
          onChange={ props.handleInputChange }
        />
      </div>
    </div>
  )
}


/**
 * 把 store 里面的数据映射到组件的 props 里面
 * @param {*} state store 中的数据 
 */
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

/**
 * store.dispatch 
 * @param {*} dispatch store 的派发方法
 */
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      const action = {
        type: "change_input_value",
        value: e.target.value
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

**store部分的代码和平常的代码是一样的**

引入 `redux` 和接受 `reducer` 
``` javascript
// store.js

import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);

export default store;
```

**reducer的代码和平时也是一样的**

接受 `action` 判断 `action` 来修改 `state`
``` javascript
const defaultState = {
  inputValue: '',
  list: []
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  if (action.type === 'change_input_value') {
    newState.inputValue = action.value;
    return newState;
  }
  return state;
}
```