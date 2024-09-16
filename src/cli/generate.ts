import { configName } from "@/cli/utils";
import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { readFileSync } from "fs";
import esprima from "esprima";
import { rollup } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export async function generate() {
  const configPath = resolve(process.cwd(), configName);

  if (!existsSync(configPath)) throw `missing config: '${configName}'`;

  const configSource = await rollup({
    input: configName,
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: false,
        include: [configName],
      }),
    ],
  })
    .then((build) => build.generate({}))
    .then((output) => output.output[0].code);

  const configAst = esprima.parseModule(configSource, { comment: false, tokens: false, range: false });
  console.dir(configAst, { depth: null });
  const configAstObject = configAst.body[0] as unknown as NestedObject;
  const componentVariantMap: { [k: string]: string[] } = configAstObject.declaration.properties.reduce(
    (map, componentProp) => {
      const componentName = componentProp.key.name;
      const variants = componentProp.value.properties.map((valueProp) => valueProp.key.name);
      return { ...map, [componentName]: variants };
    },
    {},
  );

  console.log(componentVariantMap);

  // for (const componentName in componentVariantMap) {
  //   const variants = componentVariantMap[componentName];
  //   const unionType = variants.map((v) => `"${v}"`).join(" | ");
  //   const componentTypesPath = resolve(__dirname, `../dist/${componentName}.d.ts`);
  //
  //   if (!existsSync(componentTypesPath)) {
  //     console.warn(`"${componentTypesPath}" does not exist!`);
  //     continue;
  //   }
  //
  //   const componentTypesSource = readFileSync(componentTypesPath, { encoding: "utf-8" });
  //   writeFileSync(componentTypesPath, componentTypesSource.replace(/(variant\?:.+)/g, `variant?: ${unionType};`));
  //   console.log(`updated "${componentName}" variant with: ${unionType}`);
  // }
}
