# 变量

## 基础
`PHP` 中的变量是用一个美元符号后面跟着变量名来标识的。变量名是区分大小写的。正确的变量名是由一个字母或者下划线开头，后面可以是任意数量的数字、字母、下划线。他有一个正则表达式可以来表述。需要注意的是 `$this` 是一个特殊的变量，他不能被赋值。
::: tip 校验变量名的正则式
'[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*'
:::

``` php
# 合法的变量名
$var = 'test';

# 非法的变量名
$1var = 'test';

# 使用中文也是可以的，这个也是合法变量名
$r测试 = 'test';
```

### 传统赋值
变量默认情况下都是传统赋值。通俗点说就类似于 `javascript` 值类型的引用。使用表达式将一个变量的值赋值给目标变量以后，修改目标变量的值，不会影响现有的变量值。
``` php
$test = 'test';
$test1 = $test;
$test = 'testtest';

print_r($test.PHP_EOL);
-> # testtest
print_r($test1);
-> # test

$testArr = array(1, 2);
$testArr1 = $testArr;
array_push($testArr, 3);

print_r($testArr);
-> # Array ( [0] => 1 [1] => 2 [2] => 3 )
print_r($testArr1);
-> # Array ( [0] => 1 [1] => 2 )
```

### 引用赋值
引用赋值这里只是粗略的讲一下，具体要看 [引用类型，暂时缺少链接]() 。

和 `javascript` 的引用类型一样，两个变量只是映射内存地址，修改其中任何一个变量，另一个也会跟着变。不同的是 `PHP` 中的引用类型是自定义的，使用 `&` 符号触发。
``` php
$test = 'test';
$test1 = &$test;
$test = 'testtest';

print_r($test.PHP_EOL);
-> # testtest
print_r($test1);
-> # testtest

$testArr = array(1, 2);
$testArr1 = &$testArr;
array_push($testArr, 3);

print_r($testArr);
-> # Array ( [0] => 1 [1] => 2 [2] => 3 ) 
print_r($testArr1);
-> # Array ( [0] => 1 [1] => 2 [2] => 3 ) 

# 这样的做法是错误的，需要先将表达式赋值给一个变量后才可以进行引用赋值操作
$bar = &(24 * 7);
```

### 初始化变量
在 `PHP` 中并没有强制要求必须要对变量进行初始化，但是初始化变量是一个好的习惯。而没有初始化的变量具有其类型的默认值
- 布尔类型的变量默认值是 `false`
- 整型和浮点型的默认值是 `0`
- 字符串类型的默认是是空字符串
- 数组类型的默认值是一个空数组

### 变量函数 (Variable handling)
变量名 | 简介
 - | -
