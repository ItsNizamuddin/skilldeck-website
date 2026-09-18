import Link from "next/link";
import type { Metadata } from "next";
import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ServicesGrid from "@/components/Home/elements/ServicesGrid";
import { getAllServices } from "@/lib/services";
import { getAllPatterns } from "@/lib/patterns";
import { env } from "@/lib/env";

export const metadata: Metadata = {
    title: "Services | SkillDeck",
    description:
        "Every SkillDeck service for training institutes — LMS, CRM, CMS, marketing automation, webchat, ecommerce and more, in one place.",
    robots: { index: true, follow: true },
    alternates: { canonical: "/services" },
};

export const revalidate = false; // Pure On-Demand ISR: held on the CDN until a webhook purge

/**
 * The services hub.
 *
 * /services had no page of its own, so it fell through to /[slug], missed, and
 * followed the redirect table to the home page — a redirect Google reads as a
 * soft 404 that carries nothing across. This static segment takes precedence
 * over /[slug], so the URL now answers for itself, and it doubles as the one
 * page that links into both the service pages and the /info/ cluster.
 */
export default async function ServicesIndexPage() {
    const siteUrl = (env.NEXT_PUBLIC_SITE_URL || "https://skilldeck.net").replace(/\/$/, "");

    const [services, patterns] = await Promise.all([
        getAllServices().catch(() => []),
        getAllPatterns().catch(() => []),
    ]);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
        ],
    };

    const itemListSchema = services.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${siteUrl}/services#services`,
            "name": "SkillDeck Services",
            "itemListElement": services.map((service, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": service.service_name || service.name || service.slug,
                "url": `${siteUrl}/services/${service.slug}`,
            })),
        }
        : null;

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {itemListSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
                />
            )}
            <MainNav />

            <main className="flex-1">
                <section className="container mx-auto px-4 lg:px-0 pt-16 pb-6 md:pt-24">
                    <h1 className="heading-section text-brand-dark mb-4">Services</h1>
                    <p className="body-medium text-brand-muted max-w-3xl">
                        Everything SkillDeck runs for a training institute — learning, sales,
                        marketing and the website — as separate services you can take one at a
                        time or together.
                    </p>
                </section>

                <ServicesGrid services={services} id="services" />

                {/* The /info/ guides. Linked from here as well as from each parent
                    service, so the cluster is reachable from a single hub too. */}
                {patterns.length > 0 && (
                    <section className="container mx-auto px-4 lg:px-0 pb-16 md:pb-24">
                        <div className="border border-gray-200 rounded-3xl bg-white shadow-sm px-5 md:px-8 py-7">
                            <h2 className="heading-card text-brand-dark mb-5">Guides</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 list-disc list-inside">
                                {patterns.map((pattern) => (
                                    <li key={pattern.slug} className="text-gray-600 marker:text-gray-400">
                                        <Link
                                            href={`/info/${pattern.slug}`}
                                            className="body-small hover:text-brand-primary hover:underline transition-colors decoration-1 underline-offset-4"
                                        >
                                            {pattern.title || pattern.slug}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
