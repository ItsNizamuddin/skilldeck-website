"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";

/** One selectable option — an institute or a schedule. */
export interface PickerItem {
    key: string;
    title: string;
    subtitle: string;
    logo?: string;
    group: "Institutes" | "Schedules";
}

interface ComparePickerModalProps {
    items: PickerItem[];
    /** What is being added, e.g. "an institute". Used in copy and labels. */
    noun?: string;
    onPick: (key: string) => void;
    onClose: () => void;
}

const GROUP_ORDER: PickerItem["group"][] = ["Institutes", "Schedules"];

/**
 * Shared add-to-comparison dialog. Owns its own search state so callers only
 * have to supply the full candidate list.
 */
export default function ComparePickerModal({
    items,
    noun = "an option",
    onPick,
    onClose,
}: ComparePickerModalProps) {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Lock background scroll while the dialog is open.
    useEffect(() => {
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter((i) => `${i.title} ${i.subtitle}`.toLowerCase().includes(q));
    }, [items, query]);

    const showGroupHeadings = new Set(items.map((i) => i.group)).size > 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={`Add ${noun} to comparison`}
                className="relative w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            >
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-sm font-bold text-brand-dark">Add {noun}</h2>
                        <p className="text-xs text-slate-500">Pick what to add to the comparison.</p>
                    </div>
                    <button type="button" onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-5 py-3 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-primary"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {filtered.length === 0 ? (
                        <p className="text-center text-xs text-slate-400 py-10">Nothing left to add.</p>
                    ) : (
                        GROUP_ORDER.map((groupName) => {
                            const groupItems = filtered.filter((i) => i.group === groupName);
                            if (groupItems.length === 0) return null;
                            return (
                                <div key={groupName} className="mb-2">
                                    {showGroupHeadings && (
                                        <p className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            {groupName}
                                        </p>
                                    )}
                                    {groupItems.map((item) => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            onClick={() => onPick(item.key)}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <span className="relative w-8 h-8 shrink-0">
                                                {item.logo ? (
                                                    <Image src={item.logo} alt={item.title} fill sizes="32px" className="object-contain" />
                                                ) : (
                                                    <span className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-xs font-black text-purple-600">
                                                        {item.title.charAt(0)}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-semibold text-slate-800 truncate">{item.title}</span>
                                                {item.subtitle && (
                                                    <span className="block text-[11px] text-slate-400 truncate">{item.subtitle}</span>
                                                )}
                                            </span>
                                            <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
