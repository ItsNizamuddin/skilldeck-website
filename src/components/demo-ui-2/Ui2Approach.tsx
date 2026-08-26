import Image from "next/image";
import ServiceIconWrapper from "@/components/services/ServiceIconWrapper";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import Ui2SectionIntro from "./Ui2SectionIntro";
import Ui2CtaBanner from "./Ui2CtaBanner";
import { DemoApproach } from "@/components/demo-ui/types";

interface Ui2ApproachProps {
    data?: DemoApproach;
}

/** Vertical connected-step timeline + inline KPI chips + a clean tools logo row. */
export default function Ui2Approach({ data }: Ui2ApproachProps) {
    if (!data || (!data.title && !(data.steps || []).length)) return null;

    const steps = (data.steps || []).filter((s) => s?.title);
    const kpiCategories = (data.kpis?.kpiCategory || []).filter((c) => (c.content || []).length > 0);
    const tools = (data.tools?.content || []).filter((t) => t?.tagline || t?.icon);

    return (
        <section id="approach" className="scroll-mt-24 py-16 md:py-24">
            <div className="container mx-auto px-2 lg:px-0 space-y-14">
                <Ui2SectionIntro numeral="03" kicker={data.tagline || "How We Work"} title={data.title} description={data.description} />

                {steps.length > 0 && (
                    <div className="relative max-w-2xl">
                        <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/20 to-transparent" />
                        <div className="space-y-10">
                            {steps.map((step, i) => (
                                <div key={i} className="relative flex items-start gap-6">
                                    <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-brand-primary/30 flex items-center justify-center shrink-0 font-black text-brand-primary">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div className="pt-2 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <ServiceItemIcon iconString={step.icon} className="w-4 h-4 text-brand-secondary" defaultIcon="Sparkles" />
                                            <h3 className="text-base font-bold text-brand-dark">{step.title}</h3>
                                        </div>
                                        {step.description && <p className="body-small max-w-lg">{step.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {kpiCategories.length > 0 && (
                    <div className="space-y-4">
                        {data.kpis?.badge && <span className="badge-brand inline-flex">{data.kpis.badge}</span>}
                        <div className="flex flex-wrap gap-x-10 gap-y-5">
                            {kpiCategories.map((category, i) => (
                                <div key={i} className="space-y-2.5">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">{category.name}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(category.content || []).map((kpi, j) => (
                                            <span
                                                key={j}
                                                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-dark shadow-sm hover:border-brand-primary/30 hover:shadow transition-all duration-200"
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

                {tools.length > 0 && (
                    <div className="space-y-5">
                        {data.tools?.description && <p className="body-medium max-w-2xl">{data.tools.description}</p>}
                        <div className="flex flex-wrap items-center gap-3">
                            {tools.map((tool, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl pl-3 pr-4 py-2.5 shadow-sm hover:border-brand-primary/30 hover:shadow-md transition-all duration-200"
                                >
                                    {tool.icon ? (
                                        <div className="relative w-6 h-6 shrink-0">
                                            <Image src={tool.icon} alt={tool.tagline || "Tool"} fill sizes="24px" className="object-contain" />
                                        </div>
                                    ) : (
                                        <ServiceIconWrapper iconString={undefined} className="w-6 h-6 rounded-md" iconClassName="w-3.5 h-3.5" />
                                    )}
                                    <span className="text-sm font-semibold text-brand-dark">{tool.tagline}</span>
                                </div>
                            ))}
                        </div>
                        {data.tools?.cta?.title && (
                            <Ui2CtaBanner title={data.tools.cta.title} description={data.tools.cta.descp} buttonLabel="Talk To Our Team" />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
