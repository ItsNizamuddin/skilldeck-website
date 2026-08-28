"use client";

import { BarChart3, X, ChevronUp, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCompare } from "./CompareContext";

function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function formatPrice(n: number) {
    return n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : `${n}`;
}

export function CompareDrawer() {
    const ctx = useCompare();
    const router = useRouter();
    const [open, setOpen] = useState(true);

    if (!ctx || ctx.compareList.length === 0) return null;

    const { compareList, removeFromCompare, clearCompare } = ctx;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Header toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                >
                    <span className="flex items-center gap-2 font-semibold">
                        <BarChart3 className="w-4 h-4" />
                        Compare Schedules
                        <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">{compareList.length}/4</span>
                    </span>
                    <ChevronUp className={`w-4 h-4 transition-transform ${open ? "" : "rotate-180"}`} />
                </button>

                {open && (
                    <div className="p-4">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                            {compareList.map(s => (
                                <div key={s.id} className="flex-shrink-0 w-44 bg-slate-50 rounded-xl border border-slate-200 p-3 relative group">
                                    <button
                                        onClick={() => removeFromCompare(s.id)}
                                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                    <p className="font-semibold text-sm text-slate-800 line-clamp-2 mb-1">{s.course.title}</p>
                                    <p className="text-xs text-slate-500 mb-2">{s.company.name}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-indigo-600">
                                            {s.pricing?.[0]?.currency?.symbol || "₹"}
                                            {formatPrice(s.pricing?.[0]?.comparedPrice || s.pricing?.[0]?.price || 0)}
                                        </span>
                                        <span className="text-xs text-slate-400">{formatDate(s.startsAt)}</span>
                                    </div>
                                </div>
                            ))}
                            {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                                <div key={i} className="flex-shrink-0 w-44 h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                                    <span className="text-xs text-slate-400">Add schedule</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                            <button onClick={() => clearCompare()} className="text-sm text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                                <Trash2 className="w-4 h-4" /> Clear all
                            </button>
                            <button
                                onClick={() => router.push("/compare")}
                                disabled={compareList.length < 2}
                                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                            >
                                Compare ({compareList.length})
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
