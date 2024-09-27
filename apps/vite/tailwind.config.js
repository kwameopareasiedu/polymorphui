/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "index.html",
    "src/**/*.{ts,tsx}",
    "polymorphui.config.ts",
    "node_modules/polymorphui/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
