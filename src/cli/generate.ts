import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { readFileSync } from "fs";
import esprima from "esprima";

export async function generate() {
  const configName = "twreact.config.js";
  const configPath = resolve(process.cwd(), configName);

  if (!existsSync(configPath)) throw `missing config: '${configName}'`;

  const configSource = readFileSync(configPath, { encoding: "utf-8" });
  const configAst = esprima.parseModule(configSource, { comment: false, tokens: false, range: false });
  const configAstObject = JSON.parse(JSON.stringify(configAst.body[0]));
  const componentVariantMap: { [k: string]: string[] } = configAstObject.declaration.properties.reduce(
    (map, componentProp) => {
      const componentName = componentProp.key.name;
      const variants = componentProp.value.properties.map((valueProp) => valueProp.key.name);
      return { ...map, [componentName]: variants };
    },
    {},
  );

  for (const componentName in componentVariantMap) {
    const variants = componentVariantMap[componentName];
    const unionType = variants.map((v) => `"${v}"`).join(" | ");
    const componentTypesPath = resolve(__dirname, `../dist/${componentName}.d.ts`);

    if (!existsSync(componentTypesPath)) {
      console.warn(`"${componentTypesPath}" does not exist!`);
      continue;
    }

    const componentTypesSource = readFileSync(componentTypesPath, { encoding: "utf-8" });
    writeFileSync(componentTypesPath, componentTypesSource.replace(/(variant\?:.+)/g, `variant?: ${unionType};`));
    console.warn(`updated "${componentTypesPath}" variant with: ${unionType}`);
  }
}
