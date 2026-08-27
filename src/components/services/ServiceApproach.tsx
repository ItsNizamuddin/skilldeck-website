import React from "react";
import Image from "next/image";
import { ServiceApproachData, ServiceMedia } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";
import ServiceItemIcon from "./ServiceItemIcon";
import ServiceSectionIntro from "./ServiceSectionIntro";
import ServiceCtaBanner from "./ServiceCtaBanner";
import ServiceApproachMedia from "./ServiceApproachMedia";

interface ServiceApproachProps {
    approach?: ServiceApproachData;
    /** Optional clip shown beside the section body — sourced from `strategy.media`. */
    media?: string | ServiceMedia;
}

/** Vertical connected-step timeline + inline KPI chips + a clean tools row. */
export default function ServiceApproach({ approach = {}, media }: ServiceApproachProps) {
    const steps = (approach.steps || []).filter((s) => s?.title);
    const kpiCategories = (approach.kpis?.kpiCategory || []).filter((c) => (c.content || []).length > 0);
    const tools = (approach.tools?.content || []).filter((t) => t?.tagline || t?.icon);

    if (steps.length === 0 && kpiCategories.length === 0 && tools.length === 0) return null;

    return (
        <section id="approach" className="scroll-mt-24 section-y">
            <div className="container mx-auto px-2 lg:px-0 space-y-14">
                <ServiceSectionIntro
                    numeral="03"
                    kicker={approach.tagline || "How We Work"}
                    title={approach.title || "How We Work & Optimize Outcomes"}
                    description={approach.description}
                />

                {/* The media cell is `align-self: start` + sticky, so it tracks the
                    whole body column — timeline, KPIs and tools — not just the steps. */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    <div className={`space-y-14 ${media ? "lg:col-span-7" : "lg:col-span-12"}`}>
                        {steps.length > 0 && (
                            <div className="relative">
                                <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent" />
                                <div className="space-y-10">
                                    {steps.map((step, i) => (
                                        <div key={i} className="relative flex items-start gap-6">
                                            <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-brand-primary/30 flex items-center justify-center shrink-0 font-black text-brand-primary">
                                                {String(i + 1).padStart(2, "0")}
                                            </div>
                                            <div className="pt-2 space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <ServiceItemIcon iconString={step.icon} className="w-4 h-4 text-brand-secondary" defaultIcon="Compass" />
                                                    <h3 className="text-base font-bold text-brand-dark">{step.title}</h3>
                                                </div>
                                                {step.description && <p className="body-small max-w-lg">{step.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {kpiCategories.length > 0 && (
                            <div className="space-y-4">
                                <span className="badge-brand inline-flex">{approach.kpis?.badge || "Key Performance Indicators"}</span>
                                <div className="flex flex-wrap gap-x-10 gap-y-5">
                                    {kpiCategories.map((category, i) => (
                                        <div key={i} className="space-y-2.5">
                                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">{category.name}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(category.content || []).map((kpi, j) => (
                                                    <span
                                                        key={j}
                                                        className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-dark shadow-sm hover:border-brand-primary/30 hover:shadow transition-all duration-200"
                                                    >
                                                        <ServiceItemIcon iconString={kpi.icon} className="w-3.5 h-3.5 text-brand-primary" defaultIcon="BadgeCheck" />
                                                        {kpi.value}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tools.length > 0 && (
                            <div className="space-y-5">
                                {approach.tools?.badge && (
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-secondary">{approach.tools.badge}</p>
                                )}
                                {approach.tools?.description && <p className="body-medium max-w-2xl">{approach.tools.description}</p>}
                                <div className="flex flex-wrap items-center gap-3">
                                    {tools.map((tool, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl pl-3 pr-4 py-2.5 shadow-sm hover:border-brand-primary/30 hover:shadow-md transition-all duration-200"
                                        >
                                            {tool.icon ? (
                                                <div className="relative w-6 h-6 shrink-0">
                                                    <Image src={tool.icon} alt={tool.tagline || "Tool"} fill sizes="24px" className="object-contain" />
                                                </div>
                                            ) : (
                                                <ServiceIconWrapper iconString={undefined} className="w-6 h-6 rounded-md" iconClassName="w-3.5 h-3.5" />
                                            )}
                                            <span className="text-sm font-semibold text-brand-dark">{tool.tagline}</span>
                                        </div>
                                    ))}
                                </div>
                                {approach.tools?.cta?.title && (
                                    <ServiceCtaBanner
                                        title={approach.tools.cta.title}
                                        description={approach.tools.cta.descp}
                                        buttonLabel="Talk To Our Team"
                                        source="service-approach-tools"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {media && (
                        <div className="order-first lg:order-none lg:col-span-5 lg:sticky lg:top-28">
                            <ServiceApproachMedia media={media} fallbackLabel={approach.title || "Our Approach"} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
