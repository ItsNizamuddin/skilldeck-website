import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import Ui2SectionIntro from "./Ui2SectionIntro";
import { DemoWhyOpt, DemoBusiness } from "@/components/demo-ui/types";

interface Ui2CredentialsProps {
    whyopt?: DemoWhyOpt;
    business?: DemoBusiness;
}

/**
 * Merges "Why SkillDeck" and "Our Expertise" into one section — the payload's
 * two point/stat blocks share near-identical stats, so splitting them into
 * two near-duplicate sections would just repeat the same numbers twice.
 */
export default function Ui2Credentials({ whyopt, business }: Ui2CredentialsProps) {
    const whyPoints = (whyopt?.points || []).filter((p) => p?.title);
    const bizPoints = (business?.points || []).filter((p) => p?.title);
    const stats = (whyopt?.stats?.length ? whyopt.stats : business?.stats || []).filter((s) => s?.value);

    if (whyPoints.length === 0 && bizPoints.length === 0) return null;

    return (
        <section id="credentials" className="scroll-mt-24 py-16 md:py-24">
            <div className="container mx-auto px-2 lg:px-0 space-y-12">
                <Ui2SectionIntro numeral="05" kicker="Why SkillDeck" title={whyopt?.title || business?.title} description={whyopt?.description || business?.description} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {whyPoints.length > 0 && (
                        <div className="space-y-5">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">How We Partner</p>
                            <ul className="space-y-4">
                                {whyPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <ServiceItemIcon iconString={point.icon} className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" defaultIcon="CheckLine" />
                                        <div>
                                            <p className="text-sm font-bold text-brand-dark">{point.title}</p>
                                            {point.description && <p className="text-xs text-brand-muted leading-relaxed mt-0.5">{point.description}</p>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {bizPoints.length > 0 && (
                        <div className="space-y-5">
                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">Where We Excel</p>
                            <ul className="space-y-4">
                                {bizPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <ServiceItemIcon iconString={point.icon} className="w-5 h-5 text-brand-secondary mt-0.5 shrink-0" defaultIcon="CheckLine" />
                                        <div>
                                            <p className="text-sm font-bold text-brand-dark">{point.title}</p>
                                            {point.description && <p className="text-xs text-brand-muted leading-relaxed mt-0.5">{point.description}</p>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {stats.length > 0 && (
                    <div className="rounded-3xl bg-brand-dark p-6 md:p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <ServiceItemIcon iconString={stat.icon} className="w-5 h-5 text-brand-secondary shrink-0" defaultIcon="Sparkles" />
                                    <div className="min-w-0">
                                        <p className="text-lg font-black text-white leading-none">{stat.value}</p>
                                        <p className="text-[11px] text-white/50 font-medium truncate mt-1">{stat.tagline || stat.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
