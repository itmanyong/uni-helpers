# lib-template-unbuild

开发公共 npm 库的模板

## 步骤

##### 1. 克隆模板仓库到本地

```bash
git clone https://github.com/itmanyong/lib-template-unbuild.git
```

##### 2. 安装依赖

```bash
pnpm install
```

##### 3.需要修改的信息

- package.json 信息需要修改的字段

```bash
name
version
description
author
keywords
repository.url
bugs
```
- workflows/release.yml 发布流程需要修改的字段
```bash
jobs.release.if中的repository_owner比较的值
```
- examples/package.json 示例项目需要修改的字段
```bash
devDependencies下当前库的依赖名称
```

##### 4.开发

```bash
pnpm dev
```

##### 5.打包

```bash
pnpm build
```

##### 6.发布

```bash
pnpm publish
```
