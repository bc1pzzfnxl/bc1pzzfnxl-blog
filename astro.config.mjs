// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import { fileURLToPath } from "node:url";

export default defineConfig({
  site: "https://bc1pzzfnxl.com",
  output: "server",
  adapter: cloudflare(),
  trailingSlash: "always",
  integrations: [mdx(), icon(), sitemap()],
  vite: {
    resolve: {
      alias: {
        debug: fileURLToPath(new URL("./src/debug-mock.js", import.meta.url)),
      },
    },
  },
});