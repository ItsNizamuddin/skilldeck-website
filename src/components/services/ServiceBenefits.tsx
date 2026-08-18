import React from "react";
import { ServiceBenefitsData } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";

interface ServiceBenefitsProps {
    benefits?: ServiceBenefitsData;
}

export default function ServiceBenefits({ benefits = {} }: ServiceBenefitsProps) {
    if (!benefits.points || benefits.points.length === 0) return null;

    return (
        <section className="pb-16 md:pb-24">
            <div className=" px-0">
                <div className="relative overflow-hidden p-4 md:py-10 bg-slate-900 shadow-xl space-y-5 lg:space-y-8">
                    <InteractiveDotBackground dotColor="rgba(255, 255, 255, 0.08)" gap={16} radius={1.2} />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="container mx-auto space-y-4">
                        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                                {benefits.tagline || "Benefits"}
                            </span>
                            <h2 className="text-xl lg:text-2xl font-extrabold text-white">
                                {benefits.title || "Expected Outcomes & Business Advantages"}
                            </h2>
                        </div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.points.map((point, i) => (
                                <div key={i} className="bg-slate-800/40 backdrop-blur-xs p-5 rounded-2xl border border-slate-700/50 shadow-sm space-y-3 hover:border-brand-primary/40 hover:bg-slate-800 transition-all">
                                    <ServiceIconWrapper
                                        iconString={point.icon}
                                        className="w-9 h-9 rounded-lg"
                                        iconClassName="w-4.5 h-4.5"
                                        defaultIcon="Check"
                                        fallbackBgClass="bg-brand-primary/20 text-white"
                                    />
                                    <h3 className="font-bold text-sm text-white">{point.title}</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed">{point.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
