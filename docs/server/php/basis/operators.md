# 运算符基础
::: tip 什么是运算符
运算符是可以通过表达式来产生一个值的东西。
:::

运算符可以按照他接受几个值类分类。
- 一元运算符只能接受一个值，通常就是逻辑运算符或递增递减运算符。
- 二元运算符可以直接两个值，常见的加减都是二元运算符。
- 三元运算符多了一个问号

## 运算符的优先级
运算符的优先级决定了两个表达式直接绑定的紧密关系。

必要的时候使用括号可以修改运算符的优先级。哪怕在没有必要使用括号的情况下，使用括号也可以增强脚本的可读性。

如果运算符的优先级相同，那么运算符的**结合方向**决定了该如何运算。
``` php
# - 是左联的
1 - 2 - 3 == (1 - 2) - 3

# = 是右连的
$a = $b = $c
# 等同于
$a = ($b = $c);
```
运算符的优先级详见下表。优先级由高到低排列。
结合方向 | 运算符 | 附加信息
- | - | -
无 |	`clone` `new` |	`clone` 和 `new`
右 | 	`**` | 算术运算符
右 | 	`++` `--` `~` `(int)` `(float)` `(string)` `(array)` `(object)` `(bool)` `@` | 类型、递增／递减、错误控制
无 |	`instanceof` | 类型
右 | 	`!` |	逻辑运算符
左 | `*` `/` `%` | 算术运算符
左 | `+` `-` `.` | 算术运算符 和 字符串运算符
左 | `<<` `>>` | 位运算符
无 |	`<` `<=` `>` `>=` | 比较运算符
无 |	`==` `!=` `===` `!==` `<>` `<=>`	比较运算符
左 | `&` | 位运算符 和 引用
左 | `^` | 位运算符
左 | `|` | 位运算符
左 | `&&` | 逻辑运算符
左 | `||` | 逻辑运算符
右 | 	`??`	`null` | 合并运算符
左 | `?` `:` | 三元运算符
右 | 	`=` `+=` `-=` `*=` `**=` `/=` `.=` `%=` `&=` `|=` `^=` `<<=` `>>=` | 赋值运算符
右 | 	`yield` `from` | yield from
右 | 	`yield` | `yield`
左 | `and` | 逻辑运算符
左 | `xor` | 逻辑运算符
左 | `or` | 逻辑运算符

## 算数运算符
这个就是一般的加减乘除，和 `javascript` 并没有什么区别。
例子 | 名称 | 结果
- | - | -
-$a |	取反 | $a 的负值。
$a + $b	| 加法 | $a 和 $b 的和。
$a - $b	| 减法 | $a 和 $b 的差。
$a * $b	| 乘法 | $a 和 $b 的积。
$a / $b	| 除法 | $a 除以 $b 的商。
$a % $b | 取模 | $a 除以 $b 的余数。
$a ** $b | 求幂 | $a 的 $b次方的值. PHP 5.6版本中引入.

::: tip 除法运算符
除法运算符总是返回浮点数。只有在下列情况例外：两个操作数都是整数（或字符串转换成的整数）并且正好能整除，这时它返回一个整数。 
:::
::: tip 取模运算符
取模运算符的操作数在运算之前都会转换成整数（除去小数部分），取模运算符 `%` 的结果和被除数的符号（正负号）相同。
:::
``` php
echo 5 % 3;
-> # 2

echo 5 % -3;
-> # 2

echo -5 % 3;
-> # -2

echo -5 % -3;
-> # -2
```

## 赋值运算符
基本的赋值运算符是 `=`，他其实并不是等于号，他实际上表达的意思是说把右边表达式的值赋给左边的运算数。

赋值运算符也是有值的，他的值就是所赋的值。根据这个特性，可以有一些小技巧。
``` php
$a = ($b = 4) + 5;
echo $a;
-> # 9

echo $b;
-> # 4
```

