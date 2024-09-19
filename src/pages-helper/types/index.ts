import type { LoggerType, Logger } from "lib-helper";
import type { FilterPattern } from "vite";
import type { UniPagesConfig } from "./uni-app";
export * from "./uni-app";

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

export type PagesHelperDefineUniPagesConfig<T = UniPagesConfig> = (config: UniPagesConfig) => T;
