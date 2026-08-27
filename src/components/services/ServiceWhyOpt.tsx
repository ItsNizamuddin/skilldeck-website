import React from "react";
import { ServiceStrategy } from "./types";
import ServiceItemIcon from "./ServiceItemIcon";
import ServiceSectionIntro from "./ServiceSectionIntro";

interface ServiceWhyOptProps {
    whyopt?: ServiceStrategy;
}

/** "How we partner" credentials chapter — clean icon list plus a dark stats band. */
export default function ServiceWhyOpt({ whyopt = {} }: ServiceWhyOptProps) {
    const points = (whyopt.points || []).filter((p) => p?.title);
    const stats = (whyopt.stats || []).filter((s) => s?.value);
    if (points.length === 0 && stats.length === 0) return null;

    return (
        <section id="credentials" className="scroll-mt-24 section-y">
            <div className="container mx-auto px-2 lg:px-0 space-y-12">
                <ServiceSectionIntro
                    numeral="05"
                    kicker={whyopt.tagline || "Why SkillDeck"}
                    title={whyopt.title || "Core Value Proposition"}
                    description={whyopt.description}
                />

                {points.length > 0 && (
                    <div className="space-y-5">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">How We Partner</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            {points.map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <ServiceItemIcon
                                        iconString={point.icon}
                                        className="w-5 h-5 text-brand-primary mt-0.5 shrink-0"
                                        defaultIcon="Check"
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
                    <div className="rounded-3xl bg-brand-dark p-6 md:p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <ServiceItemIcon
                                        iconString={stat.icon}
                                        className="w-5 h-5 text-brand-secondary shrink-0"
                                        defaultIcon="ShieldAlert"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-lg font-black text-white leading-none">{stat.value}</p>
                                        <p className="text-[11px] text-white/50 font-medium mt-1">{stat.description || stat.tagline}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
