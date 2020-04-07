# Redux 中间件
<img :src="$withBase('/react/redux/redux-data-flow.png')">

::: tip 什么叫做 Redux 中间件？
如上图所示，中间件就是 `action` 到 `store` 的中间。

中间件扩展了 `store` 的 `dispatch` 方法。最原始的 `dispatch` 方法只接受一个对象，他接受到一个对象后，他会直接传递给 `store`。
:::

## React-thunk
`React-thunk` 其实就只做了一件事，就是将 `store.dispatch` 接受的参数种类从 **只能接受一个对象** 扩展成了也 **可以接受函数**， `store.dispatch` 检查到接受的参数是函数后，会自动执行该函数，而该函数内可以用来写异步请求。

**如何将 `redux-thunk` 和 `redux-devtools` 一起使用**
``` javascript
// store.js

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(
  reducers,
  enhancer
);

export default store;
```

**在组件中使用 `redux-thunk`**
``` javascript {5}
// JSX 

const action = getInitList();
// 此时的 action 已经是从 getInitList 接受到的函数，而并非之前的对象
store.dispatch(action);
```

**在 `actionCreate.js` 中写异步函数供 `redux-thunk` 调用**
``` javascript {9}
// actionCreate.js

export const getInitList = () => {
  return (dispatch) => {
    setTimeout(() => {
      const data = ['hello', 'world'];
      const action = initListAction(data);
      // store.dispatch 会传过来一个 dispatch 方法，这里可以直接调用，用来派发请求
      dispatch(action);
    }, 500);
  }
}

export const initListAction = (value) => ({
  type: INIT_LIST_ACTION,
  value
});
```

## React-saga
`React-saga` 会自动捕捉 `dispatch` 的派发，在获取到指定的 `action` 后就执行指定的函数。而这个函数里面一般都是异步函数。

**如何将 `redux-thunk` 和 `redux-devtools` 一起使用**
``` javascript
// redux-sage

import createSagaMiddleware from 'redux-saga'
import mySaga from './mySaga';
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers( applyMiddleware(sagaMiddleware) );

const store = createStore(
  reducers,
  enhancer
);

sagaMiddleware.run(mySaga)

export default store;
```

**创建一个 `mySaga.js` 文件**
``` javascript {13,19}
// mySage.js

import { takeEvery, put } from 'redux-saga/effects';
import {
  GET_INIT_LIST
} from './actionTypes';
import { initListAction } from './actionCreator'

// 初始执行的 generator 函数
function* mySaga() {
  // takeEvery 用来捕获 dispatch 的派发
  // 在检测到 GET_INIT_LIST 这个 action 后就执行 getInitList 函数
  yield takeEvery(GET_INIT_LIST, getInitList);
}

function* getInitList() {
  const action = initListAction(['hello', 'world']);
  // put 方法等同于 store.dispatch
  yield put(action); 
}

export default mySaga;
```