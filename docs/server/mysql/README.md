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

### 分页查询
在使用 `MySQL` 查询数据的时候，可能会一次性查出非常多的数据，这时候就有必要对数据进行分页。
``` sh
LIMIT <单页数据量> OFFSET <从第几条数据开始获取>
```
以上为基础的语法，其中 `LIMIT` 后面跟着的是一次获取的数据量，`OFFSET` 后面跟着的是从第几条数据开始获取。<br />
假设`LIMIT` 的值为 `pageSize`, `OFFSET` 的计算公式为：`pageSize * (pageIndex - 1)`。
``` sh
SELECT * FROM students LIMIT 3 OFFSET 0;
```
在 `students` 表中查询数据，获取第一页数据，获取三条。

- `OFFSET` 超过了最大数量并不会报错，而是会得到一个空的结果集。
- `OFFSET` 是可选的，如果只写了 `LIMIT 15`，那么他等同于 `LIMIT 15 OFFSET 0`。
- `LIMIT <M> OFFSET <N>` 分页时，`N` 越大，查询效率越低。

### 聚合查询
如果要统计一个表有多少条数据该怎么处理？通常情况下我都是先取出来然后再去使用 `PHP` 计算，其实 `MySQL` 是可以自己计算的。
``` sh
SELECT COUNT(*) FROM students;
```
其中 `COUNT(*)` 为查询所有列的行数，要注意的是，虽然聚合查询返回的是一个数字，但依然是一个二维的表，只不过这个表只有一行一列，并且列名是 `COUNT(*)`。
<br />

通常情况下，使用聚合查询时，我们会给列一个别名，便于处理结果。
``` sh
SELECT COUNT(*) num FROM students WHERE gender = 'boy';
```
使用聚合查询的时候依然可以使用 `WHERE` 字句。
<br />

函数 | 说明
  - | -
SUM | 计算某一列的合集值，该列必须为数值类型
AVG | 计算某一列的平均值，该列必须为数值类型
MAX | 计算某一列的最大值
MIN | 计算某一列的最小值

 - `MAX` 和 `MIN` 并不局限于数值类型。如果是字符串类型的话，将会返回排列最前或最后的值。
 - 使用聚合查询但是没有匹配到任何行的时候，`COUNT()` 会返回 `0`，`SUM()、AVG()、MAX()、MIN()` 会返回 `NULL`。

#### 分组聚合
假如有这么表。
class | name | gender
  -   |  -   |   -
  1   |  aa  |  男
  1   |  bb  |  男
  2   |  cc  |  女
  2   |  dd  |  男
  3   |  ee  |  女
  3   |  ff  |  男
  3   |  gg  |  女

现在要查询每个班级有多少人。
``` sh
SELECT COUNT(*) num, class FROM `students` GROUP BY class
```
以数量和 `class` 为基准，查询 `students` 表中每个 `class` 的数量。结果为 `class` 为 `1` 的有两个，为 `2` 的有两个，为 `3` 的有三个。
class | num
  -   |  -
  1   |  2
  2   |  2
  3   |  3

`GROUP BY` 后面还可以加多个条件。
``` sh
SELECT COUNT(gender) num, class, gender FROM `students` GROUP BY class, gender
```
这条的意思是说，查询每个班级男女总数。将会输出三列，分别为 `num` 查询到的数量、`class` 班级名、`gender` 性别。

### 多表查询
`MySQL` 允许一次性查询多个表的数据。
``` sh
SELECT * FROM `students, classed`
```
同时查询 `students` 和 `classed` 两个表的数据。这种查询又叫笛卡尔查询，使用笛卡尔查询时要非常小心。
::: warning
这种查询返回的数据依然是一个二维表，但是需要注意的是，这个结果集是两个表的乘积，即每组数据都两两结合返回。结果集的列数是两个表列数**之和**，结果集的行数是两个表行数**之积**！即：如果两个表分别有 `10` 个字段和 `1000` 条数据，那么返回的结果集就有 `20` 个字段，`1,000,000` 条数据！
:::
<br />

还有需要注意的地方是，两个不同的表可能会有同样的字段名，如果不加以区分的话可能无法识别。这时候我们可以使用投影查询的别名功能进行重命名。
``` sh
SELECT 
  student.id sid,
  student.name sname,
  student.gender,
  classed.id uid,
  classed.name cname
FROM student, classed;
```
在多表查询中，要使用 `表名.列名` 来引用列，然后加空格来设置别名。以上分别将两个表的 `id` 和 `name` 字段设置了别名。
<br />

但是表名很长的话还是写起来还是很麻烦，所以还可以继续给表设置别名。
``` sh
SELECT 
  s.id sid,
  s.name sname,
  s.gender,
  c.id uid,
  c.name cname
FROM student s, classed c;
```
以上，我们分别用 `s` 和 `c` 代替 `stuendts` 和 `classed` 两个表。
<br />

``` sh
SELECT 
  s.id sid,
  s.name sname,
  s.gender,
  c.id uid,
  c.name cname
FROM student s, classed c
WHERE s.gender = 'boy' AND c.name = 'tao';
```
同样，我们还可以继续使用 `WHERE` 子句来增加条件，以减少筛选出来的数据量。

### 连接查询
连接查询为另一种多表查询。首先需要确定一个主表为结果集，然后把其他的表有选择性的连接到主表上。
::: tip
使用别名可以有效的简化查询语句的复杂度
:::
<br />

#### INNER JOIN 内连接
假如，我需要到`students`表中查一组学生的信息，这段结果集里面有 `class` ，但是这个 `class` 并不是对应的班级名称，如果要查询班级名称需要到另外一个表 `classes` 中查询。那这时候就可以使用连接查询。

``` sh
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s,
INNER JOIN classes c,
ON s.class_id = c.id;
```
 - 先确定主表。主表使用 `FROM <表1>` 连接。
 - 在确定需要连接的表。使用 `INNER JOIN <表2>` 连接。
 - 然后确定连接条件。使用 `ON <条件...>` ，这里的条件是 `s.class_id = c.id` 意思就是说 `students` 表中的 `class_id` 字段和 `classes` 表中的 `id` 字段一样时进行连接。
 - 可选的 `WHERE` 或者 `ORDER BY` 字句。
