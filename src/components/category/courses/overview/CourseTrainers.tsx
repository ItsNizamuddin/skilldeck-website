"use client";

import SectionTag from "@/components/ui/SectionTag";
import { Briefcase } from "lucide-react";
import { useMemo, useState } from "react";

interface Trainer {
    id?: string;
    name: string;
    role?: string;
    image?: string;
    bio?: string;
    description?: string;
    rating?: number;
    experience?: string;
    linkedin?: string;
}

interface CourseTrainersProps {
    trainers?: Trainer[];
}

export default function CourseTrainers({ trainers }: CourseTrainersProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [mobileIndex, setMobileIndex] = useState(0);
    const PAGE_SIZE = 4;

    const hasTrainers = trainers && trainers.length > 0;

    const getInitials = (name: string) => {
        if (!name) return "";
        const cleanName = name.trim();
        const words = cleanName.split(/\s+/);
        if (words.length > 1 && words[0] && words[1]) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return cleanName.slice(0, 2).toUpperCase();
    };

    // Premium light background colors for initials badges
    const getBadgeColorClass = (idx: number) => {
        const colors = [
            "bg-amber-50 text-amber-600 border border-amber-100",
            "bg-indigo-50 text-indigo-600 border border-indigo-100",
            "bg-pink-50 text-pink-600 border border-pink-100",
            "bg-purple-50 text-purple-600 border border-purple-100",
        ];
        return colors[idx % colors.length];
    };

    const getCompanyTags = (trainer: Trainer) => {
        const tags: string[] = [];
        const textToSearch = `${trainer.role || ""} ${trainer.bio || trainer.description || ""}`;

        // Search for patterns like "ex-Flipkart" or "ex-Staff Engineer, Flipkart"
        const matches = textToSearch.match(/ex-[A-Za-z0-9]+/g);
        if (matches) {
            matches.forEach(m => {
                const comp = m.replace("ex-", "").trim();
                if (comp) {
                    const capitalized = comp.charAt(0).toUpperCase() + comp.slice(1);
                    const clean = `Ex-${capitalized}`;
                    if (!tags.includes(clean)) tags.push(clean);
                }
            });
        }

        // Additional parsing for comma-separated or "at"
        if (tags.length === 0 && trainer.role) {
            const roleLower = trainer.role.toLowerCase();
            if (roleLower.includes("ex-")) {
                const splitEx = trainer.role.split(/ex-/i);
                if (splitEx[1]) {
                    const comp = splitEx[1].split(/,|\./)[0].trim();
                    if (comp) {
                        const capitalized = comp.charAt(0).toUpperCase() + comp.slice(1);
                        tags.push(`Ex-${capitalized}`);
                    }
                }
            }
        }
        return tags;
    };

    const totalPages = useMemo(() => {
        if (!trainers) return 0;
        return Math.ceil(trainers.length / PAGE_SIZE);
    }, [trainers]);

    const paginatedTrainers = useMemo(() => {
        if (!trainers) return [];
        if (trainers.length <= PAGE_SIZE) return trainers;
        return trainers.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);
    }, [trainers, currentPage]);

    if (!hasTrainers) return null;

    return (
        <div className="space-y-6 md:pt-6">
            {/* Header */}
            <div className="space-y-2">
                <SectionTag text="Who teaches this" />
                <h3 className="text-xl md:text-2xl font-black heading-Color tracking-tight">
                    The people in the room
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                    Names, current roles and how long they have actually done the work.
                </p>
            </div>

            {/* Desktop View: Grid */}
            <div className={`hidden md:grid gap-6 ${paginatedTrainers.length === 1
                ? "grid-cols-1 max-w-sm"
                : paginatedTrainers.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                }`}>
                {paginatedTrainers.map((trainer, idx) => {
                    const initials = getInitials(trainer.name);
                    const badgeStyle = getBadgeColorClass(idx);

                    // Extract and clean bio text
                    let rawBio = "";
                    if (trainer.bio) {
                        if (typeof trainer.bio === "string") {
                            rawBio = trainer.bio;
                        } else if (typeof trainer.bio === "object") {
                            rawBio = trainer.bio["Trainer Journey"] || Object.values(trainer.bio)[0] || "";
                        }
                    }
                    if (!rawBio) {
                        rawBio = trainer.description || "";
                    }
                    // Strip HTML tags for clean text presentation
                    const cleanBio = rawBio.replace(/<[^>]*>/g, "").trim();

                    const companyTags = getCompanyTags(trainer);

                    // User-friendly experience string
                    let expLabel = trainer.experience || "";
                    if (expLabel && !expLabel.toLowerCase().includes("exp")) {
                        expLabel = `${expLabel} yrs experience`;
                    }

                    return (
                        <div
                            key={trainer.id || idx}
                            className="bg-white border border-slate-100 rounded-3xl p-4 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                {/* Header (Initials & Name/Role) */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${badgeStyle}`}>
                                        {initials}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-[#101A3D] truncate">{trainer.name}</h4>
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed truncate">
                                            {trainer.role || "Instructor"}
                                        </p>
                                    </div>
                                </div>

                                {/* Bio description */}
                                <p className="text-[12px] text-gray-500 font-medium leading-relaxed line-clamp-4">
                                    {cleanBio || "Experienced trainer delivering industry-focused modules and hands-on workshops."}
                                </p>
                            </div>

                            {/* Tags list */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {/* Experience Tag */}
                                {expLabel && (
                                    <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-100 text-purple-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                                        <Briefcase className="w-3 h-3" />
                                        <span>{expLabel}</span>
                                    </div>
                                )}

                                {/* Company tags parsed */}
                                {companyTags.map((tag, tIdx) => (
                                    <div
                                        key={tIdx}
                                        className="bg-white border border-slate-150 text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Desktop Pagination controls */}
            {totalPages > 1 && (
                <div className="hidden md:flex items-center justify-center gap-4 pt-4">
                    <button
                        type="button"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        className="px-3.5 py-2 rounded-xl border border-purple-100 text-purple-600 bg-purple-50 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-purple-100/60"
                    >
                        ← Prev
                    </button>

                    <span className="text-xs text-gray-500 font-bold" suppressHydrationWarning>
                        Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={currentPage === totalPages - 1}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        className="px-3.5 py-2 rounded-xl border border-purple-100 text-purple-600 bg-purple-50 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-purple-100/60"
                    >
                        Next →
                    </button>
                </div>
            )}

            {/* Mobile View: Single card with Next/Prev navigation */}
            {trainers.length > 0 && (
                <div className="block md:hidden space-y-4 pb-6">
                    <div className="transition-all duration-300">
                        {trainers.map((trainer, idx) => {
                            if (idx !== mobileIndex) return null;
                            const initials = getInitials(trainer.name);
                            const badgeStyle = getBadgeColorClass(idx);

                            let rawBio = "";
                            if (trainer.bio) {
                                if (typeof trainer.bio === "string") {
                                    rawBio = trainer.bio;
                                } else if (typeof trainer.bio === "object") {
                                    rawBio = trainer.bio["Trainer Journey"] || Object.values(trainer.bio)[0] || "";
                                }
                            }
                            if (!rawBio) {
                                rawBio = trainer.description || "";
                            }
                            const cleanBio = rawBio.replace(/<[^>]*>/g, "").trim();

                            const companyTags = getCompanyTags(trainer);

                            let expLabel = trainer.experience || "";
                            if (expLabel && !expLabel.toLowerCase().includes("exp")) {
                                expLabel = `${expLabel} yrs experience`;
                            }

                            return (
                                <div
                                    key={trainer.id || idx}
                                    className="bg-white border border-slate-100 rounded-3xl p-5 space-y-4 shadow-sm min-h-[180px] flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${badgeStyle}`}>
                                                {initials}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-[#101A3D] truncate">{trainer.name}</h4>
                                                <p className="text-[11px] text-gray-500 font-medium leading-relaxed truncate">
                                                    {trainer.role || "Instructor"}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-[12px] text-gray-500 font-medium leading-relaxed line-clamp-5">
                                            {cleanBio || "Experienced trainer delivering industry-focused modules and hands-on workshops."}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {expLabel && (
                                            <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-100 text-purple-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                                                <Briefcase className="w-3 h-3" />
                                                <span>{expLabel}</span>
                                            </div>
                                        )}

                                        {companyTags.map((tag, tIdx) => (
                                            <div
                                                key={tIdx}
                                                className="bg-white border border-slate-150 text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold"
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation Controls (Only if trainers.length > 1) */}
                    {trainers.length > 1 && (
                        <div className="flex items-center justify-between px-2 pt-2 bg-slate-50/50 rounded-2xl border border-slate-100 p-3">
                            <button
                                type="button"
                                disabled={mobileIndex === 0}
                                onClick={() => setMobileIndex(prev => Math.max(0, prev - 1))}
                                className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                                aria-label="Previous trainer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Bullet Indicators */}
                            <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[60%]">
                                {trainers.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMobileIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === mobileIndex ? "bg-[#7C3AED] w-4" : "bg-slate-300"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                disabled={mobileIndex === trainers.length - 1}
                                onClick={() => setMobileIndex(prev => Math.min(trainers.length - 1, prev + 1))}
                                className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                                aria-label="Next trainer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
