import React from "react";
import { ServiceStatItem } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";

interface ServiceStatsProps {
    stats?: ServiceStatItem[];
}

export default function ServiceStats({ stats = [] }: ServiceStatsProps) {
    if (stats.length === 0) return null;

    return (
        <section className="py-10 bg-slate-50/50 border-y border-slate-100/80">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-slate-200/60">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex gap-4 px-0 lg:px-4 transition-all">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <ServiceIconWrapper
                                        iconString={stat.icon}
                                        className="w-8 lg:w-10 h-8 lg:h-10 rounded-xl"
                                        iconClassName="w-4 lg:w-5 h-4 lg:h-5"
                                        defaultIcon="Check"
                                        fallbackBgClass="bg-blue-50/80 text-blue-600"
                                    />
                                    <div className="text-base lg:text-lg 2xl:text-xl font-bold text-slate-900 leading-none">{stat.value}</div>
                                    <div className="text-xs font-bold text-slate-800 leading-tight mt-1">{stat.description}</div>
                                </div>
                                {stat.tagline && <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{stat.tagline}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
