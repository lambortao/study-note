# `String` 字符串
一个字符串就是由一系列的字符组成的，每一个字符都等同于一个字节。 这意味着 `PHP` 只能支持 256 的字符集，因此不支持 `Unicode`。
<br />

**string 最大可达2GB**

## 语法
一个字符串有四种表达方式。
- 单引号
- 双引号
- heredoc 语法结构
- nowdoc 语法结构

### 单引号
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

### 双引号
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

### Heredoc 结构
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

### `Nowdoc` 结构
就象 `heredoc` 结构类似于双引号字符串，`Nowdoc` 结构是类似于单引号字符串的。`Nowdoc` 结构很象 `heredoc` 结构，但是 `nowdoc` 中不进行解析操作。这种结构很适合用于嵌入 `PHP` 代码或其它大段文本而无需对其中的特殊字符进行转义。与 `SGML` 的 `<![CDATA[ ]]>` 结构是用来声明大段的不用解析的文本类似，`nowdoc` 结构也有相同的特征。

一个 `nowdoc` 结构也用和 `heredocs` 结构一样的标记 `<<<`， 但是跟在后面的标识符要用单引号括起来，即 `<<<'EOT'`。`Heredoc` 结构的所有规则也同样适用于 `nowdoc` 结构，尤其是结束标识符的规则。

## 变量解析
当变量被双引号或者 `heredoc` 结构包裹时，变量会被解析。

### 简单语法
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

### 复杂语法（花括号语法）
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

## 存储或修改字符串中的字符
`string` 中的字符可以利用类似数组下标一样的方括号去取。意思就是说完全可以把字符串当成一个由字符组成的数组。
::: tip 提示
不止可以使用 `[]` 去取，还可以使用 `{}`，但是并不推荐使用花括号去取。
:::

::: warning 需要注意的
- 用超出该字符串长度的下标去写入字符串，将会拉长这个字符串并填入空格。
- 非整数类型的下标会转换成整数。
- 非法下标类型会产生一个 `E_NOTICE` 级别错误。
- 用负数下标写入字符串时会产生一个 `E_NOTICE` 级别错误。
- 用负数下标读取字符串时返回空字符串。
- 写入时只用到了赋值字符串的第一个字符。
- 用空字符串赋值则赋给的值是 `NULL` 字符。
:::

``` php
$str = 'This is a test.';

// 获取第一个字符
echo $str[0];
-> # T

// 获取第三个字符
echo $str[2];
-> # i

// 获取最后一个字符
echo $str[strlen($str) - 1];
-> # .

// 修改最后一个字符
$str[strlen($str) - 1] = 'e';
echo $str;
-> # This is a teste
```

