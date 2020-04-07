# 使用 `combineReducers` 拆分 `reducer`

::: tip 为什么要拆分？
举例来说，`store` 是图书馆管理员，`reducer` 是记录图书位置的册子。那不可能所有的记录都写在一个本子上，最好的方式是创建目录分册子。

同理，我们不可能把一整个项目的 `store` 全部写到一个 `reducer` 里面，所以就需要拆分开来。
:::

可以给每一个有数据的组件单独创建一个 `reducer`，然后在 store.js 下统一引入。

``` javascript {5}
import { combineReducers } from 'redux';
import todoRedux from '../todo-redux/reducer';

export default combineReducers({
  todo: todoRedux
})
```

::: warning 使用数据的时候要小心
上面的代码里面可以看到我们给 `todoRedux` 这个 `reducer` 取了一个别名叫 `todo` ，那在使用 `todoRedux` 的时候不要忘记在千面加上 `todo`。
:::

``` javascript {5,6}
// 组件中的 mapStateToProps 方法 ，这是一段测试

const mapStateToProps = (state) => {
  return {
    inputValue: state.todo.inputValue,
    list: state.todo.list
  }
}
```