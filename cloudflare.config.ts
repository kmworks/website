import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "kmworks-website",
    compatibilityDate: "2026-09-25",
    observability: {
      enabled: true,
    },
    domains: ["kmworks.date", "www.kmworks.date"],
  },
});
