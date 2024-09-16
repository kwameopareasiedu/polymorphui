#!/usr/bin/env node

'use strict';

var shared = require('./shared.js');
var require$$3 = require('node:fs');
var require$$2 = require('node:path');
var fs = require('fs');
require('node:events');
require('node:child_process');
require('node:process');

async function init() {
    const configName = "twreact.config.js";
    const configPath = require$$2.resolve(process.cwd(), configName);
    if (require$$3.existsSync(configPath))
        throw `'${configName}' already exists`;
    require$$3.writeFileSync(configPath, `/** @type {import("twreact/theme").ThemeVariants} */\nexport default {}`);
    console.log(`created "${configName}"!`);
}

async function generate() {
    const configName = "twreact.config.js";
    const configPath = require$$2.resolve(process.cwd(), configName);
    if (!require$$3.existsSync(configPath))
        throw `missing config: '${configName}'`;
    const configSource = fs.readFileSync(configPath, { encoding: "utf-8" });
    const configAst = shared.esprima.parseModule(configSource, { comment: false, tokens: false, range: false });
    const configAstObject = JSON.parse(JSON.stringify(configAst.body[0]));
    const componentVariantMap = configAstObject.declaration.properties.reduce((map, componentProp) => {
        const componentName = componentProp.key.name;
        const variants = componentProp.value.properties.map((valueProp) => valueProp.key.name);
        return { ...map, [componentName]: variants };
    }, {});
    for (const componentName in componentVariantMap) {
        const variants = componentVariantMap[componentName];
        const unionType = variants.map((v) => `"${v}"`).join(" | ");
        const componentTypesPath = require$$2.resolve(__dirname, `../dist/${componentName}.d.ts`);
        if (!require$$3.existsSync(componentTypesPath)) {
            console.warn(`"${componentTypesPath}" does not exist!`);
            continue;
        }
        const componentTypesSource = fs.readFileSync(componentTypesPath, { encoding: "utf-8" });
        require$$3.writeFileSync(componentTypesPath, componentTypesSource.replace(/(variant\?:.+)/g, `variant?: ${unionType};`));
        console.log(`updated "${componentName}" variant with: ${unionType}`);
    }
}

const cli = new shared.Command("twreact");
cli.description("Variant based Tailwind React UI library");
cli.version("0.1.0");
cli
    .command("init")
    .description("Create twreact config file")
    .action(async () => {
    await tryCatch(init());
});
cli
    .command("generate")
    .description("(Re)generate theme for twreact components")
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
