import { Command } from "commander";
import { init } from "@/cli/init";
import { generate } from "@/cli/generate";

const cli = new Command("PolymorphUI");
cli.description("CLI for PolymorphUI component library");
cli.version("0.1.0");

cli
  .command("init")
  .description("Create PolymorphUI config file")
  .action(async () => {
    await tryCatch(init());
  });

cli
  .command("generate")
  .description("(Re)generate variants for PolymorphUI components")
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
