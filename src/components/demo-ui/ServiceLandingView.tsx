"use client";

import { useMemo } from "react";
import DemoHero from "./DemoHero";
import DemoStatsSection from "./DemoStatsSection";
import DemoSectionsNav, { DemoSectionLink } from "./DemoSectionsNav";
import DemoWhyChooseUs from "./DemoWhyChooseUs";
import DemoBenefits from "./DemoBenefits";
import DemoApproach from "./DemoApproach";
import DemoStrategy from "./DemoStrategy";
import DemoWhyOpt from "./DemoWhyOpt";
import DemoBusiness from "./DemoBusiness";
import DemoAddons from "./DemoAddons";
import DemoFaq from "./DemoFaq";
import DemoBottomContent from "./DemoBottomContent";
import DemoSidebarCta from "./DemoSidebarCta";
import { DemoServiceData } from "./types";

interface ServiceLandingViewProps {
    data: DemoServiceData;
}

export default function ServiceLandingView({ data }: ServiceLandingViewProps) {
    const hasStats = (data.servicestats || []).some((s) => s?.value);
    const hasWhy = Boolean(data.whyservice?.title) || (data.whyservice?.points || []).length > 0;
    const hasBenefits = Boolean(data.benefits?.title) || (data.benefits?.points || []).length > 0;
    const hasApproach = Boolean(data.approach?.title) || (data.approach?.steps || []).length > 0;
    const hasTools = (data.approach?.tools?.content || []).some((t) => t?.tagline || t?.icon);
    const hasStrategy = Boolean(data.strategy?.title) || (data.strategy?.points || []).length > 0;
    const hasWhyOpt = Boolean(data.whyopt?.title) || (data.whyopt?.points || []).length > 0;
    const hasBusiness = Boolean(data.business?.title) || (data.business?.points || []).length > 0;
    const hasAddons = Boolean(data.addons?.title) || (data.addons?.cards || []).length > 0;
    const hasFaqs = (data.faqs?.accordions || []).some((f) => f?.title);

    const navSections = useMemo<DemoSectionLink[]>(() => {
        const items: DemoSectionLink[] = [{ id: "overview", label: "Overview" }];
        if (hasStats) items.push({ id: "stats", label: "Results" });
        if (hasWhy) items.push({ id: "why", label: "Why This" });
        if (hasBenefits) items.push({ id: "benefits", label: "Benefits" });
        if (hasApproach) items.push({ id: "approach", label: "Approach" });
        if (hasTools) items.push({ id: "tools", label: "Tools" });
        if (hasStrategy) items.push({ id: "strategy", label: "Strategy" });
        if (hasWhyOpt) items.push({ id: "why-opt", label: "Why SkillDeck" });
        if (hasBusiness) items.push({ id: "expertise", label: "Expertise" });
        if (hasAddons) items.push({ id: "addons", label: "Add-Ons" });
        if (hasFaqs) items.push({ id: "faqs", label: "FAQs" });
        return items;
    }, [hasStats, hasWhy, hasBenefits, hasApproach, hasTools, hasStrategy, hasWhyOpt, hasBusiness, hasAddons, hasFaqs]);

    const hasSidebarContent = true; // sidebar always renders a useful CTA card

    return (
        <>
            <DemoHero data={data} />
            <DemoStatsSection stats={data.servicestats} />

            <section id="service-content" className="relative py-10 md:py-14 bg-slate-50/40">
                <DemoSectionsNav sections={navSections} containerId="service-content" />

                <div className="container mx-auto px-2 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                        {/* Left content column */}
                        <div className="lg:col-span-2 space-y-14">
                            <DemoWhyChooseUs data={data.whyservice} />
                            <DemoBenefits data={data.benefits} />
                            <DemoApproach data={data.approach} />
                            <DemoStrategy data={data.strategy} />
                            <DemoWhyOpt data={data.whyopt} />
                            <DemoBusiness data={data.business} />
                            <DemoAddons data={data.addons} />
                            <DemoFaq data={data.faqs} />
                        </div>

                        {/* Right sticky sidebar */}
                        {hasSidebarContent && (
                            <div className="lg:col-span-1 hidden md:flex justify-center lg:justify-end lg:sticky lg:top-24 h-fit">
                                <DemoSidebarCta data={data} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <DemoBottomContent bottomSection={data.bottomSection} internalSection={data.internalSection} />
        </>
    );
}
