"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { ServiceMedia } from "./types";
import { isVideoUrl, resolveMediaAlt, resolveMediaUrl } from "./richText";

interface ServiceMediaFrameProps {
    media?: string | ServiceMedia;
    fallbackLabel?: string;
}

/** Keep wildly off-square sources from blowing out the column height. */
const MIN_ASPECT = 0.5; // taller than 1:2 gets letterboxed
const MAX_ASPECT = 2;   // wider than 2:1 gets letterboxed

/** Start fetching this far before the frame reaches the viewport. */
const PRELOAD_MARGIN = "400px 0px";
/** How much of the frame must be on screen before playback starts. */
const PLAY_THRESHOLD = 0.35;

function clampAspect(width: number, height: number): number | null {
    if (!width || !height) return null;
    return Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, width / height));
}

/**
 * Media companion for a service section (approach timeline, strategy, …).
 *
 * - The CMS ships both portrait (9:16) and landscape (16:9) assets, so the frame
 *   measures the source's intrinsic aspect on load and matches it.
 * - Video bytes are only fetched once the frame nears the viewport, and playback
 *   is tied to visibility so an offscreen clip never burns CPU or bandwidth.
 */
export default function ServiceMediaFrame({ media, fallbackLabel = "Media" }: ServiceMediaFrameProps) {
    const [failed, setFailed] = useState(false);
    const [aspect, setAspect] = useState<number | null>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [inView, setInView] = useState(false);

    const frameRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    /** Set while we pause programmatically, so an auto-pause is not mistaken for a user pause. */
    const selfPausingRef = useRef(false);
    /** Once the viewer pauses by hand, stop resuming on scroll. */
    const userPausedRef = useRef(false);

    const url = resolveMediaUrl(media);
    const alt = resolveMediaAlt(media) || fallbackLabel;
    const isVideo = isVideoUrl(url);
    const show = Boolean(url) && !failed;

    // Fetch only when the frame is close to the viewport.
    useEffect(() => {
        const el = frameRef.current;
        if (!el || !isVideo || shouldLoad) return;

        // No observer support: load on the next tick rather than never.
        if (typeof IntersectionObserver === "undefined") {
            const timer = setTimeout(() => setShouldLoad(true), 0);
            return () => clearTimeout(timer);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: PRELOAD_MARGIN }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [isVideo, shouldLoad]);

    // Track whether enough of the frame is actually on screen to warrant playback.
    useEffect(() => {
        const el = frameRef.current;
        if (!el || !isVideo) return;

        if (typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setInView(entry.isIntersecting && entry.intersectionRatio >= PLAY_THRESHOLD);
            },
            { threshold: [0, PLAY_THRESHOLD, 1] }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [isVideo]);

    // Drive playback from visibility, honouring a reduced-motion preference.
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !shouldLoad) return;

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (inView && !userPausedRef.current && !prefersReducedMotion) {
            video.play().catch(() => {
                /* Autoplay can be refused; the controls remain available. */
            });
        } else if (!inView && !video.paused) {
            selfPausingRef.current = true;
            video.pause();
        }
    }, [inView, shouldLoad]);

    if (!url) return null;

    return (
        <div
            ref={frameRef}
            className={`relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm ${aspect ? "" : "aspect-[4/5]"
                }`}
            style={aspect ? { aspectRatio: aspect } : undefined}
        >
            {show && isVideo ? (
                <video
                    ref={videoRef}
                    src={shouldLoad ? url : undefined}
                    aria-label={alt}
                    className="w-full h-full object-contain"
                    muted
                    loop
                    playsInline
                    controls
                    preload={shouldLoad ? "metadata" : "none"}
                    onLoadedMetadata={(e) =>
                        setAspect(clampAspect(e.currentTarget.videoWidth, e.currentTarget.videoHeight))
                    }
                    onPlay={() => {
                        userPausedRef.current = false;
                    }}
                    onPause={() => {
                        if (selfPausingRef.current) {
                            selfPausingRef.current = false;
                        } else {
                            userPausedRef.current = true;
                        }
                    }}
                    onError={() => setFailed(true)}
                />
            ) : show ? (
                <Image
                    src={url}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 38vw"
                    className="object-contain"
                    onLoad={(e) =>
                        setAspect(clampAspect(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight))
                    }
                    onError={() => setFailed(true)}
                />
            ) : (
                <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/80"
                    style={{ background: "var(--gradient-brand)" }}
                >
                    <ImageOff className="w-8 h-8" strokeWidth={1.5} />
                    <span className="text-xs font-semibold uppercase tracking-widest">{fallbackLabel}</span>
                </div>
            )}
        </div>
    );
}
