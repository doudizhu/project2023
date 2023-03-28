[toc]

> 20230319
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
# 解决：官网下载适配mac旧系统版本dmg包，安装

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
```
### 配置sentry项目
```sh
# 访问
http://localhost:9000/organizations/sentry/issues/

# 修改组织名称： Settings -> Organization Settings
Organization Slug： itvlog
Display Name： itvlog


# 创建项目：Projects
# 类型选择： Browser -> Vue 
  -> Give your project name
    hello-word
  -> 点击： create project




# 桌面端启动
  containers start
```
### 创建&配置vue2项目
```sh
vue create hello-word
  选择：vue2 自定义
    + router
cd hello-word

# 配置vue快速开始手手册：http://localhost:9000/itvlog/javascript-vue/getting-started/javascript-vue/
npm install --save @sentry/vue @sentry/tracing
# 修改main.ts
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  Vue,
  dsn: "http://e489a0252e084003b85959dc802e6345@localhost:9000/2",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // 自定义
  logErrors: true,
  release: 'pro@1.0.0' // 配置上报版本
});
```
### 本地开发vue2&调试：模拟一个vue错误
#### src/components/HelloWorld.vue
```
<button @click="hello">click hello</button>

methods: {
    hello() {
      console.log(window.a.b)
    }
  }
``` 
#### 调试：点击触发报错（本地net），查看issue报告（sentry）

### 线上生产vue2&调试：模拟一个vue错误
#### 生成token
```
点击左侧边栏头像
  -》API keys -> Auth Token
  -》Create New Token
    勾选权限：project:write
  生成复制token


```
#### .sentryclirc
```
[defaults]
url=http://localhost:9000/
org=itvlog
project=hello-world

[auth]
token=36c32fd852d045ada5a68bbd9b0db671083cf9ed90ae42d38aa968c05984137c
```
#### 修改上报版本：src/main.js
```
release: 'pro@1.0.1' // 配置上报版本
```
#### 模拟线上http服务，使用anywhere工具包
```
npm i anywhere -g

npm run build
cd dist
anywhere -p 8888
```
#### 配置仅开发环境,监控：main.js
```
process.env.NODE_ENV === 'production' && Sentry.init({
  ...
})
```


* [前端监控系统实战](https://www.bilibili.com/video/BV11L4y1L7BY?p=1&vd_source=c4fe7507ea85461391fe91772b3fbe6f)
* [前端工程化实战开发教程面试](https://www.bilibili.com/video/BV1me4y1q7Ep?p=5&vd_source=c4fe7507ea85461391fe91772b3fbe6f)
