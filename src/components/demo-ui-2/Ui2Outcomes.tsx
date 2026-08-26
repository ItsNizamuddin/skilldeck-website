import ServiceIconWrapper from "@/components/services/ServiceIconWrapper";
import Ui2SectionIntro from "./Ui2SectionIntro";
import { DemoBenefits } from "@/components/demo-ui/types";

interface Ui2OutcomesProps {
    data?: DemoBenefits;
}

/** Benefits as an asymmetric bento grid — first outcome gets a larger, featured tile. */
export default function Ui2Outcomes({ data }: Ui2OutcomesProps) {
    if (!data || (!data.title && !(data.points || []).length)) return null;
    const points = (data.points || []).filter((p) => p?.title);

    return (
        <section id="benefits" className="scroll-mt-24 py-16 md:py-24 bg-slate-50/70">
            <div className="container mx-auto px-2 lg:px-0 space-y-10">
                <Ui2SectionIntro numeral="02" kicker="The Outcome" title={data.title} description={data.description} align="center" />

                {points.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {points.map((point, i) => {
                            const featured = i === 0;
                            return (
                                <div
                                    key={i}
                                    className={`rounded-3xl p-6 md:p-7 space-y-3 border transition-all duration-300 hover:-translate-y-1 ${featured
                                            ? "sm:col-span-2 bg-brand-dark border-brand-dark text-white"
                                            : "bg-white border-slate-100 shadow-sm hover:shadow-lg"
                                        }`}
                                >
                                    <div className="space-y-3">
                                        <ServiceIconWrapper
                                            iconString={point.icon}
                                            className={`w-12 h-12 rounded-2xl ${featured ? "bg-white/10" : ""}`}
                                            iconClassName={`w-6 h-6 ${featured ? "text-white" : ""}`}
                                            fallbackBgClass={featured ? "bg-white/10 text-white" : "bg-brand-primary/10 text-brand-primary"}
                                        />
                                        <h3 className={`font-bold leading-snug ${featured ? "text-xl" : "text-sm"}`}>{point.title}</h3>
                                        {point.description && (
                                            <p className={featured ? "text-sm text-white/70 leading-relaxed" : "text-xs text-brand-muted leading-relaxed"}>
                                                {point.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
