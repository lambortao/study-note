# KOA

## 基础概念
### 注册应用程序对象
``` js
const Koa = require('koa');
const app = new Koa();

// 注册端口，如果端口被占用则会报错
app.listen(3000);
```

### 中间件
中间件其实就是函数。但是函数不能直接在文件中使用，需要注册到应用程序里面
``` js
// 声明一个函数
function test() {
  console.log('Hello World');
}

// 把函数注册到应用程序里面，使之变成一个中间件
app.use(test);

// 或者直接在 use 内写一个匿名函数
app.use(() => {
  console.log('Hello World');
})
``` 
中间件只会在收到请求后才会被执行，且 KOA 默认只会只会执行第一个中间件，想要执行下面的中间件，需要执行 next
``` js
/**
* 如何执行下一个中间件
* @param ctx 上下文
* @param next 下一个中间件函数
*/
app.use((ctx, next) => {
  console.log('第一个中间件');
  next();
})

app.use((ctx, next) => {
  console.log('第二个中间件');
})
```

## 洋葱模型
洋葱圈就是指中间件函数的执行顺序
::: tip
下面函数的打印的结果是 ``` 1、3、4、2  ```
<br />
next() 函数会分割中间件函数，将其从中间分割开来。
<br />
执行顺序为，先正序执行函数中next()的上部分，然后再倒序执行next()的下部分。
:::

``` js
app.use((ctx, next) => {
  console.log('1');
  next();
  console.log('2');
})

app.use((ctx, next) => {
  console.log('3');
  next();
  console.log('4');
})
```
::: warning
因为在 nodejs 中大部分操作为异步操作，所以在中间件中加上 async 和 await 可以保证执行效果
:::
``` js
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
})
```

中间件可以返回值，返回的值会被 nodejs 强制包装成一个 Promise 对象
``` js
app.use((ctx, next) => {
  console.log('1');
  next(); // => Promise { '123' }
  console.log('2');
})

app.use((ctx, next) => {
  console.log('3');
  next(); // => Promise { undefined }
  console.log('4');
  return '123'
})
```

## async await
async 和 await 是成对出现的，如果只写 await 的话，函数会报错
``` js
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
})
```
await 的意义不仅仅是等待，且有求值关键字的意义
``` js
app.use(async (ctx, next) => {
  console.log(1);
  await next(); // => 这里会计算出返回的 promise，如果返回的是个表达式，也会被执行
  console.log(2);
})
```
await  await 会阻塞线程，所以后面如果是一个异步函数，则会表现出同步函数的状态
```js 
app.use(async (ctx, next) => {
  const axios = require('axios');
  const start = Date.now();
  const res = await axios.get('https://zytao.cc/');
  const endTime = Date.now();
  console.log(endTime - start); // => 437 ms
})
```
async 并非没有意义，如果函数被 async 包裹的话，那么该函数返回的接口会被强行包裹成 promise。


看到第二章，第八篇