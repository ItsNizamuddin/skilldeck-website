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
            className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors shadow-lg cursor-pointer"
        >
            <ArrowUp className="w-4 h-4" />
        </button>
    );
}
