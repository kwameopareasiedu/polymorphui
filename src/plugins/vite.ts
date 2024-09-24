import { Plugin, ViteDevServer } from "vite";

export default function (): Plugin {
  return {
    name: "plugin-polymorphui",
    config: () => {
      return {
        optimizeDeps: {
          exclude: ["polymorphui"],
        },
      };
    },
    configureServer: (server: ViteDevServer): void => {
      server.watcher.options = {
        ...server.watcher.options,
        ignored: ["!**/node_modules/polymorphui/dist/**"],
      };
    },
  };
}
