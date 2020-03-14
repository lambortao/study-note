# 类型基础
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