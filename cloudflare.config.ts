import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "kmworks",
    compatibilityDate: "2026-09-25",
    observability: {
      enabled: true,
    },
    domains: ["kmworks.date", "www.kmworks.date"],
  },
});