## 字符串函数和运算符
连接字符串使用 `.`。
``` php
$str = 'This is '.'test';

echo $str;
-> # This is test
```
**字符串函数的列表**[点击查看](https://www.php.net/manual/zh/ref.strings.php);

函数名 | 简介
 - | -
[addcslashes](https://www.php.net/manual/zh/function.addcslashes.php) | 以 C 语言风格使用反斜线转义字符串中的字符
[addslashes](https://www.php.net/manual/zh/function.addslashes.php) | 使用反斜线引用字符串
[bin2hex](https://www.php.net/manual/zh/function.bin2hex.php) | 函数把包含数据的二进制字符串转换为十六进制值
[chop](https://www.php.net/manual/zh/function.chop.php) | rtrim 的别名
[chr](https://www.php.net/manual/zh/function.chr.php) | 返回指定的字符
[chunk_split](https://www.php.net/manual/zh/function.chunk-split.php) | 将字符串分割成小块
[convert_cyr_string](https://www.php.net/manual/zh/function.convert-cyr-string.php) | 将字符由一种 Cyrillic 字符转换成另一种
[convert_uudecode](https://www.php.net/manual/zh/function.convert-uudecode.php) | 解码一个 uuencode 编码的字符串
[convert_uuencode](https://www.php.net/manual/zh/function.convert-uuencode.php) | 使用 uuencode 编码一个字符串
[count_chars](https://www.php.net/manual/zh/function.count-chars.php) | 返回字符串所用字符的信息
[crc32](https://www.php.net/manual/zh/function.crc32.php) | 计算一个字符串的 crc32 多项式
[crypt](https://www.php.net/manual/zh/function.crypt.php) | 单向字符串散列
[echo](https://www.php.net/manual/zh/function.echo.php) | 输出一个或多个字符串
[explode](https://www.php.net/manual/zh/function.explode.php) | 使用一个字符串分割另一个字符串
[fprintf](https://www.php.net/manual/zh/function.fprintf.php) | 将格式化后的字符串写入到流
[get_html_translation_table](https://www.php.net/manual/zh/function.get-html-translation-table.php) | 返回使用 htmlspecialchars 和 htmlentities 后的转换表
[hebrev](https://www.php.net/manual/zh/function.hebrev.php) | 将逻辑顺序希伯来文（logical-Hebrew）转换为视觉顺序希伯来文（visual-Hebrew）
[hebrevc](https://www.php.net/manual/zh/function.hebrevc.php) | 将逻辑顺序希伯来文（logical-Hebrew）转换为视觉顺序希伯来文（visual-Hebrew），并且转换换行符
[hex2bin](https://www.php.net/manual/zh/function.hex2bin.php) | 转换十六进制字符串为二进制字符串
[html_entity_decode](https://www.php.net/manual/zh/function.html-entity-decode.php) | Convert HTML entities to their corresponding characters
[htmlentities](https://www.php.net/manual/zh/function.htmlentities.php) | 将字符转换为 HTML 转义字符
[htmlspecialchars_decode](https://www.php.net/manual/zh/function.htmlspecialchars-decode.php) | 将特殊的 HTML 实体转换回普通字符
[htmlspecialchars](https://www.php.net/manual/zh/function.htmlspecialchars.php) | 将特殊字符转换为 HTML 实体
[implode](https://www.php.net/manual/zh/function.implode.php) | 将一个一维数组的值转化为字符串
[join](https://www.php.net/manual/zh/function.join.php) | 别名 implode
[lcfirst](https://www.php.net/manual/zh/function.lcfirst.php) | 使一个字符串的第一个字符小写
[levenshtein](https://www.php.net/manual/zh/function.levenshtein.php) | 计算两个字符串之间的编辑距离
[localeconv](https://www.php.net/manual/zh/function.localeconv.php) | Get numeric formatting information
[ltrim](https://www.php.net/manual/zh/function.ltrim.php) | 删除字符串开头的空白字符（或其他字符）
[md5_file](https://www.php.net/manual/zh/function.md5-file.php) | 计算指定文件的 MD5 散列值
[md5](https://www.php.net/manual/zh/function.md5.php) | 计算字符串的 MD5 散列值
[metaphone](https://www.php.net/manual/zh/function.metaphone.php) | Calculate the metaphone key of a string
[money_format](https://www.php.net/manual/zh/function.money-format.php) | 将数字格式化成货币字符串
[nl_langinfo](https://www.php.net/manual/zh/function.nl-langinfo.php) | Query language and locale information
[nl2br](https://www.php.net/manual/zh/function.nl2br.php) | 在字符串所有新行之前插入 HTML 换行标记
[number_format](https://www.php.net/manual/zh/function.number-format.php) | 以千位分隔符方式格式化一个数字
[ord](https://www.php.net/manual/zh/function.ord.php) | 转换字符串第一个字节为 0-255 之间的值
[parse_str](https://www.php.net/manual/zh/function.parse-str.php) | 将字符串解析成多个变量
[print](https://www.php.net/manual/zh/function.print.php) | 输出字符串
[printf](https://www.php.net/manual/zh/function.printf.php) | 输出格式化字符串
[quoted_printable_decode](https://www.php.net/manual/zh/function.quoted-printable-decode.php) | 将 quoted-printable 字符串转换为 8-bit 字符串
[quoted_printable_encode](https://www.php.net/manual/zh/function.quoted-printable-encode.php) | 将 8-bit 字符串转换成 quoted-printable 字符串
[quotemeta](https://www.php.net/manual/zh/function.quotemeta.php) | 转义元字符集
[rtrim](https://www.php.net/manual/zh/function.rtrim.php) | 删除字符串末端的空白字符（或者其他字符）
[setlocale](https://www.php.net/manual/zh/function.setlocale.php) | 设置地区信息
[sha1_file](https://www.php.net/manual/zh/function.sha1-file.php) | 计算文件的 sha1 散列值
[sha1](https://www.php.net/manual/zh/function.sha1.php) | 计算字符串的 sha1 散列值
[similar_text](https://www.php.net/manual/zh/function.similar-text.php) | 计算两个字符串的相似度
[soundex](https://www.php.net/manual/zh/function.soundex.php) | Calculate the soundex key of a string
[sprintf](https://www.php.net/manual/zh/function.sprintf.php) | Return a formatted string
[sscanf](https://www.php.net/manual/zh/function.sscanf.php) | 根据指定格式解析输入的字符
[str_getcsv](https://www.php.net/manual/zh/function.str-getcsv.php) | 解析 CSV 字符串为一个数组
[str_ireplace](https://www.php.net/manual/zh/function.str-ireplace.php) | str_replace 的忽略大小写版本
[str_pad](https://www.php.net/manual/zh/function.str-pad.php) | 使用另一个字符串填充字符串为指定长度
[str_repeat](https://www.php.net/manual/zh/function.str-repeat.php) | 重复一个字符串
[str_replace](https://www.php.net/manual/zh/function.str-replace.php) | 子字符串替换
[str_rot13](https://www.php.net/manual/zh/function.str-rot13.php) | 对字符串执行 ROT13 转换
[str_shuffle](https://www.php.net/manual/zh/function.str-shuffle.php) | 随机打乱一个字符串
[str_split](https://www.php.net/manual/zh/function.str-split.php) | 将字符串转换为数组
[str_word_count](https://www.php.net/manual/zh/function.str-word-count.php) | 返回字符串中单词的使用情况
[strcasecmp](https://www.php.net/manual/zh/function.strcasecmp.php) | 二进制安全比较字符串（不区分大小写）
[strchr](https://www.php.net/manual/zh/function.strchr.php) | 别名 strstr
[strcmp](https://www.php.net/manual/zh/function.strcmp.php) | 二进制安全字符串比较
[strcoll](https://www.php.net/manual/zh/function.strcoll.php) | 基于区域设置的字符串比较
[strcspn](https://www.php.net/manual/zh/function.strcspn.php) | 获取不匹配遮罩的起始子字符串的长度
[strip_tags](https://www.php.net/manual/zh/function.strip-tags.php) | 从字符串中去除 HTML 和 PHP 标记
[stripcslashes](https://www.php.net/manual/zh/function.stripcslashes.php) | 反引用一个使用 addcslashes 转义的字符串
[stripos](https://www.php.net/manual/zh/function.stripos.php) | 查找字符串首次出现的位置（不区分大小写）
[stripslashes](https://www.php.net/manual/zh/function.stripslashes.php) | 反引用一个引用字符串
[stristr](https://www.php.net/manual/zh/function.stristr.php) | strstr 函数的忽略大小写版本
[strlen](https://www.php.net/manual/zh/function.strlen.php) | 获取字符串长度
[strnatcasecmp](https://www.php.net/manual/zh/function.strnatcasecmp.php) | 使用“自然顺序”算法比较字符串（不区分大小写）
[strnatcmp](https://www.php.net/manual/zh/function.strnatcmp.php) | 使用自然排序算法比较字符串
[strncasecmp](https://www.php.net/manual/zh/function.strncasecmp.php) | 二进制安全比较字符串开头的若干个字符（不区分大小写）
[strncmp](https://www.php.net/manual/zh/function.strncmp.php) | 二进制安全比较字符串开头的若干个字符
[strpbrk](https://www.php.net/manual/zh/function.strpbrk.php) | 在字符串中查找一组字符的任何一个字符
[strpos](https://www.php.net/manual/zh/function.strpos.php) | 查找字符串首次出现的位置
[strrchr](https://www.php.net/manual/zh/function.strrchr.php) | 查找指定字符在字符串中的最后一次出现
[strrev](https://www.php.net/manual/zh/function.strrev.php) | 反转字符串
[strripos](https://www.php.net/manual/zh/function.strripos.php) | 计算指定字符串在目标字符串中最后一次出现的位置（不区分大小写）
[strrpos](https://www.php.net/manual/zh/function.strrpos.php) | 计算指定字符串在目标字符串中最后一次出现的位置
[strspn](https://www.php.net/manual/zh/function.strspn.php) | 计算字符串中全部字符都存在于指定字符集合中的第一段子串的长度。
[strstr](https://www.php.net/manual/zh/function.strstr.php) | 查找字符串的首次出现
[strtok](https://www.php.net/manual/zh/function.strtok.php) | 标记分割字符串
[strtolower](https://www.php.net/manual/zh/function.strtolower.php) | 将字符串转化为小写
[strtoupper](https://www.php.net/manual/zh/function.strtoupper.php) | 将字符串转化为大写
[strtr](https://www.php.net/manual/zh/function.strtr.php) | 转换指定字符
[substr_compare](https://www.php.net/manual/zh/function.substr-compare.php) | 二进制安全比较字符串（从偏移位置比较指定长度）
[substr_count](https://www.php.net/manual/zh/function.substr-count.php) | 计算字串出现的次数
[substr_replace](https://www.php.net/manual/zh/function.substr-replace.php) | 替换字符串的子串
[substr](https://www.php.net/manual/zh/function.substr.php) | 返回字符串的子串
[trim](https://www.php.net/manual/zh/function.trim.php) | 去除字符串首尾处的空白字符（或者其他字符）
[ucfirst](https://www.php.net/manual/zh/function.ucfirst.php) | 将字符串的首字母转换为大写
[ucwords](https://www.php.net/manual/zh/function.ucwords.php) | 将字符串中每个单词的首字母转换为大写
[vfprintf](https://www.php.net/manual/zh/function.vfprintf.php) | 将格式化字符串写入流
[vprintf](https://www.php.net/manual/zh/function.vprintf.php) | 输出格式化字符串
[vsprintf](https://www.php.net/manual/zh/function.vsprintf.php) | 返回格式化字符串
[wordwrap](https://www.php.net/manual/zh/function.wordwrap.php) | 打断字符串为指定数量的字串

**`URL`字符串函数**[点击查看](https://www.php.net/manual/zh/ref.url.php);

函数名 | 简介
 - | -
[base64_decode](https://www.php.net/manual/zh/function.base64_decode.php) | 对使用 MIME base64 编码的数据进行解码
[base64_encode](https://www.php.net/manual/zh/function.base64-encode.php) | 使用 MIME base64 对数据进行编码
[get_headers](https://www.php.net/manual/zh/function.get-headers.php) | 取得服务器响应一个 HTTP 请求所发送的所有标头
[get_meta_tags](https://www.php.net/manual/zh/function.get-meta-tags.php) | 从一个文件中提取所有的 meta 标签 content 属性，返回一个数组
[http_build_query](https://www.php.net/manual/zh/function.http-build-query.php) | 生成 URL-encode 之后的请求字符串
[parse_url](https://www.php.net/manual/zh/function.parse-url.php) | 解析 URL，返回其组成部分
[rawurldecode](https://www.php.net/manual/zh/function.rawurldecode.php) | 对已编码的 URL 字符串进行解码
[rawurlencode](https://www.php.net/manual/zh/function.rawurlencode.php) | 按照 RFC 3986 对 URL 进行编码
[urldecode](https://www.php.net/manual/zh/function.urldecode.php) | 解码已编码的 URL 字符串
[urlencode](https://www.php.net/manual/zh/function.urlencode.php) | 编码 URL 字符串

**字符类型检测函数**[点击查看](https://www.php.net/manual/zh/ref.ctype.php)
函数名 | 简介
 - | -
[ctype_alnum](https://www.php.net/manual/zh/function.ctype_alnum.php) | 做字母和数字字符检测
[ctype_alpha](https://www.php.net/manual/zh/function.ctype-alpha.php) | 做纯字符检测
[ctype_cntrl](https://www.php.net/manual/zh/function.ctype-cntrl.php) | 做控制字符检测
[ctype_digit](https://www.php.net/manual/zh/function.ctype-digit.php) | 做纯数字检测
[ctype_graph](https://www.php.net/manual/zh/function.ctype-graph.php) | 做可打印字符串检测，空格除外
[ctype_lower](https://www.php.net/manual/zh/function.ctype-lower.php) | 做小写字符检测
[ctype_print](https://www.php.net/manual/zh/function.ctype-print.php) | 做可打印字符检测
[ctype_punct](https://www.php.net/manual/zh/function.ctype-punct.php) | 检测可打印的字符是不是不包含空白、数字和字母
[ctype_space](https://www.php.net/manual/zh/function.ctype-space.php) | 做空白字符检测
[ctype_upper](https://www.php.net/manual/zh/function.ctype-upper.php) | 做大写字母检测
[ctype_xdigit](https://www.php.net/manual/zh/function.ctype-xdigit.php) | 检测字符串是否只包含十六进制字符

## 转换成字符串
- 一个值可以通过在他前面加上 `(string)` 或者使用 `strval()` 函数来转换成字符串。
- 而在一个需要字符串的表达式中，会自动转换为字符串。如 `echo` 和 `print`。
- 或者在一个变量和一个字符串进行对比的时候也会将变量转换为字符串。
- `TRUE` 会被转换成字符串 `'1'`，`FALSE` 会被转换成空字符串。
- 一个整数或者浮点数也会被转换成字面样式上的数字。
- 数组会被转换成 `'Array'` 这串字符串。因此，`echo` 和 `print` 无法显示数组的具体内容。
- 对象会被转换成 `'Object'` 这串字符串。如果为了得到对象的类的名称，可以用 `get_class()` 函数。
- `NULL` 会被转换成空字符串。
- 如何获取数组和对象的具体值？可以使用 `print_r()` 或者 `var_dump()` 这类函数。
- 大部分的 `PHP` 值可以转变成 `string` 来永久保存，这被称作串行化，可以用函数 `serialize()` 来实现。

## 字符串转换成数值
如果该字符串没有包含 `.` `e` `E` 并且其数字值在整型的范围内，那么该字符串将被当成 `integer` 来取值。其它所有情况下都被作为 `float` 来取值。
<br />

**该字符串的开始部分决定了他的值。** 如果该字符串以合法的数值开始，那么就采用该值，否则就会返回 `0`。合法数值由可选的正负号，后面跟着一个或多个数字（可能有小数点），再跟着可选的指数部分。指数部分由 'e' 或 'E' 后面跟着一个或多个数字构成。

``` php
$foo = 1 + "10.5";
-> # (float)11.5

$foo = 1 + "-1.3e3";
-> # (float)-1299

$foo = 1 + "bob-1.3e3";
-> # (int)1

$foo = 1 + "bob3";
-> # (int)1

$foo = 1 + "10 Small Pigs";
-> # (int)11

$foo = 4 + "10.2 Little Piggies"; 
-> # (float)14.2

$foo = "10.0 pigs " + 1;
-> # (float)11

$foo = "10.0 pigs " + 1.0;
-> # (float)11
```

## 字符串类型详解（直接复制的。没看懂）
PHP 中的 string 的实现方式是一个由字节组成的数组再加上一个整数指明缓冲区长度。并无如何将字节转换成字符的信息，由程序员来决定。字符串由什么值来组成并无限制；特别的，其值为 0（“NUL bytes”）的字节可以处于字符串任何位置（不过有几个函数，在本手册中被称为非“二进制安全”的，也许会把 NUL 字节之后的数据全都忽略）。

字符串类型的此特性解释了为什么 PHP 中没有单独的“byte”类型 - 已经用字符串来代替了。返回非文本值的函数 - 例如从网络套接字读取的任意数据 - 仍会返回字符串。

由于 PHP 并不特别指明字符串的编码，那字符串到底是怎样编码的呢？例如字符串 "á" 到底是等于 "\xE1"（ISO-8859-1），"\xC3\xA1"（UTF-8，C form），"\x61\xCC\x81"（UTF-8，D form）还是任何其它可能的表达呢？答案是字符串会被按照该脚本文件相同的编码方式来编码。因此如果一个脚本的编码是 ISO-8859-1，则其中的字符串也会被编码为 ISO-8859-1，以此类推。不过这并不适用于激活了 Zend Multibyte 时；此时脚本可以是以任何方式编码的（明确指定或被自动检测）然后被转换为某种内部编码，然后字符串将被用此方式编码。注意脚本的编码有一些约束（如果激活了 Zend Multibyte 则是其内部编码）- 这意味着此编码应该是 ASCII 的兼容超集，例如 UTF-8 或 ISO-8859-1。不过要注意，依赖状态的编码其中相同的字节值可以用于首字母和非首字母而转换状态，这可能会造成问题。

当然了，要做到有用，操作文本的函数必须假定字符串是如何编码的。不幸的是，PHP 关于此的函数有很多变种：

某些函数假定字符串是以单字节编码的，但并不需要将字节解释为特定的字符。例如 substr()，strpos()，strlen() 和 strcmp()。理解这些函数的另一种方法是它们作用于内存缓冲区，即按照字节和字节下标操作。
某些函数被传递入了字符串的编码方式，也可能会假定默认无此信息。例如 htmlentities() 和 mbstring 扩展中的大部分函数。
其它函数使用了当前区域（见 setlocale()），但是逐字节操作。例如 strcasecmp()，strtoupper() 和 ucfirst()。这意味着这些函数只能用于单字节编码，而且编码要与区域匹配。例如 strtoupper("á") 在区域设定正确并且 á 是单字节编码时会返回 "Á"。如果是用 UTF-8 编码则不会返回正确结果，其结果根据当前区域有可能返回损坏的值。
最后一些函数会假定字符串是使用某特定编码的，通常是 UTF-8。intl 扩展和 PCRE（上例中仅在使用了 u 修饰符时）扩展中的大部分函数都是这样。尽管这是由于其特殊用途，utf8_decode() 会假定 UTF-8 编码而 utf8_encode() 会假定 ISO-8859-1 编码。
最后，要书写能够正确使用 Unicode 的程序依赖于很小心地避免那些可能会损坏数据的函数。要使用来自于 intl 和 mbstring 扩展的函数。不过使用能处理 Unicode 编码的函数只是个开始。不管用何种语言提供的函数，最基本的还是了解 Unicode 规格。例如一个程序如果假定只有大写和小写，那可是大错特错。
