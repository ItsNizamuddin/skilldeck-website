"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ServiceAddonsData } from "./types";
import ServiceItemIcon from "./ServiceItemIcon";
import ServiceSectionIntro from "./ServiceSectionIntro";
import ServiceCtaBanner from "./ServiceCtaBanner";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/Forms/LeadModalContext";

interface ServiceAddonsProps {
    addons?: ServiceAddonsData;
}

/** Premium dark upsell showcase — visually set apart from the rest of the page for contrast. */
export default function ServiceAddons({ addons = {} }: ServiceAddonsProps) {
    const { openModal } = useLeadModal();

    const cards = (addons.cards || []).filter((c) => c?.title);
    const contentPoints = (addons.content?.points || []).filter((p) => p?.point);
    const highlight = addons.highlight || {};
    const highlightPoints = (highlight.points || []).filter((p) => p?.value);

    if (cards.length === 0 && contentPoints.length === 0 && highlightPoints.length === 0) return null;

    return (
        <section id="addons" className="scroll-mt-24 py-16 md:py-24 bg-brand-dark">
            <div className="container mx-auto px-2 lg:px-0 space-y-12">
                <ServiceSectionIntro
                    numeral="07"
                    kicker={addons.tagline || "Add-On Advantages"}
                    title={addons.title || "Premium Capabilities & Integrations"}
                    description={addons.description}
                    dark
                />

                {cards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3 hover:bg-white/10 hover:border-brand-secondary/40 transition-all duration-300"
                            >
                                <ServiceItemIcon iconString={card.icon} className="w-6 h-6 text-brand-secondary" defaultIcon="Plus" />
                                <h4 className="text-sm font-bold text-white leading-snug">{card.title}</h4>
                                {card.description && <p className="text-xs text-white/50 leading-relaxed">{card.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {contentPoints.length > 0 && (
                    <div className="space-y-4">
                        {(addons.content?.tagline || addons.content?.title || addons.content?.description) && (
                            <div className="space-y-2 max-w-2xl">
                                {addons.content?.tagline && (
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-secondary">
                                        {addons.content.tagline}
                                    </span>
                                )}
                                {addons.content?.title && (
                                    <h3 className="text-lg font-bold text-white">{addons.content.title}</h3>
                                )}
                                {addons.content?.description && (
                                    <p className="text-xs text-white/50 leading-relaxed">{addons.content.description}</p>
                                )}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2.5">
                            {contentPoints.map((point, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-xs font-semibold text-white/80"
                                >
                                    <ServiceItemIcon iconString={point.icon} className="w-3.5 h-3.5 text-brand-secondary" defaultIcon="Check" />
                                    {point.point}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {highlightPoints.length > 0 && (
                    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-6">
                        {(highlight.tagline || highlight.title) && (
                            <div className="space-y-2 max-w-xl">
                                {highlight.tagline && (
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-brand-secondary">
                                        {highlight.tagline}
                                    </span>
                                )}
                                {highlight.title && (
                                    <h3 className="text-lg md:text-xl font-bold text-white">{highlight.title}</h3>
                                )}
                                {highlight.description && (
                                    <p className="text-xs text-white/50 leading-relaxed">{highlight.description}</p>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {highlightPoints.map((point, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <ServiceItemIcon iconString={point.icon} className="w-4 h-4 text-brand-secondary" defaultIcon="Layers" />
                                        <h5 className="text-sm font-bold text-white">{point.value}</h5>
                                    </div>
                                    {point.descp && <p className="text-xs text-white/50 leading-relaxed pl-6">{point.descp}</p>}
                                </div>
                            ))}
                        </div>
                        {highlight.cta && (
                            <Button
                                onClick={() => openModal({ source: "service-addons-highlight", formTitle: highlight.cta })}
                                variant="primary"
                                className="rounded-full font-bold"
                            >
                                {highlight.cta}
                                <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                )}

                {addons.cta?.title && (
                    <ServiceCtaBanner
                        title={addons.cta.title}
                        description={addons.cta.descp}
                        buttonLabel="Download Now"
                        source="service-addons"
                        dark
                    />
                )}
            </div>
        </section>
    );
}
