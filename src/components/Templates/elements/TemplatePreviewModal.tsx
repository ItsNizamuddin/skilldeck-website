"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowUpRight,
    ExternalLink,
    Laptop,
    Lock,
    Smartphone,
    Tablet,
    X,
} from "lucide-react";
import OpenModalButton from "@/components/ui/OpenModalButton";
import type { WebsiteTemplate } from "@/lib/templates";

type Device = "desktop" | "tablet" | "mobile";

/** CSS width the site is rendered at, before the frame is scaled to fit. */
const deviceWidths: Record<Device, number> = {
    desktop: 1280,
    tablet: 834,
    mobile: 390,
};

const devices: Array<{ id: Device; label: string; icon: typeof Laptop }> = [
    { id: "desktop", label: "Desktop", icon: Laptop },
    { id: "tablet", label: "Tablet", icon: Tablet },
    { id: "mobile", label: "Mobile", icon: Smartphone },
];

/** A site that never loads inside the frame is worse than no frame at all. */
const EMBED_TIMEOUT_MS = 8000;

/**
 * Open in the device the viewer is actually on: a desktop-width frame squeezed
 * into a phone renders the site at an unreadable scale.
 */
function deviceForViewport(): Device {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < 768) return "mobile";
    if (window.innerWidth < 1024) return "tablet";
    return "desktop";
}

interface TemplatePreviewModalProps {
    template: WebsiteTemplate;
    onClose: () => void;
}

export default function TemplatePreviewModal({ template, onClose }: TemplatePreviewModalProps) {
    const [device, setDevice] = useState<Device>(deviceForViewport);
    // Frame box, so a device wider than the modal is scaled down instead of
    // being clipped — a 390px phone frame did not fit a 360px phone screen.
    const viewportRef = useRef<HTMLDivElement>(null);
    const [box, setBox] = useState({ width: 0, height: 0 });
    const [loaded, setLoaded] = useState(false);
    // Some sites send X-Frame-Options / frame-ancestors and refuse to render in
    // the iframe. The flag is set in the catalogue where we already know, and a
    // timeout catches the ones that start refusing later.
    const [blocked, setBlocked] = useState(template.embeddable === false);

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
        if (blocked || loaded) return;
        const timer = setTimeout(() => setBlocked(true), EMBED_TIMEOUT_MS);
        return () => clearTimeout(timer);
    }, [blocked, loaded]);

    useEffect(() => {
        const element = viewportRef.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setBox({ width, height });
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // A desktop frame on a wide screen renders at the real width; everything
    // else renders at the device width and is scaled down to fit.
    const renderWidth =
        device === "desktop" && box.width >= deviceWidths.desktop ? box.width : deviceWidths[device];
    const scale = box.width ? Math.min(1, box.width / renderWidth) : 1;

    // The modal only mounts from a click, so the portal target always exists in
    // the browser; the guard is here for the server pass.
    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${template.name} preview`}
            className="fixed inset-0 z-[100] flex flex-col bg-slate-900/80 backdrop-blur-sm p-0 md:p-4"
            onClick={onClose}
        >
            <div
                className="flex flex-col w-full h-full max-w-[1600px] mx-auto rounded-none md:rounded-2xl overflow-hidden bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Toolbar */}
                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 border-b border-slate-100 bg-white">
                    <span className="hidden sm:block shrink-0 text-sm font-bold text-brand-dark truncate max-w-[14rem]">
                        {template.name}
                    </span>

                    <span className="hidden sm:flex items-center gap-1.5 flex-1 min-w-0 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                        <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="text-[11px] 2xl:text-xs text-brand-muted truncate">
                            {template.displayUrl}
                        </span>
                    </span>

                    <div className="flex items-center gap-1 p-1 rounded-full bg-slate-50 border border-slate-100">
                        {devices.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setDevice(id)}
                                aria-label={`${label} preview`}
                                aria-pressed={device === id}
                                className={`p-1.5 rounded-full transition-colors cursor-pointer ${device === id
                                    ? "bg-white text-brand-primary shadow-sm"
                                    : "text-brand-muted hover:text-brand-dark"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    <Link
                        href={template.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="shrink-0 ml-auto sm:ml-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-dark border border-slate-200 hover:border-brand-primary hover:text-brand-primary transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Open site</span>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close preview"
                        className="shrink-0 p-1.5 rounded-full text-brand-muted hover:text-brand-dark hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Viewport */}
                <div
                    ref={viewportRef}
                    className="relative flex-1 min-h-0 bg-slate-100 flex justify-center overflow-hidden"
                >
                    {blocked ? (
                        <div className="w-full h-full overflow-y-auto flex flex-col items-center gap-4 p-4 md:p-8">
                            {template.preview && (
                                <Image
                                    src={template.preview}
                                    alt={`${template.name} screenshot`}
                                    width={1440}
                                    height={900}
                                    className="w-full max-w-5xl rounded-xl border border-slate-200 shadow-sm bg-white"
                                />
                            )}
                            <div className="text-center flex flex-col items-center gap-2 pb-4">
                                <p className="body-small max-w-md">
                                    This site blocks embedded previews, so here is the screenshot.
                                    Open the live site for the full experience.
                                </p>
                                <Link
                                    href={template.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
                                >
                                    Open {template.displayUrl}
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {!loaded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-100">
                                    <span className="w-8 h-8 rounded-full border-2 border-brand-primary border-r-transparent animate-spin" />
                                    <span className="body-extrasmall">Loading {template.displayUrl}…</span>
                                </div>
                            )}
                            {/* A site that blocks framing still fires `load` on its
                                error document, so `blocked` cannot be detected
                                reliably — this link is always available instead. */}
                            {loaded && (
                                <Link
                                    href={template.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 text-white text-[11px] font-semibold backdrop-blur-sm hover:bg-slate-900 transition-colors"
                                >
                                    Not loading? Open the live site
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                            <div
                                className="shrink-0 overflow-hidden"
                                style={{ width: renderWidth * scale, height: box.height }}
                            >
                                <iframe
                                    src={template.demoUrl}
                                    title={`${template.name} live preview`}
                                    loading="lazy"
                                    onLoad={() => setLoaded(true)}
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    style={{
                                        width: renderWidth,
                                        height: box.height ? box.height / scale : "100%",
                                        transform: `scale(${scale})`,
                                        transformOrigin: "top left",
                                    }}
                                    className="bg-white border-0"
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Footer CTA */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-3 md:px-4 py-3 border-t border-slate-100 bg-white">
                    <p className="hidden sm:block body-extrasmall max-w-xl">{template.tagline}</p>
                    <OpenModalButton
                        variant="primary"
                        size="sm"
                        className="w-full sm:w-auto rounded-full"
                        onClick={onClose}
                        config={{
                            source: `templates:preview:${template.slug}`,
                            formTitle: `Liked ${template.name}?`,
                            formDescription:
                                "Tell us what you need and we will build you a site along these lines.",
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
