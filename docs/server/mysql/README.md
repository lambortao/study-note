# MySql

## 基本概念

### 基础知识
mysql 的默认端口是 3306

### 字段

### 关系模型

### 数据类型

## 查询数据

### 基本查询
要查询数据表，可以使用下面这个语句
``` sh
SELECT * FROM students
```

- `SELECT`  是关键字，表示要执行一个查询
- `*`       代表要查询这表的所有列，也可以指定列的名字
- `FROM`    是关键字，表示要从哪个表查询
- `students` 是表名，代表我要从一个叫做 `students` 的表里面查询数据

<br />

`FROM` 语句并不是必须的。
``` sh
SELECT 100 + 200

-> 300
```
MySQL还可以用于计算，但是计算并不是MySQL的强项。<br />
不带 `FROM` 字句的的 `SELECT` 语句还有一个作用，就是检查数据库链接是否有效。

### 条件查询
有时候我们并不想把所有的数据，都查询出来，而是要查询一些经过筛选的数据。 <br />
``` sh
SELECT * FROM <表名> WHERE <条件表达式>
```
- `WHERE` 是关键字，用来设定查询条件

这时有一张 `students` 的表格，里面有一个列名是 `score` 是学生的成绩，那我想查询所有及格学生的信息。
``` sh
SELECT * FROM students WHERE score >= 60
```

::: warning
需要注意的是，如果查询条件为字符串的话，一定要加引号
:::
<br />

#### AND
`AND` 关键字代表有多重查询条件，且要满足所有的查询条件。
``` sh
SELECT * FROM students WHERE score >= 60 AND gender = 'boy'
```
在 `students` 表中查询数据，要满足 `score >= 60` 且 `gender = 'boy'`两个条件。

#### OR
`OR` 关键字代表有多重查询条件，仅需满足其中一个查询条件即可。
``` sh
SELECT * FROM students WHERE score >= 60 OR gender = 'boy'
```
在 `students` 表中查询数据，要满足 `score >= 60` 或者 `gender = 'boy'`两个条件其中的一个。

#### NOT
`NOT` 关键字表示不符合该条件的数据。
``` sh
SELECT * FROM students WHERE NOT gender = 'boy'
```
在 `students` 表中查询数据，要找到 `gender` 不是 `boy` 的所有数据。
<br />

其中 `NOT gender = 'boy'` 可以使用 `gender <> 'boy'` 来代替
``` sh
SELECT * FROM students WHERE gender <> 'boy'
```

#### LIKE
`LIKE` 关键字表示模糊查询，其中 `%` 表示任意字符。
``` sh
SELECT * FROM students WHERE name LIKE 'ab%'
```
在 `students` 表中查询数据，要找到 `name` 列中以 `ab` 开头的数据。可能是 `ab` `abs` `abd`。
``` sh
SELECT * FROM students WHERE name LIKE '%cd%'
```
在 `students` 表中查询数据，要找到 `name` 列中包含 `cd` 的数据。可能是 `abcd` `abcds` `acdbd`。

#### BETWEEN
`BETWEEN` 关键字表示选择介于两个值之间的数据范围。
``` sh
SELECT * FROM students WHERE score BETWEEN 60 AND 90
```
在 `students` 表中查询数据，找到 `score` 大于等于60并且小于等于90的数据
``` sh
SELECT * FROM students WHERE class BETWEEN 'a' AND 'f'
```
在 `students` 表中查询数据，找到 `class` 在字母 `a` 和 `f` 之间的数据。
``` sh
SELECT * FROM students WHERE date BETWEEN '2010-01-01' AND '2019-01-01'
```
在 `students` 表中查询数据，找到 `date` 在 `2010-01-01` 到 `2019-01-01` 这中间日期的数据。

#### 混合查询
如果要使用多种条件进行混合查询的话，就要使用小括号来表示如何进行条件运算了。
``` sh
SELECT * FROM student WHERE (score < 80 OR score > 90) AND gender = 'boy'
```
在 `students` 表中查询，`score` 小于 80 或者大于 90，并且 `gender` 等于 `boy` 的数据。

::: warning
不加括号的时候条件运算符的优先级是：<br />
`NOT` 最高<br />
`AND` 其次<br />
`OR`  最低
:::

### 投影查询
有些时候我们并不想返回所有列的信息，而只是想返回指定列的信息。
``` sh
SELECT name, city, gender FROM students
```
在 `students` 表中查询，`city` `name` `gender` 三列的数据。

### 排序
`ORDER BY` 可以帮助我们在查询数据的时候快速排序，默认是 `ASC` 从小到大
``` sh
SELECT * FROM students ORDER BY age
```
在 `students` 表中查询数据，以 `age` 为基础，从低到高输出。
``` sh
SELECT * FROM students ORDER BY age DESC
```
在 `students` 表中查询数据，以 `age` 为基础，从高到输出。
<br />

如果有相同的数据，需要进一步排序。
``` sh
SELECT * FROM students ORDER BY age DESC, id
```
在 `students` 表中查询数据，以 `age` 为基础，从高到输出，如果有相同的数据，再按 `id` 排序。
