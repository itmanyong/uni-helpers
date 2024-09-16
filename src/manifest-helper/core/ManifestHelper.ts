import type { ManifestHelperContext, ManifestHelperOptions } from "@/manifest-helper/types";
import type { Logger } from "lib-helper";
import { resolveRoot } from "@/utils";
import { createLoggerHelper } from "lib-helper";
import { PKG_NAME } from "@/manifest-helper/config";
import { createFilter } from "vite";

class ManifestHelper implements ManifestHelperContext {
  rootPath: string;
  options: ManifestHelperOptions;
  logger: Logger;
  filter: FilterPatternResult;
  outPagesPath: string;
  pagesConfigDirPath: string;

  constructor(options: ManifestHelperOptions) {
    this.options = options;
    this.rootPath = resolveRoot(options.root);
    this.logger = createLoggerHelper(PKG_NAME, options.logLevel);
    this.filter = createFilter(options.include, options.exclude);
    this.outPagesPath = resolveRoot(options.outDir, "pages.json");
    this.pagesConfigDirPath = resolveRoot(options.configDir, "pages.config");
  }

  writeManifestJson() {}

  initWatcher() {}

  getVirtualModuleContext() {
    return "";
  }
}

export default ManifestHelper;
