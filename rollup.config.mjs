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

function externals(mappings = {}) {
  return {
    name: "externals",
    renderChunk(code, chunk, options) {
      let transformedCode = code;

      for (const [from, to] of Object.entries(mappings)) {
        transformedCode = transformedCode.replace(from, to);
      }

      return transformedCode;
    },
  };
}

const componentPathMap = globbySync(["src/components/*.tsx", "src/components/**/index.tsx"]).reduce(
  (map, inputPath) => {
    const parts = inputPath.split("/");
    const componentName = inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];
    return { ...map, [componentName]: inputPath };
  },
  {},
);

const isProd = process.env.BUILD === "production";

const helperConfigs = defineConfig([
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
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      externals({
        "@/components/variants": "./variants.js",
      }),
      isProd && terser(),
    ],
    external: ["react", "react/jsx-runtime", "react-dom", "@/components/variants"],
  },
  {
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
]);

const componentConfigs = defineConfig([
  {
    input: componentPathMap,
    output: { dir: `dist` },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      paths(),
      svgr(),
      externals({
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
    input: componentPathMap,
    output: { dir: "dist" },
    plugins: [typescript(), dts()],
  },
]);

export default [...helperConfigs, ...componentConfigs];
