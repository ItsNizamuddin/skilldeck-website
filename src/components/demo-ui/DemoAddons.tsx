"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import DemoSectionHeader from "./DemoSectionHeader";
import DemoPointGrid from "./DemoPointGrid";
import DemoCtaBanner from "./DemoCtaBanner";
import { DemoAddons as DemoAddonsData } from "./types";

interface DemoAddonsProps {
    data?: DemoAddonsData;
}

export default function DemoAddons({ data }: DemoAddonsProps) {
    const { openModal } = useLeadModal();
    if (!data || (!data.title && !(data.cards || []).length)) return null;

    const cards = (data.cards || []).filter((c) => c?.title);
    const contentPoints = (data.content?.points || []).filter((p) => p?.point);
    const highlightPoints = (data.highlight?.points || []).filter((p) => p?.value);

    return (
        <div id="addons" className="scroll-mt-24 space-y-10">
            <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />

            {cards.length > 0 && (
                <DemoPointGrid
                    points={cards.map((c) => ({ icon: c.icon, title: c.title, description: c.description }))}
                    columns={4}
                    variant="tile"
                />
            )}

            {data.cta?.title && (
                <DemoCtaBanner
                    title={data.cta.title}
                    description={data.cta.descp}
                    buttonLabel="Download Now"
                    formTitle={data.cta.title}
                />
            )}

            {/* Content pillars */}
            {(data.content?.title || contentPoints.length > 0) && (
                <div className="rounded-2xl border border-slate-100 bg-white p-6 md:p-8 space-y-5">
                    <div className="space-y-2 max-w-2xl">
                        {data.content?.tagline && (
                            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                                {data.content.tagline}
                            </span>
                        )}
                        {data.content?.title && (
                            <h3 className="text-lg md:text-xl font-bold text-brand-dark leading-snug">{data.content.title}</h3>
                        )}
                        {data.content?.description && (
                            <p className="text-sm text-brand-muted leading-relaxed">{data.content.description}</p>
                        )}
                    </div>
                    {contentPoints.length > 0 && (
                        <div className="flex flex-wrap gap-2.5">
                            {contentPoints.map((point, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs font-semibold text-brand-dark"
                                >
                                    <ServiceItemIcon iconString={point.icon} className="w-3.5 h-3.5 text-brand-primary" defaultIcon="CheckLine" />
                                    {point.point}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Highlight panel */}
            {(data.highlight?.title || highlightPoints.length > 0) && (
                <div
                    className="rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
                    style={{ background: "linear-gradient(135deg,rgba(36,23,100,1) 0%,rgba(1,11,48,1) 100%)" }}
                >
                    <div className="space-y-2 max-w-2xl">
                        {data.highlight?.tagline && (
                            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                                {data.highlight.tagline}
                            </span>
                        )}
                        {data.highlight?.title && (
                            <h3 className="text-lg md:text-xl font-extrabold text-white leading-snug">{data.highlight.title}</h3>
                        )}
                        {data.highlight?.description && (
                            <p className="text-sm text-white/70 leading-relaxed">{data.highlight.description}</p>
                        )}
                    </div>

                    {highlightPoints.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {highlightPoints.map((point, i) => (
                                <div key={i} className="bg-white/8 border border-white/10 rounded-xl p-4 space-y-2">
                                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                                        <ServiceItemIcon iconString={point.icon} className="w-4.5 h-4.5 text-white" defaultIcon="Sparkles" />
                                    </div>
                                    <h5 className="text-sm font-bold text-white">{point.value}</h5>
                                    {point.descp && <p className="text-xs text-white/65 leading-relaxed">{point.descp}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    {data.highlight?.cta && (
                        <Button
                            onClick={() =>
                                openModal({ source: "service-addons-highlight", formTitle: data.highlight?.cta })
                            }
                            variant="primary"
                            className="rounded-xl font-bold text-sm"
                        >
                            {data.highlight.cta}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
