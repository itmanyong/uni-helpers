import type { PagesHelperOptions, UniPagesConfig } from "./types";

export const PKG_NAME = "pages-helper";
export const PLUGIN_NAME = `uni-helpers:${PKG_NAME}`;

export const PLUGIN_OPTIONS_DEFAULT: PagesHelperOptions = {
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
};

export const PAGES_CONFIG_DEFAULT: UniPagesConfig = {
  pages: [],
};
