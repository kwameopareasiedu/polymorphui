import { globbySync } from "globby";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";
import svgr from "@svgr/rollup";

function componentNameFromPath(inputPath) {
  const parts = inputPath.split("/");
  return inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];
}

const libConfig = globbySync(["src/lib/*.tsx", "src/lib/**/index.tsx"], { gitignore: true })
  .map((inputPath) => {
    const componentName = componentNameFromPath(inputPath);
    const isProd = process.env.BUILD === "production";

    return defineConfig([
      {
        input: { [componentName]: inputPath },
        output: {
          dir: `dist`,
          manualChunks: {
            shared: ["deepmerge"],
            // variant: ["src/config/variant.tsx"],
          },
        },
        plugins: [nodeResolve(), commonjs(), typescript(), svgr(), isProd && terser()],
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

const themeConfig = defineConfig([
  {
    input: "src/theme.ts",
    output: { file: `dist/theme.js` },
    plugins: [nodeResolve(), commonjs(), typescript()],
    external: ["react", "react/jsx-runtime", "react-dom"],
  },
  {
    input: "src/theme.ts",
    output: { dir: "dist" },
    plugins: [typescript(), dts()],
  },
]);

// const userThemeTypeConfig = defineConfig({
//   input: "src/theme.ts",
//   output: { dir: "dist" },
//   plugins: [typescript(), dts()],
// });

export default [...libConfig, ...themeConfig];
