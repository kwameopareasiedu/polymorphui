#!/usr/bin/env node

'use strict';

var commander = require('commander');
var node_path = require('node:path');
var node_fs = require('node:fs');
var fs = require('fs');
var esprima = require('esprima');
var rollup = require('rollup');
var nodeResolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');

const configName = "pronto.config.ts";

async function init() {
    const configPath = node_path.resolve(process.cwd(), configName);
    if (node_fs.existsSync(configPath))
        throw `error: '${configName}' already exists`;
    node_fs.writeFileSync(configPath, `import type { ProntoVariants } from "prontoui/variant"\n
export default {} as ProntoVariants;`);
    console.log(`success: created "${configName}"!`);
}

var TreePath;
(function (TreePath) {
    TreePath["COMPONENT"] = "Program.VariableDeclaration.VariableDeclarator.ObjectExpression.Property";
    TreePath["VARIANT"] = "Program.VariableDeclaration.VariableDeclarator.ObjectExpression.Property.ObjectExpression.Property";
})(TreePath || (TreePath = {}));
async function generate() {
    const configPath = node_path.resolve(process.cwd(), configName);
    if (!node_fs.existsSync(configPath))
        throw `missing config: '${configName}'`;
    const configJsSource = await rollup.rollup({
        input: configName,
        plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: false, include: [configName] })],
        logLevel: "silent",
    })
        .then((build) => build.generate({}))
        .then((output) => output.output[0].code);
    const configAst = esprima.parseModule(configJsSource, { comment: false, tokens: false, range: false });
    const componentVariantMap = {};
    let currentComponentName = "";
    traverseAst(configAst, "", (node, nodePath) => {
        if (nodePath === TreePath.COMPONENT) {
            currentComponentName = node.key.name;
            componentVariantMap[node.key.name] = [];
        }
        else if (nodePath === TreePath.VARIANT && currentComponentName) {
            componentVariantMap[currentComponentName].push(node.key.name);
        }
    });
    for (const componentName in componentVariantMap) {
        const variants = componentVariantMap[componentName];
        const unionType = variants.map((v) => `"${v}"`).join(" | ");
        const componentTypesPath = node_path.resolve(__dirname, `../dist/${componentName}.d.ts`);
        if (!node_fs.existsSync(componentTypesPath)) {
            console.warn(`warning: "${componentName}" does not exist!`);
            continue;
        }
        const componentTypesSource = fs.readFileSync(componentTypesPath, { encoding: "utf-8" });
        node_fs.writeFileSync(componentTypesPath, componentTypesSource.replace(/(variant\?:.+)/g, `variant?: ${unionType};`));
        console.log(`success: "${componentName}" variants: ${unionType}`);
    }
    const variantPath = node_path.resolve(__dirname, "../dist/variant.js");
    node_fs.writeFileSync(variantPath, configJsSource);
}
function traverseAst(node, nodePath, onNode) {
    const newNodePath = nodePath ? `${nodePath}.${node.type}` : node.type;
    onNode?.(node, newNodePath);
    for (const key in node) {
        const child = node[key];
        const typeOfChild = Object.prototype.toString.call(child);
        if (typeOfChild === "[object Object]") {
            traverseAst(child, newNodePath, onNode);
        }
        else if (typeOfChild === "[object Array]") {
            for (const value of child) {
                traverseAst(value, newNodePath, onNode);
            }
        }
    }
}

const cli = new commander.Command("ProntoUI");
cli.description("Variant based React component library");
cli.version("0.1.0");
cli
    .command("init")
    .description("Create ProntoUI config file")
    .action(async () => {
    await tryCatch(init());
});
cli
    .command("generate")
    .description("(Re)generate variants for ProntoUI components")
    .action(async () => {
    await tryCatch(generate());
});
cli.parse(process.argv);
async function tryCatch(promise) {
    try {
        await promise;
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
