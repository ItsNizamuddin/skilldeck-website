import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchFromBackend } from "@/lib/apiProxy";
import { env } from "@/lib/env";
import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CourseRelatedLinks from "@/components/category/courses/overview/CourseRelatedLinks";
import CourseAccordionSection from "@/components/category/courses/overview/CourseAccordionSection";
import { fetchPlans } from "@/lib/plans";
import { getServicesCategories } from "@/lib/services";

// Import modular components
import { ServiceData } from "@/components/services/types";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceStats from "@/components/services/ServiceStats";
import ServiceWhyChooseUs from "@/components/services/ServiceWhyChooseUs";
import ServiceBenefits from "@/components/services/ServiceBenefits";
import ServiceApproach from "@/components/services/ServiceApproach";
import ServiceAddons from "@/components/services/ServiceAddons";
import ServiceStrategyComponent from "@/components/services/ServiceStrategy";
import ServiceWhyOpt from "@/components/services/ServiceWhyOpt";
import ServiceBusiness from "@/components/services/ServiceBusiness";
import PricingSection from "@/components/Pricing/PricingSection";

export const revalidate = 3600;

export async function generateStaticParams() {
    try {
        const categories = await getServicesCategories();
        const slugs = new Set<string>();
        categories.forEach(cat => {
            (cat.services || []).forEach(svc => {
                if (svc.slug) slugs.add(svc.slug);
            });
        });
        return Array.from(slugs).map(slug => ({ slug }));
    } catch (error) {
        console.error("Error generating static params for services:", error);
        return [];
    }
}

interface ServiceParams {
    slug: string;
}

// Function to fetch service data
async function getServiceData(slug: string, pageUrl?: string): Promise<ServiceData | null> {
    try {
        const response = await fetchFromBackend(`/services/${slug}`, {
            next: { revalidate: 3600, tags: ['services'] }
        });

        if (!response.ok) {
            return null;
        }

        const cacheStatus = response.headers.get('x-cache');
        if (cacheStatus && cacheStatus.toUpperCase().includes('MISS') && pageUrl) {
            import("@/lib/cloudflare").then(({ purgeCloudflareCache }) => {
                purgeCloudflareCache([pageUrl]).catch(err => {
                    console.error("[Cloudflare Purge Error] in getServiceData:", err);
                });
            }).catch(err => {
                console.error("[Import Error] cloudflare:", err);
            });
        }

        const json = await response.json();
        return json.data || json;
    } catch (error) {
        console.error("Error fetching service:", error);
        return null;
    }
}

// Metadata Generator
export async function generateMetadata({ params }: { params: Promise<ServiceParams> }): Promise<Metadata> {
    const { slug } = await params;
    const baseUrl = env.NEXT_PUBLIC_SITE_URL || 'https://skilldeck.net';
    const pageUrl = `${baseUrl.replace(/\/$/, '')}/services/${slug}`;

    const service = await getServiceData(slug, pageUrl);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.metaTitle || `${service.name} | SkillDeck`,
        description: service.metaDescription,
        keywords: service.keywords,
        robots: service.metaRobots || {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: service.ogTitle || service.metaTitle || service.name,
            description: service.ogDescription || service.metaDescription,
        },
    };
}

// Service Page Component
export default async function ServicePage({ params }: { params: Promise<ServiceParams> }) {
    const { slug } = await params;
    const siteUrl = env.NEXT_PUBLIC_SITE_URL || 'https://skilldeck.net';
    const pageUrl = `${siteUrl.replace(/\/$/, '')}/services/${slug}`;

    const [service, plans] = await Promise.all([
        getServiceData(slug, pageUrl),
        fetchPlans("USD")
    ]);

    if (!service) {
        notFound();
    }

    // JSON-LD Schemas
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.metaDescription || service.name,
        "provider": {
            "@type": "Organization",
            "name": "SkillDeck",
            "sameAs": "https://www.skilldeck.net"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": `${siteUrl}/services`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": service.name,
                "item": pageUrl
            }
        ]
    };

    let serviceFaqSchema: any = null;
    if (service.faqs?.accordions && service.faqs.accordions.length > 0) {
        serviceFaqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": `FAQ for ${service.name}`,
            "mainEntity": service.faqs.accordions.map((faq: any) => ({
                "@type": "Question",
                "name": faq.title,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.description?.replace(/<[^>]*>?/gm, '')
                }
            }))
        };
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {serviceFaqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqSchema) }}
                />
            )}
            <MainNav />

            <main className="flex-1">
                {/* Hero Section */}
                <ServiceHero
                    banner={service.banner}
                    servicestats={service.servicestats}
                    serviceName={service.name}
                    fallbackTagline={service.servicecard?.tagline}
                    description={service.description}
                    brochureUrl={service.leadmagnet?.[0]?.broucher?.url}
                    clientsCount={service.servicecard?.clients}
                    primaryCtaText={"Start Free Trial"}
                    secondaryCtaText={"Get Quote"}
                    heroStats={service.business?.stats}
                />

                {/* Service Stats Row */}
                <ServiceStats stats={service.servicestats} />

                {/* Why Choose Us */}
                <ServiceWhyChooseUs
                    whyservice={service.whyservice}
                    serviceName={service.name}
                />

                {/* Benefits */}
                <ServiceBenefits benefits={service.benefits} />

                {/* Strategy Section */}
                <ServiceStrategyComponent strategy={service.strategy} />

                {/* Why Opt / Choose Us Additional Details */}
                <ServiceWhyOpt whyopt={service.whyopt} />

                {/* Business / Our Expertise Section */}
                <ServiceBusiness business={service.business} />

                {/* Our Approach / Framework */}
                <ServiceApproach approach={service.approach} />

                {/* Highlight & Addons Section */}
                <ServiceAddons addons={service.addons} />

                {/* Pricing Plans Section */}
                <PricingSection plans={plans} />

                {/* FAQ Accordion Section */}
                {service.faqs?.accordions && service.faqs.accordions.length > 0 && (
                    <section className="py-10 md:py-16 bg-white border-t border-slate-100">
                        <div className="container mx-auto px-2 lg:px-0 max-w-4xl space-y-6 lg:space-y-12">
                            <div className="text-center space-y-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                                    {service.faqs.tagline || "Got Questions?"}
                                </span>
                                <h2 className="text-xl md:text-3xl font-extrabold text-slate-900">
                                    {service.faqs.title || "Frequently Asked Questions"}
                                </h2>
                                {service.faqs.description && (
                                    <p className="text-xs text-slate-500">{service.faqs.description}</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                {service.faqs.accordions.map((faq: any, index: number) => (
                                    <CourseAccordionSection
                                        key={index}
                                        title={faq.title}
                                        value={faq.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Bottom and Internal Sections */}
                <div className="container mx-auto px-2 lg:px-0 pb-16 space-y-12 mt-12">
                    {(service.bottomSection?.value || service.internalSection?.value) && (
                        <div className="space-y-6">
                            {service.internalSection?.value && (
                                <CourseRelatedLinks
                                    title={service.internalSection.title || ""}
                                    value={service.internalSection.value || ""}
                                />
                            )}
                            {service.bottomSection?.value && (
                                <CourseAccordionSection
                                    title={service.bottomSection.title || ""}
                                    value={service.bottomSection.value || ""}
                                />
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
