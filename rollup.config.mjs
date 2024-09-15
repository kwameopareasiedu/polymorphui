import { globbySync } from "globby";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { dts } from "rollup-plugin-dts";
import svgr from "@svgr/rollup";

function componentNameFromPath(inputPath) {
  const parts = inputPath.split("/");
  return inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];
}

const themeConfig = defineConfig([
  {
    input: "src/theme-default.ts",
    output: { dir: "dist" },
    plugins: [typescript(), dts()],
  }
]);

const componentConfig = globbySync(["src/components/*.tsx", "src/components/**/index.tsx"], { gitignore: true })
  .map((inputPath) => {
    const componentName = componentNameFromPath(inputPath);
    const isProd = process.env.BUILD === "production";

    return defineConfig([
      {
        input: { [componentName]: inputPath },
        output: {
          dir: `dist`,
          manualChunks: {
            ["shared"]: ["src/utils.ts"],
            ["theme-default"]: ["src/theme-default.ts"],
            ["theme-user"]: ["src/theme-user.ts"],
          },
          chunkFileNames: ({ name }) => {
            return name + ".js";
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

export default [...themeConfig, ...componentConfig];
