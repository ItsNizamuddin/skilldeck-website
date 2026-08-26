"use client";

import { useEffect, useState } from "react";

export interface Ui2ChapterItem {
    id: string;
    label: string;
}

interface Ui2ChapterDotsProps {
    items: Ui2ChapterItem[];
}

/** Vertical dot rail on the right edge — demo-ui-2's own wayfinding signature, distinct from a nav bar or dock. */
export default function Ui2ChapterDots({ items }: Ui2ChapterDotsProps) {
    const [active, setActive] = useState(items[0]?.id || "");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
            const offset = 200;
            let current = items[0]?.id || "";
            for (const item of items) {
                const el = document.getElementById(item.id);
                if (el && el.getBoundingClientRect().top <= offset) current = item.id;
            }
            setActive(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    if (items.length === 0) return null;

    return (
        <div
            className={`hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3.5 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            {items.map((item) => {
                const isActive = active === item.id;
                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className="group flex items-center gap-2.5"
                        aria-label={item.label}
                    >
                        <span
                            className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${isActive ? "opacity-100 text-brand-dark" : "opacity-0 -translate-x-2 text-brand-muted group-hover:opacity-100 group-hover:translate-x-0"
                                }`}
                        >
                            {item.label}
                        </span>
                        <span
                            className={`rounded-full transition-all duration-300 shrink-0 ${isActive ? "w-2.5 h-2.5 bg-brand-secondary" : "w-1.5 h-1.5 bg-slate-300 group-hover:bg-brand-primary/50"
                                }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}
