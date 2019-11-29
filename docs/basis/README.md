---
lang: zh-CN
---
# 变量类型和计算

## 变量类型

### 值类型
值类型变量是存储在内存的`栈`中，每个值类型都会有一个对应的位置用来存储变量，且不会相互干扰。
```js
let a = 100;
let b = a;
a = 200;
console.log(a); // => 200
console.log(b); // => 100
```
<img :src="$withBase('/basis/zlx.png')">

#### 有哪些值类型
```js
let a               // => undefined
let s = 12          // => number
let d = '12'        // => string
let f = true        // => boolean
let g = Symbol('s') // => symbol
```

### 引用类型
引用类型变量是存储在内存的`堆`中，每个变量指向的并不是那个变量的值，而是一个内存地址，如果两个变量同时指向一个内存地址，那他们的值其实是一样的。
```js
let a = { age: 20 }
let b = a;
a.age = 21;
console.log(a.age); // => 21
console.log(b.age); // => 21
```
<img :src="$withBase('/basis/yylx.png')">

#### 有哪些引用类型
```js
// object
const a = { age: 20 }

// array
const b = [1, 2]

// null 是一个特殊的引用类型，他的意思是指向一个空地址
const c = null;

// function 是一个特殊的引用类型，他不能用来存储数据或者做拷贝复制动作，或者也可以称函数是一个函数类型
const d = function() {}
```
#### 为什么值类型和引用类型的赋值和存储机制不一样？- 本质
因为 **性能和占用空间** 的问题，值类型只有一个简单的值，赋值并不会占用太多的空间；而引用类型则不一样，他可能会占用非常大的空间或者赋值的过程会非常的慢。

### 深拷贝
为什么要深拷贝？因为我们需要将引用类型实现值类型的特征。<br />
和深拷贝对应的是浅拷贝，浅拷贝就是直接复制，指向同一个内存地址。
``` js
// 浅拷贝，指向同一个内存地址
let a = { age: 20 }
let b = a;
console.log(b === a); // => true
```
#### 实现一个深拷贝函数<br />
:::tip
原理是因为`javascript`在赋值`值类型`的时候不会引用内存地址<br/>
所以就先新建一个引用类型，然后将需要深拷贝的引用类型暴力破解开，递归循环到获得的值是值类型的时候，再将获得到的值类型赋值到新的引用类型下。
:::
``` js
/**
 * 深拷贝
 * @param obj 需要拷贝的对象或数组
 */
function deepClone(obj) {
  // 如果不是对象或数组，或者是null，则直接返回结果
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {}
  }

  // 数组和对象都有 forin 方法
  for (const key in obj) {
    // 为了保证 key 不是原型上的 key
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      // 递归循环，为了防止有深层次的结构存在
      result[key] = deepClone(element);
    }
  }
}
```

### typeof 运算符

#### 可以识别所有的值类型
``` js
let a;                typeof a // => undefined
let s = 12            typeof s // => number
let d = '12'          typeof d // => string
let f = true          typeof f // => boolean
let g = Symbol('s')   typeof g // => symbol
```

#### 可以识别函数
```js
typeof console.log    // => function
typeof function(){}   // => function
```

#### 可以识别出引用类型
但是不能识别究竟是对象还是数组，要区分的话需要点击到**原型链**。
```js
let n = null;         typeof n // => object
let d = [1, 2, 3]     typeof d // => object
let f = { age: 20 }   typeof f // => object
```

## 变量计算

### 强制类型转换

### == 运算符
什么时候应该用 `==` 什么时候用 `===` ？<br />
除了 `== null` 之外的地方，全部都用 `===`
``` js
let a;
// 下面两个运算符的功能是一样的，上面的算是简写。
if (a == null) {}
if (a === null || a === undefined) {}
```

### `if` 语句和逻辑运算符
::: tip
进行两步非运算结果为 `true` 的成为 `truly` 变量 <br />
进行两步非运算结果为 `false` 的成为 `falsely` 变量 <br />
:::

#### 以下为所有的 `falsely` 变量，除此之外，其他的都是 `truly` 变量
```js
!!0 === false;
!!NaN === false;
!!'' === false;
!!undefined === false;
!!false === false;
!!null === false;
```
#### 与或非逻辑判断
``` js
console.log(10 && 0);       // => 0，返回 falsely 变量
console.log('' || 'abc');   // => 'abc'，返回 truly 变量
console.log(!window.abc);   // => true，取反
```
::: tip
`if` 语句和与或非逻辑判断其实就是在判断 `truly` 和`falsely` 类变量
:::