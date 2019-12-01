---
lang: zh-CN
---
# 作用域与闭包
:::tip
没有比这个更重要的东西了
:::

## 作用域和自由变量
:::tip
作用域其实就是一个变量或者函数能合法使用的范围
:::
<img :src="$withBase('/basis/zyy.png')">

### 作用域分为
#### 全局作用域
在全局定义的变量，他的作用域是全局，在哪里都能用，如系统默认的 `window` 方法就是全局作用域。

#### 函数作用域
在一个函数内被定义的变量，他的作用域仅限于这个函数内部，如上图所示。

#### 块级作用域
ES6 新增，是指被一个大括号所包裹的作用域，定义块级作用域变量的关键字是 `let` 和 `const`

### 自由变量
::: tip
如果一个变量被使用，但是在当前作用域没有找到定义，那么他就是一个自由变量。
:::
一个变量如果在当前作用域下没有被定义的话，他会一级一级的向上级作用域去寻找。<br />
如果找到全局作用域还没有找到的话则会报错，`xxx is not defined`;

## 闭包
闭包是作用域应用的特殊情况，有如下两种表现：

### 函数作为参数被传递
```js
function print(fn) {
  let a = 200;
  fn();
}
let a = 100;
function fn() {
  console.log(a); // => a 是自由变量，会到它的上级作用域寻找定义
}

print(fn); // => 100
```

### 函数作为值被返回
```js
function creat() {
  const a = 100;
  return function() {
    console.log(a); // => a 是自由变量，会到它的上级作用域寻找定义
  }
}

const a = 200;
const func = creat();
func() // => 100;
```

:::danger 非常重要且容易犯错！！！
所有的自由变量的查找，都是在函数 **定义** 的地方开始查找，而不是函数执行的地方！
:::

### 闭包的应用
#### 闭包可以隐藏数据，仅提供 `API` 操作
```js
function createCache() {
  const data = {}; // 在 createCache 函数作用域下被保护
  return {
    set: function(key, val) {
      data[key] = val;
    },
    get: function(key) {
      return data[key];
    }
  }
}
const fn = createCache();
fn.set('age', 20);
console.log(fn.get('age')); // => 20
```
在上面这个例子中，是没有办法直接去修改 `creatCache` 函数中的对象的，但是通过闭包的形式返回出两个对象方法，就可以通过这两个方法，在全局作用域下操作和访问到 `creatCache` 函数内部的对象。

## this
:::danger 在何时取值
`this` 取什么值，是在函数 **执行** 的时候确认的，而不是在定义的时候。
:::
### 作为普通函数被使用
```js
function fn() {
  console.log(this);
}
fn(); // => window
```
:::tip
函数 `fn` 是在全局作用域被执行的，所以它的 `this` 指向就是 `window` 对象。
:::

### 使用 `call` `apply` `bind` 时被调用
:::tip
方法内传入什么，`this` 就绑定什么。
:::
#### call
```js
fn.call({a: 1000}); // => {a: 1000}
```
`call` 的特性是调用的时候就会立即执行，且会修改 `this` 的作用域。<br />
而使用关键字 `call` 来执行函数 `fn`，它的 `this` 指向就是它传进去的对象。
#### bind
```js
const fn1 = fn.bind({a: 1000});
fn1(); // => {a: 1000}
```
`bind` 和 `call` 特性不一样，它会返回一个新的函数去执行，但同时也会修改 `this` 的指向。
::: warning 关注点
需要把 `call` `apply` `bind` 这三个东西重新看一看
:::


### 作为对象方法被调用
```js
const taozi = {
  name: 'taozi',
  sayHi() {
    console.log(this); // => 指向是当前 `taozi` 这个对象
  },
  wait() {
    setTimeout(function() {
      console.log(this); // => 这里的指向是 `window`!!!
    })
  }
}
```
:::tip
在 `taozi` 这个对象中，`sayHi` 方法执行的地方就是在对象内部，所以这个 `this` 的指向就是它当前的这个对象。
:::
<br />
而 `wait` 方法比较特殊，他虽然在变量内部被定义，但是它内部的那个 `this`是 `setTimeout` 去执行的，而不是`wait` 方法，定时器的执行方式是在全局作用域上执行，所以该 `this` 的指向就是 `window`。

### 在 `class` 中被调用
```js
class Pelole {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log(this);
  }
}

const taozi = new Pelole('taozi', 20);
taozi.sayHi(); // => 指向的是 `taozi` 这个实例
```
:::tip
`class` 也就是构造函数中，`this` 的指向是 new 它的那个实例。
:::

### 在箭头函数中被调用
```js
const taozi = {
  name: 'taozi',
  sayHi() {
    console.log(this); // => 指向是当前 `taozi` 这个对象
  },
  wait() {
    console.log(this); // 这里是下面那个定时器的上级作用域，所以指向是 `taozi` 这个对象
    setTimeout(() => {
      console.log(this); // => 这里的指向是 `taozi` 这个对象
    })
  }
}
```
这个对象和👆那个对象很像，但是有一点区别就是 `wait` 方法中的 `setTimeout` 内的函数，使用了箭头函数去执行。
:::tip 箭头函数中 this 的特性
箭头函数中的 `this` 永远是取它上级作用域的 `this`。
:::
