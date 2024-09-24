export function remapAlias(mappings = {}) {
  return {
    name: "externals",
    renderChunk(code, chunk, options) {
      let transformedCode = code;

      for (const [from, to] of Object.entries(mappings)) {
        transformedCode = transformedCode.replace(from, to);
      }

      return transformedCode;
    },
  };
}
