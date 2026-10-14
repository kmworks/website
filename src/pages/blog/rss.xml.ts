import { getCollection } from "astro:content";

export const prerender = true;

const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export async function GET({ site }: { site?: URL }) {
  const base = site ?? new URL("https://kmworks.date");
  const posts = (
    await getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft)
  ).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.id}/`, base).href;
      return [
        "<item>",
        `<title>${escapeXml(post.data.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${post.data.date.toUTCString()}</pubDate>`,
        post.data.description
          ? `<description>${escapeXml(post.data.description)}</description>`
          : "",
        "</item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>kmworks Blog</title>
<link>${new URL("/blog/", base).href}</link>
<description>Release announcements, feature deep-dives, and tutorials from the kmworks ecosystem.</description>
${items}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
