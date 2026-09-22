import { defineConfig } from "vite";

// Cool Text is a fully static app: no backend, no framework — just Vite as the
// bundler/dev server for the plain-JS port of the original PHP + jQuery app.
export default defineConfig({
  root: ".",
  publicDir: false, // everything is imported from src/, nothing is copied verbatim
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
