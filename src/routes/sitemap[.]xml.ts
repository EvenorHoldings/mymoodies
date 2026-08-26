import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const staticPaths = ["/", "/shop", "/about", "/contact", "/legal"];
        const productPaths = products.map((p) => `/product/${p.id}`);
        const today = new Date().toISOString().slice(0, 10);

        const urls = [...staticPaths, ...productPaths]
          .map(
            (path) =>
              `  <url><loc>${origin}${path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
