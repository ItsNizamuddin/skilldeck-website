import React from "react";
import Image from "next/image";
import { ServiceApproachData } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";
import ServiceItemIcon from "./ServiceItemIcon";

interface ServiceApproachProps {
    approach?: ServiceApproachData;
}

export default function ServiceApproach({ approach = {} }: ServiceApproachProps) {
    if (!approach.steps || approach.steps.length === 0) return null;

    return (
        <section className="py-10 md:py-16 bg-white border-y border-slate-100">
            <div className="container mx-auto px-4 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                        {approach.tagline || "Execution Model"}
                    </span>
                    <h2 className="text-xl md:text-3xl font-extrabold text-slate-900">
                        {approach.title || "How We Work & Optimize Outcomes"}
                    </h2>
                    {approach.description && (
                        <p className="text-xs text-slate-500 leading-relaxed">{approach.description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                    {approach.steps.map((step, i) => (
                        <div key={i} className="relative bg-slate-50/50 p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all space-y-4">
                            <div className="absolute top-4 right-4 text-3xl font-black text-slate-200">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <ServiceIconWrapper
                                iconString={step.icon}
                                className="w-10 h-10 rounded-lg"
                                iconClassName="w-5 h-5"
                                defaultIcon="Compass"
                                fallbackBgClass="bg-indigo-50 text-indigo-600"
                            />
                            <div className="space-y-1.5">
                                <h3 className="font-bold text-sm text-slate-900">{step.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KPIs Categories */}
                {approach.kpis?.kpiCategory && approach.kpis.kpiCategory.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-slate-100">
                        <div className="text-center mb-8">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                                {approach.kpis.badge || "Key Performance Indicators"}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {approach.kpis.kpiCategory.map((cat, idx) => (
                                <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/30">
                                    <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-3 mb-4">
                                        {cat.name}
                                    </h3>
                                    <div className="space-y-3">
                                        {cat.content && cat.content.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                                <ServiceItemIcon iconString={item.icon} className="w-4 h-4 text-emerald-500 shrink-0" defaultIcon="BadgeCheck" />
                                                <span className="text-xs font-semibold text-slate-800">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tools Section */}
                {approach.tools?.content && approach.tools.content.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-slate-100 space-y-6">
                        <div className="text-center space-y-2">
                            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">{approach.tools.badge || "Tools"}</span>
                            {approach.tools.description && (
                                <p className="text-xs text-slate-500 max-w-xl mx-auto">{approach.tools.description}</p>
                            )}
                        </div>
                        <div className="relative overflow-hidden w-full">
                            {/* Gradient Fades */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                            <div className="flex overflow-hidden py-2">
                                <div className="flex animate-scroll gap-6 items-center shrink-0 min-w-full">
                                    {/* Render twice for seamless infinite loop */}
                                    {[...approach.tools.content, ...approach.tools.content, ...approach.tools.content].map((tool, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 shadow-sm hover:bg-slate-100 transition-all shrink-0">
                                            {tool.icon && (
                                                <div className="relative w-5 h-5 overflow-hidden rounded-md shrink-0">
                                                    <Image
                                                        src={tool.icon}
                                                        alt={tool.tagline || "tool"}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-xs font-bold text-slate-800 whitespace-nowrap">{tool.tagline}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
