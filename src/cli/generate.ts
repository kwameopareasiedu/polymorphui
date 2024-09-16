import { configName } from "@/cli/utils";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { readFileSync } from "fs";
import esprima from "esprima";
import { rollup } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import traverse from "ast-traverse";

enum TreePath {
  COMPONENT = "Program.VariableDeclaration.VariableDeclarator.ObjectExpression.Property",
  RELATIVE_VARIANT = "Property.ObjectExpression.Property",
}

export async function generate() {
  const configPath = resolve(process.cwd(), configName);

  if (!existsSync(configPath)) throw `missing config: '${configName}'`;

  const configJsSource = await rollup({
    input: configName,
    plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: false, include: [configName] })],
    logLevel: "silent",
  })
    .then((build) => build.generate({}))
    .then((output) => output.output[0].code);

  const configAst = esprima.parseModule(configJsSource, { comment: false, tokens: false, range: false });
  const componentVariantMap: { [k: string]: string[] } = {};
  const treePaths = [];

  traverse(configAst, {
    pre: (node) => {
      treePaths.push(node.type as never);

      if (treePaths.join(".") === TreePath.COMPONENT && node.key?.name) {
        const componentName = node.key?.name;
        const variantNames = [];
        const subTreePaths = [];

        traverse(node, {
          pre: (subNode) => {
            subTreePaths.push(subNode.type as never);

            if (subTreePaths.join(".") === TreePath.RELATIVE_VARIANT && subNode.key?.name) {
              variantNames.push(subNode.key?.name as never);
            }
          },
          post: () => {
            subTreePaths.splice(-1, 1);
          },
        });

        componentVariantMap[componentName] = variantNames;
      }
    },
    post: () => {
      treePaths.splice(-1, 1);
    },
  });

  for (const componentName in componentVariantMap) {
    const variants = componentVariantMap[componentName];
    const unionType = variants.map((v) => `"${v}"`).join(" | ");
    const componentTypesPath = resolve(__dirname, `../dist/${componentName}.d.ts`);

    if (!existsSync(componentTypesPath)) {
      console.warn(`warning: "${componentName}" does not exist!`);
      continue;
    }

    const componentTypesSource = readFileSync(componentTypesPath, { encoding: "utf-8" });
    writeFileSync(componentTypesPath, componentTypesSource.replace(/(variant\?:.+)/g, `variant?: ${unionType};`));
    console.log(`success: "${componentName}" variants: ${unionType}`);
  }

  console.log(configJsSource);
}
