"use client";

import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-muted hover:text-brand-primary hover:border-brand-primary/40 transition-colors shadow-sm cursor-pointer"
        >
            <ArrowUp className="w-4 h-4" />
        </button>
    );
}
