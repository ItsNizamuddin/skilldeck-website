"use client";

import { useCallback, useEffect, useState } from "react";

// Input events only. Deliberately excludes "scroll": Googlebot renders at a very
// tall viewport and can trigger scroll and IntersectionObserver, but it does not
// generate pointer, keyboard, wheel or touch input.
const GESTURE_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

/**
 * Opens on the visitor's first real interaction with the page, and stays open.
 *
 * Used by the city and pattern pages to hold back the shared course and service
 * bodies — content that is already indexed on its canonical page and would
 * otherwise repeat verbatim across hundreds of URLs. The same HTML and the same
 * JS go to every requester; only the visitor's own input opens the gate. Pairing
 * this with user-agent detection would turn it into cloaking, so don't.
 */
export function useGestureGate() {
    const [open, setOpen] = useState(false);

    const openGate = useCallback(() => setOpen(true), []);

    useEffect(() => {
        if (open) return;

        GESTURE_EVENTS.forEach((event) =>
            window.addEventListener(event, openGate, { once: true, passive: true })
        );

        return () => {
            GESTURE_EVENTS.forEach((event) => window.removeEventListener(event, openGate));
        };
    }, [open, openGate]);

    return { open, openGate };
}

export default useGestureGate;
