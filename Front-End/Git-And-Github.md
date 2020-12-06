>**详细学习视频**：[https://www.bilibili.com/video/BV1Zz4y1C7vg?from=search&seid=13527292482692354431](https://www.bilibili.com/video/BV1Zz4y1C7vg?from=search&seid=13527292482692354431)
# Github

## Concept

### Repository

>Repository 用于存储内容（项目代码，文件...）
>- 进入相应repository，然后点击setting，options最下面delete
## ![图片](https://uploader.shimo.im/f/2zbnDvMPwX8naZv3.png!thumbnail?fileGuid=T8dwjcpcCC6T9YXJ)

>- 退出参与的项目
## ![图片](https://uploader.shimo.im/f/lmrIgsZkkFIoDgtv.png!thumbnail?fileGuid=T8dwjcpcCC6T9YXJ)

### star

>收藏
### Watch

>留意此respository，它一有更新就通知我们
>-  https://blog.csdn.net/a419240016/article/details/103900598
### fork

>克隆他人respository到自己的respository（独立的）
### pull request

>fork后，在新建的repository中，我们进行某些操作后，想发送请求让原作者是否也对它的repository进行这些操作，就可以用pull request，然后等待作者是否同意这个请求如果它感觉还不错，就将此合并到自己的respostory
### Issue

>点进Issue条，然后在右下角有一个delete issue

![图片](https://uploader.shimo.im/f/YiU6g8krT898fQV0.png!thumbnail?fileGuid=T8dwjcpcCC6T9YXJ)

# Git

![图片](https://uploader.shimo.im/f/2rMMRRVaODszvfVg.png!thumbnail?fileGuid=T8dwjcpcCC6T9YXJ)

* Git Bash - linux
>**Git Repository**
* git clone
    * git init：初始化 Git Repository
    * git remote add URL
    * git fetch
    * git checkout
>**绑定username  email**
>**ssh和http两种不同git clone方式，不用输入username and password**
>[https://blog.csdn.net/u013291076/article/details/80886819](https://blog.csdn.net/u013291076/article/details/80886819)
>[https://blog.csdn.net/u012163684/article/details/52433645?utm_medium=distribute.pc_relevant_bbs_down.none-task--2~all~sobaiduend~default-2.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task--2~all~sobaiduend~default-2.nonecase](https://blog.csdn.net/u012163684/article/details/52433645?utm_medium=distribute.pc_relevant_bbs_down.none-task--2~all~sobaiduend~default-2.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task--2~all~sobaiduend~default-2.nonecase)
* git config --list
* git config --global --unset 名字
* git config --global user.name  'moonlightop'
* git config --global user.email  'gzzhuzhenhao@163.com'
>**Git工作区域**
>Working Directory  ->  staging area  ->  Git Repository

![图片](https://uploader.shimo.im/f/VVL5gpeR4hA2PSvG.png!thumbnail?fileGuid=T8dwjcpcCC6T9YXJ)

* git status：查看Git 工作区域的状态
>**提交文件**
* mkdir | touch 文件名
* git add 文件名：将此文件从Working Directory 提交到 暂存区
* git commit <文件名>  -m "提交描述"
    * 将指定文件从 暂存区 提交到 Git Repository，当不写文件名时，将 暂存区的所有内容提交到Repository中
    * 要么有指定文件名，要么有 -m，不然自动用vim进入到配置文件（写一个哦！）
>**修改文件**
* vim 文件名
* git add 文件名
* git commit <文件名>  -m "提交描述"
>**删除文件**
* rm 文件名：在Working Directory删除文件
* git rm 文件名：将此文件从暂存区删除
* git commit <文件名>  -m "提交描述"
    * 将指定文件从 Git Respository删除，不写文件名时，将Git Respository全部内容删除
    * 文件名和-m 至少写一个
>**Branch**
* git branch <新分支名>：查看当前所处分支 | 建立新分支
* git checkout 分支名：建立分支
* git merge 分支1：将当前git所处分支与分支1合并
>**Remote Respository**
* git remote add origin url：建立连接
* git pull<远程主机名><远程分支名>:<本地分支名>
    * git pull origin main:main（无法合并）
        * git pull origin main，默认先拉取一个FETCH_HEAD分支下来，再将当前分支与其合并
    * git fetch <远程主机名> <远程分支名>
    * git merge 合并分支名
* git push：将本地仓库上传到远程仓库里
>**Github Pages**
>- github提供搭建网页，了解即可
# linux command

```shell
- pwd
- mkdir 目录名
  touch 文件名（创建文件）
- rm    文件名：删除空文件 + -rf：删除任何文件
- vim
  esc
  :q
  :w
  :i
- cat
- ls
- clear
- cd
```
