"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { DemoServiceData } from "./types";

interface DemoHeroProps {
    data: DemoServiceData;
}

export default function DemoHero({ data }: DemoHeroProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { openModal } = useLeadModal();

    const { name, servicecard, banner, serviceCategory } = data;
    const heading = banner?.h1 || servicecard?.title || name;
    const description = banner?.description || servicecard?.content || data.description;
    const points = (servicecard?.points || []).filter(Boolean);
    const bannerStats = (banner?.stats || []).filter((s) => s?.value);
    const review = banner?.reviews?.[0];
    const media = banner?.media?.url;

    const visiblePoints = isExpanded ? points : points.slice(0, 4);
    const colBreak = Math.ceil(visiblePoints.length / 2);
    const col1 = visiblePoints.slice(0, colBreak);
    const col2 = visiblePoints.slice(colBreak);
    const hiddenCount = points.length - 4;

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        ...(serviceCategory?.name
            ? [{ label: serviceCategory.name, href: serviceCategory.slug ? `/services/${serviceCategory.slug}` : undefined }]
            : []),
        { label: name },
    ];

    const handleGetQuote = () => {
        openModal({
            source: "service-hero",
            formTitle: `Get a Quote for ${name}`,
            defaultValues: { subject: `Quote request for ${name}` },
        });
    };

    return (
        <section id="overview" className="relative bg-white pt-24 md:pt-28 pb-10 lg:pt-32 lg:pb-6 overflow-hidden scroll-mt-20">
            {/* Subtle right-side background tint, matching course hero language */}
            <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-1/2 h-full bg-[#F9FAFB] -skew-x-6 translate-x-1/4 -z-10"
            />
            <div
                aria-hidden="true"
                className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#5C3FFA]/5 blur-3xl -z-10"
            />

            <div className="container mx-auto px-2 lg:px-0 lg:space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-start">
                    {/* ───────────── LEFT COLUMN ───────────── */}
                    <div className="lg:col-span-7 space-y-4">
                        <Breadcrumb items={breadcrumbItems} />

                        {/* Category / rating badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {(servicecard?.tagline || banner?.tagline) && (
                                <span className="inline-flex items-center gap-1.5 text-[10px] 2xl:text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm" style={{ background: "var(--gradient-brand)" }}>
                                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                                    {servicecard?.tagline || banner?.tagline}
                                </span>
                            )}
                            {servicecard?.ratings && (
                                <span className="inline-flex items-center gap-1.5 text-[10px] 2xl:text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                                    {servicecard.ratings} Rated{review?.count ? ` · ${review.count} Clients` : ""}
                                </span>
                            )}
                        </div>

                        {/* Title + description */}
                        <div className="space-y-3">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-dark leading-[1.15] tracking-tight">
                                {heading}
                            </h1>
                            {description && (
                                <div
                                    className="body-medium max-w-2xl"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            )}
                        </div>

                        {/* Checklist — 2-column bordered, mirrors course hero keypoints */}
                        {points.length > 0 && (
                            <div className="border w-full md:w-fit border-gray-200 rounded-xl p-3 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                                    {col1.map((point, i) => (
                                        <CheckItem key={`c1-${i}`} text={point} />
                                    ))}
                                    {col2.map((point, i) => (
                                        <CheckItem key={`c2-${i}`} text={point} />
                                    ))}
                                </div>

                                {!isExpanded && hiddenCount > 0 && (
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="mt-2 text-brand-primary text-[11px] 2xl:text-xs font-semibold flex items-center gap-1 hover:underline"
                                    >
                                        + {hiddenCount} more
                                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-row items-center gap-3 pt-1">
                            <Button
                                onClick={handleGetQuote}
                                variant="primary"
                                size="lg"
                                className="h-12 px-5 md:px-8 rounded-xl text-sm font-bold"
                            >
                                Get Free Consultation
                            </Button>
                            <Button
                                as="a"
                                href="#approach"
                                variant="outline"
                                size="lg"
                                className="h-12 px-4 md:px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:border-gray-500 hover:bg-gray-50 transition-all hover:text-gray-900 gap-2"
                            >
                                See how it works
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>

                    {/* ───────────── RIGHT COLUMN — media / trust card ───────────── */}
                    <div className="lg:col-span-5 mt-2 lg:mt-0">
                        <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/60 bg-white">
                            {media ? (
                                <div className="relative w-full aspect-[4/3] bg-slate-50">
                                    <Image
                                        src={media}
                                        alt={banner?.media?.alt || heading || name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            ) : (
                                <div
                                    className="relative w-full aspect-[4/3] flex items-center justify-center"
                                    style={{ background: "var(--gradient-brand)" }}
                                >
                                    <ServiceItemIcon
                                        iconString={servicecard?.icon}
                                        className="w-16 h-16 text-white/90"
                                        defaultIcon="Sparkles"
                                    />
                                </div>
                            )}

                            {/* Rating pill overlay */}
                            {review?.ratings && (
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <div className="leading-none">
                                        <div className="text-sm font-extrabold text-brand-dark">{review.ratings}</div>
                                        {review.count && (
                                            <div className="text-[10px] text-brand-muted font-medium">{review.count} reviews</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Quick highlight chips overlay */}
                            {bannerStats.length > 0 && (
                                <div className="absolute bottom-4 right-4 left-4 flex flex-wrap justify-end gap-2">
                                    {bannerStats.slice(0, 1).map((stat, i) => (
                                        <div
                                            key={i}
                                            className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg text-[11px] font-bold text-brand-dark"
                                        >
                                            <ServiceItemIcon iconString={stat.icon} className="w-3.5 h-3.5 text-brand-primary" defaultIcon="BadgeCheck" />
                                            {stat.value}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Full-width dark gradient stats strip */}
                {/* {bannerStats.length > 0 && (
                    <div className="mt-8 lg:mt-0 bg-[linear-gradient(135deg,rgba(36,23,100,1)_0%,rgba(1,11,48,1)_100%)] rounded-2xl p-4 md:p-8 flex flex-wrap items-center justify-around gap-4 shadow-xl">
                        {bannerStats.map((stat, i) => (
                            <div key={i} className="flex-1 md:min-w-[180px] flex items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                    <ServiceItemIcon iconString={stat.icon} className="w-5 h-5 text-white" defaultIcon="BadgeCheck" />
                                </div>
                                <span className="text-sm md:text-base font-bold text-white leading-snug">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
        </section>
    );
}

function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-2 text-[13px] text-gray-700">
            <div
                aria-hidden="true"
                className="mt-0.5 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
            >
                <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 p-0.5 border border-brand-primary rounded-full text-brand-primary" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="2,6 5,9 10,3" />
                </svg>
            </div>
            {text}
        </div>
    );
}
