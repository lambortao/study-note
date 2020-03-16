# NULL
`null` 表示一个变量没有值，`null` 唯一可能的类型就是 `null` 自己。

在下列情况下的变量会被认为是 `null`
- 被赋值为 `null`
- 没有被赋值
- 被 `unset()`

## 语法
`null` 只有一个值，就是不分大小写的 `null`

## 转换为 `null`
使用 `(unset) $var` 将一个变量转换为 `null` 将不会删除该变量或 `unset` 其值。仅是返回 `NULL` 值而已。