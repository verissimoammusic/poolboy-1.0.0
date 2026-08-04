import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/" — served at the root of the custom domain (poolboy.pt) on
  // GitHub Pages. The default is already "/" for a root deployment, but we
  // set it explicitly so absolute asset URLs in index.html (/src/...,
  // /favicon.png) resolve correctly at the apex domain.
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
});
