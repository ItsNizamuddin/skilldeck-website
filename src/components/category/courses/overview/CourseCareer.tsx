"use client";

import SectionTag from "@/components/ui/SectionTag";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface CareerPathItem {
    title: string;
    description: string;
}

interface CareerData {
    path?: CareerPathItem[];
    certification_process?: Array<{ title: string; description?: string }>;
}

interface CourseCareerProps {
    data?: CareerData;
}

export default function CourseCareer({ data }: CourseCareerProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const path = data?.path || [];

    if (path.length === 0) return null;

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="space-y-5 md:pt-4">
            {/* Header */}
            <div className="space-y-2">
                <SectionTag text="After the Programme" />
                <h3 className="text-xl md:text-2xl font-black heading-Color tracking-tight">
                    Where graduates end up
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                    Self-reported by learners at six months, cross-checked against offer letters where shared.
                </p>
            </div>

            {/* Sub-header with Scroll Buttons */}
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#101A3D]">Typical career progression</h4>
                {path.length > 3 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Horizontal Timeline Scroll Container */}
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex items-stretch overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {path.map((item, idx) => {
                        const isLast = idx === path.length - 1;
                        return (
                            <div key={idx} className="flex items-center snap-start shrink-0">
                                {/* Career Card */}
                                <div className="w-[280px] bg-white border border-purple-100/50 rounded-3xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                                    <div className="space-y-3">
                                        {/* Step Circle Badge */}
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs">
                                            {idx + 1}
                                        </div>
                                        <h5 className="text-sm font-bold text-[#101A3D]">{item.title}</h5>
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Connector Arrow */}
                                {!isLast && (
                                    <div className="flex items-center justify-center px-2 text-brand-primary">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
