"use client";

import { cn } from "@/lib/utils";
import { Salary } from "@/types";
import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface CategorySalariesProps {
    salaries?: Salary[];
    categoryName?: string;
}

const CARD_THEMES = [
    {
        border: "border-t-orange-500",
        barFrom: "from-orange-400",
        barTo: "to-red-500",
        accent: "text-orange-500",
        bg: "bg-orange-50/10",
    },
    {
        border: "border-t-blue-500",
        barFrom: "from-blue-400",
        barTo: "to-indigo-500",
        accent: "text-blue-500",
        bg: "bg-blue-50/10",
    },
    {
        border: "border-t-violet-500",
        barFrom: "from-violet-400",
        barTo: "to-fuchsia-500",
        accent: "text-violet-500",
        bg: "bg-violet-50/10",
    },
    {
        border: "border-t-emerald-500",
        barFrom: "from-emerald-400",
        barTo: "to-teal-500",
        accent: "text-emerald-500",
        bg: "bg-emerald-50/10",
    },
    {
        border: "border-t-rose-500",
        barFrom: "from-rose-400",
        barTo: "to-pink-500",
        accent: "text-rose-500",
        bg: "bg-rose-50/10",
    },
];

function formatSalary(value: number): string {
    if (value >= 1000) {
        return `$${Math.round(value / 1000)}k`;
    }
    return `$${value.toLocaleString()}`;
}

export default function CategorySalaries({ salaries, categoryName }: CategorySalariesProps) {
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const desktopScrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.firstElementChild?.clientWidth || 1;
        const gap = 16;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setMobileActiveIndex(index);
    }, []);

    const handleDesktopScroll = useCallback(() => {
        if (!desktopScrollRef.current) return;
        const el = desktopScrollRef.current;
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }, []);

    if (!salaries || salaries.length === 0) return null;

    return (
        <section className="py-12 lg:py-20 bg-slate-50/50 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#94a3b8 1px, transparent 0)`, backgroundSize: '32px 32px' }}
            />

            <div className="container max-w-6xl 2xl:max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 mb-4 shadow-sm"
                    >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span className="text-xs font-black tracking-widest uppercase">Career Outcomes</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-3"
                    >
                        What you&apos;ll earn after this course
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        {categoryName
                            ? `${categoryName} professionals are among the most in-demand in the industry. Here's what the market pays.`
                            : "Industry professionals are among the most in-demand. Here's what the market pays."}
                    </motion.p>
                </div>

                {/* Mobile: Horizontal Scroll Slider */}
                <div className="md:hidden relative">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 overflow-y-hidden -mx-4 px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {salaries.map((salary, cardIndex) => {
                            const theme = CARD_THEMES[cardIndex % CARD_THEMES.length];
                            const maxVal = Math.max(...salary.graphData.map(d => d.value)) || 100;

                            return (
                                <div
                                    key={salary.id || cardIndex}
                                    className={cn(
                                        "flex-shrink-0 w-[85vw] snap-center bg-white rounded-3xl border border-slate-100 p-6 shadow-md border-t-4",
                                        theme.border
                                    )}
                                >
                                    <div className="mb-5">
                                        <h3 className="text-base md:text-lg font-black text-slate-800 mb-1.5 leading-snug">
                                            {salary.title}
                                        </h3>
                                        {salary.description && (
                                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                                                {salary.description.replace(/\n/g, ' ')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        {salary.graphData.map((data, barIndex) => {
                                            const percentage = (data.value / maxVal) * 100;
                                            return (
                                                <div key={barIndex}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-semibold text-slate-700">{data.label}</span>
                                                        <span className={cn("text-xs font-black", theme.accent)}>{formatSalary(data.value)}</span>
                                                    </div>
                                                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={cn("absolute top-0 left-0 h-full rounded-full bg-gradient-to-r", theme.barFrom, theme.barTo)}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Dots */}
                    {salaries.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {salaries.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        scrollRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                                    }}
                                    aria-label={`Go to role ${i + 1}`}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                        mobileActiveIndex === i ? "w-6 bg-slate-900" : "w-1.5 bg-slate-300"
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop: Horizontal Scroll Slider */}
                <div className="hidden md:block relative group/slider">
                    <div
                        ref={desktopScrollRef}
                        onScroll={handleDesktopScroll}
                        className={cn(
                            "flex gap-6 pb-4 scrollbar-hide overflow-y-hidden",
                            salaries.length > 3 ? "overflow-x-auto snap-x snap-mandatory" : "overflow-x-hidden"
                        )}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {salaries.map((salary, cardIndex) => {
                            const theme = CARD_THEMES[cardIndex % CARD_THEMES.length];
                            const maxVal = Math.max(...salary.graphData.map(d => d.value)) || 100;

                            return (
                                <motion.div
                                    key={salary.id || cardIndex}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (cardIndex % 3) * 0.1 }}
                                    className={cn(
                                        "flex-shrink-0 w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-white rounded-3xl border border-slate-100 p-6 lg:p-8 shadow-md hover:shadow-xl hover:border-slate-200/50 transition-all duration-500 border-t-4",
                                        theme.border
                                    )}
                                >
                                    <div className="mb-6">
                                        <h3 className="text-base lg:text-lg font-black text-slate-900 mb-2 leading-snug">
                                            {salary.title}
                                        </h3>
                                        {salary.description && (
                                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                                                {salary.description.replace(/\n/g, ' ')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-5">
                                        {salary.graphData.map((data, barIndex) => {
                                            const percentage = (data.value / maxVal) * 100;
                                            return (
                                                <div key={barIndex}>
                                                    <div className="flex justify-between items-center mb-1.5">
                                                        <span className="text-xs font-semibold text-slate-700">{data.label}</span>
                                                        <span className={cn("text-xs font-black", theme.accent)}>{formatSalary(data.value)}</span>
                                                    </div>
                                                    <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${percentage}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1, delay: 0.3 + barIndex * 0.1, ease: "easeOut" }}
                                                            className={cn("absolute top-0 left-0 h-full rounded-full bg-gradient-to-r", theme.barFrom, theme.barTo)}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Navigation Arrows (only if more than 3 cards) */}
                    {salaries.length > 3 && (
                        <>
                            <button
                                onClick={() => {
                                    if (!desktopScrollRef.current) return;
                                    const cardWidth = desktopScrollRef.current.firstElementChild?.clientWidth || 300;
                                    desktopScrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
                                }}
                                className={cn(
                                    "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer",
                                    !canScrollLeft && "opacity-0 pointer-events-none"
                                )}
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    if (!desktopScrollRef.current) return;
                                    const cardWidth = desktopScrollRef.current.firstElementChild?.clientWidth || 300;
                                    desktopScrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
                                }}
                                className={cn(
                                    "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all duration-300 cursor-pointer",
                                    !canScrollRight && "opacity-0 pointer-events-none"
                                )}
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
