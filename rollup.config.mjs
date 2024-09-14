import svgr from "@svgr/rollup";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import { globbySync } from "globby";

const libConfigs = defineConfig(
  globbySync(["src/lib/*.tsx", "src/lib/**/index.tsx"], { gitignore: true }).map((inputPath) => {
    const parts = inputPath.split("/");
    const componentName = inputPath.includes("index") ? parts.at(-2) : parts.at(-1)?.split(".")[0];
    const isProd = process.env.BUILD === "production";

    return defineConfig({
      input: { [componentName]: inputPath },
      output: {
        dir: `dist`,
        manualChunks: {
          modules: ["deepmerge"],
          variant: ["src/config/variant.tsx"],
        },
      },
      plugins: [nodeResolve(), commonjs(), typescript(), svgr(), isProd && terser()],
      external: ["react", "react/jsx-runtime", "react-dom"],
    });
  }),
);

export default [...libConfigs];
