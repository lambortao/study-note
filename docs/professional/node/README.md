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
![avatar](https://camo.githubusercontent.com/d80cf3b511ef4898bcde9a464de491fa15a50d06/68747470733a2f2f7261772e6769746875622e636f6d2f66656e676d6b322f6b6f612d67756964652f6d61737465722f6f6e696f6e2e706e67)
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

## 上下文
在中间件中传值使用上下文 `ctx`
```js {4}
// 中间件 1
app.use(async (ctx, next) => {
  await next();
  const r = ctx.r;
  console.log(r);
})
```
```js {5}
// 中间件 2
app.use(async (ctx, next) => {
  const axios = require('axios');
  const res = await axios.get('https://zytao.cc/');
  ctx.r = res;
})
```

## koa-router

### router 的基础使用
```js
// 首先要引入 router
const router = new Router();

// 监听URL
router.get('/classic/latest', (ctx, next) => {
  ctx.body = {
    key: 'test'
  }
})

// 把中间件注册到 use 上
app.use(router.routes());
```

### 路由可以分不同的目录进行编写。
  - 在子目录编写路由要先引入`koa-router`
  - 子目录别忘记导出 `module.exports = router`
  - 不要在子目录中引入入口文件，避免循环引用
  - 不要忘记在入口文件中注册路由

### 使用 `require-directory` 来自动注册路由
```js 
// 引入模块
const requireDirectory = require('require-directory');
/**
 * 加载路由
 * @param module 固定模块
 * @param { string } 需要导入的路由路径，可以直接导入所有路由的总目录
 * @param { object } 每当函数加载到模块后，都会执行该对象，该对象有一个 visit，他可以接受一个函数。
 */
requireDirectory(module, './api/', {
  visit: whenLoadModule
})

// 回调函数
function whenLoadModule(obj) {
  // 判断是否是路由，如果是的话就挂载到 use
  if (obj instanceof Router) {
    app.use(obj.routers())
  }
}
```

## 获取接口参数
```js
router.post('/api/:id/class', (ctx, next) => {
  // 获取URL内的参数，如上面这个:ID
  const path = ctx.param;
  // 获取查询参数，就是问好后面那个
  const query = ctx.request.query;
  // 获取头部的参数，一般用来传 token
  const headers = ctx.request.header;
})

```
获取body中的参数，需要安装插件`koa-bodyparser`，然后需要将插件注册到koa
```js
// 在入口文件中
const bodyparser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyparser());

// 在接口中
const body = ctx.request.body;
```

## 接口异常处理
看晕了，看到了 4-3