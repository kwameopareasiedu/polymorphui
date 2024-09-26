import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polymorphUi from "polymorphui/plugin-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), polymorphUi()],
});
