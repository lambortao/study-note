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

### `NAN`
某些数学运算会产生一个由常量 `NAN` 所代表的的结果。此结果代表着一个在浮点数运算中未定义或不可表述的值。任何拿此值与其他任何值（除了 `true`）进行的松散或严格比较的结果都是 `FALSE`。

由于 `NAN` 代表着任何不同值，所以不应该拿 `NAN` 去和其他值进行比较，包括其自身，应该使用 [is_nan()](https://www.php.net/manual/zh/function.is-nan.php) 来检查。

## `String` 字符串
一个字符串就是由一系列的字符组成的，每一个字符都等同于一个字节。 这意味着 `PHP` 只能支持 256 的字符集，因此不支持 `Unicode`。
<br />

**string 最大可达2GB**

### 语法
一个字符串有四种表达方式。
- 单引号
- 双引号
- heredoc 语法结构
- nowdoc 语法结构

#### 单引号
定义一个字符串最简单的方式是使用一个单引号把他包起来。以下示范了多种字符串的形式，包括如何在单引号内使用单引号和反斜杠。
``` php
// 单行
echo 'this is a simple string';
-> # this is a simple string

// 多行
echo 'You can also have embedded newlines in 
strings this way as it is
okay to do';
-> # You can also have embedded newlines in strings this way as it is okay to do

// 单引号字符串内包含一个单引号
echo 'Arnold once said: "I\'ll be back"';
-> # Arnold once said: "I'll be back"

// 单引号字符串内包含一个反斜杠
echo 'You deleted C:\\*.*?';
-> # You deleted C:\*.*?

// 单引号字符串内不支持转义序列
echo 'This will not expand: \n a newline';
-> # This will not expand: \n a newline;

// 单引号字符串内不支持变量
echo 'Variables do not $expand $either';
-> # Variables do not $expand $either
```

#### 双引号
如果字符串是在双引号内使用的，那么 `PHP` 将对一些特殊字符做转义。
序列 | 含义
  - | -
`\n`  | 换行（ASCII 字符集中的 LF 或 0x0A (10)）
`\r`  | 回车（ASCII 字符集中的 CR 或 0x0D (13)）
`\t`  | 水平制表符（ASCII 字符集中的 HT 或 0x09 (9)）
`\v`  | 垂直制表符（ASCII 字符集中的 VT 或 0x0B (11)）（自 PHP 5.2.5 起）
`\e`  | Escape（ASCII 字符集中的 ESC 或 0x1B (27)）（自 PHP 5.4.0 起）
`\f`  | 换页（ASCII 字符集中的 FF 或 0x0C (12)）（自 PHP 5.2.5 起）
`\\`  | 反斜线
`\$`  | 美元标记
`\"`  | 双引号
`\[0-7]{1,3}`  |  符合该正则表达式序列的是一个以八进制方式来表达的字符
`\x[0-9A-Fa-f]{1,2}`  |  符合该正则表达式序列的是一个以十六进制方式来表达的字符

和单引号字符串一样，转义任何其他字符都会导致反斜杠被显示出来。PHP 5.1.1 以前，`\{$var}` 中的反斜线还不会被显示出来。

::: tip 双引号最重要的特性
用双引号定义的字符串最重要的特性是变量会被解析。
:::

#### Heredoc 结构
第三种表达字符串的方式是使用 `Heredoc` 句法结构：`<<<`。在该标识符后要提供一个标识符，然后换行，然后写字符串本身，最后要用前面定义的标识符本身作为结束标识。

**结束标识必须要在改行的第一列！**，而且标识符的命名规则也要和 `PHP` 命名变量一样遵守准则：能包含字母、数字和下划线，并且必须以字母和下划线作为开头。

::: danger 结束标识需要注意的点
需要注意的是，结束标识这一行除了在标识符后面有一个分号之外是不允许有其他任何字符的。这意味着结束标识符前面不能缩进，后面不许有任何其他东西，包括空格。更重要的是在结束标识符前面必须是一个被本地操作系统认可的换行符。

如果不遵守该规则导致结束标识不“干净”，`PHP` 将认为它不是结束标识符而继续寻找。如果在文件结束前也没有找到一个正确的结束标识符，PHP 将会在最后一行产生一个解析错误。

`Heredocs` 结构不能用来初始化类的属性。自 `PHP` 5.3 起，此限制仅对 `heredoc` 包含变量时有效。
:::

Heredoc 结构就象是没有使用双引号的双引号字符串，这就是说在 heredoc 结构中单引号不用被转义，但是上文中列出的转义序列还可以使用。变量将被替换，但在 heredoc 结构中含有复杂的变量时要格外小心。
``` php
$a = <<<EOC
  You can also have embedded newlines in 
  strings this way as it is
  okay to do
EOC;
```
**讲道理啊，我没看懂这个东西是干嘛用的，为什么不用双引号用这个。但是前段时间在写 `Alfred` 插件的时候看到里面使用了这种语法结构，不明白其中的缘由。所以这个东西没有看懂，先暂时放置**

#### `Nowdoc` 结构
就象 `heredoc` 结构类似于双引号字符串，`Nowdoc` 结构是类似于单引号字符串的。`Nowdoc` 结构很象 `heredoc` 结构，但是 `nowdoc` 中不进行解析操作。这种结构很适合用于嵌入 `PHP` 代码或其它大段文本而无需对其中的特殊字符进行转义。与 `SGML` 的 `<![CDATA[ ]]>` 结构是用来声明大段的不用解析的文本类似，`nowdoc` 结构也有相同的特征。

一个 `nowdoc` 结构也用和 `heredocs` 结构一样的标记 `<<<`， 但是跟在后面的标识符要用单引号括起来，即 `<<<'EOT'`。`Heredoc` 结构的所有规则也同样适用于 `nowdoc` 结构，尤其是结束标识符的规则。

### 变量解析
当变量被双引号或者 `heredoc` 结构包裹时，变量会被解析。

#### 简单语法
简单语法是比较常用的，他可以用最短的代码在一段字符串内嵌入一个变量。
``` php
$a = 'test';
echo "this is $a";

-> # this is test
```

::: tip 小贴士
`PHP_EOL` 是 `PHP` 换行符
:::
也可以插入 `array`
``` php
$juices = array("apple", "orange", "koolaid1" => "purple");

echo "He drank some $juices[0] juice.".PHP_EOL;
-> # He drank some apple juice.

echo "He drank some $juices[1] juice.".PHP_EOL;
-> # He drank som orange juice.

// 错误的表达方式，因为找不到 $juice 这个变量，所以没有对应输出
echo "He drank some juice made of $juice[0]s.".PHP_EOL;
-> # He drank some juice made of s. 

echo "He drank some $juices[koolaid1] juice.".PHP_EOL;
-> # He drack some pruple juice.
```
或者 `object`。
``` php
class people {
  public $john = "John Smith";
  public $jane = "Jane Smith";
  public $robert = "Robert Paulsen";   
  public $smith = "Smith";
}

$people = new people();

echo "$people->john drank some $juices[0] juice.".PHP_EOL;
-> # John Smith drank some apple juice.

echo "$people->john then said hello to $people->jane.".PHP_EOL;
-> # John Smith then said hello to Jane Smith.

echo "$people->john's wife greeted $people->robert.".PHP_EOL;
-> # John smith's wife greeted Robert Paulsen.

// 错误的表达方式，在 $people 对象里找不到 smiths
echo "$people->robert greeted the two $people->smiths.";
-> # Robert Paulsen greeted the two . 
```
如果要表示更复杂的结构，就需要用复杂语法。

#### 复杂语法（花括号语法）
复杂语法并不是以为复杂而得名，而是因为他可以使用复杂的表达式。

任何具有字符串的标量或者变量、数组单元和对象属性都可以使用该语法。只需要在字符串里面写出表达式，然后使用 `{}` 包起来就可以了。
::: warning 需要注意的
由于 `{` 无法被转义，只有 `$` 紧挨着 `{` 时才会被识别。可以用 `{\$` 来表达 `{$`。
:::

``` php
$great = 'fantastic';

// 错误的
echo "This is { $great}";
-> # This is { fantastic}

// 正确的
echo "This is ${$great}";
echo "This is {$great}";
-> # This is fantastic

// 正确的
echo "This square is {$square->width}00 centimeters broad.";
-> # This square is 100 centimeters broad.

// 正确的，只有通过花括号语法才能正确解析带引号的键名
echo "This works: {$arr['key']}";

// 正确的
echo "This works: {$arr[4][3]}";

// 这是错误的表达式，因为就象 $foo[bar] 的格式在字符串以外也是错的一样。
// 换句话说，只有在 PHP 能找到常量 foo 的前提下才会正常工作；这里会产生一个
// E_NOTICE (undefined constant) 级别的错误。
echo "This is wrong: {$arr[foo][3]}";

// 错误的
echo "This is the return value of getName(): {getName()}";
-> # This is the return value of getName(): {getName()}
```

也可以在字符串中用此语法通过变量来调用类的属性。

``` php
class foo {
    var $bar = 'I am bar.';
}

$foo = new foo();
$bar = 'bar';
$baz = array('foo', 'bar', 'baz', 'quux');
echo "{$foo->$bar}\n";
-> # I am bar.

echo "{$foo->{$baz[1]}}\n";
-> # I am bar.
```

::: tip Note
函数、方法、静态类变量和类常量只有在 `PHP 5` 以后才可在 `{$}` 中使用。然而，只有在该字符串被定义的命名空间中才可以将其值作为变量名来访问。只单一使用花括号 `({})` 无法处理从函数或方法的返回值或者类常量以及类静态变量的值。
:::
说白了就是变量的作用域问题。

``` php
class beers {
    const softdrink = 'rootbeer';
    public static $ale = 'ipa';
}

$rootbeer = 'A & W';
$ipa = 'Alexander Keith\'s';

echo "I'd like an {${beers::softdrink}}\n";
-> # I'd like an A & W

echo "I'd like an {${beers::$ale}}\n";
-> # I'd like an Alexander Keith's
```