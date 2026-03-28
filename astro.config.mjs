// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bc1pzzfnxl.com",
  output: "server",
  adapter: cloudflare(),
  integrations: [mdx(), icon(), sitemap()],
});