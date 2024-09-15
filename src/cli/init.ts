import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export async function init() {
  const configName = "twreact.config.js";
  const configPath = resolve(process.cwd(), configName);

  if (existsSync(configPath)) throw `'${configName}' already exists`;
  writeFileSync(configPath, `/** @type {import("twreact/theme").ThemeVariants} */\nexport default {}`);
  console.log(`created "${configName}"!`);
}
