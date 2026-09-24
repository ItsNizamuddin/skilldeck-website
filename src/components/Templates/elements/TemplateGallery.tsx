"use client";

import { useMemo, useState } from "react";
import HdGradientText from "@/components/home-demo/HdGradientText";
import type { TemplateCategory, WebsiteTemplate } from "@/lib/templates";
import TemplateCard from "./TemplateCard";

interface TemplateGalleryProps {
    templates: WebsiteTemplate[];
    categories: Array<TemplateCategory | "All">;
}

export default function TemplateGallery({ templates, categories }: TemplateGalleryProps) {
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");

    const visible = useMemo(
        () =>
            activeCategory === "All"
                ? templates
                : templates.filter((t) => t.category === activeCategory),
        [templates, activeCategory]
    );

    const countFor = (category: TemplateCategory | "All") =>
        category === "All"
            ? templates.length
            : templates.filter((t) => t.category === category).length;

    return (
        <section className="section-y bg-white" id="gallery">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="badge-brand mb-5">Template gallery</span>
                    <h2 className="heading-section mb-4">
                        Websites we have <HdGradientText>already shipped</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Each one is live today. Preview the real site, then pick the layout closest
                        to your business — we rebrand it with your content, courses and colours.
                    </p>
                </div>

                <div
                    className="flex flex-wrap items-center justify-center gap-2 mb-10"
                    role="tablist"
                    aria-label="Filter templates by category"
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
                    {visible.map((template) => (
                        <TemplateCard key={template.slug} template={template} />
                    ))}
                </div>
            </div>
        </section>
    );
}
