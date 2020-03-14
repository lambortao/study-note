# `Float` 浮点型
浮点型（也叫浮点数 float，双精度数 double 或实数 real）可以用以下任一语法定义
``` php
$a = 1.123;
$b = 1.2e3;
$c = 7E-10;
```

## 浮点型的比较
::: danger 不要比较
永远不要相信浮点数已精确到最后一位，也永远不要比较两个浮点数是否相等。
:::
如果一定要比较，那么有两种方法。<br />

**方法一：要测试浮点数是否相等，要使用一个仅比该数值大一丁点的最小误差值。该值也被称为机器极小值 `epsilon` 或最小单元取整数，是计算中所能接受的最小的差别值。**
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

## `NAN`
某些数学运算会产生一个由常量 `NAN` 所代表的的结果。此结果代表着一个在浮点数运算中未定义或不可表述的值。任何拿此值与其他任何值（除了 `true`）进行的松散或严格比较的结果都是 `FALSE`。

由于 `NAN` 代表着任何不同值，所以不应该拿 `NAN` 去和其他值进行比较，包括其自身，应该使用 [is_nan()](https://www.php.net/manual/zh/function.is-nan.php) 来检查。
