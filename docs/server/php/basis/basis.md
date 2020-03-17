# 语言基础
::: tip
PHP 全称：`PHP: Hypertext Preprocessor`，翻译过来就是 `PHP: 超文本预处理器`，是一种通用的开源的脚本语言。
:::

## `PHP` 标记
`PHP` 的基础标记是 `<?php` 和 `?>`，这两个标记是告诉 `PHP` 开始和停止解析代码。这种解析方式意味着PHP可以被嵌入各种不同的文档中去。

还可以使用 `<?` 和 `?>` 短标记，但是并不鼓励使用。只有通过激活 `php.ini` 中的 `short_open_tag` 配置指令或者在编译 `PHP` 时使用了配置选项 `--enable-short-tags` 时才能使用短标记。

::: tip
如果文件内容是纯 `PHP` 代码，最好在文件末尾删除 `PHP` 的结束标记。这可以避免在 `PHP` 结束标记之后万一意外加入了空格或者换行符。
:::

## 从 `HTML` 中分离
凡是在 `PHP` 基础标记之外的内容都会被忽略，意味着他可以很方便的嵌入 `HTML` 文档中。

**高级分离术**
``` php
<?php if (true) {?>
  这段话是对的。
<?php } else { ?>
  这段话是错的。
<?php }?>
```
这个例子中，`PHP` 将会跳过跳过未达成的段落，即使该段落位于开始和结束标记之外。由于 `PHP` 解释器会在条件未达成时直接跳过这段条件语句，所以 `PHP` 会根据条件来忽略他。如果大段文本的话，这种输出方式会比 `echo` 和 `print` 更有效率。

## 指令分隔符
每一段 `PHP` 都必须要使用分隔符 `;`，分隔符意味着这段代码结束。
``` php
<?php echo 'test';?>
```
在 `PHP` 代码结束的时候可以不使用分隔符，因为结束标记可以代替分隔符。
``` php
<?php echo 'test'?>
```

## 注释

### 单行注释
`PHP` 中可以使用 `#` 或者 `//` 来进行单行注释。单行注释只会对 `PHP` 代码起效。如果在注释后的 `PHP` 代码后还有 `HTML` 标记的话，`HTML` 标记还会继续显示。
``` php
<?php
  # echo 'test';
  // echo 'test1';
?>
```

### 多行注释
多行注释在碰到 `/*` 的时候开始，在碰到 `*/` 的时候结束。
``` php
<?php
  /*
    echo 'test';
  */
?>
```

## 快速扒页面上的代码
``` javascript
$('.chunklist_reference').children('li').each(function(){
  let href = $(this).children('a').attr('href');
  let name = $(this).children('a').text();
  let information = $(this).text();
  console.log(href, name, information);
})
```