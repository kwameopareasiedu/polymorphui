import { Plugin, ViteDevServer } from "vite";
import { resolve } from "node:path";
import { configName } from "@/cli/utils";
import { generate } from "@/cli/generate";

export default function (): Plugin {
  let building = false;

  return {
    name: "polymorphui",
    config: () => {
      return {
        optimizeDeps: {
          include: ["react-dom"],
          exclude: ["polymorphui"],
        },
      };
    },
    configureServer: (server: ViteDevServer): void => {
      generate().then(() => {
        console.log("success: updated polymorphui component variants");
        server.ws.send({ type: "full-reload" });
      });

      server.watcher.options = {
        ...server.watcher.options,
        ignored: ["!**/node_modules/polymorphui/dist/variants.js"],
      };
    },
    handleHotUpdate: ({ file, server }) => {
      if (file === resolve(process.cwd(), configName) && !building) {
        console.log("updating polymorphui component variants...");

        building = true;

        generate()
          .then(() => {
            console.log("success: updated polymorphui component variants");
            server.ws.send({ type: "full-reload" });
          })
          .catch((err) => console.error(err))
          .finally(() => (building = false));
      }
    },
  };
}
