# 流程控制
::: tip 简介
任何 PHP 脚本都是由一系列语句构成的。一条语句可以是一个赋值语句，一个函数调用，一个循环，一个条件语句或者甚至是一个什么也不做的语句（空语句）。语句通常以分号结束。此外，还可以用花括号将一组语句封装成一个语句组。语句组本身可以当作是一行语句。
:::

## `if` `else` `else if` `elseif` `while` `do-while` `for` `foreach` `switch`
和 `JavaScript` 是一样的用法。

在写代码的时候还是要动动脑子的，不能全篇都是 `if else` 或者是 `for`，可以适当的使用一下三元运算符和 `while`。

## `break`
用来跳出 `while` `do-while` `for` `foreach` `switch` 的循环结构。

它还可以接受一个参数来决定跳出几重循环。

``` php
$i = 0;
while (++$i) {
    switch ($i) {
    case 5:
        echo "At 5<br />\n";
        break 1;  /* 只退出 switch. */
    case 10:
        echo "At 10; quitting<br />\n";
        break 2;  /* 退出 switch 和 while 循环 */
    default:
        break;
    }
}
```

## `continue`
跳出本次循环。

`continue` 接受一个可选的数字参数来决定跳过几重循环到循环结尾。默认值是 1，即跳到当前循环末尾。

``` php
while (list ($key, $value) = each($arr)) {
    if (!($key % 2)) { // skip odd members
        continue;
    }
    do_something_odd($value);
}

$i = 0;
while ($i++ < 5) {
    echo "Outer<br />\n";
    while (1) {
        echo "Middle<br />\n";
        while (1) {
            echo "Inner<br />\n";
            continue 3;
        }
        echo "This never gets output.<br />\n";
    }
    echo "Neither does this.<br />\n";
}
```

## `return`
如果在一个函数中调用 `return` 语句，将立即结束此函数的执行并将它的参数作为函数的值返回。 `return` 也会终止 `eval()` 语句或者脚本文件的执行。

如果在全局范围中调用，则当前脚本文件中止运行。如果当前脚本文件是被 `include` 的或者 `require` 的，则控制交回调用文件。此外，如果当前脚本是被 `include` 的，则 `return` 的值会被当作 `include` 调用的返回值。如果在主脚本文件中调用 `return` ，则脚本中止运行。如果当前脚本文件是在 `php.ini` 中的配置选项 `auto_prepend_file` 或者 `auto_append_file` 所指定的，则此脚本文件中止运行。

## `include` `require`
这两个几乎完全一样，除了处理失败的方式不同之外。
- require 在出错时产生 `E_COMPILE_ERROR` 级别的错误，将导致脚本中止。
- include 只产生警告`（E_WARNING）`，脚本会继续运行。

被包含文件先按参数给出的路径寻找，如果没有给出目录（只有文件名）时则按照 [include_path](https://www.php.net/manual/zh/ini.core.php#ini.include-path) 指定的目录寻找。如果在 `include_path` 下没找到该文件则 `include` 最后才在调用脚本文件所在的目录和当前工作目录下寻找。如果最后仍未找到文件则 `include` 结构会发出一条警告；这一点和 `require` 不同，后者会发出一个致命错误。

如果定义了路径——不管是绝对路径（在 Windows 下以盘符或者 \ 开头，在 Unix/Linux 下以 / 开头）还是当前目录的相对路径（以 . 或者 .. 开头）——include_path 都会被完全忽略。例如一个文件以 ../ 开头，则解析器会在当前目录的父目录下寻找该文件。

当一个文件被包含时，其中所包含的代码继承了 include 所在行的变量范围。从该处开始，调用文件在该行处可用的任何变量在被调用的文件中也都可用。不过所有在包含文件中定义的函数和类都具有全局作用域。

## `require_once` `include_once`
`require_once` 语句和 `require` 语句完全相同，唯一区别是 PHP 会检查该文件是否已经被包含过，如果是则不会再次包含。`include` 也是一样的。

他们的主要作用是用于在脚本执行期间同一个文件有可能被包含超过一次的情况下，想确保它只被包含一次以避免函数重定义，变量重新赋值等问题。

## goto
`goto` 操作符可以用来跳转到程序中的另一位置。该目标位置可以用目标名称加上冒号来标记，而跳转指令是 `goto` 之后接上目标位置的标记。 `PHP` 中的 `goto` 有一定限制，目标位置只能位于同一个文件和作用域，也就是说无法跳出一个函数或类方法，也无法跳入到另一个函数。也无法跳入到任何循环或者 `switch` 结构中。可以跳出循环或者 `switch` ，通常的用法是用 `goto` 代替多层的 `break`。

```php
for($i=0,$j=50; $i<100; $i++) {
  while($j--) {
    if($j==17) goto end; 
  }  
}
echo "i = $i";
end:
echo 'j hit 17';

-> # j hit 17
```