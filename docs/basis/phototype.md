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

## 继承
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