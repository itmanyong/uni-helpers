import { PLUGIN_NAME, PLUGIN_OPTIONS_DEFAULT } from "./config";
import type { UniLayoutHelperConfig, LayoutHelperOptions } from "./types";
import type { Plugin } from "vite";
export * from "./types";

export function UniLayoutHelper(userOptions?: LayoutHelperOptions): Plugin {
  const options = Object.assign({ ...PLUGIN_OPTIONS_DEFAULT }, userOptions || {}) as LayoutHelperOptions;
  return {
    name: PLUGIN_NAME,
    enforce: "pre",
  };
}

export function defineUniLayout<T = UniLayoutHelperConfig>(config: T): T {
  return config;
}
