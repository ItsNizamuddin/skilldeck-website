"use client";

import SectionTag from "@/components/ui/SectionTag";
import { Building2, GraduationCap } from "lucide-react";
import { useState } from "react";

interface BenefitsData {
    description?: string;
    individual?: string;
    organization?: string;
}

interface CourseBenefitsProps {
    benefits?: BenefitsData;
}

export default function CourseBenefits({ benefits }: CourseBenefitsProps) {
    const [indExpanded, setIndExpanded] = useState(false);
    const [orgExpanded, setOrgExpanded] = useState(false);

    if (!benefits) return null;

    // Helper to count list items in HTML string
    const getListItemCount = (html?: string) => {
        if (!html) return 0;
        return (html.match(/<\/li>/gi) || []).length;
    };

    const indCount = getListItemCount(benefits.individual);
    const orgCount = getListItemCount(benefits.organization);

    return (
        <div className="space-y-5 pt-4">
            {/* Header */}
            <div className="space-y-2">
                <SectionTag text="Benefits" />
                <h3 className="text-xl md:text-2xl font-black heading-Color tracking-tight">
                    What it changes, for you and for an employer
                </h3>
                {benefits.description && (
                    <div
                        className="text-xs text-gray-500 font-medium leading-relaxed max-w-3xl benefits-desc"
                        dangerouslySetInnerHTML={{ __html: benefits.description }}
                    />
                )}
            </div>

            {/* Content Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* For Individuals */}
                {benefits.individual && (
                    <div
                        className="bg-[#FAF9FE] border border-purple-100/40 rounded-2xl p-5 flex flex-col justify-between"
                        style={{
                            ["--bullet-bg" as any]: "#F3E8FF",
                            ["--bullet-color" as any]: "#7C3AED"
                        }}
                    >
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <h4 className="text-sm font-black text-[#101A3D]">For individuals</h4>
                            </div>

                            {/* List Content */}
                            <div
                                className={`benefits-list ${indExpanded ? "is-expanded" : ""}`}
                                dangerouslySetInnerHTML={{ __html: benefits.individual }}
                            />
                        </div>

                        {/* Read More Toggle */}
                        {indCount > 5 && (
                            <div className="pt-4 flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => setIndExpanded(!indExpanded)}
                                    className="text-purple-600 hover:text-purple-700 text-xs font-bold transition-all cursor-pointer"
                                >
                                    {indExpanded ? "Read Less" : `Read More (+${indCount - 5} points)`}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* For Organisations */}
                {benefits.organization && (
                    <div
                        className="bg-[#F3FAF6] border border-emerald-100/40 rounded-2xl p-5 flex flex-col justify-between"
                        style={{
                            ["--bullet-bg" as any]: "#E8F5E9",
                            ["--bullet-color" as any]: "#2E7D32"
                        }}
                    >
                        <div className="space-y-5">
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <h4 className="text-sm font-black text-[#101A3D]">For organisations</h4>
                            </div>

                            {/* List Content */}
                            <div
                                className={`benefits-list ${orgExpanded ? "is-expanded" : ""}`}
                                dangerouslySetInnerHTML={{ __html: benefits.organization }}
                            />
                        </div>

                        {/* Read More Toggle */}
                        {orgCount > 5 && (
                            <div className="pt-4 flex justify-start">
                                <button
                                    type="button"
                                    onClick={() => setOrgExpanded(!orgExpanded)}
                                    className="text-emerald-700 hover:text-emerald-800 text-xs font-bold transition-all cursor-pointer"
                                >
                                    {orgExpanded ? "Read Less" : `Read More (+${orgCount - 5} points)`}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx global>{`
                .benefits-list ul {
                    list-style-type: none !important;
                    padding-left: 0 !important;
                    margin: 0 !important;
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }
                .benefits-list li {
                    position: relative;
                    padding-left: 1.75rem;
                    font-size: 13px !important;
                    color: #4B5563 !important;
                    font-weight: 500 !important;
                    line-height: 1.5;
                }
                .benefits-list li::before {
                    content: "✓" !important;
                    position: absolute;
                    left: 0;
                    top: 2px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-color: var(--bullet-bg) !important;
                    color: var(--bullet-color) !important;
                    font-size: 10px;
                    font-weight: 900;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                /* Hide items beyond first 5 if not expanded */
                .benefits-list:not(.is-expanded) ul li:nth-child(n+6) {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}
