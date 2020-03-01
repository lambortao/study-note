# Git

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

## 版本控制

### 查看当前版本库的状态
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

### 查看文件修改的细节
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

然后使用`commit`命令将文件提交到版本库，然后再次使用`status`命令查看当前版本库的状态。
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

### 查看 git 的 log

使用一下命令即可查看 `git` 的 `log` 日志
``` sh
$ git log
```
但是上面这种方法会有一个问题，就是会输出非常长的一串，如果你只是想查询 `commit` 编号的话可以在 `log` 后添加一个参数。输出的内容里面前面那些看似乱码是 `commit` 的ID，一串由SHA1计算出来的非常大的数字，用十六进制表示。后面是你提交的时候写的注释。

``` sh
$ git log --pretty=oneline

-> #输出
b128fee08cc9e4d0626186ae554c387ad2e5af60 (HEAD -> master) 第三次测试
7d1c0059f941a601b245a9e8383805dd38ea51e7 第二次测试
32e6487ef89d4d784ec191ab07c68d559d937da5 新增测试一行
be042ef9b8b2d01265a6eddf16b4e21014022faf new txt
```

### 版本回退

#### 如何回退到上一个版本？
``` sh
$ git reset --hard HEAD^
```
前面的参数都是标准参数，只有最后一个 `HEAD` 。<br />
`git` 里的 `HEAD` 其实就是指针。`HEAD` 指向哪个 `commit`， 就代表当前是哪个版本。<br />
而 `HEAD` 后面跟着的 `^` 符号意思就是表示上个版本，如果要回退到上上个版本，那就是 `^^` 两个符号。<br />
如果是一个很大的数字可以使用以下命令。
``` sh
$ git reset --hard HEAD~100 # 100 就是指前一百个版本
```
#### 其实我们可以指定 `commit` 版本号进行回退。
``` sh
# 先查询确定要回退的版本号
$ git log

# 确认版本号后执行命令
$ git reset --hard 32e6487ef89d4d784ec191ab07c68d559d937da5
```
后面的版本号可以不全部填写，只复制前几位也是可以的，`git` 会自动在当前版本库内匹配。
::: tip
需要注意的是，执行版本回退命令同时会让 `log` 日志也回退，导致我们使用 `log` 命令就无法查看到我们回退之前，即对于现在来说未来的那些版本号。
:::
为了解决这个问题，你可以向上翻找之前的 `commit` 版本号，或者执行下面这个命令。这个命令会记录下你每一次命令和每一个 `commit` 版本号。
``` sh
$ git reflog

-> # 输出
b128fee (HEAD -> master) HEAD@{0}: reset: moving to b128fee08
7d1c005 HEAD@{1}: reset: moving to HEAD^
b128fee (HEAD -> master) HEAD@{2}: commit: 第三次测试
7d1c005 HEAD@{3}: commit: 第二次测试
32e6487 HEAD@{4}: commit: 新增测试一行
be042ef HEAD@{5}: commit (initial): new txt
```
::: warning
所以一定要写清楚每一条 `commit` 注释，特别是有比较重要改动的时候！
:::

### Git 工作区、暂存区

首先先看一张图
<img :src="$withBase('/tools/git/git-stage.jpg')">

- 工作区是指你 `git init` 的那个根目录，用来存放你所有的代码。
- 工作区内有一个隐藏的文件夹 `.git` ，这个是 `git` 版本库，用来存放所有 `git` 相关的内容。
- 版本库内有一个称为 `stage` 或者 `index` 的暂存区，用来暂存从工作区 `add` 提交上来的内容。
- 版本库内还有分支，而在 `git init` 的时候就会新建一个默认主分支 `master`。
- `HEAD` 是指针，他的指向就是当前的分支。
- `commit` 命令就是将 `stage` 内所有的内容提交到当前分支。
- 每次修改，如果不使用 `add` 命令将内容提交到 `stage` 暂存区，那就不会加入到 `commit` 中。

### 撤销修改
该命令可以撤销修改
``` sh
$ git checkout -- readme.md
```
撤销修改会有两种情况
  - 你有修改，但是还没有提交到暂存区，那么撤销修改后工作区的内容会和版本库内完全一致。
  - 你有修改，已经提交到暂存区，且又修改了内容，那么撤销修改后工作区的内容就会回到你上一次添加暂存区后的状态。

但是这个撤销好像没什么用啊！我已经提交到暂存区的内容该怎么撤回？<br />
这时候就用到下面这个命令了。他可以将暂存区的内容重新扔回工作区
``` sh
$ git reset HEAD readme.md
```
然后再使用 `checkout` 那条命令就可以完全撤回了。

