"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Component, Frame, Play } from "lucide-react";
import OpenModalButton from "@/components/ui/OpenModalButton";
import type { FigmaDesign } from "@/lib/figmaDesigns";
import FigmaPreviewModal from "./FigmaPreviewModal";

const statusStyles: Record<FigmaDesign["status"], string> = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-100",
    sold: "bg-slate-100 text-brand-muted border-slate-200",
    concept: "bg-amber-50 text-amber-700 border-amber-100",
};

interface FigmaCardProps {
    design: FigmaDesign;
    priority?: boolean;
}

export default function FigmaCard({ design, priority = false }: FigmaCardProps) {
    const [open, setOpen] = useState(false);
    const stats = [
        design.frames ? { icon: Frame, label: `${design.frames} frames` } : null,
        design.components ? { icon: Component, label: `${design.components} components` } : null,
    ].filter(Boolean) as Array<{ icon: typeof Frame; label: string }>;

    return (
        <article className="group relative flex flex-col h-full rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1.5 transition-all duration-300">
            <div className="p-3 pb-0">
                {/* Canvas frame rather than browser chrome — this is a design file,
                    not a running site. */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100">
                        <span className="inline-flex items-center gap-1.5 text-[10px] 2xl:text-xs font-bold text-brand-dark">
                            <Frame className="w-3 h-3 text-brand-primary" />
                            Figma
                        </span>
                        <span className="text-[10px] 2xl:text-xs text-brand-muted truncate">
                            {design.name}
                        </span>
                    </div>

                    <div className="relative w-full aspect-[1440/682] bg-slate-50">
                        {design.preview ? (
                            <Image
                                src={design.preview}
                                alt={`${design.name} design preview`}
                                fill
                                priority={priority}
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div
                                className={`absolute inset-0 bg-linear-to-br ${design.accent} flex flex-col items-center justify-center gap-2 p-6 text-center`}
                            >
                                <span className="text-white/90 text-2xl md:text-3xl font-extrabold tracking-tight">
                                    {design.name}
                                </span>
                                <span className="text-white/70 text-[11px] 2xl:text-xs uppercase tracking-widest font-semibold">
                                    {design.category}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 flex-1 p-5 pt-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold text-brand-dark leading-snug truncate">
                            {design.name}
                        </h3>
                        <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide mt-0.5">
                            {design.category}
                        </p>
                    </div>
                    <span
                        className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusStyles[design.status]}`}
                    >
                        {design.statusLabel}
                    </span>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">{design.tagline}</p>

                {stats.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        {stats.map(({ icon: Icon, label }) => (
                            <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark">
                                <Icon className="w-3.5 h-3.5 text-brand-primary" />
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                <ul className="flex flex-col gap-2 pt-1">
                    {design.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                            <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-brand-primary" />
                            </span>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                    <OpenModalButton
                        variant="primary"
                        size="sm"
                        className="flex-1 rounded-xl font-bold"
                        config={{
                            source: `figma:${design.slug}`,
                            formTitle: `Liked ${design.name}?`,
                            formDescription:
                                "Tell us what you need and we will adapt this design — or build it into a live site.",
                        }}
                    >
                        Liked it? Need similar
                    </OpenModalButton>

                    {design.figmaUrl && (
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            aria-haspopup="dialog"
                            aria-label={`Open the ${design.name} prototype`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-brand-dark border border-slate-200 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-colors cursor-pointer"
                        >
                            <Play className="w-3.5 h-3.5" />
                            Prototype
                        </button>
                    )}
                </div>
            </div>

            {open && <FigmaPreviewModal design={design} onClose={() => setOpen(false)} />}
        </article>
    );
}