[boolval](https://www.php.net/manual/zh/function.boolval.php) | 获取变量的布尔值
[debug_zval_dump](https://www.php.net/manual/zh/function.debug-zval-dump.php) | 转储内部zend值的字符串表示形式以输出（机翻）
[doubleval](https://www.php.net/manual/zh/function.doubleval.php) | floatval 的别名
[empty](https://www.php.net/manual/zh/function.empty.php) | 检查一个变量是否为空
[floatval](https://www.php.net/manual/zh/function.floatval.php) | 获取变量的浮点值
[get_defined_vars](https://www.php.net/manual/zh/function.get-defined-vars.php) | 返回由所有已定义变量所组成的数组
[get_resource_type](https://www.php.net/manual/zh/function.get-resource-type.php) | 返回资源（resource）类型
[gettype](https://www.php.net/manual/zh/function.gettype.php) | 获取变量的类型
[import_request_variables](https://www.php.net/manual/zh/function.import-request-variables.php) | 将 GET／POST／Cookie 变量导入到全局作用域中
[intval](https://www.php.net/manual/zh/function.intval.php) | 获取变量的整数值
[is_array](https://www.php.net/manual/zh/function.is-array.php) | 检测变量是否是数组
[is_bool](https://www.php.net/manual/zh/function.is-bool.php) | 检测变量是否是布尔型
[is_callable](https://www.php.net/manual/zh/function.is-callable.php) | 检测参数是否为合法的可调用结构
[is_countable](https://www.php.net/manual/zh/function.is-countable.php) | 验证变量的内容是可计数的值（机翻）
[is_double](https://www.php.net/manual/zh/function.is-double.php) | is_float 的别名
[is_float](https://www.php.net/manual/zh/function.is-float.php) | 检测变量是否是浮点型
[is_int](https://www.php.net/manual/zh/function.is-int.php) | 检测变量是否是整数
[is_integer](https://www.php.net/manual/zh/function.is-integer.php) | is_int 的别名
[is_iterable](https://www.php.net/manual/zh/function.is-iterable.php) | 验证变量的内容是否为可迭代值（机翻）
[is_long](https://www.php.net/manual/zh/function.is-long.php) | is_int 的别名
[is_null](https://www.php.net/manual/zh/function.is-null.php) | 检测变量是否为 NULL
[is_numeric](https://www.php.net/manual/zh/function.is-numeric.php) | 检测变量是否为数字或数字字符串
[is_object](https://www.php.net/manual/zh/function.is-object.php) | 检测变量是否是一个对象
[is_real](https://www.php.net/manual/zh/function.is-real.php) | is_float 的别名
[is_resource](https://www.php.net/manual/zh/function.is-resource.php) | 检测变量是否为资源类型
[is_scalar](https://www.php.net/manual/zh/function.is-scalar.php) | 检测变量是否是一个标量
[is_string](https://www.php.net/manual/zh/function.is-string.php) | 检测变量是否是字符串
[isset](https://www.php.net/manual/zh/function.isset.php) | 检测变量是否已设置并且非 NULL
[print_r](https://www.php.net/manual/zh/function.print-r.php) | 以易于理解的格式打印变量。
[serialize](https://www.php.net/manual/zh/function.serialize.php) | 产生一个可存储的值的表示
[settype](https://www.php.net/manual/zh/function.settype.php) | 设置变量的类型
[strval](https://www.php.net/manual/zh/function.strval.php) | 获取变量的字符串值
[unserialize](https://www.php.net/manual/zh/function.unserialize.php) | 从已存储的表示中创建 PHP 的值
[unset](https://www.php.net/manual/zh/function.unset.php) | 释放给定的变量
[var_dump](https://www.php.net/manual/zh/function.var-dump.php) | 打印变量的相关信息
[var_export](https://www.php.net/manual/zh/function.var-export.php) | 输出或返回一个变量的字符串表示

## 预定义变量
`PHP` 提供了大量的预定义变量。他们在全局范围内自动生效

### 预定义变量和超全局变量
对于全部脚本而言，PHP 提供了大量的预定义变量。这些变量将所有的外部变量表示成内建环境变量，并且将错误信息表示成返回头。

而超全局变量是在全部作用域中始终可用的内置变量
超全局变量 | 变量名 | 简介
- | - | -
✅ | [$GLOBALS](https://www.php.net/manual/zh/reserved.variables.globals.php) | 引用全局作用域中可用的全部变量
✅ | [$_SERVER](https://www.php.net/manual/zh/reserved.variables.server.php) | 服务器和执行环境信息
✅ | [$_GET](https://www.php.net/manual/zh/reserved.variables.get.php) | HTTP GET 变量
✅ | [$_POST](https://www.php.net/manual/zh/reserved.variables.post.php) | HTTP POST 变量
✅ | [$_FILES](https://www.php.net/manual/zh/reserved.variables.files.php) | HTTP 文件上传变量
✅ | [$_REQUEST](https://www.php.net/manual/zh/reserved.variables.request.php) | HTTP Request 变量
✅ | [$_SESSION](https://www.php.net/manual/zh/reserved.variables.session.php) | Session 变量
✅ | [$_ENV](https://www.php.net/manual/zh/reserved.variables.environment.php) | 环境变量
✅ | [$_COOKIE](https://www.php.net/manual/zh/reserved.variables.cookies.php) | HTTP Cookies
✖️ | [$php_errormsg](https://www.php.net/manual/zh/reserved.variables.phperrormsg.php) | 前一个错误信息
✖️ | [$HTTP_RAW_POST_DATA](https://www.php.net/manual/zh/reserved.variables.httprawpostdata.php) | 原生POST数据
✖️ | [$http_response_header](https://www.php.net/manual/zh/reserved.variables.httpresponseheader.php) | HTTP 响应头
✖️ | [$argc](https://www.php.net/manual/zh/reserved.variables.argc.php) | 传递给脚本的参数数目
✖️ | [$argv](https://www.php.net/manual/zh/reserved.variables.argv.php) | 传递给脚本的参数数组

## 变量范围
变量的范围定义了他的上下文背景（是不是就是变量作用域啊？）。大部分的变量是只有一个单独的范围。这个范围也包含了 `include` 和 `require` 引入的文件。

**变量 `$a` 会在 `b.inc` 中生效**
``` php
$a = 1;
include 'b.inc';
```

函数内部是不能读取到外部变量的
``` php
$test = 'test';
function testFunc() {
  echo $test;
}
testFunc();
```
上面这个例子不会输出任何东西。因为在 `testFunc` 的局部变量中是没有 `$test` 这个变量的。

### `global` 关键字
使用 `global` 关键字可以在函数内部使用外部变量。
``` php {3}
$test = 'test';
function testFunc() {
  global $test;
  echo $test;
}
testFunc();
-> # test
```

### `$GLOBALS` 数组
除了使用 `global` 关键字以外，还可以使用超全局变量 `$GLOBALS`，他是一个关联数组，里面包含脚本中所有的变量，键名对应变量名。
``` php {5}
$a = 12;
$b = 13;

function test() {
  echo $GLOBALS['a'] + $GLOBALS['b'];
}

test();
-> # 25
```

### 静态变量
静态变量仅在局部函数作用域中存在，他的特点是在函数执行完之后他的值并不会丢失。这个特性在递归中出奇的好用。
``` php {2}
function test() {
  static $a = 0;
  echo $a;
  $a ++;
}
test();
-> # 0
test();
-> # 1
test();
-> # 2
```

### 全局和静态变量的引用
这一节看不懂啊。。。。先留一个链接，后面补的时候再看吧。[点击跳转](https://www.php.net/manual/zh/language.variables.scope.php)

## 可变变量
可变变量就是一个动态的变量名。一个可变变量就是获取了普通的变量的值，然后把这个值作为自己的可变变量的变量名。
``` php {2,6}
$a = 'hello';
$$a = 'world';

echo "$a";
-> # hello
echo "${$a}";
-> # world
echo "$a ${$a}";
-> # hello world
```
这里会碰到一个问题。当想输出 `$$a[1]` 的时候，解析器需要知道是想要 `$a[1]` 作为一个变量呢，还是想要 `$$a` 作为一个变量并取出该变量中索引为 `[1]` 的值。为了解决这个问题。
- 如果 `$a[1]` 是变量名，那么就写作 `${$a[1]}`
- 如果 `$$a` 是变量名，那么就写作 `${$a}[1]`

## `PHP` 之外的变量

### `HTML` 表单
当一些表单提交给 `PHP` 脚本的时候，表单中的信息会自动在脚本中可用。这里可以使用超全局变量 `$_POST` 和 `$_GET`。

假设前端提交了 `id` 字段。
``` php
# POST 请求
$id = $_POST['id'];

# GET 请求
$id = $_GET['id'];
```
### `HTTP Cookies`
`Cookies` 是一种在远端浏览器端存储数据并能追踪或识别再次访问的用户的机制。`PHP` 中使用 `setcookie()` 函数来设置 `cookies`，使用 `$_COOKIE` 超全局变量来读取。 `Cookies` 是 `HTTP` 信息头中的一部分，因此 `SetCookie` 函数必须在向浏览器发送任何输出之前调用。
