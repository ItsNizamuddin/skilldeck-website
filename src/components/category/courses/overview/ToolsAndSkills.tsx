"use client";

import SectionTag from "@/components/ui/SectionTag";
import Image from "next/image";
import { useState } from "react";

interface Tool {
    name: string;
    description: string;
    icon?: {
        url: string;
        alt: string;
    };
}

interface Skill {
    name: string;
    description: string;
}

interface ToolsAndSkillsProps {
    tools?: Tool[];
    skills?: Skill[];
}

export function ToolsAndSkills({ tools, skills }: ToolsAndSkillsProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [mobileIndex, setMobileIndex] = useState(0);
    const hasTools = tools && tools.length > 0;

    const getInitials = (name: string) => {
        if (!name) return "";
        const cleanName = name.trim();
        const words = cleanName.split(/\s+/);
        if (words.length > 1 && words[0] && words[1]) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return cleanName.slice(0, 2).toUpperCase();
    };

    if (!hasTools) return null;

    const limit = 6;
    const needsLoadMore = tools.length > limit;
    const visibleTools = isExpanded ? tools : tools.slice(0, limit);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="space-y-2">
                <SectionTag text="Tools and Platforms" />
                <h3 className="text-xl md:text-2xl font-black heading-Color tracking-tight">
                    What you will actually have your hands on
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                    Licences and sandbox access are included in the fee unless noted otherwise.
                </p>
            </div>

            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
                {visibleTools.map((tool, idx) => {
                    const initials = getInitials(tool.name);
                    return (
                        <div
                            key={idx}
                            className="bg-white border border-purple-100/50 rounded-2xl p-4 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                {/* Tool Icon / Initials Badge */}
                                {tool.icon?.url ? (
                                    <div className="relative w-9 h-9 flex items-center justify-start">
                                        <Image
                                            width={50}
                                            height={50}
                                            src={tool.icon.url}
                                            alt={tool.icon.alt || tool.name}
                                            className="w-auto h-full max-w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold text-xs">
                                        {initials}
                                    </div>
                                )}
                                <h4 className="text-sm font-bold text-[#101A3D]">{tool.name}</h4>
                                <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                                    {tool.description || `Used hands-on across the modules.`}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile View: Single card with Next/Prev navigation */}
            <div className="block md:hidden space-y-4 pb-6">
                <div className="transition-all duration-300">
                    {tools.map((tool, idx) => {
                        if (idx !== mobileIndex) return null;
                        const initials = getInitials(tool.name);
                        return (
                            <div
                                key={idx}
                                className="bg-white border border-purple-100/50 rounded-2xl p-5 space-y-4 shadow-sm min-h-[100px] flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-5">
                                        {tool.icon?.url ? (
                                            <div className="relative w-9 h-9 flex items-center justify-start">
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={tool.icon.url}
                                                    alt={tool.icon.alt || tool.name}
                                                    className="w-auto h-full max-w-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] flex items-center justify-center font-bold text-xs">
                                                {initials}
                                            </div>
                                        )}
                                        <h4 className="text-sm font-bold text-[#101A3D]">{tool.name}</h4>
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                                        {tool.description || `Used hands-on across the modules.`}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Slider navigation controls */}
                <div className="flex items-center justify-between px-2 pt-2 bg-slate-50/50 rounded-2xl border border-slate-100 p-3">
                    <button
                        type="button"
                        disabled={mobileIndex === 0}
                        onClick={() => setMobileIndex(prev => Math.max(0, prev - 1))}
                        className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                        aria-label="Previous tool"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Bullet Indicators */}
                    <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[60%]">
                        {tools.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setMobileIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === mobileIndex ? "bg-[#7C3AED] w-4" : "bg-slate-300"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        disabled={mobileIndex === tools.length - 1}
                        onClick={() => setMobileIndex(prev => Math.min(tools.length - 1, prev + 1))}
                        className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                        aria-label="Next tool"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Load More Button */}
            {needsLoadMore && (
                <div className="hidden md:flex justify-center pt-2">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-5 py-2.5 rounded-full transition-all cursor-pointer"
                    >
                        {isExpanded ? "Show Less ↑" : `Load More (${tools.length - limit} more) ↓`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ToolsAndSkills;