import React from "react";
import { ServiceWhyChooseUsData } from "./types";
import ServiceIconWrapper from "./ServiceIconWrapper";

interface ServiceWhyChooseUsProps {
    whyservice?: ServiceWhyChooseUsData;
    serviceName: string;
}

export default function ServiceWhyChooseUs({
    whyservice = {},
    serviceName
}: ServiceWhyChooseUsProps) {
    return (
        <section className="py-10 md:py-16">
            <div className="container mx-auto px-2 lg:px-0 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-4">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600">
                            {whyservice.tagline || "Why Choose Us"}
                        </span>
                        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900">
                            {whyservice.title || `Why optimize ${serviceName}?`}
                        </h2>
                        <div
                            className="text-slate-600 text-sm md:text-sm leading-relaxed prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: whyservice.description || "" }}
                        />
                    </div>

                    <div className="lg:col-span-6 space-y-4">
                        {whyservice.points && whyservice.points.length > 0 && (
                            <div className="space-y-3">
                                {whyservice.points.map((point, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                                        <ServiceIconWrapper
                                            iconString={point.icon}
                                            className="w-10 h-10 rounded-lg"
                                            iconClassName="w-5 h-5"
                                            defaultIcon="Activity"
                                            fallbackBgClass="bg-emerald-50 text-emerald-600"
                                        />
                                        <div>
                                            <h3 className="font-bold text-sm text-slate-900">{point.title}</h3>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{point.description}</p>
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
