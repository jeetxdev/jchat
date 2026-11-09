import { readFileSync } from "node:fs";
import { build } from "esbuild";

const packageJson = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  sourcemap: true,
  external: Object.keys(packageJson.dependencies).filter((name) => name !== "@jchat/shared"),
});
