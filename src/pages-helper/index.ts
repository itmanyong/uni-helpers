import { PLUGIN_NAME, PLUGIN_OPTIONS_DEFAULT } from "./config";
import PagesHelper from "./core/PagesHelper";
import type { Plugin } from "vite";
import type { PagesHelperOptions, PagesHelperContext, UniPagesConfig } from "./types";
export * from "./types";

export function UniPagesHelper(userOptions?: PagesHelperOptions): Plugin {
  const virtualModuleId = `virtual:${PLUGIN_NAME}`;
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;
  const options = Object.assign({ ...PLUGIN_OPTIONS_DEFAULT }, userOptions || {}) as PagesHelperOptions;
  const ctx: PagesHelperContext = new PagesHelper(options);

  return {
    name: PLUGIN_NAME,
    enforce: "pre",
    async configResolved() {
      await ctx.loadPagesConfig();
      await ctx.loadPagesFiles();
      await ctx.writePagesJson();
      ctx.initWatcher();
    },
    transform(code, id) {
      if (!id.endsWith(ctx.options.ext) || !code.includes("</route>")) return null;
      /** 去掉<route></route>标签 */
      const newCode = code.replace(/<route[^>]*>[\s\S]*?<\/route>/g, "");
      return { code: newCode };
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

export function defineUniPages<T = UniPagesConfig>(config: T): T {
  return config;
}
