import { defineCollection } from "astro:content";
// `z` re-exported from `astro:content` is deprecated; import it from
// `astro/zod` (the pattern nimbus-docs' own schema helpers document).
import { z } from "astro/zod";
import { docsCollection, partialsCollection } from "@cloudflare/nimbus-docs/content";

export const collections = {
  docs: defineCollection(
    docsCollection({
      schemaFields: {
        // Nimbus docs are agent-friendly by default. Set `audience: human`
        // to flag a page that's written primarily for human readers.
        audience: z.literal("human").optional(),
      },
    }),
  ),
  // Mounts at /blog per the nimbus collection conventions; gets .md
  // alternates, OG cards, and /blog/llms.txt without extra wiring.
  blog: defineCollection(
    docsCollection({
      base: "blog",
      schemaFields: {
        audience: z.literal("human").optional(),
        date: z.coerce.date(),
        tags: z.array(z.string()).optional(),
      },
    }),
  ),
  partials: defineCollection(partialsCollection()),
};
