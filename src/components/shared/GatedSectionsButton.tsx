"use client";

import { ChevronDown, Loader2, RotateCw } from "lucide-react";

/**
 * The affordance in front of gesture-gated sections.
 *
 * Pointer users normally trip the gate before they ever see this; it exists so
 * keyboard and screen-reader users have an explicit way in, and so a failed
 * fetch leaves something to retry rather than a hole in the page.
 */

type GateState = "idle" | "loading" | "failed";

interface GatedSectionsButtonProps {
    state: GateState;
    onActivate: () => void;
    /** What is being revealed, e.g. "course" or "service". */
    noun?: string;
    /** Names the subject for screen readers, e.g. the course or service title. */
    label?: string;
}

export default function GatedSectionsButton({
    state,
    onActivate,
    noun = "course",
    label,
}: GatedSectionsButtonProps) {
    const loading = state === "loading";

    const copy: Record<GateState, string> = {
        idle: `Show full ${noun} details`,
        loading: `Loading ${noun} details...`,
        failed: `Couldn't load ${noun} details — retry`,
    };

    return (
        <div className="container mx-auto max-w-6xl px-4 lg:px-0 py-10">
            <button
                type="button"
                onClick={loading ? undefined : onActivate}
                // aria-disabled rather than disabled: a disabled button drops out
                // of the tab order, so a keyboard user who just activated it loses
                // focus mid-load.
                aria-disabled={loading}
                aria-busy={loading}
                aria-label={label ? `Show full ${label} ${noun} details` : undefined}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200/60 bg-white px-6 py-5 font-semibold text-purple-600 shadow-sm transition-colors hover:border-purple-500 aria-disabled:cursor-progress"
            >
                {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {state === "failed" && <RotateCw className="h-4 w-4" />}
                {copy[state]}
                {state === "idle" && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                )}
            </button>
        </div>
    );
}
