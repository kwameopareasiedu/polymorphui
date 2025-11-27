/** @type {import("tailwindcss").Config} */
const config = {
  content: ["index.html", "../../node_modules/polymorphui/dist/*.js", "src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#e366be",
          400: "#d933a8",
          DEFAULT: "#d00092",
          500: "#a60075",
          600: "#7d0058",
        },
      },
    },
  },
  plugins: [],
};

export default config;
