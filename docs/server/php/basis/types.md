# 类型
`PHP` 支持9个原始数据类型。

**四种标量类型** <br />
类似 `javascript` 的值类型
- `boolean` 布尔型
- `integer` 整型
- `float` 浮点型，也叫 `double`
- `string` 字符串

**三种复合类型** <br />
类似 `javascript` 的引用类型
- `array` 数组
- `object` 对象
- `callable` 可调用

**两种特殊类型**
- `resource` 资源
- `NULL` 无类型

::: tip 变量类型
一个变量的类型并不是由开发者设定的。而是由 `PHP` 在上下文中执行的时候决定的。
:::
<br />

#### `var_dump()`
可以使用 `var_dump()` 函数来查看变量的类型和值。
``` php
$a = 'test';
var_dump($a);

-> # string(4) "test"
```

#### `gettype()`
如果要简单的获取某个变量的类型，可以使用 `gettype()` 函数。
``` php
$a = 'test';
echo gettype($a);

-> # string
```

#### `is_*()`
如果要检验变量类型的话就不要用 `gettype()` 函数，而是使用 `is_*` 函数。`is_*` 并不是一个函数名，`is_` 是固定格式，后面的 `*` 则代表类型。他返回的结果是一个布尔值。
``` php
is_array(); # 是否为数组
is_bool(); # 是否为布尔值
is_float(); # 是否为浮点数
is_integer(); # 是否是整型
is_int(); # 是否是整型
is_null(); # 是否是 NULL
is_numeric(); # 是否为数字或数字字符串
is_object(); # 是否是对象
is_resource(); # 是否是资源类型
is_scalar(); # 是否是标量
is_string(); # 是否是字符串
```

## `Boolean` 布尔类型
要指定一个布尔值，使用常量 `TRUE` 或 `FALSE`。他们两个是不区分大小写的。

### 布尔值的强制类型转换
在一个变量前面加 `(bool)` 或者 `(boolean)` 可以强制转换为布尔值。<br />
以下值在转为布尔值的时候会转为 `false`
- `false` 本身。
- 整型 `0`
- 浮点型 `0.0`
- 空字符串，以及字符串 `0`
- 不包括任何元素的数组
- 特殊类型 `NULL`
- 从空标记生成的 `SimpleXML` 对象

其他都是 `true`

## `Integer` 整型
整型可以使用十进制，十六进制，八进制和二进制。前端加一个 `-` 的负数也属于整型。

### 整型的强制类型转换
在一个变量前面加 `(int)` 或者 `(integer)` 可以强制转换为布尔值。<br />
- `FALSE` 会转换为 0，`TRUE` 会转换为 1。
- 从浮点型转换成整型时，将会向下取整。

::: warning 绝对不要将未知的浮点数强制转换为整型，这样有时会导致结果不可预知。
``` php
echo (int) ((0.1 * 0.7) * 10)

-> # 7
```
:::

- 从字符串转换，[点击查看]();

::: danger 其他类型的转换
没有定义从其它类型转换为整型的行为。不要依赖任何现有的行为，因为它会未加通知地改变。
:::

## `Float` 浮点型
浮点型（也叫浮点数 float，双精度数 double 或实数 real）可以用以下任一语法定义
``` php
$a = 1.123;
$b = 1.2e3;
$c = 7E-10;
```

### 浮点型的比较
::: danger 不要比较
永远不要相信浮点数已精确到最后一位，也永远不要比较两个浮点数是否相等。
:::
如果一定要比较有两种方法。<br />

**方法一：要测试浮点数是否相等，要使用一个仅比该数值大一丁点的最小误差值。该值也被称为机器极小值（epsilon）或最小单元取整数，是计算中所能接受的最小的差别值。**
``` php
$a = 1.23456789;
$b = 1.23456780;
$epsilon = 0.00001;

if(abs($a-$b) < $epsilon) {
  echo "true";
}
```

**方法二：使用 `BC Math` 数学函数。**
- [bcadd](https://www.php.net/manual/zh/function.bcadd.php) 2个任意精度数字的加法计算
- [bccomp](https://www.php.net/manual/zh/function.bccomp.php) 比较两个任意精度的数字
- [bcdiv](https://www.php.net/manual/zh/function.bcdiv.php) 2个任意精度的数字除法计算
- [bcmod](https://www.php.net/manual/zh/function.bcmod.php) 对一个任意精度数字取模
- [bcmul](https://www.php.net/manual/zh/function.bcmul.php) 2个任意精度数字乘法计算
- [bcpow](https://www.php.net/manual/zh/function.bcpow.php) 任意精度数字的乘方
- [bcpowmod](https://www.php.net/manual/zh/function.bcpowmod.php) Raise an arbitrary precision number to another, reduced by a specified modulus (机翻：将任意精度数提高到另一个，以指定的模数减少)
- [bcscale](https://www.php.net/manual/zh/function.bcscale.php) 设置所有bc数学函数的默认小数点保留位数
- [bcsqrt](https://www.php.net/manual/zh/function.bcsqrt.php) 任意精度数字的二次方根
- [bcsub](https://www.php.net/manual/zh/function.bcsub.php) 2个任意精度数字的减法

### `NAN`
某些数学运算会产生一个由常量 `NAN` 所代表的的结果。此结果代表着一个在浮点数运算中未定义或不可表述的值。任何拿此值与其他任何值（除了 `true`）进行的松散或严格比较的结果都是 `FALSE`。

由于 `NAN` 代表着任何不同值，所以不应该拿 `NAN` 去和其他值进行比较，包括其自身，应该使用 [is_nan()](https://www.php.net/manual/zh/function.is-nan.php) 来检查。