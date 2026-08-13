"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("search") || "");
    const [isPending, startTransition] = useTransition();
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync input value with external query param updates (e.g., back navigation or reset)
    useEffect(() => {
        const currentParam = searchParams.get("search") || "";
        if (query !== currentParam) {
            setQuery(currentParam);
        }
    }, [searchParams]);

    // Keyboard shortcut / listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && document.activeElement !== inputRef.current) {
                const target = e.target as HTMLElement;
                if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
                    return;
                }
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Debounced URL updates
    useEffect(() => {
        const currentParam = searchParams.get("search") || "";
        // Only trigger router push if query differs from url query param
        if (query === currentParam) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) {
                params.set("search", query);
            } else {
                params.delete("search");
            }
            params.set("page", "1");

            startTransition(() => {
                router.push(`/companies?${params.toString()}#all-providers`, { scroll: false });
            });
        }, 500); // 500ms debounce delay

        return () => clearTimeout(timer);
    }, [query, router, searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className="relative max-w-2xl mx-auto w-full group mt-6">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin text-brand-primary" />
                ) : (
                    <Search className="w-5 h-5 transition-colors group-focus-within:text-brand-primary" />
                )}
            </div>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search institutes, cities or specialisms"
                className="w-full h-12 pl-12 pr-12 bg-white border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary rounded-full text-slate-800 placeholder-slate-400 text-sm shadow-sm transition-all outline-none"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200/80 rounded shadow-sm">
                    /
                </kbd>
            </div>
        </div>
    );
}
