import { configName } from "@/cli/utils";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { readFileSync } from "fs";
import esprima from "esprima";
import { rollup } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

type AstNode = NestedRecord & { type: string };

enum TreePath {
  COMPONENT = "Program.VariableDeclaration.VariableDeclarator.ObjectExpression.Property",
  VARIANT = "Program.VariableDeclaration.VariableDeclarator.ObjectExpression.Property.ObjectExpression.Property",
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
  let currentComponentName = "";

  traverseAst(configAst, "", (node, nodePath) => {
    if (nodePath === TreePath.COMPONENT) {
      currentComponentName = node.key.name;
      componentVariantMap[node.key.name] = [];
    } else if (nodePath === TreePath.VARIANT && currentComponentName) {
      componentVariantMap[currentComponentName].push(node.key.name);
    }
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

function traverseAst(node: AstNode, nodePath: string, onNode?: (node: AstNode, nodePath: string) => void) {
  const newNodePath = nodePath ? `${nodePath}.${node.type}` : node.type;
  onNode?.(node, newNodePath);

  for (const key in node) {
    const child = node[key];
    const typeOfChild = Object.prototype.toString.call(child);

    if (typeOfChild === "[object Object]") {
      traverseAst(child, newNodePath, onNode);
    } else if (typeOfChild === "[object Array]") {
      for (const value of child) {
        traverseAst(value, newNodePath, onNode);
      }
    }
  }
}
