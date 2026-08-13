"use client";

import { Calendar, ChevronDown, ChevronUp, Clock, RotateCcw, SlidersHorizontal, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DELIVERY = ["All", "classroom", "online", "blended"];
const BATCH = ["All", "weekend", "weekday", "daily"];
const TIMINGS = ["All", "earlymorning", "morning", "afternoon", "evening"];

interface Props {
    searchParams: Record<string, string | undefined>;
}

function buildUrl(current: Record<string, string | undefined>, overrides: Record<string, string | undefined>) {
    const merged = { ...current, page: "1", ...overrides };
    const out = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) {
        if (v && v !== "undefined") out.set(k, v);
    }
    return `/companies/schedules?${out}`;
}

export default function SchedulesFilterBar({ searchParams: sp }: Props) {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(true); // Collapsed by default on mobile

    const set = (key: string, val: string) => {
        router.push(buildUrl(sp, { [key]: val === "All" ? undefined : val }));
    };

    const clear = () =>
        router.push(buildUrl(sp, { deliveryType: undefined, batchType: undefined, timings: undefined, month: undefined, year: undefined }));

    const monthYearValue = sp.year && sp.month ? `${sp.year}-${String(sp.month).padStart(2, "0")}` : "";
    const hasFilters = !!(sp.deliveryType || sp.batchType || sp.timings || sp.month);

    const filterBtn = (active: boolean) =>
        `px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${active
            ? "bg-indigo-600 text-white shadow shadow-indigo-600/10 border border-transparent"
            : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-white"
        }`;

    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3 md:p-6 shadow-sm sticky top-24 self-start">
            {/* Header / Mobile Toggle */}
            <div className="flex items-center justify-between pb-0 lg:pb-4 lg:border-b lg:border-slate-100">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-2 text-sm font-extrabold text-slate-800 uppercase tracking-wider focus:outline-none lg:pointer-events-none cursor-pointer"
                >
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                    Filters
                    {hasFilters && (
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 normal-case tracking-normal">
                            Active
                        </span>
                    )}
                </button>

                <div className="flex items-center gap-3">
                    {hasFilters && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clear();
                            }}
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-3 h-3" /> Clear
                        </button>
                    )}

                    {/* Mobile arrow indicator */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="lg:hidden p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                        aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
                    >
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Collapsible Content */}
            <div className={`${isCollapsed ? "hidden" : "block"} lg:block space-y-6 pt-4 lg:pt-4 lg:mt-0 border-t border-slate-100 lg:border-none mt-4 lg:mt-0`}>
                {/* Delivery mode */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Video className="w-3.5 h-3.5" /> Delivery Mode
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                        {DELIVERY.map(d => (
                            <button
                                key={d}
                                onClick={() => set("deliveryType", d)}
                                className={filterBtn(sp.deliveryType === d || (!sp.deliveryType && d === "All"))}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Batch type */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" /> Batch Type
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                        {BATCH.map(b => (
                            <button
                                key={b}
                                onClick={() => set("batchType", b)}
                                className={filterBtn(sp.batchType === b || (!sp.batchType && b === "All"))}
                            >
                                {b}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timings */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5" /> Timing
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                        {TIMINGS.map(t => (
                            <button
                                key={t}
                                onClick={() => set("timings", t)}
                                className={filterBtn(sp.timings === t || (!sp.timings && t === "All"))}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Month Picker */}
                <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" /> Start Month
                    </label>
                    <input
                        type="month"
                        value={monthYearValue}
                        onChange={e => {
                            if (!e.target.value) {
                                router.push(buildUrl(sp, { month: undefined, year: undefined }));
                                return;
                            }
                            const [y, m] = e.target.value.split("-");
                            router.push(buildUrl(sp, { year: y, month: String(parseInt(m)) }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
}
