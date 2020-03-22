# 函数

## 用户自定义函数
任何有效的代码都可以出现在函数的内部，包括函数本身还有类的定义。

在 `PHP` 中所有的函数都在全局作用域。也无所谓执行的先后顺序。

但是有一个问题就是，如果某个函数在一个条件判断内，且条件判断没有执行的话，该函数会无法执行。

`PHP` 不支持函数重载，也不可能取消定义或者重定义已声明的函数。

## 函数的参数
通过参数列表可以传递信息到函数，即以逗号作为分隔符的表达式列表。

### 通过引用传递参数
一般情况下，传进去函数内部的变量在函数内部被修改，是不影响该变量在函数外部的值的。

如果想让他们有绑定关系的话，可以在函数参数前面加一个 `&` 符号。

```php {1}
function add_func(&$text) {
  $text .= 'world';
}

$str = 'hello';
add_func($str);
echo $str;
-> # helloworld
```

### 默认的参数值
- `PHP` 允许设置参数的默认值。有以下几点注意事项。
- `PHP` 允许使用数组或者 `NULL` 来作为默认参数值。
- 默认值必须是常量表达式，不能是变量、类、函数调用之类。
- 使用默认参数值的时候，所有 **包含默认参数值** 的参数必须要放在 **没有默认参数值** 的 **右侧**。

### 类型声明
类型声明允许函数在调用时要求参数为特定类型。 如果给出的值类型不对，那么将会产生一个错误： 在PHP 5中，这将是一个可恢复的致命错误，而在PHP 7中将会抛出一个TypeError异常。

这里有很多没翻译，没看懂，等复习的时候再看吧。[点击直达](https://www.php.net/manual/zh/functions.arguments.php#functions.arguments.type-declaration)

### 可变数量的参数列表
`PHP` 允许传入数量不一定的参数列表。在 `PHP 5.6` 以上的版本中是使用 `...` 来实现的。

``` php {1}
function sum(...$numbers) {
    $acc = 0;
    foreach ($numbers as $n) {
        $acc += $n;
    }
    return $acc;
}

echo sum(1, 2, 3, 4);
-> # 10
```

``` php {5,8}
function add($a, $b) {
    return $a + $b;
}

echo add(...[1, 2])."\n";

$a = [1, 2];
echo add(...$a);
```
还有 
- [func_num_args](https://www.php.net/manual/zh/function.func-num-args.php) 
- [func_get_arg](https://www.php.net/manual/zh/function.func-get-arg.php) 
- [func_get_args](https://www.php.net/manual/zh/function.func-get-args.php)

## 返回值

## 可变函数

## 内置函数

## 匿名函数