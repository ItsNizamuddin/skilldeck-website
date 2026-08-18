import React from "react";
import { ServiceStrategy } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";

interface ServiceBusinessProps {
    business?: ServiceStrategy;
}

export default function ServiceBusiness({ business = {} }: ServiceBusinessProps) {
    if (!business.points && !business.stats) return null;

    return (
        <section className="pb-16 md:pb-24">
            <div className="px-0">
                <div className="relative overflow-hidden p-4 md:py-10 bg-slate-900 shadow-xl space-y-5 lg:space-y-8 border-b border-slate-800">
                    <InteractiveDotBackground dotColor="rgba(255, 255, 255, 0.08)" gap={16} radius={1.2} />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="container mx-auto space-y-4 relative z-10">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                                {business.tagline || "OUR EXPERTISE, YOUR GROWTH"}
                            </span>
                            <h2 className="text-xl md:text-3xl font-extrabold text-white leading-tight">
                                {business.title || "Experienced Professionals & Results"}
                            </h2>
                            {business.description && (
                                <div
                                    className="text-slate-300 text-xs md:text-sm leading-relaxed prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: business.description }}
                                />
                            )}
                        </div>

                        {/* Points Grid */}
                        {business.points && business.points.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                                {business.points.map((point, i) => (
                                    <div key={i} className="bg-slate-800/40 backdrop-blur-xs p-4 rounded-2xl border border-slate-700/50 hover:bg-slate-800 hover:border-brand-primary/40 transition-all space-y-4">
                                        <ServiceIconWrapper
                                            iconString={point.icon}
                                            className="w-10 h-10 rounded-lg"
                                            iconClassName="w-5 h-5"
                                            defaultIcon="Briefcase"
                                            fallbackBgClass="bg-brand-primary/20 text-white"
                                        />
                                        <div className="space-y-2">
                                            <h3 className="font-extrabold text-sm text-white leading-snug">{point.title}</h3>
                                            {point.description && <p className="text-xs text-slate-300 leading-relaxed">{point.description}</p>}
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
