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
import remap from "./plugins/remap-plugin.mjs";

function getComponentNameFromInputPath(inputPath) {
  const parts = inputPath.split("/");
  return inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];
}

const isProd = process.env.BUILD === "production";

const componentHelperConfigs = defineConfig([
  {
    input: "src/components/variant.types.ts",
    output: { file: "dist/variant.d.ts" },
    plugins: [typescript(), dts()],
  },
  {
    input: "src/components/variants.ts",
    output: { file: "dist/variants.js" },
    plugins: [nodeResolve(), commonjs(), typescript(), isProd && terser()],
  },
  {
    input: ["src/components/utils.ts"],
    output: { file: "dist/utils.js" },
    plugins: [nodeResolve(), commonjs(), typescript(), remap(), isProd && terser()],
    external: ["react", "react/jsx-runtime", "react-dom", "@/components/variants"],
  },
]);

const componentConfigs = globbySync(["src/components/*.tsx", "src/components/**/index.tsx"])
  .map((inputPath) => {
    const componentName = getComponentNameFromInputPath(inputPath);

    return defineConfig([
      {
        input: { [componentName]: inputPath },
        output: { dir: `dist` },
        plugins: [nodeResolve(), commonjs(), typescript(), paths(), svgr(), remap(), isProd && terser()],
        external: ["react", "react/jsx-runtime", "react-dom", "@/components/utils"],
      },
      {
        input: { [componentName]: inputPath },
        output: { dir: "dist" },
        plugins: [typescript(), dts()],
      },
    ]);
  })
  .flat();

const cliConfig = defineConfig({
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
});

export default [...componentHelperConfigs, ...componentConfigs, cliConfig];
