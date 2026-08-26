"use client";

import { cn } from "@/lib/utils";
import { X, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export interface DemoSectionLink {
    id: string;
    label: string;
}

interface DemoSectionsNavProps {
    sections: DemoSectionLink[];
    /** Id of the wrapping element used to decide when the nav should be visible. */
    containerId: string;
}

export default function DemoSectionsNav({ sections, containerId }: DemoSectionsNavProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
    const containerRef = useRef<HTMLDivElement>(null);

    const validSections = useMemo(() => sections.filter((s) => Boolean(s.id)), [sections]);

    useEffect(() => {
        const handleScroll = () => {
            const wrapEl = document.getElementById(containerId);
            if (!wrapEl) return;

            const rect = wrapEl.getBoundingClientRect();
            const shouldShow = rect.top < 300 && rect.bottom > 150;
            setIsVisible(shouldShow);

            const offset = 140;
            let current = validSections[0]?.id || "";
            for (const section of validSections) {
                const el = document.getElementById(section.id);
                if (el) {
                    const elRect = el.getBoundingClientRect();
                    if (elRect.top <= offset) current = section.id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [validSections, containerId]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsExpanded(false);
            }
        };
        if (isExpanded) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isExpanded]);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            const offset = 85;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }
        setIsExpanded(false);
    };

    if (!isVisible || validSections.length === 0 || isDismissed) return null;

    const activeItem = validSections.find((s) => s.id === activeSection) || validSections[0];

    return (
        <div ref={containerRef} className="z-40 select-none">
            {/* Ultra-wide screens: docked in left gutter */}
            <aside
                aria-label="Page Sections Navigation"
                className="hidden 2xl:block fixed left-4 3xl:left-8 top-1/2 -translate-y-1/2 z-50 animate-in fade-in slide-in-from-left-4 duration-300 pointer-events-auto"
            >
                <div className="bg-white/95 backdrop-blur-md border border-purple-100 shadow-[0_12px_40px_-8px_rgba(124,58,237,0.16),0_4px_16px_-2px_rgba(0,0,0,0.06)] rounded-[22px] p-2 w-32 flex flex-col gap-1">
                    <div className="flex items-center justify-between px-2 pt-0.5 pb-1.5 border-b border-purple-50">
                        <span className="text-[8.5px] font-bold uppercase tracking-widest text-[#7C3AED]">SECTIONS</span>
                        <button
                            type="button"
                            onClick={() => setIsDismissed(true)}
                            aria-label="Dismiss Sections"
                            className="text-slate-400 hover:text-slate-600 rounded-full p-0.5 hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-0.5 py-0.5 max-h-[60vh] overflow-y-auto no-scrollbar">
                        {validSections.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    type="button"
                                    onClick={() => scrollToSection(section.id)}
                                    style={isActive ? { background: "var(--gradient-brand)" } : undefined}
                                    className={cn(
                                        "flex items-center gap-1.5 w-full text-left transition-all duration-200 text-[10px]",
                                        isActive
                                            ? "text-white font-bold rounded-full px-2 py-1.5 shadow-md shadow-purple-500/25"
                                            : "px-2 py-1 text-slate-700 hover:text-slate-950 hover:bg-purple-50/60 rounded-xl font-semibold"
                                    )}
                                >
                                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", isActive ? "bg-white/60" : "bg-[#A855F7]")} />
                                    <span className="truncate">{section.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Standard laptops: floating pill trigger. Hidden below lg — on phones and
                tablets the content column runs edge-to-edge, so this fixed-left overlay
                has no true gutter to sit in and just floats on top of the reading content. */}
            <div className="hidden lg:block 2xl:hidden fixed left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-50 pointer-events-auto">
                {!isExpanded ? (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(true)}
                        aria-label="Open Page Sections"
                        className="bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.2)] rounded-full py-2 px-3 flex items-center gap-2 text-slate-800 hover:scale-105 transition-all group"
                    >
                        <span className="text-[11px] font-extrabold capitalize tracking-wider text-[#7C3AED]">
                            {activeItem?.label || "Sections"}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                ) : (
                    <div className="bg-white/98 backdrop-blur-md border border-purple-100 shadow-[0_16px_48px_rgba(124,58,237,0.25)] rounded-[22px] p-2 w-32 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-2 pt-0.5 pb-1.5 border-b border-purple-50">
                            <span className="text-[11px] font-semibold tracking-widest text-[#7C3AED]">SECTIONS</span>
                            <button
                                type="button"
                                onClick={() => setIsExpanded(false)}
                                aria-label="Close"
                                className="text-slate-400 hover:text-slate-600 rounded-full p-0.5 hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-0.5 py-0.5 max-h-[60vh] overflow-y-auto no-scrollbar">
                            {validSections.map((section) => {
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => scrollToSection(section.id)}
                                        style={isActive ? { background: "var(--gradient-brand)" } : undefined}
                                        className={cn(
                                            "flex items-center gap-1.5 w-full text-left transition-all duration-200 text-[11px]",
                                            isActive
                                                ? "text-white font-bold rounded-full px-2 py-1.5 shadow-md shadow-purple-500/25"
                                                : "px-2 py-1 text-slate-700 hover:text-slate-950 hover:bg-purple-50/60 rounded-xl font-semibold"
                                        )}
                                    >
                                        <span className="truncate">{section.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
