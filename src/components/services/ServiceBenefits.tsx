import React from "react";
import { ServiceBenefitsData } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";
import ServiceSectionIntro from "./ServiceSectionIntro";

interface ServiceBenefitsProps {
    benefits?: ServiceBenefitsData;
}

/** Benefits as an asymmetric bento grid — the first outcome gets a larger, featured tile. */
export default function ServiceBenefits({ benefits = {} }: ServiceBenefitsProps) {
    const points = (benefits.points || []).filter((p) => p?.title);
    if (points.length === 0) return null;

    return (
        <section id="benefits" className="scroll-mt-24 py-16 md:py-24 bg-slate-50/70">
            <div className="container mx-auto px-2 lg:px-0 space-y-10">
                <ServiceSectionIntro
                    numeral="02"
                    kicker={benefits.tagline || "The Outcome"}
                    title={benefits.title || "Expected Outcomes & Business Advantages"}
                    description={benefits.description}
                    align="center"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {points.map((point, i) => {
                        const featured = i === 0;
                        return (
                            <div
                                key={i}
                                className={`rounded-3xl p-6 md:p-7 space-y-3 border transition-all duration-300 hover:-translate-y-1 ${featured
                                    ? "sm:col-span-2 bg-brand-dark border-brand-dark text-white"
                                    : "bg-white border-slate-100 shadow-sm hover:shadow-lg"
                                    }`}
                            >
                                <div className="space-y-3">
                                    <ServiceIconWrapper
                                        iconString={point.icon}
                                        className={`w-12 h-12 rounded-2xl ${featured ? "bg-white/10" : ""}`}
                                        iconClassName={`w-6 h-6 ${featured ? "text-white" : ""}`}
                                        defaultIcon="Check"
                                        fallbackBgClass={featured ? "bg-white/10 text-white" : "bg-brand-primary/10 text-brand-primary"}
                                    />
                                    <h3 className={`font-bold leading-snug ${featured ? "text-xl" : "text-sm"}`}>{point.title}</h3>
                                    {point.description && (
                                        <p className={featured ? "text-sm text-white/70 leading-relaxed" : "text-xs text-brand-muted leading-relaxed"}>
                                            {point.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
