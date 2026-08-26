"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import Ui2SectionIntro from "./Ui2SectionIntro";
import Ui2CtaBanner from "./Ui2CtaBanner";
import { DemoAddons } from "@/components/demo-ui/types";

interface Ui2AddonsProps {
    data?: DemoAddons;
}

/** Premium dark upsell showcase — visually set apart from the rest of the page for contrast. */
export default function Ui2Addons({ data }: Ui2AddonsProps) {
    const { openModal } = useLeadModal();
    if (!data || (!data.title && !(data.cards || []).length)) return null;

    const cards = (data.cards || []).filter((c) => c?.title);
    const contentPoints = (data.content?.points || []).filter((p) => p?.point);
    const highlightPoints = (data.highlight?.points || []).filter((p) => p?.value);

    return (
        <section id="addons" className="scroll-mt-24 py-16 md:py-24 bg-brand-dark">
            <div className="container mx-auto px-2 lg:px-0 space-y-12">
                <Ui2SectionIntro numeral="06" kicker={data.tagline || "Add-On Advantages"} title={data.title} description={data.description} dark />

                {cards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cards.map((card, i) => (
                            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3 hover:bg-white/10 hover:border-brand-secondary/40 transition-all duration-300">
                                <ServiceItemIcon iconString={card.icon} className="w-6 h-6 text-brand-secondary" defaultIcon="Sparkles" />
                                <h4 className="text-sm font-bold text-white leading-snug">{card.title}</h4>
                                {card.description && <p className="text-xs text-white/50 leading-relaxed">{card.description}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {contentPoints.length > 0 && (
                    <div className="space-y-4">
                        {data.content?.title && <h3 className="text-lg font-bold text-white">{data.content.title}</h3>}
                        <div className="flex flex-wrap gap-2.5">
                            {contentPoints.map((point, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-xs font-semibold text-white/80">
                                    <ServiceItemIcon iconString={point.icon} className="w-3.5 h-3.5 text-brand-secondary" defaultIcon="CheckLine" />
                                    {point.point}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {highlightPoints.length > 0 && (
                    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-6">
                        {data.highlight?.title && (
                            <h3 className="text-lg md:text-xl font-bold text-white max-w-xl">{data.highlight.title}</h3>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {highlightPoints.map((point, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <ServiceItemIcon iconString={point.icon} className="w-4 h-4 text-brand-secondary" defaultIcon="Sparkles" />
                                        <h5 className="text-sm font-bold text-white">{point.value}</h5>
                                    </div>
                                    {point.descp && <p className="text-xs text-white/50 leading-relaxed pl-6">{point.descp}</p>}
                                </div>
                            ))}
                        </div>
                        {data.highlight?.cta && (
                            <Button
                                onClick={() => openModal({ source: "ui2-addons-highlight", formTitle: data.highlight?.cta })}
                                variant="primary"
                                className="rounded-full font-bold"
                            >
                                {data.highlight.cta}
                                <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                )}

                {data.cta?.title && (
                    <Ui2CtaBanner title={data.cta.title} description={data.cta.descp} buttonLabel="Download Now" dark />
                )}
            </div>
        </section>
    );
}
