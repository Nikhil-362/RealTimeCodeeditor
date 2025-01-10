import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(),envCompatible()],
  css: {
    postcss: "./postcss.config.cjs", // Reference the PostCSS config file
  },
   build: {
    outDir: "dist", // Ensure this matches your server.js path
  },
});
