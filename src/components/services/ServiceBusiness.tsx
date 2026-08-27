import React from "react";
import { ServiceStrategy } from "./types";
import ServiceItemIcon from "./ServiceItemIcon";
import ServiceSectionIntro from "./ServiceSectionIntro";

interface ServiceBusinessProps {
    business?: ServiceStrategy;
}

/** "Where we excel" expertise chapter — same credentials language, lighter stats treatment. */
export default function ServiceBusiness({ business = {} }: ServiceBusinessProps) {
    const points = (business.points || []).filter((p) => p?.title);
    const stats = (business.stats || []).filter((s) => s?.value);
    if (points.length === 0 && stats.length === 0) return null;

    return (
        <section id="expertise" className="scroll-mt-24 py-16 md:py-24 bg-slate-50/70">
            <div className="container mx-auto px-2 lg:px-0 space-y-12">
                <ServiceSectionIntro
                    numeral="06"
                    kicker={business.tagline || "Our Expertise"}
                    title={business.title || "Experienced Professionals & Results"}
                    description={business.description}
                />

                {points.length > 0 && (
                    <div className="space-y-5">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">Where We Excel</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <ServiceItemIcon
                                        iconString={point.icon}
                                        className="w-5 h-5 text-brand-secondary mt-0.5 shrink-0"
                                        defaultIcon="Briefcase"
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-brand-dark">{point.title}</p>
                                        {point.description && (
                                            <p className="text-xs text-brand-muted leading-relaxed mt-0.5">{point.description}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-2">
                                <ServiceItemIcon
                                    iconString={stat.icon}
                                    className="w-5 h-5 text-brand-primary"
                                    defaultIcon="Activity"
                                />
                                <p className="text-2xl font-black text-brand-dark leading-none">{stat.value}</p>
                                <p className="text-[11px] font-semibold text-brand-muted leading-snug">
                                    {stat.description || stat.tagline}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
