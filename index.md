[toc]

> 20230316
* [飞书:前端工程化、监控系统(Mini-Sentry)、埋点系统(声明式链路埋点库)](https://vt7y72vnyl.feishu.cn/wiki/wikcnVEOAR4mUUTwI3VFvI2IdSb)
# 监控系统
## 视频教程
* [Vue+Docker+Sentry 极速搭建前端异常监控系统](https://www.bilibili.com/video/BV1UZ4y1p7MF/?spm_id_from=333.999.0.0&vd_source=c4fe7507ea85461391fe91772b3fbe6f)
```sh
# https://github.com/getsentry/sentry
# 新版本git clone git@github.com:getsentry/sentry.git
git clone git@github.com:getsentry/onpremise.git
cd onpremise
./install.sh
```
### 此处报错：install/detect-platform.sh: line 15: docker: command not found FAIL: Unsupported docker architecture .
> [docker官网下载地址：mac10.14.15 对应 docker4.10.0版本2022-06-30](https://docs.docker.com/desktop/release-notes/)
```sh
docker --version

# Docker version 20.10.17, build 100c701


```
### 继续初始化sentry
```sh
./install.sh

# Would you like to create a user account now? [Y/n]: Y
  Email: 1079147232@qq.com
  Password: 123qweddz

# 启动容器集群
  docker compose up -d

# 访问
http://localhost:9000/organizations/sentry/issues/

# 修改组织名称： Settings -> Organization Settings
Organization Slug： itvlog
Display Name： itvlog


# 创建项目：Projects
# 类型选择： Browser -> Vue 
  -> Give your project name
    hello-word
  -> 点击 create project

# 创建vue项目
vue create hello-word


```



<!-- > [MAC系统安装docker报错 --- 解决sudo docker报错command not found](https://blog.csdn.net/MYNAH_Li/article/details/112760415)
```
brew cask install docker
```
### 此处报错：Running Homebrew as root is extremely dangerous and no longer supported. As Homebrew does not drop privileges on installation you would be giving all build scripts full access to your system.
> [完美解决Error: Running Homebrew as root is extremely dangerous and no longer supported.](https://blog.csdn.net/meifannao789456/article/details/105083605)
```
$ sudo chown -R `whoami` /usr/local/Homebrew/
$ sudo chown -R $(whoami) $(brew --prefix)/*
$ sudo mkdir /usr/local/Frameworks
$ sudo chown -R `whoami` /usr/local/Frameworks/
```
### 此处报错：Running Homebrew as root is extremely dangerous and no longer supported. As Homebrew does not drop privileges on installation you would be giving all build scripts full access to your system.
> [brew 安装报错 Running Homebrew as root is extremely dangerous and no longer supported.](https://www.jianshu.com/p/147ea2c5f9e1)
```
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew

brew install docker --cask
``` -->



* [前端监控系统实战](https://www.bilibili.com/video/BV11L4y1L7BY?p=1&vd_source=c4fe7507ea85461391fe91772b3fbe6f)
* [前端工程化实战开发教程面试](https://www.bilibili.com/video/BV1me4y1q7Ep?p=5&vd_source=c4fe7507ea85461391fe91772b3fbe6f)