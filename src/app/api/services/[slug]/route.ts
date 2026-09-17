import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/lib/apiProxy";
import { getAllServices } from "@/lib/services";

/**
 * The service body, for client-side consumers only.
 *
 * Service patterns (/info/{slug} with a service parent) repeat every section of
 * /services/{slug} verbatim. Those sections now load from here, after a user
 * gesture, so the pattern's own editorial content is what the URL carries.
 *
 * `services` rides along because ServiceMoreServicesCards needs the list and one
 * round trip beats two. Pricing plans are not included — /api/plans already
 * serves those, and they vary by currency.
 *
 * Add `Disallow: /api/` to the Robots.txt script in the CMS.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug || slug.includes(".") || slug.includes("/")) {
            return NextResponse.json({ error: "Invalid service slug" }, { status: 400 });
        }

        const response = await fetchFromBackend(`/services/${slug}`, {
            next: { tags: [`service-${slug}`, "services"] },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend API responded with ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const service = data?.data || data;

        // Only the sections the pattern page duplicates. The hero, chapter dots,
        // why-choose-us and FAQ stay on the service page itself.
        const pruned = {
            slug: service.slug,
            name: service.name,
            benefits: service.benefits,
            approach: service.approach,
            strategy: service.strategy,
            whyopt: service.whyopt,
            business: service.business,
            addons: service.addons,
        };

        // Never fatal: the cards degrade to nothing rather than failing the body.
        const services = await getAllServices().catch(() => []);

        return NextResponse.json(
            { service: pruned, services },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
                },
            }
        );
    } catch (error: any) {
        console.error("API Proxy Error (Service body):", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
