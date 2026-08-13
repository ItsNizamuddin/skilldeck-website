"use client";

import SectionTag from "@/components/ui/SectionTag";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SalaryGraphItem {
    label: string;
    value: number;
}

interface SalaryItem {
    id: number;
    title: string;
    description: string;
    graphData: SalaryGraphItem[];
}

interface CourseSalariesProps {
    salaries?: SalaryItem[];
}

export default function CourseSalaries({ salaries }: CourseSalariesProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollLimits = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        checkScrollLimits();
        window.addEventListener("resize", checkScrollLimits);
        return () => window.removeEventListener("resize", checkScrollLimits);
    }, [salaries]);

    if (!salaries || salaries.length === 0) return null;

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 340;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScrollLimits, 350);
        }
    };

    const formatSalaryLabel = (value: number) => {
        if (!value) return "";
        if (value >= 100000) {
            // INR Lakhs (e.g., 650000 -> 6.5L, 1200000 -> 12L)
            const inLakhs = value / 100000;
            return `₹${inLakhs % 1 === 0 ? inLakhs : inLakhs.toFixed(1)}L`;
        }
        if (value >= 1000) {
            // USD (e.g., 45000 -> 45L or $45k if below 100k)
            // Wait, if value is 45000 but the user wants ₹4.5L or $45k:
            // Since USD is usually < 100000 (e.g. 45000 -> $45k) and INR is >= 100000:
            return `₹${(value / 100000).toFixed(1).replace(".0", "")}L`;
        }
        return `${value}`;
    };

    return (
        <div className="space-y-6 pt-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <SectionTag text="Pay by Role" />
                    <h3 className="text-xl md:text-2xl font-black heading-Color tracking-tight">
                        What each role pays as you gain experience
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                        Ranges reported by learners and providers across the last four quarters.
                    </p>
                </div>
                {salaries.length > 2 && (
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            disabled={!canScrollLeft}
                            onClick={() => scroll("left")}
                            className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            disabled={!canScrollRight}
                            onClick={() => scroll("right")}
                            className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Sub-header with navigation buttons if there's multiple cards */}

            {/* Cards Scroll Container */}
            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollLimits}
                    className="flex items-stretch gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {salaries.map((role, idx) => {
                        const maxVal = Math.max(...role.graphData.map(item => item.value)) || 1;

                        return (
                            <div
                                key={role.id || idx}
                                className="w-[320px] md:w-[350px] shrink-0 snap-start bg-white border border-purple-100/50 rounded-3xl p-5 space-y-1 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-1">
                                    {/* Card Header (Role Name & Trend Icon) */}
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-[#101A3D] leading-tight">
                                            {role.title}
                                        </h4>
                                        <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Role description */}
                                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                                        {role.description || "The average compensation progression details for this role."}
                                    </p>

                                    {/* Progress Bars Graph */}
                                    <div className="space-y-3 pt-2">
                                        {role.graphData.map((dataPoint, gIdx) => {
                                            const percentage = Math.max(10, Math.min(100, (dataPoint.value / maxVal) * 100));

                                            return (
                                                <div key={gIdx} className="space-y-1.5">
                                                    <div className="flex items-center justify-between text-[11px] font-bold">
                                                        <span className="text-gray-500">{dataPoint.label}</span>
                                                        <span className="bg-slate-50 border border-slate-100 text-[#101A3D] px-2 py-0.5 rounded-lg">
                                                            {formatSalaryLabel(dataPoint.value)}
                                                        </span>
                                                    </div>
                                                    {/* Bar Slider */}
                                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Footer Caption */}
                                <div className="text-[10px] text-gray-400 font-medium border-t border-slate-50">
                                    Figures are self-reported by learners and providers, before tax.
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
