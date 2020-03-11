# 基础
::: tip
PHP 全称：`PHP: Hypertext Preprocessor`，翻译过来就是 `PHP: 超文本预处理器`，是一种通用的开源的脚本语言。
:::

## `PHP` 基本语法
- `PHP` 脚本可以放在文档中的任何位置。
- `PHP` 脚本以 `<?php` 开始，以 `?>` 结束。
- `PHP` 文件的后缀名是 `.php`
- `PHP` 文件内通常包含一些 `HTML` 标签和 `PHP` 脚本代码。
- `PHP` 每行代码都必须以分号结束。分号的作用是为了把指令集区分开来。
- `PHP` 以双斜杠来注释代码。

### `PHP` 变量
- 变量是用来存储信息的容器。
- 变量赋值的方法和数学中的代数相类似，使用 `=`。
``` php
$a = 6;
```

**变量规则**
- 变量命名可以是很短的字母，也可以是有意义的单词。
- 变量以 `$` 符号开始，后面跟着变量的名称。
- 变量名必须以字母或者下划线开始。
- 变量名只能包括字母、数字、下划线。
- 变量名不能有空格。
- 变量名区分大小写。
- `PHP` 是门弱类型语言，所以在声明变量的时候不需要指定变量类型。
- `PHP` 没有声明变量的语句，在你第一次给他赋值的时候被创建。

#### `PHP` 变量作用域
`PHP` 有四种变量作用域

##### `local` 局部和全局作用域
在函数外部定义的变量，拥有全局作用域。除了函数，变量可以被脚本的任何位置引用。要在函数内访问一个全局变量，需要使用 `global` 关键字。
``` php
$x = 5;

function text() {
  $y = 10;
  echo $x; // -> 空
  echo $y; // -> 10
}

echo $x; // -> 5
echo $y; // -> 空
```

##### `global` 关键字
`global` 关键字用于在函数内部访问全局作用域的变量。
``` php
$x = 5;
$y = 10;

function test() {
  global $x, $y;
  $y = $x + $y;
}

test();
echo $y; // 结果往下看
```
因为 `PHP` 将所有变量都存储在一个名为 `$GLOBALS[index]` 的数组中，`index` 是保存变量的名称。这个数组可以在函数内部访问，也可以直接更新全局变量。
``` php
// 这段代码的效应等同于上面那段代码
$x = 5;
$y = 10;

function test() {
  $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];

test();
echo $y;
```
上面两段脚本的输出有一个问题，如果是在 `PHP5` 中，输出的是符合预期的 `15`，但是在 `PHP7` 中输出的是 `10`，因为 `PHP7` 中 `global` 关键字只能引用简单变量。（没看懂，等看 `PHP7` 的时候再补吧）

##### `static` 作用域
当一个函数执行完后，他所有的变量都会被删除，如果这时候你不想删除其中的一个变量的话，就要在第一次赋值的时候使用 `static` 关键字。
``` php
function test() {
  static $x = 5;
  echo $x;
  $x ++;
}

test(); // -> 5
test(); // -> 6
test(); // -> 7
```

##### `parameter` 参数作用域
参数作用域是指通过调用代码将值传递给函数的局部变量。
``` php
function test($x) {
  echo $x;
}

test(5); // -> 5
```

### `PHP` 输出
`PHP` 有两种基础的输出方式 `echo` 和 `print`。

#### `echo`
`echo` 是一种语言结构，使用的时候可以加上括号也可以不加括号。

`echo` 可以输出多个字符串，并且可以识别 `html` 标签。
``` php
echo "<h2>PHP is fun!</h2>";
echo "Hello world!<br>";
echo "I'm about to learn PHP!<br>";
echo "This", " string", " was", " made", " with multiple parameters.";
```
`echo` 还可以输出变量。
``` php
$txt1 = "Learn PHP";
$txt2 = "www.php.cn";
$cars = array("Volvo","BMW","Toyota");

echo $txt1; // -> Learn PHP
echo "<br>";
echo "Study PHP at $txt2"; // -> Study PHP at www.php.cn
echo "<br>";
echo "My car is a {$cars[0]}"; // -> My car is a Volvo
```

#### `print`
`print` 是一种语言结构，使用的时候可以加上括号也可以不加括号。

`print` 可以输出字符串，但是不能输出多个字符串，并且可以识别 `html` 标签。
``` php
print "<h2>PHP is fun!</h2>";
print "Hello world!<br>";
print "I'm about to learn PHP!<br>";
```
`print` 还可以输出变量。
``` php
$txt1 = "Learn PHP";
$txt2 = "www.php.cn";
$cars = array("Volvo","BMW","Toyota");

print $txt1; // -> Learn PHP
print "<br>";
print "Study PHP at $txt2"; // -> Study PHP at www.php.cn
print "<br>";
print "My car is a {$cars[0]}"; // -> My car is a Volvo
```