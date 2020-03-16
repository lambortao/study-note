# Array 数组
`PHP` 数组其实是个有序的映射。映射是一种把 `values` 关联到 `keys` 上的类型。此类型在很多方面做了优化，因此可以把它当成真正的数组，或列表（向量），散列表（是映射的一种实现），字典，集合，栈，队列以及更多可能性。由于数组元素的值也可以是另一个数组，树形结构和多维数组也是允许的。

## 语法
可以使用 `array()` 来新建一个数组，自 `5.4` 版本开始可以直接使用 `[]` 来定义数组。
``` php
$arr = array(
  0 => 'aaa',
  'x' => 'bbb'
);
```
数组的长度可以是任意长度，`key` 可以是 `int` 或者 `string`，`values` 可以是任何类型的值。他们是使用逗号分隔的，最后一个数组单元之后的逗号可以省略，特别是对单行的数组。如果是多行数组一般最后一个逗号建议保留，因为可以比较方便的添加新的数组单元。

### 键名规则
**数组的`key`会有强制类型转换**
- 包含有合法整型的字符串会被转换为整型。例如键名字符串 `'8'` 会被转换为整型 `8`。但是 `'08'` 不会被转换，因为他不是一个合法的十进制数值。
- 浮点数也会被转换成整型，这意味着后面的小数点会被省略。
- 布尔值也会被转换为整型，`true` 会被转换成 `1`，`false` 会被转换成 `0`。
- `null` 会被转换成空字符串。
- 数组和对象不能作为键名，否则会报错。

::: tip 键名覆盖
如果你在一个数组中使用了同样的键名，哪怕是看起来不一样，但是强制类型转换后变成一样的了，那么他也会被覆盖，只留下最后一个。
:::

``` php
$arr = array(
  1 => 'a',
  '1' => 'b',
  1.5 => 'c',
  true => 'd',
);

var_dump($arr);

-> 
/*
  array(1){
    [1] => string(1) "d"
  };
*/
```
这个例子中的所有键名都被强制转换成 `1` 了，所以只留下最后一个。
<br />

::: tip 空键名
如果给出的值没有键名，则取当前最大的整数索引值，而新的键名则是当前最大索引值加一。如果指定的键名已经有了值，则该值会被覆盖。
:::
**没有键名**
``` php
$arr = array('a', 'b', 'c', 'd');
var_dump($arr);

-> 
/*
  array(3){
    [0] => String(1) "a"
    [1] => String(1) "b"
    [2] => String(1) "c"
    [3] => String(1) "d"
  }
*/
```
**指定某一个键名**
``` php
$arr = array(
    'a',
    'b',
    8 => 'c',
    'd'
);
var_dump($arr);

->
/*
array(4) { 
  [0]=> string(1) "a" 
  [1]=> string(1) "b" 
  [8]=> string(1) "c" 
  [9]=> string(1) "d" 
}
最后一个键名是9，因为之前最大的整数键名是8
*/
```

### 用方括号语法访问数组单元
数组的值可以使用 `array[key]` 语法来访问。
``` php
$array = array(
    "foo" => "bar",
    42    => 24,
    "multi" => array(
         "dimensional" => array(
             "array" => "foo"
         )
    )
);

var_dump($array["foo"]);
var_dump($array[42]);
var_dump($array["multi"]["dimensional"]["array"]);

-> 
/*
string(3) "bar"
int(24)
string(3) "foo"
*/
```
::: tip 花括号的使用
方括号和花括号可以互换使用来访问数组单元（例如 `$array[42]` 和 `$array{42}` 在上例中效果相同）。
:::

**数组解引用**
- 自 `5.4` 开始可以对方法或者对象的结果进行数组解引用。
- 自 `5.5` 开始可以对一个数组原型进行数组解引用。

``` php
function testArr() {
  return array(1, 2, 3);
}

var_dump(testArr()[0]);

-> # int(1)
```

