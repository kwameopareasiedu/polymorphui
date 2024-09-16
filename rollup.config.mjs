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

const isProd = process.env.BUILD === "production";

const variantTypeConfig = defineConfig({
  input: "src/variant.rollup.ts",
  output: { file: "dist/variant.d.ts" },
  plugins: [typescript(), dts()],
});

const componentConfig = globbySync(["src/components/*.tsx", "src/components/**/index.tsx"])
  .map((inputPath) => {
    const parts = inputPath.split("/");
    const componentName = inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];

    return defineConfig([
      {
        input: { [componentName]: inputPath },
        output: {
          dir: `dist`,
          manualChunks: {
            shared: ["src/components/utils.ts"],
            variant: ["src/variant.app.ts"],
          },
          chunkFileNames: "[name].js",
        },
        plugins: [nodeResolve(), commonjs(), typescript(), paths(), svgr(), isProd && terser()],
        external: ["react", "react/jsx-runtime", "react-dom"],
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
    "ast-traverse",
    "commander",
    "esprima",
    "rollup",
  ],
});

export default [variantTypeConfig, ...componentConfig, cliConfig];
