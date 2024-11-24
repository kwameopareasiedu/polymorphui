import { globbySync } from "globby";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";
import svgr from "@svgr/rollup";
import paths from "rollup-plugin-tsconfig-paths";
import { remapAlias } from "./rollup.plugin.mjs";

const isProd = process.env.BUILD === "production";

const componentNamePathMap = globbySync(["src/components/*.tsx", "src/providers/*", "src/utils.ts"]).reduce(
  (map, inputPath) => {
    const parts = inputPath.split("/");
    const componentName = parts.at(-1)?.split(".")[0];
    return { ...map, [componentName]: inputPath };
  },
  {},
);

export default defineConfig([
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
        "@/utils": "./utils.js",
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
      "@/utils",
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
]);
