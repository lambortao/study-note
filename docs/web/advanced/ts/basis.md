# 静态类型

## 基础类型

- null
- undefined
- number
- string
- boolean
- void # 空值

**基础语法**

```typescript
const a: number = 123;
```

这段代码并只是说明 `a` 的静态类型是 `number`，还意味着 `a` 继承了 `number` 类型所有的属性和方法。

## 对象类型

### 对象

```typescript
const man: {
  name: string;
  age: number;
} = {
  name: "小明",
  age: 18,
};
```

### 数组

```typescript
// 创建一个只能包含数字的数组类型
const numberArr: number[] = [1, 2, 3];
```

### 类

```typescript
class Person {}

const tao: person = new Person();
```

### 函数

```typescript
// 创建一个返回值只能是 number 的数组
const getTotal: () => number = () => {
  return 123;
};
```

## 类型注解和类型推断

类型注解就是由我们来告诉 TS 这个变量是什么类型的。
<br />
类型推断就是由 TS 自己去根据上下文推断出来这个值应该是什么类型。
<br />
<br />
::: tip
通常情况下 TS 能推断出一个简单值的类型，如果他能推断出来的话，那就没有必要写类型注解了。但是也有特殊情况，比如一个函数的参数， TS 是没有办法推断出它的类型的，这时候就需要使用类型注解了。
:::
