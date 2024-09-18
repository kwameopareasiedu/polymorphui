export default function remap() {
  const mappings = {
    "@/components/variants": "./variants.js",
    "@/components/utils": "./utils.js",
  };

  return {
    name: "remap",
    renderChunk(code, chunk, options) {
      let transformedCode = code;

      for (const [from, to] of Object.entries(mappings)) {
        transformedCode = transformedCode.replace(from, to);
      }

      return transformedCode;
    },
  };
}
