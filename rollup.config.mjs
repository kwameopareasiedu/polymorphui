import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { globbySync } from "globby";
import path from "path";

const libInputPaths = globbySync(["src/lib/*.tsx", "src/lib/**/index.tsx"], { gitignore: true });

const libConfigs = libInputPaths.map((inputPath) => {
  const parts = inputPath.split(path.sep);
  const outputFileName = inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];

  /** @type {import("rollup").InputPluginOption[]} */
  const plugins = [nodeResolve(), commonjs(), typescript()];
  if (process.env.BUILD === "production") plugins.push(terser());

  return defineConfig({
    input: inputPath,
    output: { file: `./dist/${outputFileName}.js` },
    plugins: plugins,
    external: ["react", "react-dom"],
  });
});

export default [...libConfigs];
