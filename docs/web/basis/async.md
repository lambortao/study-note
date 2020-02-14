---
lang: zh-CN
---
# 异步与单线程
:::tip
JavaScript 是一门单线程语言，一次只能做一件事。因为单线程所以带来了异步功能。
:::
- js 是一门单线程语言，一次只能做一件事
- 浏览器和 nodejs 已经支持启动 js **进程**
- js 和 DOM 渲染公用一个进行，因为 JS 可以修改 DOM 结构
- 遇到等待（如网络请求，定时任务）页面不能卡着不动
- 因为需要异步

## 异步和同步
- 根据 JS 的特性
- 异步不会阻塞代码执行，如定时器和网络请求
- 同步会阻塞代码执行，如`alert()`

## callback
使用 `ajax` 获取多重数据，非常的难受，因为多重嵌套，又被成为 **回调地狱**
```js
// 首先获取 data1 
$.get(url1, (data1) => {
  console.log(data1);

  // 根据 data1 获取 data2
  $.get(url2, (data2) => {
    console.log(data2);

    // 根据 data2 获取 data3
    $.get(url3, (data3) => {
      console.log(data3);
      // 可能会有更多
    })
  })
})
```

## Promise
使用 `Promise` 获取多重数据，依然是回调的形式，但是已经不用嵌套了。
```js
// 定义一个 getdata 函数
function getData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      success(data) {
        // 执行成功后调取 resolve 会执行 .then 的回调
        resolve(data);
      },
      error(err) {
        // 执行失败后调取 reject 会执行 .catch 的回调
        reject(err);
      }
    })
  })
}

// 使用 getdata 函数
const url1 = './data1.json';
const url2 = './data2.json';
const url3 = './data3.json';

// 执行成功，调取 .then
getData(url1).then(res => {
  console.log(res);
  // return 回一个 promise 可以实现链式调用
  return getData(url2);
}).then(res => {
  console.log(res);
  return getData(url3);
}).then(res => {
  console.log(res);
}).catch(error => {
  // 执行失败，调取 .catch
  console.log(error);
})
```

## async await
:::tip
一个更好的异步解决方案。将异步代码变成同步！
:::

```js
// 新建一个 ajax 函数
function ajax(url, data) {
  // 返回一个 promise
  return new Promise((res, rej) => {
    $.ajax({
      url,
      data
    }).success(res => {
      res(res)
    }).error(error => {
      rej(error)
    })
  })
}

async function getData() {
  try{
    // 根据 data0 去拿 data1 的值，根据 data1 返回的值去拿 data2 ...
    let data1 = await ajax(url1, data0);
    let data2 = await ajax(url2, data1);
    let data3 = await ajax(url3, data2);
  } catch (error) {
    // 捕获 ajax 函数中的错误
    console.log(error);
  }
}

getData();
```

::: warning 等待
现在只有一些很基础的使用，关于 promise async await 还有很多知识点要看，要找。
:::