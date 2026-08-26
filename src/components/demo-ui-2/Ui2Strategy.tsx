"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceIconWrapper from "@/components/services/ServiceIconWrapper";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import Ui2SectionIntro from "./Ui2SectionIntro";
import { DemoStrategy } from "@/components/demo-ui/types";

interface Ui2StrategyProps {
    data?: DemoStrategy;
}

export default function Ui2Strategy({ data }: Ui2StrategyProps) {
    const { openModal } = useLeadModal();
    const [mediaFailed, setMediaFailed] = useState(false);
    if (!data || (!data.title && !(data.points || []).length)) return null;

    const points = (data.points || []).filter((p) => p?.title);
    const stats = (data.stats || []).filter((s) => s?.value);
    const media = data.media?.url;
    const showMedia = Boolean(media) && !mediaFailed;

    return (
        <section id="strategy" className="scroll-mt-24 py-16 md:py-24 bg-slate-50/70 relative overflow-hidden">
            <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "var(--gradient-brand)" }}
            />
            <div className="container mx-auto px-2 lg:px-0 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    <div className="lg:col-span-5 space-y-6">
                        <Ui2SectionIntro numeral="04" kicker="Strategic Edge" title={data.title} description={data.description} />

                        {stats.length > 0 && (
                            <div className="flex gap-8 pt-2">
                                {stats.map((stat, i) => (
                                    <div key={i} className={i > 0 ? "pl-8 border-l border-slate-200" : ""}>
                                        <p className="text-3xl font-black text-brand-primary leading-none">{stat.value}</p>
                                        <p className="text-xs font-semibold text-brand-muted mt-1.5">{stat.tagline}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {data.cta && (
                            <Button
                                onClick={() => openModal({ source: "ui2-strategy", formTitle: data.cta })}
                                variant="primary"
                                className="rounded-full font-bold"
                            >
                                {data.cta}
                                <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {media && (
                            <div className="relative rounded-3xl overflow-hidden aspect-square sm:col-span-1 bg-white border border-slate-100 shadow-sm">
                                {showMedia ? (
                                    <Image
                                        src={media}
                                        alt={data.media?.alt || data.title || "Strategy"}
                                        fill
                                        sizes="(max-width: 1024px) 90vw, 30vw"
                                        className="object-cover"
                                        onError={() => setMediaFailed(true)}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/80"
                                        style={{ background: "var(--gradient-brand)" }}
                                    >
                                        <ImageOff className="w-8 h-8" strokeWidth={1.5} />
                                        <span className="text-xs font-semibold uppercase tracking-widest">{data.title || "Strategy"}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {points.length > 0 && (
                            <div className={`space-y-4 ${media ? "sm:col-span-1" : "sm:col-span-2 grid sm:grid-cols-2 gap-4 space-y-0"}`}>
                                {points.map((point, i) => (
                                    <div
                                        key={i}
                                        className="group bg-white rounded-2xl border border-slate-100 p-5 space-y-3 shadow-sm hover:shadow-md hover:border-brand-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <ServiceIconWrapper
                                            iconString={point.icon}
                                            className="w-10 h-10 rounded-xl"
                                            iconClassName="w-5 h-5"
                                            defaultIcon="Sparkles"
                                        />
                                        <h4 className="text-sm font-bold text-brand-dark">{point.title}</h4>
                                        {point.description && <p className="text-xs text-brand-muted leading-relaxed">{point.description}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
