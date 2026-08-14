import { fetchFromBackend } from "@/lib/apiProxy";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: any): Promise<Response> {
    const params = await context.params;
    const slug: string = params.slug || params["slug.xml"] || "";

    const categorySlug = slug.replace(/\.xml$/, '');
    const baseUrl = "https://skilldeck.net";

    try {
        // 1. Fetch courses for this category from the sitemap API
        const coursesQueryParams = new URLSearchParams({ select: 'courses', category: categorySlug });
        const coursesRes = await fetchFromBackend('/sitemap', { queryParams: coursesQueryParams });

        if (!coursesRes.ok) {
            return new Response("Not Found", { status: 404 });
        }

        const coursesData = await coursesRes.json();
        const courses: any[] = coursesData.data || [];

        const escapeXml = (unsafe: string) => {
            return unsafe.replace(/[<>&'"]/g, (c) => {
                switch (c) {
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '&': return '&amp;';
                    case '\'': return '&apos;';
                    case '"': return '&quot;';
                    default: return c;
                }
            });
        };

        // 2. Build URLs: category page + course pages
        const urls: { loc: string; changefreq: string; priority: string }[] = [
            {
                loc: escapeXml(`${baseUrl}/${categorySlug}`),
                changefreq: 'weekly',
                priority: '0.9',
            },
            ...courses.map((course: any) => ({
                loc: escapeXml(`${baseUrl}/${categorySlug}/${course.course_slug}`),
                changefreq: 'weekly',
                priority: '0.8',
            }))
        ];

        // 3. For each course, fetch its location pages and add them
        const locationPromises = courses.map(async (course: any) => {
            try {
                const locQueryParams = new URLSearchParams({ select: 'location', course: course.course_slug });
                const locRes = await fetchFromBackend('/sitemap', { queryParams: locQueryParams });
                if (locRes.ok) {
                    const locData = await locRes.json();
                    const locations: any[] = locData.data || [];
                    return locations.map((loc: any) => ({
                        loc: escapeXml(`${baseUrl}/${categorySlug}/${loc.location_slug}`),
                        changefreq: 'weekly',
                        priority: '0.7',
                    }));
                }
            } catch (e) {
                console.error(`Error fetching locations for course ${course.course_slug}:`, e);
            }
            return [];
        });

        const locationResults = await Promise.all(locationPromises);
        for (const locUrls of locationResults) {
            urls.push(...locUrls);
        }

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

        return new Response(body, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error generating category sitemap:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
