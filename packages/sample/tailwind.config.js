/** @type {import("tailwindcss").Config} */
const config = {
  content: ["index.html", "../../node_modules/polymorphui/dist/*.js", "src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff2e2e",
      },
    },
  },
  plugins: [],
};

export default config;
