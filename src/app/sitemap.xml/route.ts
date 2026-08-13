import { fetchFromBackend } from "@/lib/apiProxy";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
    const baseUrl = "https://skilldeck.net";

    let categories: any[] = [];
    try {
        const queryParams = new URLSearchParams({ select: 'category' });
        const res = await fetchFromBackend('/sitemap', { queryParams });
        if (res.ok) {
            const data = await res.json();
            categories = Array.isArray(data) ? data : (data.data || []);
        }
    } catch (e) {
        console.error("Error fetching categories for sitemap index", e);
    }

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

    const subSitemaps = [
        `${baseUrl}/blogs-sitemap.xml`,
        ...categories.map(category => `${baseUrl}/${category.slug}.xml`)
    ];

    const now = new Date().toISOString();

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(`${baseUrl}/main-sitemap.xml`)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
${subSitemaps.map(url => `  <sitemap>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new Response(body, {
        headers: { "Content-Type": "application/xml" },
    });
}
