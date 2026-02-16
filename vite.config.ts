import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine base path based on environment
// GitHub Pages uses /subscription-tracker/, Vercel uses /
const base = process.env.VERCEL ? '/' : '/subscription-tracker/';

// https://vite.dev/config/
export default defineConfig({
  base: base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