### 用方括号的语法新建／修改
使用方括号 `[]` 指定键名，可以修改或新建（不推荐这种新建方式）一个已有数组。方括号也可以为空，为空的效果就和没有键名是一样的，会取最大整数的键名加一。
``` php
$arr = array(
  5 => 'a',
  12 => 'b'
);
$arr[6] = 'xx';
$arr[] = 'ccc';

-> 
/*
array(4) { 
  [5]=> string(1) "a" 
  [12]=> string(1) "b" 
  [6]=> string(2) "xx" 
  [13]=> string(3) "ccc" 
}
*/
```
::: warning 眼见不一定为实
注意这里使用的最大整数的键名不一定就存在于当前的数组中，他可能是之前就存在过，但是现在被删掉了。
:::
``` php
$arr = array(1, 2, 3, 4);
var_dump($arr);
-> 
/*
array(4) { 
  [0]=> int(1) 
  [1]=> int(2) 
  [2]=> int(3) 
  [3]=> int(4) 
}
*/

foreach ($arr as $key => $value) {
  unset($arr[$Key]);
}
var_dump($arr);
-> # array(0) {}

$array[] = 5;
var_dump($arr);
-> 
/*
### 这里之前的键名并没有被清空
array(1) { 
  [4]=> int(5) 
}
*/

# 使用 array_values() 函数重新索引
$array = array_values($array);
$array[] = 7;
var_dump($array);
->
/*
array(1) { 
  [1]=> int(5) 
  [1]=> int(7) 
}
*/
```

## 实用函数
函数名 | 简介
 - | -
