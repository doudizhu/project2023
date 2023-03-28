[toc]
* 前端监控系统：mac环境下sentry搭建、配置、调试
# sentry：下载、安装、配置、授权
## 下载
```sh
git clone git@github.com:getsentry/onpremise.git
cd onpremise

# https://github.com/getsentry/sentry
# 新版本git clone git@github.com:getsentry/sentry.git
```
## 安装
```sh
./install.sh
# 此处报错[1]，原因：mac系统版本10.14.15不兼容最新版sentry。解决方式：下载旧版本包，详见文末

# Would you like to create a user account now? [Y/n]: Y
  Email: 1079147232@qq.com
  Password: 123qweddz

# 启动容器集群
  docker compose up -d
```
## 配置：组织&项目
```sh
# 访问: http://localhost:9000/organizations/sentry/issues/

# 修改组织名称： 点击左侧边栏：Settings -> Organization Settings
  Organization Slug： itvlog
  Display Name： itvlog


# 创建项目： 
## 点击左侧边栏：Projects -> create project
## 类型选择： Browser -> Vue 
  -> Give your project name
    hello-word
  -> 点击按钮： create project
```
## 授权: 生成客户端token
```
点击左侧边栏头像
  -》API keys -> Auth Token
  -》Create New Token
    勾选权限：project:write
    点击：create token
  生成复制token
```
# 项目：搭建、配置、调试
## 搭建：vue2项目
```
vue create hello-word
  选择自定义（2.0+router+babel）：Manually select features
    Choose Vue version
       2.x 
    Babel
    Router
cd hello-word
```
## 配置
> [配置vue快速开始手手册](http://localhost:9000/itvlog/javascript-vue/getting-started/javascript-vue/)
### 安装sentry
```
npm install --save @sentry/vue @sentry/tracing
```
### 修改main.js
```js
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
### .sentryclirc新建配置文件，配置授权token
```
[defaults]
url=http://localhost:9000/
org=itvlog
project=hello-world

[auth]
token=36c32fd852d045ada5a68bbd9b0db671083cf9ed90ae42d38aa968c05984137c
```

## 调试
### 模拟一个vue错误：src/components/HelloWorld.vue
```
<button @click="hello">click hello</button>

methods: {
  hello() {
    console.log(window.a.b)
  }
}
```
### 点击触发报错（net），查看issue报告（sentry）

### 线上调试
#### 配置仅生产环境,监控：src/main.js
```
process.env.NODE_ENV === 'production' && Sentry.init({
  ...,
  release: 'pro@1.0.1' // 配置上报版本
})
```
#### 模拟线上http服务，使用anywhere工具包
```
npm i anywhere -g

npm run build
cd dist
anywhere -p 8888
```

# 问题解决
## 【1】：install/detect-platform.sh: line 15: docker: command not found FAIL: Unsupported docker architecture .
> [docker官网下载地址：mac10.14.15 对应 docker4.10.0版本2022-06-30](https://docs.docker.com/desktop/release-notes/)
```sh
# 解决：官网下载适配mac旧系统版本dmg包，安装

docker --version

# Docker version 20.10.17, build 100c701


# 继续初始化sentry
./install.sh
```

# ps:
* [项目地址github](https://github.com/doudizhu/project2023)
# 参考
* [Vue+Docker+Sentry 极速搭建前端异常监控系统](https://www.bilibili.com/video/BV1UZ4y1p7MF/?spm_id_from=333.999.0.0&vd_source=c4fe7507ea85461391fe91772b3fbe6f)
