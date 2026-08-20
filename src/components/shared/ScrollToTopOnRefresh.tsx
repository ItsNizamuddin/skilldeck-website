"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRefresh() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if ("scrollRestoration" in history) {
                history.scrollRestoration = "manual";
            }

            // Smooth scroll to top if there is no anchor hash in the URL
            if (!window.location.hash) {
                const timer = setTimeout(() => {
                    if (window.scrollY > 0) {
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }
                }, 80);

                return () => clearTimeout(timer);
            }
        }
    }, [pathname]);

    return null;
}
