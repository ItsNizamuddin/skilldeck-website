"use client";

import SectionTag from "@/components/ui/SectionTag";
import Image from "next/image";
import { useState } from "react";

interface PlacementPerson {
    name: string;
    photo?: {
        url: string;
        alt: string;
    };
    currentCompany?: {
        name: string;
        designation?: string;
        logo?: {
            url: string;
            alt: string;
        };
    };
    previousCompany?: {
        name: string;
        designation?: string;
        logo?: {
            url: string;
            alt: string;
        };
    };
}

interface CoursePlacementsProps {
    placements?: {
        title?: string;
        description?: string;
        personData?: PlacementPerson[];
    };
}

export default function CoursePlacements({ placements }: CoursePlacementsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const persons = placements?.personData || [];

    if (persons.length === 0) return null;

    const visiblePersons = isExpanded ? persons : persons.slice(0, 6);

    return (
        <div className="space-y-6 md:pt-6">
            {/* Header */}
            <div className="space-y-2">
                <SectionTag text="Professional" />
                <h3 className="text-xl md:text-2xl font-black heading-Color tracking-tight">
                    Career Successful Stories
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                    Learners who transformed their careers and landed roles at leading companies.
                </p>
            </div>

            {/* Placements Outer Wrapper Box */}
            <div className="bg-[#FAFBFD]/80 border border-[#F1F5F9] rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {visiblePersons.map((person, idx) => {
                        const hasCompanyLogo = person.currentCompany?.logo?.url;

                        return (
                            <div
                                key={idx}
                                className="bg-white border border-slate-100/60 rounded-2xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {/* Left: User Avatar & Info */}
                                <div className="flex items-center gap-3">
                                    {person.photo?.url ? (
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 shrink-0">
                                            <Image
                                                src={person.photo.url}
                                                alt={person.name}
                                                fill
                                                sizes="40px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <h4 className="text-xs font-bold text-[#101A3D] truncate">{person.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-medium">Placed at</p>
                                    </div>
                                </div>

                                {/* Right: Company Logo */}
                                {hasCompanyLogo && (
                                    <div className="h-8 w-20  flex items-center justify-center shrink-0 relative overflow-hidden">
                                        <Image
                                            src={person.currentCompany?.logo?.url || ""}
                                            alt={person.currentCompany?.name || "Company logo"}
                                            fill
                                            sizes="80px"
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Load More Button */}
                {persons.length > 6 && (
                    <div className="flex justify-center pt-2">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="px-5 py-2 rounded-xl border border-purple-100 text-purple-600 bg-purple-50 hover:bg-purple-100/60 text-xs font-bold transition-all cursor-pointer"
                        >
                            {isExpanded ? "Show Less" : `Load More (${persons.length - 6} more)`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
