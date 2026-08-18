import React from "react";
import { ServiceAddonsData } from "./types";
import ServiceItemIcon from "./ServiceItemIcon";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";

interface ServiceAddonsProps {
    addons?: ServiceAddonsData;
}

export default function ServiceAddons({ addons = {} }: ServiceAddonsProps) {
    if (!addons.cards || addons.cards.length === 0) return null;

    const highlight = addons.highlight || {};

    return (
        <section className="py-10 md:py-16">
            <div className=" px-2 lg:px-0 space-y-16">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                            {addons.tagline || "Specialized Add-ons"}
                        </span>
                        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900">
                            {addons.title || "Premium Capabilities & Integrations"}
                        </h2>
                        {addons.description && (
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{addons.description}</p>
                        )}
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                        {addons.cards.map((card, i) => (
                            <div key={i} className="bg-white p-3 lg:p-5 rounded-xl lg:rounded-2xl border border-slate-100 shadow-sm space-y-3">
                                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                                    <ServiceItemIcon iconString={card.icon} className="w-4.5 h-4.5 text-indigo-600" defaultIcon="Plus" />
                                </div>
                                <h3 className="font-bold text-xs text-slate-900">{card.title}</h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlight Sub-section */}
                {highlight.points && highlight.points.length > 0 && (
                    <div className="relative overflow-hidden p-4 lg:py-10 bg-slate-900 border border-slate-800 shadow-xl">
                        <InteractiveDotBackground dotColor="rgba(255, 255, 255, 0.08)" gap={16} radius={1.2} />
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="container mx-auto  grid grid-cols-1 lg:grid-cols-12 gap-12 items-center rounded-none md:rounded-3xl">
                            <div className="relative z-10 lg:col-span-5 space-y-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">{highlight.tagline}</span>
                                <h3 className="text-xl font-extrabold text-white">{highlight.title}</h3>
                                {highlight.description && (
                                    <p className="text-xs text-slate-300 leading-relaxed">{highlight.description}</p>
                                )}
                            </div>
                            <div className="relative z-10 lg:col-span-7 space-y-4">
                                {highlight.points.map((p, i) => (
                                    <div key={i} className="flex gap-4 p-3 lg:p-4 rounded-xl hover:bg-slate-850 hover:border-brand-primary/40 transition-all border border-slate-700/50 bg-slate-800/40 backdrop-blur-xs">
                                        <div className="w-9 h-9 rounded-lg bg-brand-primary/20 flex items-center justify-center shrink-0">
                                            <ServiceItemIcon iconString={p.icon} className="w-4.5 h-4.5 text-white" defaultIcon="Layers" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs text-white">{p.value}</h4>
                                            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{p.descp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
