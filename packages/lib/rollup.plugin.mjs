export function remapAlias(options = {}) {
  const alias = options.alias;
  const log = !!options.log;

  return {
    name: "remapAlias",
    renderChunk: (code, chunk) => {
      /** @type string */
      let buffer = code;

      const aliasRegex = new RegExp(`['"]${alias}([\\/\\w-]+)['"]`, "g");
      const results = buffer.match(aliasRegex);

      if (!results) return code;

      for (const match of results) {
        const trimmedMatch = match.slice(1, -1);
        const module = trimmedMatch.split("/").slice(-1)[0];
        const modulePath = `./${module}.js`;
        buffer = buffer.replace(trimmedMatch, modulePath);

        if (log) console.log(`Remap "${trimmedMatch}" with "${modulePath}" in "${chunk.fileName}"`);
      }

      return buffer;
    },
  };
}
