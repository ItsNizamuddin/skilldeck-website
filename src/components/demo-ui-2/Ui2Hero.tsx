"use client";

import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { DemoServiceData } from "@/components/demo-ui/types";

interface Ui2HeroProps {
    data: DemoServiceData;
}

export default function Ui2Hero({ data }: Ui2HeroProps) {
    const { openModal } = useLeadModal();
    const { name, servicecard, banner } = data;
    const heading = banner?.h1 || servicecard?.title || name;
    const description = banner?.description || servicecard?.content;
    const bannerStats = (banner?.stats || []).filter((s) => s?.value);
    const review = banner?.reviews?.[0];
    const media = banner?.media?.url;

    // Highlight the final word of the headline in the secondary accent color.
    const words = heading.split(" ");
    const lead = words.slice(0, -1).join(" ");
    const last = words.slice(-1)[0];

    return (
        <section className="relative bg-white pt-28 md:pt-32 pb-0 overflow-hidden">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
                    {/* Left — editorial narrative */}
                    <div className="lg:col-span-6 space-y-6">
                        {(servicecard?.tagline || banner?.tagline) && (
                            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-secondary">
                                <span className="w-6 h-[2px] bg-brand-secondary" />
                                {servicecard?.tagline || banner?.tagline}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark leading-[1.08] tracking-tight">
                            {lead} <span className="text-brand-secondary">{last}</span>
                        </h1>

                        {description && (
                            <div
                                className="body-large max-w-lg"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        )}

                        <div className="flex flex-wrap items-center gap-5 pt-2">
                            <Button
                                onClick={() =>
                                    openModal({
                                        source: "ui2-hero",
                                        formTitle: `Get a Quote for ${name}`,
                                        defaultValues: { subject: `Quote request for ${name}` },
                                    })
                                }
                                variant="primary"
                                size="lg"
                                className="rounded-full px-8 font-bold"
                            >
                                Start the Conversation
                            </Button>
                            <a
                                href="#approach"
                                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors group"
                            >
                                See our approach
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>

                        {review && (
                            <div className="flex items-center gap-3 pt-1">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <span className="text-sm font-black text-brand-dark">{review.ratings}</span>
                                </div>
                                <span className="w-px h-4 bg-slate-200" />
                                <span className="text-xs font-semibold text-brand-muted">
                                    {review.count} businesses served
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right — organic-clipped media */}
                    <div className="lg:col-span-6 relative">
                        <div className="relative mx-auto max-w-md lg:max-w-none">
                            {media ? (
                                <div className="relative aspect-[5/4] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-2xl shadow-brand-primary/10 bg-slate-50">
                                    <Image src={media} alt={banner?.media?.alt || heading} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-contain" priority />
                                </div>
                            ) : (
                                <div className="aspect-[5/4] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl bg-brand-gradient" />
                            )}

                            {bannerStats[0] && (
                                <div className="absolute -bottom-6 left-6 md:left-10 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3.5 flex items-center gap-3 max-w-[240px]">
                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                                        <ServiceItemIcon iconString={bannerStats[0].icon} className="w-5 h-5 text-brand-primary" defaultIcon="Sparkles" />
                                    </div>
                                    <span className="text-sm font-bold text-brand-dark leading-tight">{bannerStats[0].value}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thin stat strip */}
            {bannerStats.length > 1 && (
                <div className="mt-20 md:mt-24 border-t border-slate-100">
                    <div className="container mx-auto px-2 lg:px-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                            {bannerStats.slice(1).map((stat, i) => (
                                <div key={i} className="flex items-center gap-3 py-5 sm:px-6 first:sm:pl-0">
                                    <ServiceItemIcon iconString={stat.icon} className="w-5 h-5 text-brand-primary shrink-0" defaultIcon="Sparkles" />
                                    <span className="text-sm font-bold text-brand-dark">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
