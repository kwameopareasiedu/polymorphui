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

function componentNameFromPath(inputPath) {
  const parts = inputPath.split("/");
  return inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];
}

const themeTypeConfig = defineConfig({
  input: "src/theme.rollup.ts",
  output: { file: "dist/theme.d.ts" },
  plugins: [typescript(), dts()],
});

const componentConfig = globbySync(["src/components/*.tsx", "src/components/**/index.tsx"])
  .map((inputPath) => {
    const componentName = componentNameFromPath(inputPath);

    return defineConfig([
      {
        input: { [componentName]: inputPath },
        output: {
          dir: `dist`,
          manualChunks: {
            shared: ["src/utils.ts"],
            theme: ["src/theme.app.ts"],
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
  output: {
    dir: "bin",
    format: "commonjs",
    manualChunks: {
      shared: ["commander", "esprima"],
    },
    chunkFileNames: "[name].js",
  },
  plugins: [nodeResolve(), commonjs(), typescript(), shebang(), isProd && terser()],
});

export default [themeTypeConfig, ...componentConfig, cliConfig];
