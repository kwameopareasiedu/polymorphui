export default function remap() {
  const mappings = {
    "@/components/variants": "./variants.js",
    "@/components/utils": "./utils.js",
    "@/components/spinner": "./spinner.js",
    "@/components/popup": "./popup.js",
    "@/components/text": "./text.js",
    "@/components/input-helpers": "./input-helpers.js",
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
