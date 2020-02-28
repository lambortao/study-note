# Git

## 基础概念

### Git 工作区、暂存区、版本库
 - **工作区**：就是你在电脑里面能看到的目录
 - **暂存区**：英文叫 `stage` 或者 `index`。一般存放在 `.git` 目录下的 `index` 文件夹中，所以有时候我们也会将暂存区称之为索引。
 - **版本库**：工作区里面的一个 `.git` 目录，这里不是工作区，而是版本库。

## 基本操作

### 创建版本库
版本库又称为仓库，其实可以简单的理解成就是一个目录。而这个目录下的所有文件都可以被 `Git` 管理起来。

**创建一个版本库**
``` sh
# 新建一个文件夹
$ mkdir newfolder
# 进入新建的这个文件夹 
$ cd newfolder
# 新建一个 git 仓库 
$ git init 
# 创建成功的输出
-> Initialized empty Git repository in /Users/taoziyang/Desktop/projects/git/newfolder/.git/
```

### 把文件添加到版本库

::: warning
版本控制系统可以告诉你某个文件每次的改动，比如这次在哪个文件的第几行的第几列新增了一个什么单词。虽然像图片或者视频这种二进制文件也可以交由版本控制系统来管理，但是版本控制系统是无法追踪二进制文件的文件变化的，他只能知道这次和上次的文件大小的对比，具体修改了什么内容是无法知道的。`word` 文档就是一个二进制文件。
:::

1、首先我们在上面新建的 `newfolder` 文件夹下新增一个 `readme.md` 文件，并写下一些内容
``` sh
$ mkdir readme.md
```

2、然后使用命令将该文件`添加`到仓库，如果有多个需要提交的文件可多次执行该命令
``` sh
$ git add readme.md
$ git add name.md
```

3、接着再使用命令将文件`提交`到仓库，后面引号中间的文字为注释，尽量写得有意义些，能为后面准确追溯提供便利。一次`commit`命令会将之前所有的`add`命令全部提交。
``` sh
$ git commit -m '新增readme文件'

-> # 输出，一个文件改动，新增了一行内容
[master (root-commit) be042ef] new txt
 1 file changed, 1 insertion(+)
 create mode 100644 readme.txt
```

### 版本控制

#### 查看当前版本库的状态
我修改了上面的`readme.md`文件，在里面新增了一句话。这时候可以使用命令查看当前版本库的状态。
``` sh
$ git status

-> # 输出
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.md

no changes added to commit (use "git add" and/or "git commit -a")
```
从输出中可以看到当前有一个叫 `readme.md` 的文件有修改过，但是还没有提交修改。

#### 查看文件修改的细节
执行该命令可以看到修改的文件具体修改的内容。
``` sh
$ git diff readme.md

-> # 输出
diff --git a/readme.txt b/readme.txt
index 13a93de..ffa1b44 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1 +1,3 @@
-测试测试测试测试
\ No newline at end of file
+测试测试测试测试
+
+这又是一行测试
\ No newline at end of file
```
从输出中可以看到新增了一行内容。

这时候可以使用之前的`add`命令将文件添加到版本库，然后使用`status`命令查看当前版本库的状态。
``` sh
$ git add readme.md
$ git status

-> # 输出
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   readme.md
```
输出中可以看到，`readme.md`将要被提交

然后使用`commit`命令将文件添加到版本库，然后再次使用`status`命令查看当前版本库的状态。
``` sh
$ git commit -m '新增测试内容'

-> # 输出
[master e475afc] add distributed
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git status

-> # 输出
On branch master
nothing to commit, working tree clean
```
`status`命令的输出中可以看到，已经没有文件要提交了，工作目录是干净的。说明刚才的文件已经提交上去了。