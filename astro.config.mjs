// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import { fileURLToPath } from "node:url";
import { rehypeOptimizedImages } from "./src/lib/rehype-optimized-images.ts";

export default defineConfig({
  site: "https://bc1pzzfnxl.com",
  output: "server",
  adapter: cloudflare(),
  trailingSlash: "always",
  redirects: {
    "/le-mystère-de-barabbas/": "/le-mystere-de-barabbas/",
  },
  markdown: {
    rehypePlugins: [rehypeOptimizedImages],
  },
  integrations: [
    mdx({
      rehypePlugins: [rehypeOptimizedImages],
    }),
    icon(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: [
        "@astrojs/cloudflare",
        "@astrojs/cloudflare/entrypoints/server",
      ],
    },
    ssr: {
      external: [
        "@astrojs/cloudflare",
        "@astrojs/cloudflare/entrypoints/server",
      ],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        debug: fileURLToPath(new URL("./src/debug-mock.js", import.meta.url)),
      },
    },
  },
});