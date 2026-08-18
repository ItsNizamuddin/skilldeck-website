"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Check } from "lucide-react";
import { ServiceBanner, ServiceStatItem } from "./types";
import ServiceItemIcon from "./ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import ServiceIconWrapper from "./ServiceIconWrapper";

import { Button } from "@/components/ui/Button";

interface ServiceHeroProps {
    banner?: ServiceBanner;
    servicestats?: ServiceStatItem[];
    serviceName: string;
    fallbackTagline?: string;
    description?: string;
    brochureUrl?: string;
    clientsCount?: string;
    primaryCtaText?: string;
    secondaryCtaText?: string;
    primaryCtaHref?: string;
    secondaryCtaHref?: string;
    heroStats?: { icon?: string; value: string; description?: string; tagline?: string }[];
}

export default function ServiceHero({
    banner = {},
    servicestats = [],
    serviceName,
    fallbackTagline = "Professional Service",
    description = "",
    clientsCount = "300+",
    primaryCtaText = "Start Free Trial",
    secondaryCtaText = "Get Quote",
    primaryCtaHref = "/register",
    heroStats = []
}: ServiceHeroProps) {
    const { openModal } = useLeadModal();

    const highlightHeading = (text: string) => {
        const words = text.split(" ");
        if (words.length <= 2) return <span className="text-slate-900">{text}</span>;
        const middleIndex = Math.max(1, words.length - 3);
        const firstPart = words.slice(0, middleIndex).join(" ");
        const secondPart = words.slice(middleIndex).join(" ");
        return (
            <>
                <span className="text-slate-900">{firstPart} </span>
                <span 
                    className="bg-clip-text text-transparent block md:inline-block font-extrabold"
                    style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                    {secondPart}
                </span>
            </>
        );
    };

    const parseBannerStat = (val: string) => {
        const parts = val.trim().split(" ");
        const numberPart = parts[0] || "";
        const textPart = parts.slice(1).join(" ") || "";
        return { numberPart, textPart };
    };

    // Use only top 4 stats for the 2x2 grid on the right
    const gridStats = servicestats.slice(0, 4);

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-10 md:py-16 pt-20 md:pt-32">
            {/* Background Blur Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-2 lg:px-0 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Content Side */}
                <div className="lg:col-span-7 space-y-2 md:space-y-5">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-100 text-indigo-600">
                        {banner.tagline || fallbackTagline}
                    </span>
                    <h1 className="text-2xl md:text-4xl 2xl:text-5xl font-bold tracking-tight leading-tight">
                        {highlightHeading(banner.h1 || serviceName)}
                    </h1>
                    <div
                        className="text-slate-600 text-xs md:text-sm 2xl:text-base leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: banner.description || description }}
                    />

                    {/* Action Buttons */}
                    <div className="mt-4 md:mt-8 flex flex-row items-center gap-4 w-full sm:w-auto">
                        <Button
                            as={Link}
                            href={primaryCtaHref}
                            variant="primary"
                            className="w-full sm:w-auto text-xs md:text-sm py-3"
                        >
                            {primaryCtaText}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => openModal({
                                source: 'enquiry',
                                formTitle: `Get Quote for ${serviceName}`,
                                defaultValues: {
                                    subject: `Quote request for ${serviceName}`
                                }
                            })}
                            variant="outline"
                            className="w-full sm:w-auto text-xs md:text-sm py-3 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800"
                        >
                            <MessageSquare className="w-4 h-4" />
                            {secondaryCtaText}
                        </Button>
                    </div>

                    {/* Bottom Statistics Row with Icons */}
                    {heroStats && heroStats.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100/80">
                            {heroStats.slice(0, 3).map((stat, i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3">
                                    <ServiceIconWrapper
                                        iconString={stat.icon}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl"
                                        iconClassName="w-4 h-4 sm:w-5 sm:h-5"
                                        defaultIcon="Activity"
                                        fallbackBgClass="bg-blue-50 text-blue-600"
                                    />
                                    <div className="space-y-0.5 sm:space-y-1">
                                        <div className="text-sm sm:text-lg font-black text-slate-900 leading-none">{stat.value}</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wide leading-tight mt-0.5">{stat.description || stat.tagline}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Cards Grid Side */}
                <div className="lg:col-span-5 flex flex-col items-end gap-6 w-full">
                    {gridStats.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {gridStats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300 space-y-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center shrink-0">
                                        <ServiceItemIcon iconString={stat.icon} className="w-5 h-5 text-blue-600" defaultIcon="Layers" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{stat.description}</h3>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">{stat.tagline}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Trusted Pill */}
                    <div 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold shadow-md shadow-blue-500/20"
                        style={{ background: "var(--gradient-brand)" }}
                    >
                        <Check className="w-3.5 h-3.5 stroke-3" />
                        <span>Trusted by {clientsCount} Clients</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
