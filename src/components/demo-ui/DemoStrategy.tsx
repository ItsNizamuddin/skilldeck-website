"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceIconWrapper from "@/components/services/ServiceIconWrapper";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import DemoSectionHeader from "./DemoSectionHeader";
import { DemoStrategy as DemoStrategyData } from "./types";

interface DemoStrategyProps {
    data?: DemoStrategyData;
}

export default function DemoStrategy({ data }: DemoStrategyProps) {
    const { openModal } = useLeadModal();
    if (!data || (!data.title && !(data.points || []).length)) return null;

    const points = (data.points || []).filter((p) => p?.title);
    const stats = (data.stats || []).filter((s) => s?.value);
    const media = data.media?.url;

    return (
        <div id="strategy" className="scroll-mt-24 space-y-8">
            <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className={media ? "lg:col-span-7 space-y-4" : "lg:col-span-12 space-y-4"}>
                    {points.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {points.map((point, i) => (
                                <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                    <ServiceIconWrapper iconString={point.icon} className="w-10 h-10 rounded-xl" iconClassName="w-5 h-5" />
                                    <div className="min-w-0 space-y-1">
                                        <h4 className="text-sm font-bold text-brand-dark">{point.title}</h4>
                                        {point.description && (
                                            <p className="text-xs text-brand-muted leading-relaxed">{point.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {media && (
                    <div className="lg:col-span-5">
                        <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-lg aspect-[4/3]">
                            <Image
                                src={media}
                                alt={data.media?.alt || data.title || "Strategy"}
                                fill
                                sizes="(max-width: 1024px) 100vw, 35vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                            {stats.length > 0 && (
                                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2.5 flex items-center gap-2">
                                            <ServiceItemIcon iconString={stat.icon} className="w-4 h-4 text-brand-primary shrink-0" defaultIcon="Sparkles" />
                                            <div className="min-w-0 leading-tight">
                                                <div className="text-sm font-extrabold text-brand-dark">{stat.value}</div>
                                                <div className="text-[9px] text-brand-muted font-medium truncate">{stat.tagline}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {!media && stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white p-3">
                            <ServiceItemIcon iconString={stat.icon} className="w-4 h-4 text-brand-primary shrink-0" defaultIcon="Sparkles" />
                            <div className="min-w-0 leading-tight">
                                <div className="text-sm font-extrabold text-brand-dark">{stat.value}</div>
                                <div className="text-[10px] text-brand-muted font-medium truncate">{stat.tagline}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {data.cta && (
                <Button
                    onClick={() => openModal({ source: "service-strategy", formTitle: data.cta })}
                    variant="outline-primary"
                    className="font-bold text-sm"
                >
                    {data.cta}
                    <ArrowRight className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}
