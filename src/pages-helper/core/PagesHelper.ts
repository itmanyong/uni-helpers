import type { PagesHelperContext, PagesHelperOptions, UniPagesPageItem, UniPagesConfig } from "@/pages-helper/types";
import type { Logger } from "lib-helper";
import { createLoggerHelper } from "lib-helper";
import { PAGES_CONFIG_DEFAULT, PKG_NAME } from "@/pages-helper/config";
import { createFilter, mergeConfig, normalizePath } from "vite";
import { resolveRoot } from "@/utils";
import { loadConfig } from "unconfig";
import { async as globAsync } from "fast-glob";
import type { FSWatcher } from "chokidar";
import chokidar from "chokidar";
import { pathExistsSync, readFileSync, writeJSONSync } from "fs-extra";
import { parse as VueParser } from "@vue/compiler-sfc";
import { parse as jsonParse, stringify as jsonStringify } from "json5";

interface PagesHelperPagesItem extends ObjectType {
  fullPath: string;
  rootPath: string;
  packageName: string;
  pathPattern: string;
  pages: UniPagesPageItem[];
}

interface PagesHelperPagesItemConfig {
  pkg: PagesHelperPagesItem | null;
  currentPagePath?: string | null;
  page: UniPagesPageItem | null;
}

class PagesHelper implements PagesHelperContext {
  rootPath: string;
  options: PagesHelperOptions;
  logger: Logger;
  filter: FilterPatternResult;
  outPagesPath: string;
  pagesConfigDirPath: string;
  pagesItems: PagesHelperPagesItem[];
  pagesConfigFileConfig: Partial<UniPagesConfig> = {};
  controlPageFile: PagesHelperPagesItemConfig = { pkg: null, currentPagePath: null, page: null };
  pageHome: UniPagesPageItem | null = null;
  watcher: FSWatcher | null = null;
  constructor(options: PagesHelperOptions) {
    this.options = options;
    this.rootPath = resolveRoot(options.root);
    this.logger = createLoggerHelper(PKG_NAME, options.logLevel);
    this.filter = createFilter(options.include, options.exclude);
    this.outPagesPath = resolveRoot(options.outDir, "pages.json");
    this.pagesConfigDirPath = resolveRoot(options.configDir, "pages.config");
    this.pagesItems = options.pagesDirs.map((dir) => ({
      fullPath: resolveRoot(dir),
      pathPattern: normalizePath(`${dir}/**/*${options.ext}`),
      rootPath: dir,
      packageName: dir.split("/")[1],
      pages: [],
    }));
    this.init();
  }
  async loadPagesConfig() {
    const loadConfigSource = {
      files: this.pagesConfigDirPath,
      extensions: ["ts", "mts", "cts", "js", "mjs", "cjs", "json"],
    };
    const { config } = await loadConfig<UniPagesConfig>({ sources: [loadConfigSource] });
    this.pagesConfigFileConfig = { ...PAGES_CONFIG_DEFAULT, ...config };
  }
  async loadPagesFiles() {
    const pagesFileList = await Promise.all(
      this.pagesItems.map((item) =>
        globAsync(item.pathPattern, {
          cwd: this.rootPath,
          ignore: this.options.exclude as string[],
        })
      )
    );
    if ((await this.options.onPagesBefore?.(this)) === false) return;

    for (let i = 0; i < pagesFileList.length; i++) {
      const filePthList = pagesFileList[i];
      this.controlPageFile.pkg = this.pagesItems[i];
      for (let j = 0; j < filePthList.length; j++) {
        this.controlPageFile.currentPagePath = filePthList[j];

        const pageBeforeResult = (await this.options.onPageBefore?.(this)) ?? true;

        if (pageBeforeResult === false) continue;
        this.controlPageFile.page = this.parsePageConfig();

        const pageAfterResult = (await this.options.onPageAfter?.(this)) ?? true;

        if (pageAfterResult === false || !this.controlPageFile.page) continue;

        this.setPagesPageItem(this.controlPageFile.page, this.controlPageFile.pkg);
        this.controlPageFile.page = null;
        this.controlPageFile.currentPagePath = null;
      }
      this.controlPageFile = { pkg: null, currentPagePath: null, page: null };
    }

    if ((await this.options.onPagesAfter?.(this)) === false) return;
  }
  parsePageConfig() {
    const { currentPagePath, pkg } = this.controlPageFile;
    try {
      if (!pkg || !currentPagePath) return null;
      const fullPath = resolveRoot(currentPagePath);
      const fileContext = readFileSync(fullPath, { encoding: "utf-8" });
      const fileParsed = VueParser(fileContext, { pad: "space" });
      const pageRouteContext = fileParsed.descriptor.customBlocks.find((v) => v.type === "route");
      const routeJson = pageRouteContext ? jsonParse(pageRouteContext.content) : {};
      routeJson.type = "page";
      routeJson.path = this.getFileRoutePath(currentPagePath, pkg);

      if (!this.pageHome && pageRouteContext?.attrs.home) {
        routeJson.type = "home";
        this.pageHome = routeJson;
      }
      return routeJson;
    } catch (err) {
      this.logger.error(`pages页面路由解析失败: ${currentPagePath}`);
      return null;
    }
  }
  getFileRoutePath(filePath: string, pkg?: PagesHelperPagesItem | null): string {
    if (!pkg) return "";
    return normalizePath(
      `${pkg.packageName}/${filePath
        .replace(new RegExp(`^${pkg.rootPath}`), "")
        .replace(new RegExp(`${this.options.ext}$`), "")}`
    );
  }
  getPagesConfig(): UniPagesConfig {
    const [pages, ...subPackages] = this.pagesItems;
    const pagesConfig = { ...this.pagesConfigFileConfig };
    pagesConfig.pages = pages.pages;
    pagesConfig.subPackages = subPackages
      .filter((item) => item.pages.length)
      .map((item) => ({
        root: item.packageName,
        pages: item.pages.map((v) => ({ ...v, path: v.path.replace(new RegExp(`^${item.packageName}/`), "") })),
      }));
    return pagesConfig as UniPagesConfig;
  }
  writePagesJson(isInit = false) {
    let pagesConfig = { ...PAGES_CONFIG_DEFAULT };
    if (!isInit) {
      pagesConfig = this.getPagesConfig();
      const oldPagesConfig = jsonParse(readFileSync(this.outPagesPath, { encoding: "utf-8" }));
      if (this.options.writeMode === "merge") {
        pagesConfig = mergeConfig(oldPagesConfig, pagesConfig) as UniPagesConfig;
      }
    }
    if (!pagesConfig.pages?.length) {
      pagesConfig.pages?.push({
        type: "home",
        path: this.options.homePagePath,
      });
    }
    writeJSONSync(this.outPagesPath, pagesConfig, { spaces: 2 });
  }
  init() {
    /**
     * pages.json 文件不存在时, 自动生成
     * uniapp会提前解析pages.json以确定路由文件所以必须存在,否则报错
     */
    if (!pathExistsSync(this.outPagesPath)) {
      this.logger.warn("pages.json 文件不存在 正在自动生成... ");
      this.writePagesJson(true);
      this.logger.warn("pages.json 文件生成成功");
    }
  }
  setPagesPageItem(page?: UniPagesPageItem | null, pkg?: PagesHelperPagesItem | null) {
    if (!page || !pkg) return;
    const havePageIndex = pkg.pages.findIndex((item) => item.path === page.path);
    if (havePageIndex >= 0) {
      pkg.pages.splice(havePageIndex, 1);
    }
    if (page.type === "home") {
      for (const item of pkg.pages) {
        item.type = "page";
      }
      pkg.pages.unshift(page);
      return;
    }
    pkg.pages.push(page);
  }
  getFilePkg(filePath: string): PagesHelperPagesItem | null {
    return this.pagesItems.find((pkg) => filePath.startsWith(pkg.rootPath)) || null;
  }
  getVirtualModuleContext() {
    return JSON.stringify(this.getPagesConfig());
  }
  initWatcher() {
    this.watcher = chokidar.watch(this.options.pagesDirs, {
      cwd: this.rootPath,
      persistent: true,
      ignoreInitial: true,
      depth: Number.POSITIVE_INFINITY,
    });
    this.watcher.on("add", this.onPageFileCreate.bind(this));
    this.watcher.on("change", this.onPageFileChange.bind(this));
    this.watcher.on("unlink", this.onPageFileDelete.bind(this));
  }
  onPageFileCreate(filePath: string) {
    /** 暂时走更改流程,因为目前逻辑一样 */
    this.onPageFileChange(filePath);
  }
  onPageFileChange(filePath: string) {
    this.controlPageFile.currentPagePath = normalizePath(filePath);
    this.controlPageFile.pkg = this.getFilePkg(this.controlPageFile.currentPagePath);
    this.controlPageFile.page = this.parsePageConfig();

    this.setPagesPageItem(this.controlPageFile.page, this.controlPageFile.pkg);

    this.controlPageFile = { pkg: null, currentPagePath: null, page: null };
    this.writePagesJson();
  }
  onPageFileDelete(filePath: string) {
    this.controlPageFile.currentPagePath = normalizePath(filePath);
    this.controlPageFile.pkg = this.getFilePkg(this.controlPageFile.currentPagePath);
    this.controlPageFile.page = null;

    const filePagePath = this.getFileRoutePath(this.controlPageFile.currentPagePath, this.controlPageFile.pkg);

    const havePageIndex = this.controlPageFile.pkg?.pages.findIndex((item) => item.path === filePagePath) || -1;
    if (havePageIndex >= 0) {
      this.controlPageFile.pkg?.pages.splice(havePageIndex, 1);
    }

    this.writePagesJson();
  }
}

export default PagesHelper;
