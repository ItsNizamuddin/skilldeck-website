import React from "react";
import { ServiceWhyChooseUsData } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";
import ServiceSectionIntro from "./ServiceSectionIntro";

interface ServiceWhyChooseUsProps {
    whyservice?: ServiceWhyChooseUsData;
    serviceName: string;
}

/** Narrative "why it matters" chapter — connected vertical point list instead of a card grid. */
export default function ServiceWhyChooseUs({
    whyservice = {},
    serviceName
}: ServiceWhyChooseUsProps) {
    const points = (whyservice.points || []).filter((p) => p?.title);
    const title = whyservice.title || `Why optimize ${serviceName}?`;

    return (
        <section id="why" className="scroll-mt-24 section-y">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-5">
                        <ServiceSectionIntro
                            numeral="01"
                            kicker={whyservice.tagline || "The Reality"}
                            title={title}
                            description={whyservice.description}
                        />
                    </div>

                    {points.length > 0 && (
                        <div className="lg:col-span-7 relative">
                            <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-primary/40 via-brand-primary/15 to-transparent hidden sm:block" />
                            <div className="space-y-8">
                                {points.map((point, i) => (
                                    <div key={i} className="group relative flex items-start gap-5 sm:pl-0">
                                        <div className="relative z-10 shrink-0">
                                            <ServiceIconWrapper
                                                iconString={point.icon}
                                                className="w-11 h-11 rounded-2xl shadow-sm ring-4 ring-white group-hover:scale-105 transition-transform duration-300"
                                                iconClassName="w-5 h-5"
                                                defaultIcon="Activity"
                                                fallbackBgClass="bg-brand-primary/10 text-brand-primary"
                                            />
                                        </div>
                                        <div className="pt-1.5 space-y-1.5">
                                            <h3 className="text-base font-bold text-brand-dark">{point.title}</h3>
                                            {point.description && (
                                                <p className="body-small max-w-lg">{point.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
