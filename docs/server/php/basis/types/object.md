# Object 对象
这里只能简单的讲一下关于对象的使用的基础东西，后面会专门开一章来读对象。[待更新地址]()

## 初始化对象
要创建一个新的对象，使用 `new` 语句实例化一个类。
``` php
class foo{
  function do_foo {
    echo 'test';
  }
}

$bar = new Foo;
$bar->do_foo();

-> # test
```

## 转换成对象
- 如果将一个对象转换成对象，那么他不会有任何变化。
- 如果其他任何类被转换成对象，那么会创建一个内置类 `stdClass` 实例。
- 如果将 `null` 转换成对象，那么该值为空。
- 数组转换成对象，那么数组的键名将会成为属性名，并且有对应的值。

``` php
$obj = (object) array(
  '1' => 'xxx'
);

var_dump($obj);
->
/*
  object(stdClass)#14 (1) { [1]=> string(3) "xxx" }
 */

```
对于其他值，会包含进成员变量名 `scalar`。
``` php
$test = (object) 'test';
var_dump($test);
-> 
/*
  object(stdClass)#15 (1) { ["scalar"]=> string(4) "test" }
*/
```