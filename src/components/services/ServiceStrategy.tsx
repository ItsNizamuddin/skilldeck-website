import React from "react";
import { ServiceStrategy } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";

interface ServiceStrategyProps {
    strategy?: ServiceStrategy;
}

export default function ServiceStrategyComponent({ strategy = {} }: ServiceStrategyProps) {
    if (!strategy.points && !strategy.stats) return null;

    return (
        <section className="py-10 md:py-16 bg-white border-b border-slate-100">
            <div className="container mx-auto px-2 lg:px-0 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left details */}
                    <div className="lg:col-span-7 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                            {strategy.tagline || "Built for Sustainable Growth"}
                        </span>
                        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            {strategy.title || "Smart Strategies That Scale"}
                        </h2>
                        {strategy.description && (
                            <div
                                className="text-slate-600 text-sm md:text-sm leading-relaxed prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: strategy.description }}
                            />
                        )}

                        {strategy.points && strategy.points.length > 0 && (
                            <div className="space-y-4 pt-2">
                                {strategy.points.map((point, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <ServiceIconWrapper
                                            iconString={point.icon}
                                            className="w-5 h-5 rounded-full mt-0.5"
                                            iconClassName="w-3 h-3"
                                            defaultIcon="Check"
                                            fallbackBgClass="bg-indigo-50 text-indigo-600"
                                        />
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 leading-snug">{point.title}</h4>
                                            {point.description && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{point.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right stats */}
                    <div className="lg:col-span-5">
                        {strategy.stats && strategy.stats.length > 0 && (
                            <div className="grid grid-cols-1 gap-6">
                                {strategy.stats.map((stat, i) => (
                                    <div key={i} className="bg-slate-50/50 p-4 lg:p-5 rounded-2xl border border-slate-100 space-y-3">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <ServiceIconWrapper
                                                    iconString={stat.icon}
                                                    className="w-10 h-10 rounded-lg"
                                                    iconClassName="w-5 h-5"
                                                    defaultIcon="Activity"
                                                    fallbackBgClass="bg-indigo-50 text-indigo-600"
                                                />
                                                <div className="text-lg lg:text-xl 2xl:text-2xl font-bold text-slate-900 leading-none">{stat.value}</div>
                                                {stat.tagline && <p className="text-[12px] text-slate-600 font-normal leading-normal">({stat.tagline})</p>}
                                            </div>
                                            <div className="text-xs font-bold text-slate-800 leading-tight">{stat.description}</div>
                                        </div>
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
