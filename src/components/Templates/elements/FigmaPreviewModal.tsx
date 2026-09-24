"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import OpenModalButton from "@/components/ui/OpenModalButton";
import { figmaEmbedUrl, type FigmaDesign } from "@/lib/figmaDesigns";

interface FigmaPreviewModalProps {
    design: FigmaDesign;
    onClose: () => void;
}

/** A private or unshared prototype never loads; stop pretending it will. */
const EMBED_TIMEOUT_MS = 12000;

export default function FigmaPreviewModal({ design, onClose }: FigmaPreviewModalProps) {
    const [loaded, setLoaded] = useState(false);
    const [timedOut, setTimedOut] = useState(false);

    // Escape to close, and keep the page behind the overlay from scrolling.
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    useEffect(() => {
        if (loaded) return;
        const timer = setTimeout(() => setTimedOut(true), EMBED_TIMEOUT_MS);
        return () => clearTimeout(timer);
    }, [loaded]);

    if (typeof document === "undefined" || !design.figmaUrl) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${design.name} Figma prototype`}
            className="fixed inset-0 z-[100] flex flex-col bg-slate-900/80 backdrop-blur-sm p-0 md:p-4"
            onClick={onClose}
        >
            <div
                className="flex flex-col w-full h-full max-w-[1600px] mx-auto rounded-none md:rounded-2xl overflow-hidden bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 border-b border-slate-100 bg-white">
                    <span className="shrink-0 text-sm font-bold text-brand-dark truncate max-w-[10rem] md:max-w-none">
                        {design.name}
                    </span>
                    <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-brand-muted">
                        Figma prototype
                    </span>

                    <Link
                        href={design.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="shrink-0 ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-dark border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Open in Figma</span>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close prototype"
                        className="shrink-0 p-1.5 rounded-full text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="relative flex-1 min-h-0 bg-slate-100">
                    {!loaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100 p-6 text-center">
                            {timedOut ? (
                                <>
                                    <p className="body-small max-w-sm">
                                        The prototype is not loading here — it may not be shared
                                        publicly.
                                    </p>
                                    <Link
                                        href={design.figmaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                                    >
                                        Open it in Figma
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <span className="w-8 h-8 rounded-full border-2 border-brand-primary border-r-transparent animate-spin" />
                                    <span className="body-extrasmall">Loading the prototype…</span>
                                </>
                            )}
                        </div>
                    )}
                    <iframe
                        src={figmaEmbedUrl(design.figmaUrl)}
                        title={`${design.name} Figma prototype`}
                        onLoad={() => setLoaded(true)}
                        allowFullScreen
                        className="w-full h-full border-0 bg-slate-100"
                    />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 px-3 md:px-4 py-3 border-t border-slate-100 bg-white">
                    <p className="hidden sm:block body-extrasmall max-w-xl">{design.tagline}</p>
                    <OpenModalButton
                        variant="primary"
                        size="sm"
                        className="w-full sm:w-auto rounded-xl font-bold"
                        onClick={onClose}
                        config={{
                            source: `figma:preview:${design.slug}`,
                            formTitle: `Liked ${design.name}?`,
                            formDescription:
                                "Tell us what you need and we will adapt this design — or build it into a live site.",
                        }}
                    >
                        Liked it? Need similar
                    </OpenModalButton>
                </div>
            </div>
        </div>,
        document.body
    );
}
