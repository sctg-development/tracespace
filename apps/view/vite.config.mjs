import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production",
    ),
    "process.env.MIXPANEL_ID": JSON.stringify(process.env.MIXPANEL_ID || "37cecbd0ac1436554068bc4655a52d31"),
    "process.env.PKG_VERSION": JSON.stringify(pkg.version),
    "process.env.PKG_REPOSITORY_URL": JSON.stringify(pkg.repository.url),
    "process.env.PKG_AUTHOR_NAME": JSON.stringify(pkg.author.name),
    "process.env.PKG_AUTHOR_URL": JSON.stringify(pkg.author.url),
    global: "globalThis",
  },
  optimizeDeps: {
    include: [
      "@sctg/tracespace-xml-id",
      "@sctg/gerber-to-svg",
      "@sctg/pcb-stackup",
      "common-prefix",
      "randomcolor",
      "viewbox",
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
  resolve: {
    alias: {
      "@sctg/tracespace-config": path.resolve(__dirname, "../../config"),
      path: "path-browserify",
      util: "util/",
      process: "process/browser.js",
      "process/": "process/browser.js",
      stream: "stream-browserify",
    },
  },
});