你过你已经把内容提交到分支内了该怎么办？往上翻，上面有版本回退！

### 关联远程库

``` sh
# 关联
git remote add origin https://github.com/lambortao/gitstudy.git

# 第一次提交
git push -u origin master

# 以后提交
git push origin master
```

如果远程仓库是空的，那在我们第一次提交的时候要加上一个 `-u` 参数，他的意思是 `git` 会把本地 `master` 分支的内容提交到远程 `master` 分支，并且会将他们两个关联起来，在以后推送或者拉取的时候就可以简化命令不加这个 `-u` 了。

### 克隆远程库
``` sh
$ git clone https://github.com/lambortao/gitstudy.git
```

## 分支
::: tip
分支就是在版本库中新建一个属于自己的版本库，这样既不会影响到主分支 `master` 的代码，也不用承担不能提交到 `master` 带来的丢失代码的风险。在分支的代码编写完毕后，就可以直接合并到主分支。
:::

`Git` 提交的过程就像是一条时间线，而这条时间线就是分支。`git` 默认会创建一条主时间线，就是 `master` 分支。每次提交，时间线就会前进一步，就是分支向前前进一步。
<br />
<br />
但是我们有时候会需要开发一个新的功能，而又不想这个新功能影响 `master` 分支。那这个时候就需要新建分支去完成这个新的功能。

##### 新建一个 `dev` 分支，并使用 `-b` 参数切换过去
``` sh
$ git checkout -b dev
```
执行了上面这个操作后，`git` 就会新建出这个分支，并且将 `HEAD` 指针指向 `dev` 分支。<br />
这时候再次提交内容的话，`dev` 分支就会脱离原本的 `master` 分支的时间线，走自己的道路。而 `master` 分支保存不变。
<br />
<br />

在你完成这条分支的任务后，你可以把它合并到 `master` 分支上面去。
##### 查看分支命令，星号代表当前分支
``` sh
$ git branch

-> #输出
  dev
* master
```
先切换到 `master` 分支，再执行命令。
##### 合并分支
``` sh
$ git merge dev

-> # 输出
Already up to date.
```
`git` 合并分支的速度非常的快，因为他并没有合并任何文件，而只是把滞后的 `master` 分支直接指向了 `dev` 分支。这种合并方式又叫 `fast forward`，他有一个问题，就是删除这条分支后就看不到这条分支的任何信息了。
<br />

这时候可以加一个参数禁用 `fast forward`。

##### 禁用 `fast forward`

``` sh
$ git merge --no--ff -m '合并分支' dev
```
`--no--ff` 就会禁用 `fast forward` 模式，在禁用的时候合并就会新增一个 `commit` 所以要加 `-m` 参数写注释。
<br />

合并分支后你就可以删掉这条分支了。
##### 删除分支
``` sh
$ git branch -d dev

-> #输出
Deleted branch dev (was 54a64db).
```

下图大致展示了两条分支的时间线。其中左侧的蓝色线是 `master` 分支。从中间分叉出去的黄色线就是 `dev` 分支，可以看到，在黄色分支提交的那两次里，`master` 分支是没有提交的。最后 `dev` 分支合并到了 `master` 分支。
<img  :src="$withBase('/tools/git/branch.png')">

##### 切换分支的 `switch` 命令
相对于 `checkout` ，`switch` 从语义上来说更贴切切换分支的概念。

##### 使用 `switch` 命令生成并切换到 `dev` 分支
``` sh
$ git switch -c dev
```

##### 使用 `switch` 命令切换分支
``` sh
$ git switch master
```

#### 冲突
如果你在两个不同的分支修改了同样的内容，这时候再去提交或者合并的话，就出现代码冲突的提示。这时候就要手动的去删除代码后再去提交。
<br />

使用 `git log` 命令可以查看冲突文件的情况。
也可以使用以下命令查看分支合并图。
``` sh
$ git log --graph

-> # 输出

*   commit 4b227a35d64e7b26be48f89049ea8fe2c037daf3 (HEAD -> master, origin/master)
|\  Merge: 2fd8de3 54a64db
| | Author: Tao Tao <lambortao@gmail.com>
| | Date:   Sun Mar 1 22:31:43 2020 +0800
| | 
| |     修复冲突
| | 
| * commit 54a64dbb985ad91417050b83d524d0f24e089ca8
| | Author: Tao Tao <lambortao@gmail.com>
| | Date:   Sun Mar 1 22:28:20 2020 +0800
| | 
| |     第二次修改
| | 
| * commit 07f6f233b11ba5a87c4f8f7cd5ef71d92e554d91
| | Author: Tao Tao <lambortao@gmail.com>
| | Date:   Sun Mar 1 22:25:37 2020 +0800
| | 
| |     dev分支
| | 
* | commit 2fd8de331d9729ce13e03c99af6eb850217318b8
|/  Author: Tao Tao <lambortao@gmail.com>
|   Date:   Sun Mar 1 22:26:41 2020 +0800
|   
|       主分支上的修改

```

