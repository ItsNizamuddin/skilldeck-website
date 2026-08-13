import { fetchFromBackend } from "@/lib/apiProxy";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
    const baseUrl = "https://skilldeck.net";

    const escapeXml = (unsafe: string) =>
        unsafe.replace(/[<>&'"]/g, (c) => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case "'": return '&apos;';
                case '"': return '&quot;';
                default: return c;
            }
        });

    try {
        const queryParams = new URLSearchParams({ page: '1', limit: '10000' });
        const res = await fetchFromBackend('/blogs', { queryParams });
        if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);

        const data = await res.json();
        const blogs: any[] = Array.isArray(data) ? data : (data.data || []);
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://sitemaps.org/schemas/sitemap/0.9">
${blogs.map((blog: any) => `  <url>
    <loc>${escapeXml(`${baseUrl}/blog/${blog.slug}`)}</loc>
    <lastmod>${blog.updatedAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

        return new Response(body, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error generating blogs sitemap:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
