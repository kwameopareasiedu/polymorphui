/** @type {import("tailwindcss").Config} */
const config = {
  content: ["index.html", "../../node_modules/polymorphui/dist/*.js", "src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#d00092",
      },
    },
  },
  plugins: [],
};

export default config;
