# pages-helper

uniapp 应用页面`pages.json`编程化配置和辅助生成工具

## 使用

```ts
// vite.config.ts
import Uni from "@dcloudio/vite-plugin-uni";
import { UniPagesHelper } from "uni-helpers";
export default defineConfig({
  plugins: [
    UniPagesHelper(), // 最好放在 Uni 插件之前注册
    Uni(),
  ],
});
// pages.config.ts
import { defineUniPages } from "uni-helper";
export default defineUniPages({
  // 配置完全同 pages.json 文件
});
```

## API

### UniPagesHelper(options?: PagesHelperOptions): VitePlugin

vite 插件,用于初始化/生成/解析/处理 uniapp 应用的 `pages.json` 相关的配置,注册后将不再需要手动去管理 pages.json 文件.

#### options.logLevel

日志等级,默认`info`,可选`debug`, `warn`, `error`,`success`

#### options.homePagePath

首页路径,默认`pages/index/index`, 用于指定首页的路径, 如`pages/index/index`

#### options.root

项目根目录,默认`process.cwd()`, 用于指定项目根目录, 如`process.cwd()`

#### options.writeMode

写入模式,默认`override`, 可选`merge`, 用于指定写入模式, 当`merge`模式时, 不会覆盖已有`pages.json`文件, 而是将新配置合并到已有配置中.

#### options.configDir

配置文件目录,默认`./`, 用于指定配置文件目录, 如`./`

#### options.pagesDirs

页面目录,默认`["src/pages"]`, 用于指定页面根目录, 如`["src/pages"]`
默认第一个为主包目录, 后续的包目录将作为分包目录.

#### options.outDir

输出目录,默认`src`, 用于指定输出目录, 如`src`

#### options.ext

页面文件扩展名,默认`.vue`, 用于指定页面文件扩展名, 如`.vue`

#### options.exclude

排除文件,默认`["**/components/**", "**/helpers/**", "**/hooks/**"]`, 用于指定排除文件, 如`["**/components/**", "**/helpers/**", "**/hooks/**"]`

#### options.include

包含文件,默认`null`, 用于指定包含文件, 如`null`

#### options.onPagesBefore

pages 处理前回调,默认`null`, 用于指定 pages 处理前回调, 如`null`

#### options.onPageBefore

页面处理前回调,默认`null`, 用于指定页面处理前回调, 如`null`

#### options.onPageAfter

页面处理后回调,默认`null`, 用于指定页面处理后回调, 如`null`

#### options.onPagesAfter

pages 处理后回调,默认`null`, 用于指定 pages 处理后回调, 如`null`

### defineUniPages(config: UniPagesConfig|(config: UniPagesConfig) => UniPagesConfig): UniPagesConfig

替代原 pages.json 文件,用于配置页面信息,返回一个`pages`对象,包含`pages`数组和`subPackages`等原 pages 配置信息.
与已有`pages.json`文件内容可以合并,也可以单独使用.

## 类型定义

```ts
// vite插件选项
export interface PagesHelperOptions {
  logLevel: LoggerType;
  homePagePath: string;
  root: string;
  writeMode: "override" | "merge";
  configDir: string;
  pagesDirs: string[];
  outDir: string;
  ext: string;
  exclude?: FilterPattern;
  include?: FilterPattern;
  onPagesBefore: ((ctx: PagesHelperContext) => boolean) | null;
  onPageBefore: ((ctx: PagesHelperContext) => boolean) | null;
  onPageAfter: ((ctx: PagesHelperContext) => boolean) | null;
  onPagesAfter: ((ctx: PagesHelperContext) => boolean) | null;
}
// 生命周期ctx参数类型
export interface PagesHelperContext {
  rootPath: string;
  options: PagesHelperOptions;
  logger: Logger;
  filter: FilterPatternResult;
  loadPagesConfig: () => void;
  loadPagesFiles: () => void;
  parsePageConfig: () => Logger | null;
  writePagesJson: () => void;
  initWatcher: () => void;
  getVirtualModuleContext: () => string;
  init: () => void;
  onPageFileCreate: (filePath: string) => void;
  onPageFileChange: (filePath: string) => void;
  onPageFileDelete: (filePath: string) => void;
}
// pages配置对象类型
export interface UniPagesConfig extends ObjectType {
  pages: UniPagesPageItem[];
  easycom?: UniPagesConfigEasycom;
  globalStyle?: UniPagesConfigGlobalStyle;
  tabBar?: UniPagesTabbar;
  condition?: UniPagesCondition;
  subPackages?: UniPagesSubPackageItem[];
  preloadRule?: UniPagesPreloadRule;
  workers?: string | UniPagesWorkers;
  leftWindow?: UniPagesWindow;
  topWindow?: UniPagesWindow;
  rightWindow?: UniPagesWindow;
  uniIdRouter?: ObjectType;
  entryPagePath?: string;
}
// defineUniPages返回值函数参数类型
export type PagesHelperDefineUniPagesConfig<T = UniPagesConfig> = (config: UniPagesConfig) => T;
```

## 默认配置

```ts
vite插件 UniPagesHelper 默认配置
{
  logLevel: "info",
  root: process.env.VITE_ROOT_DIR || process.cwd(),
  homePagePath: "pages/index/index",
  writeMode: "override",
  configDir: "./",
  pagesDirs: ["src/pages"],
  outDir: "src",
  exclude: ["**/components/**", "**/helpers/**", "**/hooks/**"],
  ext: ".vue",
  onPagesBefore: null,
  onPageBefore: null,
  onPageAfter: null,
  onPagesAfter: null,
}
```
