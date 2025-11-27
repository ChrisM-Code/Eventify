// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base URL for deployment (e.g. Netlify, Vercel)
  base: "/",

  // Local dev server settings
  server: {
    port: 3000,
    open: true, // auto-open browser
  },

  // Build configuration
  build: {
    outDir: "dist", // production build output
    sourcemap: true, // helpful for debugging
    chunkSizeWarningLimit: 600, // suppress large bundle warnings
  },

  // Dependency optimization
  optimizeDeps: {
    include: ["leaflet"], // react & react-dom auto handled
  },

  // Environment variable polyfill fix
  define: {
    "process.env": {}, // prevent "process is not defined" errors
  },

  // Esbuild tweaks (optional optimization)
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
