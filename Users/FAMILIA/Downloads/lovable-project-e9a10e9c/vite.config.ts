import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: ".output/public",
    emptyOutDir: true,
    rollupOptions: {
      input: "./index.html",
      output: {
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
    cssMinify: false,
  },
});
