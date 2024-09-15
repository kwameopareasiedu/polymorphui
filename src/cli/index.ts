import { Command } from "commander";
import { init } from "@/cli/init";
import { generate } from "@/cli/generate";

const cli = new Command("twreact");
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

async function tryCatch(promise: PromiseLike<unknown>) {
  try {
    await promise;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
