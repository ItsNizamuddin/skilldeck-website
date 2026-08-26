import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ServiceIconWrapper from "@/components/services/ServiceIconWrapper";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import DemoSectionHeader from "./DemoSectionHeader";
import DemoCtaBanner from "./DemoCtaBanner";
import { DemoApproach as DemoApproachData } from "./types";

interface DemoApproachProps {
    data?: DemoApproachData;
}

export default function DemoApproach({ data }: DemoApproachProps) {
    if (!data || (!data.title && !(data.steps || []).length)) return null;

    const steps = (data.steps || []).filter((s) => s?.title);
    const kpiCategories = (data.kpis?.kpiCategory || []).filter((c) => (c.content || []).length > 0);
    const tools = (data.tools?.content || []).filter((t) => t?.tagline || t?.icon);

    return (
        <div className="space-y-14">
            {/* Steps */}
            {(data.title || steps.length > 0) && (
                <div id="approach" className="scroll-mt-24 space-y-8">
                    <DemoSectionHeader tagline={data.tagline} title={data.title} description={data.description} />

                    {steps.length > 0 && (
                        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Connecting line, desktop only */}
                            <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                            {steps.map((step, i) => (
                                <div key={i} className="relative bg-white border border-slate-100 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <ServiceIconWrapper iconString={step.icon} className="w-11 h-11 rounded-xl" iconClassName="w-5 h-5" />
                                        <span className="text-2xl font-black text-slate-100 leading-none select-none">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-brand-dark leading-snug">{step.title}</h4>
                                    {step.description && (
                                        <p className="text-xs text-brand-muted leading-relaxed">{step.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* KPIs */}
            {kpiCategories.length > 0 && (
                <div className="space-y-5">
                    {data.kpis?.badge && (
                        <span className="badge-brand inline-flex">{data.kpis.badge}</span>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {kpiCategories.map((category, i) => (
                            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-3">
                                <h4 className="text-sm font-bold text-brand-dark">{category.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {(category.content || []).map((kpi, j) => (
                                        <span
                                            key={j}
                                            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-dark"
                                        >
                                            <ServiceItemIcon iconString={kpi.icon} className="w-3.5 h-3.5 text-brand-primary" defaultIcon="CheckLine" />
                                            {kpi.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tools */}
            {tools.length > 0 && (
                <div id="tools" className="scroll-mt-24 space-y-5">
                    <div className="space-y-2">
                        {data.tools?.badge && <span className="badge-brand inline-flex">{data.tools.badge}</span>}
                        {data.tools?.description && (
                            <p className="body-medium max-w-2xl">{data.tools.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {tools.map((tool, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center gap-2 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all duration-300"
                            >
                                {tool.icon ? (
                                    <div className="relative w-9 h-9">
                                        <Image
                                            src={tool.icon}
                                            alt={tool.tagline || "Tool"}
                                            fill
                                            sizes="36px"
                                            className="object-contain rounded"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-xs">
                                        {(tool.tagline || "?").slice(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <span className="text-[11px] font-semibold text-brand-dark text-center leading-tight">
                                    {tool.tagline}
                                </span>
                            </div>
                        ))}
                    </div>

                    {data.tools?.cta?.title && (
                        <DemoCtaBanner
                            title={data.tools.cta.title}
                            description={data.tools.cta.descp}
                            buttonLabel="Talk To Our Team"
                            icon={<ArrowRight className="w-4 h-4" />}
                            formTitle={data.tools.cta.title}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
