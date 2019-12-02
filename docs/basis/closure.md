---
lang: zh-CN
---
# 作用域与闭包
:::tip
没有比这个更重要的东西了
:::

## 作用域和变量
:::tip
作用域其实就是一个变量或者函数能合法使用的范围
:::
<img :src="$withBase('/basis/zyy.png')">

### 编译原理及变量提升
#### 我们把 JavaScript 称之为动态语言，或者是解释类语言，其实 JavaScript 是一门编译类语言。
JavaScript 引擎并不像其他语言能在构建的时候拥有很多的时间进行编译。而是在执行前，利用极短的时间（通常是几毫秒）去进行预编译。<br />
因此，包括变量和函数在内的所有声明都会在任何代码被执行前首先进行预编译。

#### 变量提升
在函数内部，变量声明、函数声明、this、arguments 会在代码运行前默认前置。
```js
var a = 1;
```
- 看起来这只是一段声明代码。
- 但是JavaScript引擎会把它拆成两部分。
- `var a`，这段是在**编辑阶段**进行的。
- `a = 1`，这段是在**执行阶段**进行的。

例子1：
```js
a = 2;
var a;
console.log(a); // => 2

// 上面这段代码的实际执行顺序如下

var a; // 预编译的变量提升导致声明前置
a = 2;
console.log(a); // => 2
```

例子2：
```js
console.log(a); // => undefined
var a = 2;

// 上面这段代码的实际执行顺序如下

var a; // 预编译的变量提升导致声明前置
console.log(a); // => undefined
a = 2;
```

例子3：**函数声明**
```js
foo(); // => a，函数声明会被默认前置提升！可以在函数声明之前调用，在编译的时候会前置声明。

function foo() {
  var a = 2;
  console.log(a);
}
```

例子4：**函数表达式**
```js
foo(); // => TypeError, foo is not a function

var foo = function() {
  var a = 2;
  console.log(a);
}

/**
 * 区别于函数声明，函数表达式只会前置声明变量 foo 
 * 而 foo 只是声明并没有赋值为函数。
 * foo() 这个操作就是对 undefined 进行非法的函数调用，所以会导致报错
 * 上面实际的执行顺序如下
*/

var foo;

foo(); // => TypeError, foo is not a function

foo = function() {
  var a = 2;
  console.log(a);
}
```

例子五：**具名的函数表达式**
```js
foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
  // do something...
}

// 实际的执行顺序如下

var foo;

foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
  // do something...
}
```

#### 函数优先
函数声明和变量声明都会被提升，但是函数会被首先提升，其次才是变量。
```js
foo(); // => 1

var foo;

function foo() {
  console.log(1);
}

foo = function() {
  console.log(2);
}

// 实际的执行顺序如下

function foo() {
  console.log(1)
}

foo(); // => 1
var foo;

foo = function() {
  console.log(2);
}
```

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
<br />

而 this 永远指向 **最后调用它** 的那个对象。
:::
### 作为普通函数被调用
```js
function fn() {
  console.log(this);
}
fn(); // => window
```
:::tip
函数 `fn` 是在全局作用域被执行的，调用 `fn` 函数的是 `window`, 所以它的 `this` 指向就是 `window` 对象。
<br />
并且，无论这个函数在哪里，只要他是被作为一个函数执行的，那他的 `this` 指向就是 `window`。
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
在 `taozi` 这个对象中，`sayHi` 方法是被 `taozi` 这个对象执行的，所以他的 `this` 是 `taozi`。
<br>
记住开头的那句话：**this 永远指向最后调用它的那个对象**。
:::
<br />
而 `wait` 方法比较特殊，他虽然在变量内部被定义，但是它内部有一个定时器，而那个 `this` 正是由定时器去执行的，而调用 `setTimeout` 这个对象的则是 `window`.

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
箭头函数中的 `this` 永远是 **最近一层非箭头函数** 的 this，这个例子中就是取它上级作用域的 `this`。
:::

## `call` `apply` `bind` 着重看一下

### [apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
`apply()` 方法调用一个具有给定 `this` 值的函数，以及作为一个数组（或类似数组对象）提供的参数。

```js
// 语法
func.apply(thisArg, [argsArray]);
```
参数：
  - thisArg: 可选的。在 `func` 函数运行时使用的 `this` 值。请注意，`this` 可能不是该方法看到的实际值：如果这个函数初始非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换指向全局对象，原始值会被包装。
  - argsArray: 可选的。一个数组或者类数组对象，其中的数组元素将会以参数的形式传给 `func` 函数。如果该参数的值为 `null` 或 `undefined` 则表示不需要传入任何参数。

```js
let a = {
  name: 'cherry',
  fn: function(a, b) {
    console.log(a + b);
  }
}
var b = a.fn;
b.apply(a, [1, 2]); // => 3
```

### [call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
`call` 和 `apply` 的区别就是传入的参数不同而已。
```js
// 语法
func.call(thisArg, arg1, arg2, ...);
```
参数：
  - thisArg: 可选的。在 `func` 函数运行时使用的 `this` 值。请注意，`this` 可能不是该方法看到的实际值：如果这个函数初始非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换指向全局对象，原始值会被包装。
  - arg1, arg2, ... : 执行的参数列表。
```js
let a = {
  name: 'cherry',
  fn: function(a, b) {
    console.log(a + b);
  }
}
let b = a.fn;
b.call(a, 1, 2); // => 3
// 他和 apply 很像，就是参数不一样。
```

### [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，其余的参数则是这个新函数的参数，供调用的时候使用。

```js
function.bind(thisArg, arg1, arg2, ....);
```
参数：
  - thisArg: 调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，则忽略该值。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。
  - arg1, arg2, ... : 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
返回值：
  - 返回一个原函数的拷贝，并拥有指定的`this`值和初始参数。

```js
let a = {
  name: 'cherry',
  fn: function(a, b) {
    console.log(a + b);
  }
}
let b = a.fn;
b.bind(a, 1, 2)(); // => 3
// 相对于 call， 他多了一个执行的过程，因为bind会创建一个新的函数。
```