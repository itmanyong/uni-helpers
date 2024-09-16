import { PLUGIN_NAME, PLUGIN_OPTIONS_DEFAULT } from "./config";
import ManifestHelper from "./core/ManifestHelper";
import type { Plugin } from "vite";
import type { ManifestHelperOptions, ManifestHelperContext, UniManifestHelperConfig } from "./types";
export * from "./types";

export function UniManifestHelper(userOptions?: ManifestHelperOptions): Plugin {
  const virtualModuleId = `virtual:${PLUGIN_NAME}`;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;
  const options = Object.assign({ ...PLUGIN_OPTIONS_DEFAULT }, userOptions || {}) as ManifestHelperOptions;
  const ctx: ManifestHelperContext = new ManifestHelper(options);

  return {
    name: PLUGIN_NAME,
    enforce: "pre",
    async configResolved() {
      await ctx.writeManifestJson();
      ctx.initWatcher();
    },
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${ctx.getVirtualModuleContext()}`;
      }
    },
  };
}

export function defineUniManifest<T = UniManifestHelperConfig>(config: T): T {
  return config;
}
