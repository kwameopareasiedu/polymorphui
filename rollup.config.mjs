import { globbySync } from "globby";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";
import svgr from "@svgr/rollup";
import paths from "rollup-plugin-tsconfig-paths";
import shebang from "rollup-plugin-add-shebang";
import { remapAlias } from "./rollup.plugin.mjs";

const isProd = process.env.BUILD === "production";

const componentNamePathMap = globbySync("src/components/*.tsx").reduce((map, inputPath) => {
  const parts = inputPath.split("/");
  const componentName = parts.at(-1)?.split(".")[0];
  return { ...map, [componentName]: inputPath };
}, {});

const pluginNamePathMap = globbySync("src/plugins/*.ts").reduce((map, inputPath) => {
  const parts = inputPath.split("/");
  const componentName = "plugin-" + parts.at(-1)?.split(".")[0];
  return { ...map, [componentName]: inputPath };
}, {});

export default defineConfig([
  {
    /** Creates variant typings file used in host app config */
    input: "src/components/variant.types.ts",
    output: { file: "dist/variant.d.ts" },
    plugins: [typescript(), dts()],
  },
  {
    /** Creates variant shell file. CLI builds host app config here */
    input: "src/components/variants.ts",
    output: { file: "dist/variants.js" },
    plugins: [nodeResolve(), commonjs(), typescript(), isProd && terser()],
  },
  {
    /** Create utils file external to component files. Variants shell file is marked as external */
    input: ["src/components/utils.ts"],
    output: { file: "dist/utils.js" },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      remapAlias({
        "@/components/variants": "./variants.js",
      }),
      isProd && terser(),
    ],
    external: ["react", "react/jsx-runtime", "react-dom", "@/components/variants"],
  },
  {
    /** Creates CLI files */
    input: { cli: "src/cli/index.ts" },
    output: { dir: "bin", format: "commonjs" },
    plugins: [nodeResolve(), commonjs(), typescript(), shebang(), isProd && terser()],
    external: [
      "@rollup/plugin-node-resolve",
      "@rollup/plugin-commonjs",
      "@rollup/plugin-typescript",
      "commander",
      "esprima",
      "rollup",
    ],
  },
  {
    /** Creates component files */
    input: componentNamePathMap,
    output: { dir: `dist` },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      paths(),
      svgr(),
      remapAlias({
        "@/components/utils": "./utils.js",
        "@/components/spinner": "./spinner.js",
        "@/components/popup": "./popup.js",
        "@/components/text": "./text.js",
        "@/components/input-helpers": "./input-helpers.js",
      }),
      isProd && terser(),
    ],
    external: [
      "react",
      "react/jsx-runtime",
      "react-dom",
      "@/components/utils",
      "@/components/spinner",
      "@/components/popup",
      "@/components/text",
      "@/components/input-helpers",
    ],
  },
  {
    /** Creates component typings files */
    input: componentNamePathMap,
    output: { dir: "dist" },
    plugins: [typescript(), dts()],
  },
  {
    /** Creates plugin files */
    input: pluginNamePathMap,
    output: { dir: `dist`, format: "cjs" },
    plugins: [nodeResolve(), commonjs(), typescript(), isProd && terser()],
    external: ["vite"],
  },
  {
    /** Creates plugin typings files */
    input: pluginNamePathMap,
    output: { dir: "dist" },
    plugins: [typescript(), dts()],
    external: ["vite"],
  },
]);