### 组合运算符
除了基础的赋值运算符以外，还有适合于所有二元算数、数组集合、字符串运算符的组合运算符。
``` php
$a = 3;
$a += 5;
echo $a;
-> # 8;

$b = 'Hello';
$b .= 'There!';
echo $b;
-> # Hello THere
```

::: tip 到底是引用还是复制？
区别于 `javascript` 中对象和数组都是引用类型。 
<br />

在 `PHP` 中赋值运算符是将原变量的值 **拷贝** 到新变量中，改变其中一个并不会印象另外一个。但是有一个例外，那就是 `Object` ，对象这个东西是引用赋值，除非非常明确的使用了 `clone` 关键字来进行克隆。
<br />

而普通的变量也是可以使用 `&` 符号来将拷贝变成引用的。[点击查看](/server/php/basis/variables.html#引用赋值)
:::

## 位运算符
位运算符允许对整型数中指定的位进行求值和操作。

没看懂 🤦‍♂️。复习的时候再去看看吧。[点击直达](https://www.php.net/manual/zh/language.operators.bitwise.php)

## 比较运算符
比较运算符就是把两个值放在一起比较。

例子 | 名称 | 结果
- | - | -
$a == $b	| 等于 | TRUE，如果类型转换后 $a 等于 $b。
$a === $b	| 全等 | TRUE，如果 $a 等于 $b，并且它们的类型也相同。
$a != $b	| 不等 | TRUE，如果类型转换后 $a 不等于 $b。
$a <> $b	| 不等 | TRUE，如果类型转换后 $a 不等于 $b。
$a !== $b	| 不全等 | TRUE，如果 $a 不等于 $b，或者它们的类型不同。
$a < $b	| 小与 | TRUE，如果 $a 严格小于 $b。
$a > $b	| 大于 | TRUE，如果 $a 严格大于 $b。
$a <= $b	| 小于等于 | TRUE，如果 $a 小于或者等于 $b。
$a >= $b	| 大于等于 | TRUE，如果 $a 大于或者等于 $b。
$a <=> $b	| 结合比较运算符 | 当$a小于、等于、大于than $b时 分别返回一个小于、等于、大于0的integer 值。 PHP7开始提供。

如 `JavaScript` 一样，如果只是简单的双等比较，那么 `PHP` 会对值进行强制类型转换，不会比较值的类型。如果是三等的话则会比较值的类型。

多类型比较的规则见下表。

运算数 1 类型 | 运算数 2 类型 | 结果
- | - | -
`null` 或 `string` | `string` | 将 `NULL` 转换为 ""，进行数字或词汇比较
`bool` 或 `null` | 任何其它类型 | 转换为 `bool` `，FALSE` < `TRUE`
`object` | `object` | 内置类可以定义自己的比较，不同类不能比较，相同类和数组同样方式比较属性（PHP 4 中），PHP 5 有其自己的说明
`string` ， `resource` 或 `number` | `string` ， `resource` 或 `number` | 将字符串和资源转换成数字，按普通数学比较
`array` | `array` | 具有较少成员的数组较小，如果运算数 1 中的键不存在于运算数 2 中则数组无法比较，否则挨个值比较（见下例）
`object` | 任何其它类型 | `object` 总是更大
`array` | 任何其它类型 | `array` 总是更大

**不要对比浮点数**

### 三元运算符
还有就是三元运算符，他和 `JavaScript` 中的是一样的。

### NULL 合并运算符
PHP 7 开始存在 "??" （NULL 合并）运算符。

``` php
// NULL 合并运算符的例子
$action = $_POST['action'] ?? 'default';

// 以上例子等同于于以下 if/else 语句
if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = 'default';
}
```
当 expr1 为 NULL，表达式 (expr1) ?? (expr2) 等同于 expr2，否则为 expr1。


## 错误控制运算符
在任何一个 `PHP` 的表达式前面加上一个 `@` ，那么他将会忽略这个表达式的任何错误。

::: warning 不要滥用
滥用或者不小心输入进去可能会导致你根本找不到你的脚本到底错在了哪里！
:::

## 执行运算符
执行运算符就是在一对反引号中写下一段 `shell` 命令，那么 `PHP` 会尝试使用 `shell` 去执行他。

如果已经激活了安全模式，关闭了 `shell_exec()` 时是无效的。

## 递增 / 递减运算符
和 `JavaScript` 中的是一样的。

例子 | 名称 | 效果
- | - | -
++$a | 前加 | $a 的值加一，然后返回 $a。
$a++ | 后加 | 返回 $a，然后将 $a 的值加一。
--$a | 前减 | $a 的值减一， 然后返回 $a。
$a-- | 后减 | 返回 $a，然后将 $a 的值减一。

## 逻辑运算符
例子 | 名称 | 结果
- | - | -
$a and $b | And（逻辑与） | TRUE，如果 $a 和 $b 都为 TRUE。
$a or $b | Or（逻辑或） | TRUE，如果 $a 或 $b 任一为 TRUE。
$a xor $b | Xor（逻辑异或） | TRUE，如果 $a 或 $b 任一为 TRUE，但不同时是。
! $a | Not（逻辑非） | TRUE，如果 $a 不为 TRUE。
$a && $b | And（逻辑与） | TRUE，如果 $a 和 $b 都为 TRUE。
$a || $b | Or（逻辑或） | TRUE，如果 $a 或 $b 任一为 TRUE。

``` php
// foo() 根本没机会被调用，被运算符“短路”了

$a = (false && foo());
$b = (true  || foo());
$c = (false and foo());
$d = (true  or  foo());

// "||" 比 "or" 的优先级高

// 表达式 (false || true) 的结果被赋给 $e
// 等同于：($e = (false || true))
$e = false || true;

// 常量 false 被赋给 $f，true 被忽略
// 等同于：(($f = false) or true)
$f = false or true;
var_dump($e, $f);
-> # bool(true) bool(false)

// "&&" 比 "and" 的优先级高

// 表达式 (true && false) 的结果被赋给 $g
// 等同于：($g = (true && false))
$g = true && false;

// 常量 true 被赋给 $h，false 被忽略
// 等同于：(($h = true) and false)
$h = true and false;
var_dump($g, $h);
-> # bool(false) bool(true)
```

## 字符串运算符
字符串运算符有两种
- `.` 连接运算符，它返回其左右参数连接后的字符串。
- `.=` 连接赋值运算符，它将右边参数附加到左边的参数之后。

## 数组运算符
例子 | 名称 | 结果
- | - | -
$a + $b | 联合 | $a 和 $b 的联合。
$a == $b | 相等 | 如果 $a 和 $b 具有相同的键／值对则为 TRUE。
$a === $b | 全等 | 如果 $a 和 $b 具有相同的键／值对并且顺序和类型都相同则为 TRUE。
$a != $b | 不等 | 如果 $a 不等于 $b 则为 TRUE。
$a <> $b | 不等 | 如果 $a 不等于 $b 则为 TRUE。
$a !== $b | 不全等 | 如果 $a 不全等于 $b 则为 TRUE。

**`+` 运算符把右边的数组元素附加到左边的数组后面，两个数组中都有的键名，则只用左边数组中的，右边的被忽略。**

## 类型运算符

### instanceof 
`instanceof` 用于确定一个 `PHP` 变量是否属于某一类 `class` 的实例：
``` php
class MyClass{}

class NotMyClass{}
$a = new MyClass;

var_dump($a instanceof MyClass);
-> # true
var_dump($a instanceof NotMyClass);
-> # false
```

`instanceof` 也可用来确定一个变量是不是继承自某一父类的子类的实例
``` php
class ParentClass{}

class MyClass extends ParentClass{}

$a = new MyClass;

var_dump($a instanceof MyClass);
-> # true
var_dump($a instanceof ParentClass);
-> # true
```

使用 `instanceof` 检查对象不是某个类的实例
``` php
class MyClass{}

$a = new MyClass;
var_dump(!($a instanceof stdClass));
-> # true
```

和他一样的还有 [is_a()](https://www.php.net/manual/zh/function.is-a.php) 函数