import React from "react";
import { ServiceStrategy } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";

interface ServiceWhyOptProps {
    whyopt?: ServiceStrategy;
}

export default function ServiceWhyOpt({ whyopt = {} }: ServiceWhyOptProps) {
    if (!whyopt.points && !whyopt.stats) return null;

    return (
        <section className="py-10 md:py-16 bg-slate-50 border-b border-slate-100">
            <div className="container mx-auto px-2 lg:px-0 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left stats counters grid */}
                    <div className="lg:col-span-5 order-last lg:order-first">
                        {whyopt.stats && whyopt.stats.length > 0 && (
                            <div className="grid grid-cols-2 gap-6">
                                {whyopt.stats.map((stat, i) => (
                                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <ServiceIconWrapper
                                                    iconString={stat.icon}
                                                    className="w-10 h-10 rounded-lg"
                                                    iconClassName="w-5 h-5"
                                                    defaultIcon="ShieldAlert"
                                                    fallbackBgClass="bg-blue-50 text-blue-600"
                                                />
                                                <div className="text-lg lg:text-xl 2xl:text-2xl font-bold text-slate-900 leading-none">{stat.value}</div>
                                            </div>
                                            <div className="text-xs font-bold text-slate-800 leading-tight">{stat.description}</div>
                                            {stat.tagline && <p className="text-xs font-bold text-slate-800 leading-tight">{stat.tagline}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right details */}
                    <div className="lg:col-span-7 space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
                            {whyopt.tagline || "Why Choose Us"}
                        </span>
                        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                            {whyopt.title || "Core Value Proposition"}
                        </h2>
                        {whyopt.description && (
                            <div
                                className="text-slate-600 text-sm md:text-sm leading-relaxed prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: whyopt.description }}
                            />
                        )}

                        {whyopt.points && whyopt.points.length > 0 && (
                            <div className="space-y-4 pt-2">
                                {whyopt.points.map((point, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <ServiceIconWrapper
                                            iconString={point.icon}
                                            className="w-10 h-10 rounded-lg"
                                            iconClassName="w-5 h-5"
                                            defaultIcon="Check"
                                            fallbackBgClass="bg-indigo-50 text-indigo-600"
                                        />
                                        <div>
                                            <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{point.title}</h4>
                                            {point.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{point.description}</p>}
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
