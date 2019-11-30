---
lang: zh-CN
---
# 原型与原型链
:::tip
JavaScript 本身是一种基于原型继承的语言
:::

## class
- constructor 构建基础
- 方法
- 属性

```js
class Pelole {
  // 构建
  constructor(name, age) {
    // 属性
    this.name = name;
    this.age = age;
  }
  // 方法
  sayHi() {
    console.log(`我叫：${this.name}，我今年${this.age}岁`);
  }
}

// 通过类 new 一个对象/实例
const taozi = new Student('taozi', 28);
console.log(taozi.name);    // => taozi
console.log(taozi.age);     // => 28
taozi.sayHi;                // => 我叫：taozi，我今年28岁
```

### 继承
- extends 关键字
- super 执行父类构造函数
- 重写和扩展父类的方法

**接着上面的class写**
```js
// 继承
class Student extends Pelole {
  constructor(name, number) {
    // 执行父类的的构造函数
    super(name);
    this.number = number;
  }

  // 扩展方法
  study() {
    console.log(`我是学生，我叫${this.name}，我的学号是${this.number}`);
  }
}
const aaa = new Student('aaa', 124);
console.log(aaa.name);    // => aaa
console.log(aaa.number);  // => 124
aaa.study();              // => 我是学生，我叫aaa，我的学号是124
```

## instanceof - 类型判断
### `instanceof` 的规则
``` js
aaa instanceof Student // => true，因为 aaa 是 Student 构建的
aaa instanceof Pelole  // => true，因为 Pelole 是 Student 的父类
aaa instanceof Object  // => true，因为 Object 是所有对象的父类

[] instanceof Array    // => true
[] instanceof Object   // => true，因为 Object 是 Array 的父类
```

### class 的本质
:::tip
两个用 `class` 声明的类，通过 `typeof` 判断发现返回的依然是 `function`<br />
可见 `class` 本质上来说就是构造函数的语法糖
:::
```js
typeof Student // => function
typeof Pelole  // => function
```

## 原型 - 隐式原型和显式原型
:::tip
class `Student` 有一个显式原型，而通过 `Student` new 出来的实例 `aaa` 有一个隐式原型，他们俩其实是指向同一个内存地址。
:::
``` js
console.log(aaa.__proto__); // 隐式原型
console.log(Student.prototype); // 显式原型
console.log(aaa.__proto__ === Student.prototype)
// 执行结果见下图
```
<img :src="$withBase('/basis/ysyx-xsyx.png')">

**原型图**
<img :src="$withBase('/basis/yx.png')">
:::tip
左上侧是定义的class，他有一个显式原型的方法存储在内存中，左下侧是class new出来的实例，它保存自己的属性，同时有一个隐式原型指向class的显式原型。<br> 

**由此可以得出以下结论**
- 每个 `class` 都有一个显式原型 `prototype`
- 每个实例都以一个隐式原型 `__proto__`
- 实例的隐式原型 `__proto__` 指向对应 `class` 的显式原型 `prototype`
:::

#### 基于原型的执行规则
:::tip
- 实例如果要查找属性或者执行方法
- 首先会在自己的属性和方法内寻找
- 如果找不到则会到 `__proto__` 隐式原型中去寻找，而实例的 `__proto__` 隐式原型其实就是 `class` 的显式原型 `prototype`
:::

## 原型链
首先拿之前的代码看一个例子
``` js
// 继承 `People` 的 `Student` 有一个显式原型，而这个显式原型又有一个隐式原型
console.log(Student.prototype.__proto__); 
// `People` 本身就是一个 `class`，所以他也有一个显式原型
console.log(People.prototype); 
// 而 `Student` 显式原型的隐式原型全等于 `People` 的显式原型
console.log(People.prototype === Student.prototype.__proto__);
// 执行结果见下图
```
<img :src="$withBase('/basis/yxl1.png')">

**原型链的解释图**
这个图是上面的原型图扩展出来的，所以从中间开始看
<img :src="$withBase('/basis/yxl2.png')">
:::tip
中间 `Student` 也有一个隐式原型，而这个隐式原型则指向它继承的父类 `People` 的显式原型
:::

### hasOwnProperty
通过 `hasOwnProperty` 可以判断属性是实例自己的，还是从原型链上继承的。
```js
aaa.hasOwnProperty('aaa');    // => true
aaa.hasOwnProperty('sayHi');  // => false
```

### 那 `hasOwnProperty` 又是从哪里来的？
是从 `Object` 那里继承的
<img :src="$withBase('/basis/yxl3.png')">
:::tip
这张图相对上面那张图又做了延伸，`People` 的显式原型也有一个隐式原型，他指向 `Object` 的显式原型。
<br />
<br />
而`Object` 上有很多自己的方法，所以实例 `aaa` 才能 **链式** 的通过原型链的方式去使用 `Object` 的 `hasOwnProperty` 方法。
<br />
<br />
而 `Object` 也有一个隐式原型，不过是指向 `null`，代表原型链到此为止。
:::

#### 通过原型链再来看看 `instanceof` 的工作原理
```js
aaa instanceof Student 
// 可以等同于为
变量1 instanceof 变量2
```
那原理就是
:::tip
`instanceof` 拿**变量1**的*隐式原型*，去匹配**变量2**的*显式原型*
<br/>
如果能匹配到，就返回true，否则就是false
:::