[array_change_key_case](https://www.php.net/manual/zh/function.array_change_key_case.php) | 将数组中的所有键名修改为全大写或小写
​[array_chunk](https://www.php.net/manual/zh/function.array-chunk.php) | 将一个数组分割成多个
​[array_column](https://www.php.net/manual/zh/function.array-column.php) | 返回数组中指定的一列
​[array_combine](https://www.php.net/manual/zh/function.array-combine.php) | 创建一个数组，用一个数组的值作为其键名，另一个数组的值作为其值
​[array_count_values](https://www.php.net/manual/zh/function.array-count-values.php) | 统计数组中所有的值
​[array_diff_assoc](https://www.php.net/manual/zh/function.array-diff-assoc.php) | 带索引检查计算数组的差集
​[array_diff_key](https://www.php.net/manual/zh/function.array-diff-key.php) | 使用键名比较计算数组的差集
​[array_diff_uassoc](https://www.php.net/manual/zh/function.array-diff-uassoc.php) | 用用户提供的回调函数做索引检查来计算数组的差集
​[array_diff_ukey](https://www.php.net/manual/zh/function.array-diff-ukey.php) | 用回调函数对键名比较计算数组的差集
​[array_diff](https://www.php.net/manual/zh/function.array-diff.php) | 计算数组的差集
​[array_fill_keys](https://www.php.net/manual/zh/function.array-fill-keys.php) | 使用指定的键和值填充数组
​[array_fill](https://www.php.net/manual/zh/function.array-fill.php) | 用给定的值填充数组
​[array_filter](https://www.php.net/manual/zh/function.array-filter.php) | 用回调函数过滤数组中的单元
​[array_flip](https://www.php.net/manual/zh/function.array-flip.php) | 交换数组中的键和值
​[array_intersect_assoc](https://www.php.net/manual/zh/function.array-intersect-assoc.php) | 带索引检查计算数组的交集
​[array_intersect_key](https://www.php.net/manual/zh/function.array-intersect-key.php) | 使用键名比较计算数组的交集
​[array_intersect_uassoc](https://www.php.net/manual/zh/function.array-intersect-uassoc.php) | 带索引检查计算数组的交集，用回调函数比较索引
​[array_intersect_ukey](https://www.php.net/manual/zh/function.array-intersect-ukey.php) | 用回调函数比较键名来计算数组的交集
​[array_intersect](https://www.php.net/manual/zh/function.array-intersect.php) | 计算数组的交集
​[array_key_exists](https://www.php.net/manual/zh/function.array-key-exists.php) | 检查数组里是否有指定的键名或索引
​[array_key_first](https://www.php.net/manual/zh/function.array-key-first.php) | Gets the first key of an array
​[array_key_last](https://www.php.net/manual/zh/function.array-key-last.php) | Gets the last key of an array
​[array_keys](https://www.php.net/manual/zh/function.array-keys.php) | 返回数组中部分的或所有的键名
​[array_map](https://www.php.net/manual/zh/function.array-map.php) | 为数组的每个元素应用回调函数
​[array_merge_recursive](https://www.php.net/manual/zh/function.array-merge-recursive.php) | 递归地合并一个或多个数组
​[array_merge](https://www.php.net/manual/zh/function.array-merge.php) | 合并一个或多个数组
​[array_multisort](https://www.php.net/manual/zh/function.array-multisort.php) | 对多个数组或多维数组进行排序
​[array_pad](https://www.php.net/manual/zh/function.array-pad.php) | 以指定长度将一个值填充进数组
​[array_pop](https://www.php.net/manual/zh/function.array-pop.php) | 弹出数组最后一个单元（出栈）
​[array_product](https://www.php.net/manual/zh/function.array-product.php) | 计算数组中所有值的乘积
​[array_push](https://www.php.net/manual/zh/function.array-push.php) | 将一个或多个单元压入数组的末尾（入栈）
​[array_rand](https://www.php.net/manual/zh/function.array-rand.php) | 从数组中随机取出一个或多个单元
​[array_reduce](https://www.php.net/manual/zh/function.array-reduce.php) | 用回调函数迭代地将数组简化为单一的值
​[array_replace_recursive](https://www.php.net/manual/zh/function.array-replace-recursive.php) | 使用传递的数组递归替换第一个数组的元素
​[array_replace](https://www.php.net/manual/zh/function.array-replace.php) | 使用传递的数组替换第一个数组的元素
​[array_reverse](https://www.php.net/manual/zh/function.array-reverse.php) | 返回单元顺序相反的数组
​[array_search](https://www.php.net/manual/zh/function.array-search.php) | 在数组中搜索给定的值，如果成功则返回首个相应的键名
​[array_shift](https://www.php.net/manual/zh/function.array-shift.php) | 将数组开头的单元移出数组
​[array_slice](https://www.php.net/manual/zh/function.array-slice.php) | 从数组中取出一段
​[array_splice](https://www.php.net/manual/zh/function.array-splice.php) | 去掉数组中的某一部分并用其它值取代
​[array_sum](https://www.php.net/manual/zh/function.array-sum.php) | 对数组中所有值求和
​[array_udiff_assoc](https://www.php.net/manual/zh/function.array-udiff-assoc.php) | 带索引检查计算数组的差集，用回调函数比较数据
​[array_udiff_uassoc](https://www.php.net/manual/zh/function.array-udiff-uassoc.php) | 带索引检查计算数组的差集，用回调函数比较数据和索引
​[array_udiff](https://www.php.net/manual/zh/function.array-udiff.php) | 用回调函数比较数据来计算数组的差集
​[array_uintersect_assoc](https://www.php.net/manual/zh/function.array-uintersect-assoc.php) | 带索引检查计算数组的交集，用回调函数比较数据
​[array_uintersect_uassoc](https://www.php.net/manual/zh/function.array-uintersect-uassoc.php) | 带索引检查计算数组的交集，用单独的回调函数比较数据和索引
​[array_uintersect](https://www.php.net/manual/zh/function.array-uintersect.php) | 计算数组的交集，用回调函数比较数据
​[array_unique](https://www.php.net/manual/zh/function.array-unique.php) | 移除数组中重复的值
​[array_unshift](https://www.php.net/manual/zh/function.array-unshift.php) | 在数组开头插入一个或多个单元
​[array_values](https://www.php.net/manual/zh/function.array-values.php) | 返回数组中所有的值
​[array_walk_recursive](https://www.php.net/manual/zh/function.array-walk-recursive.php) | 对数组中的每个成员递归地应用用户函数
​[array_walk](https://www.php.net/manual/zh/function.array-walk.php) | 使用用户自定义函数对数组中的每个元素做回调处理
​[array](https://www.php.net/manual/zh/function.array.php) | 新建一个数组
​[arsort](https://www.php.net/manual/zh/function.arsort.php) | 对数组进行逆向排序并保持索引关系
​[asort](https://www.php.net/manual/zh/function.asort.php) | 对数组进行排序并保持索引关系
​[compact](https://www.php.net/manual/zh/function.compact.php) | 建立一个数组，包括变量名和它们的值
​[count](https://www.php.net/manual/zh/function.count.php) | 计算数组中的单元数目，或对象中的属性个数
​[current](https://www.php.net/manual/zh/function.current.php) | 返回数组中的当前单元
​[each](https://www.php.net/manual/zh/function.each.php) | 返回数组中当前的键／值对并将数组指针向前移动一步
​[end](https://www.php.net/manual/zh/function.end.php) | 将数组的内部指针指向最后一个单元
​[extract](https://www.php.net/manual/zh/function.extract.php) | 从数组中将变量导入到当前的符号表
​[in_array](https://www.php.net/manual/zh/function.in-array.php) | 检查数组中是否存在某个值
​[key_exists](https://www.php.net/manual/zh/function.key-exists.php) | 别名 array_key_exists
​[key](https://www.php.net/manual/zh/function.key.php) | 从关联数组中取得键名
​[krsort](https://www.php.net/manual/zh/function.krsort.php) | 对数组按照键名逆向排序
​[ksort](https://www.php.net/manual/zh/function.ksort.php) | 对数组按照键名排序
​[list](https://www.php.net/manual/zh/function.list.php) | 把数组中的值赋给一组变量
​[natcasesort](https://www.php.net/manual/zh/function.natcasesort.php) | 用“自然排序”算法对数组进行不区分大小写字母的排序
​[natsort](https://www.php.net/manual/zh/function.natsort.php) | 用“自然排序”算法对数组排序
​[next](https://www.php.net/manual/zh/function.next.php) | 将数组中的内部指针向前移动一位
​[pos](https://www.php.net/manual/zh/function.pos.php) | current 的别名
​[prev](https://www.php.net/manual/zh/function.prev.php) | 将数组的内部指针倒回一位
​[range](https://www.php.net/manual/zh/function.range.php) | 根据范围创建数组，包含指定的元素
​[reset](https://www.php.net/manual/zh/function.reset.php) | 将数组的内部指针指向第一个单元
​[rsort](https://www.php.net/manual/zh/function.rsort.php) | 对数组逆向排序
​[shuffle](https://www.php.net/manual/zh/function.shuffle.php) | 打乱数组
​[sizeof](https://www.php.net/manual/zh/function.sizeof.php) | count 的别名
​[sort](https://www.php.net/manual/zh/function.sort.php) | 对数组排序
​[uasort](https://www.php.net/manual/zh/function.uasort.php) | 使用用户自定义的比较函数对数组中的值进行排序并保持索引关联
​[uksort](https://www.php.net/manual/zh/function.uksort.php) | 使用用户自定义的比较函数对数组中的键名进行排序
​[usort](https://www.php.net/manual/zh/function.usort.php) | 使用用户自定义的比较函数对数组中的值进行排序

## 数组做什么和不做什么
::: warning 键名要不要加引号
如果键名是一个字符串就必须要加引号，虽然不加引号 `PHP` 也能正确解析，但是如果以后有一个变量或者常量甚至保留字的名取的和你这个字符串一样的话，那返回的结果可能就是一个错误的结果！
:::

## 转换为数组
对于任意 `integer` `，float` `，string` `，boolean` 和 `resource` 类型，如果将一个值转换为数组，将得到一个仅有一个元素的数组，其下标为 0，该元素即为此标量的值。

如果一个 `object` 类型转换为 `array` ，则结果为一个数组，其单元为该对象的属性。键名将为成员变量名，不过有几点例外：整数属性不可访问；私有变量前会加上类名作前缀；保护变量前会加上一个 '*' 做前缀。这些前缀的前后都各有一个 NULL 字符。这会导致一些不可预知的行为：

`null` 转换为数组将会得到一个空数组。

## 比较数组
可以使用 [array_diff](https://www.php.net/manual/zh/function.array-diff.php) 来比较数组。