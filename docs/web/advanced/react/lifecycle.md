# React 生命周期
[生命周期图谱](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)


以下是按照顺序来写的。
## 挂载时

### constructor
严格来说 `constructor` 并不属于 `React` 生命周期中的一个，因为他是 `javascript` 的 `class` 语法糖中的一个方法。

他在组件被挂载时立即执行，`state` 就是在这里面定义的。如果不需要定义 `state` 的话，你可以不写 `constructor`

### componentDidMount
`componentDidMount()` 会在组件挂载后（插入 `DOM` 树中）立即调用。依赖于 `DOM` 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。