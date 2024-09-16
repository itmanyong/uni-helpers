import { PLUGIN_NAME, PLUGIN_OPTIONS_DEFAULT } from "./config";
import type { UniRouterHelperConfig, RouterHelperOptions } from "./types";
import type { Plugin } from "vite";
export * from "./types";

export function UniRouterHelper(userOptions?: RouterHelperOptions): Plugin {
  const options = Object.assign({ ...PLUGIN_OPTIONS_DEFAULT }, userOptions || {}) as RouterHelperOptions;
  return {
    name: PLUGIN_NAME,
    enforce: "pre",
  };
}

export function defineUniRouter<T = UniRouterHelperConfig>(config: T): T {
  return config;
}
