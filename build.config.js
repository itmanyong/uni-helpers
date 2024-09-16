import { defineBuildConfig } from "unbuild";
import { resolve } from "node:path";
import process from "node:process";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  failOnWarn: false,
  alias: {
    "@": resolve(process.cwd(), "src"),
  },
  rollup: {
    esbuild: {
      minify: true,
    },
  },
});
