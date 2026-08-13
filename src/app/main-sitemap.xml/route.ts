export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const baseUrl = "https://skilldeck.net";

  const routes = [
    "/",
    "/about-us",
    "/blog",
    "/careers",
    "/contact-us",
    "/companies",
    "/companies/schedules",
    "/cookie-policy",
    "/faq",
    "/pricing",
    "/privacy-policy",
    "/register",
    "/terms-of-service",
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
      .map(
        (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
      )
      .join("")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
