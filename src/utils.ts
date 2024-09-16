import { join, resolve } from "node:path";
import { normalizePath } from "vite";

export function resolveRoot(...paths: string[]): string {
  return normalizePath(resolve(process.cwd(), ...paths));
}

export function createResolveByPath(rootPath: string): (path: string) => string {
  return (...paths: string[]) => resolveRoot(join(rootPath, ...paths));
}
