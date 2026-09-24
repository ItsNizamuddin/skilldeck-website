"use client";

import { useMemo, useState } from "react";
import HdGradientText from "@/components/home-demo/HdGradientText";
import type { FigmaCategory, FigmaDesign } from "@/lib/figmaDesigns";
import FigmaCard from "./FigmaCard";

interface FigmaGalleryProps {
    designs: FigmaDesign[];
    categories: Array<FigmaCategory | "All">;
}

export default function FigmaGallery({ designs, categories }: FigmaGalleryProps) {
    const [activeCategory, setActiveCategory] = useState<FigmaCategory | "All">("All");

    const visible = useMemo(
        () =>
            activeCategory === "All"
                ? designs
                : designs.filter((d) => d.category === activeCategory),
        [designs, activeCategory]
    );

    const countFor = (category: FigmaCategory | "All") =>
        category === "All"
            ? designs.length
            : designs.filter((d) => d.category === category).length;

    return (
        <section className="section-y bg-slate-50" id="figma-designs">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="badge-brand mb-5">Figma designs</span>
                    <h2 className="heading-section mb-4">
                        Design files you can <HdGradientText>buy and build on</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Prefer to start from the design? These are our Figma kits and prototypes —
                        take the file to your own developer, or hand it back to us and we will
                        build it on the SkillDeck platform.
                    </p>
                </div>

                <div
                    className="flex flex-wrap items-center justify-center gap-2 mb-10"
                    role="tablist"
                    aria-label="Filter designs by category"
                >
                    {categories.map((category) => {
                        const isActive = category === activeCategory;
                        return (
                            <button
                                key={category}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveCategory(category)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs 2xl:text-sm font-bold border transition-all duration-200 cursor-pointer ${isActive
                                    ? "text-white border-transparent shadow-lg shadow-brand-primary/25 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]"
                                    : "bg-white text-brand-muted border-slate-200 hover:border-brand-primary hover:text-brand-primary"
                                    }`}
                            >
                                {category}
                                <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-brand-muted"
                                        }`}
                                >
                                    {countFor(category)}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {visible.map((design) => (
                        <FigmaCard key={design.slug} design={design} />
                    ))}
                </div>
            </div>
        </section>
    );
}