::: warning 分支管理策略
在一般情况下，`master` 分支应该是非常稳定的，只保留生产版本的代码。而我们所有的开发工作都应该是在 `dev` 分支上，而我们每个人又都会有自己的分支。<br />我们要做的工作就是在自己的分支上干活，完成后合并到 `dev` 分支，需要上线的时候，再将 `dev` 分支合并到 `master` 分支。
:::

### git 的隐藏代码功能
假设有这样一个场景，你本身在自己的分支上做自己的工作，这时突然来了一个任务，去修复 `master` 分支上的一个 `bug`，这是一个紧急任务，你无法在需要完成自己手上的任务后再去修复，但是这时候又不好去提交 `commit`，因为你还没有完成你现在的这个工作。这时候你就可以使用 `git stash` 命令将你当前的修改都隐藏起来。

##### 隐藏修改
``` sh
$ git stash

-> # 输出
Saved working directory and index state WIP on de: 4b227a3 修复冲突
```
这时候你再使用 `status` 命令查看，会发现工作区是干净的，你可以安心离开当前分支去完成紧急任务。
<br />

当你完成紧急任务再切换到自己的分支后，可以使用命令查看被异常的任务。

##### 查看隐藏的修改
``` sh
$ git stash list

-> # 输出
stash@{0}: WIP on de: 4b227a3 修复冲突
```

使用以下命令恢复被隐藏的修改。

##### 恢复被隐藏的修改
``` sh
$ git stash pop

-> # 输出
On branch de
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (06cade40beaebcdc8334dd1f31fdf66ac4c806ac)
```

你还可以多次使用 `git stash` 命令来隐藏多个代码，在 `git stash list` 的时候会看到每次 `stash` 会有个代号，然后使用另外一个命令恢复指定的隐藏代码。
``` sh
$ git stash apply stash@{0}
```
但是这个命令并不会在 `stash list` 中删除这条信息，你需要手动删除他。
``` sh
$ git stash drop stash@{0}
```

#### 复制修改
假设你在 `master` 分支上修复了一个 `bug` ，因为 `dev` 是早期映射的 `master` 的代码，所以 `dev` 上有同样的 `bug`，这时候可以找到你修复 `master` 分支上时提交的那条 `commit` ID，然后执行命令。
``` sh
# 首先切换到你要修复问题的分支
$ git checkout dev 

# 然后复制那条修复问题的 commit ID
$ git cherry-pick 4c805e2
```
`git` 会将你在 `master` 上写的那段代码复制到 `dev` 上来，同时在 `dev` 上新生成一个 `commit`。

#### 删除一个没有合并的分支
在开发一个不确定性很高的功能的时候，最好新建一个分支。如果这个功能不要了。就可以直接删除这个分支，而不影响到其他的东西。直接删除分支，比找着代码一行行的删除要方便的多。但是 `git` 不允许删除一个未合并的分支，如果要强行删除的话需要带上大写的 `-D` 参数。

``` sh
$ git branch -D dev
```

### 操作远程分支

##### 查看远程分支
``` sh
$ git remote

-> # 输出
origin
```

##### 查看远程分支详细信息
``` sh
$ git remote -v

-> # 输出
origin	https://github.com/lambortao/gitstudy.git (fetch)
origin	https://github.com/lambortao/gitstudy.git (push)
```
如果没有输出说明你没有权限。

##### 推送修改到远程分支
``` sh
$ git push origin master
```

::: tip
从线上克隆仓库的时候，默认是指克隆 `master` 分支的。
:::

##### 克隆其他远程分支到本地
``` sh
$ git checkout -b dev origin/dev
```
这里 `-b dev` 意思是在本地创建并切换到 `dev` 分支，`origin/dev` 的意思是和远程仓库的 `dev` 分支做关联。
<br />

在提交本地代码到远程库前，需要先将远程库的代码拉取到本地
##### 拉取远程库的代码
``` sh
$ git pull
```

如果 `git pull` 失败，提示 `no tracking information`，那就说明本地仓库和远程仓库的分支没有做关联。
##### 将本地仓库的分支和远程仓库分支做关联
``` sh
$ git branch --set-upstream-to=origin/<branch> dev
```