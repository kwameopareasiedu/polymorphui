import { resolve } from "node:path";
import { existsSync, writeFileSync } from "node:fs";
import { configName } from "@/cli/utils";

export async function init() {
  const configPath = resolve(process.cwd(), configName);

  if (existsSync(configPath)) throw `error: '${configName}' already exists`;

  writeFileSync(
    configPath,
    `import type { ProntoVariants } from "prontoui/variant"\n
export default {} as ProntoVariants;`,
  );

  console.log(`success: created "${configName}"!`);
}
