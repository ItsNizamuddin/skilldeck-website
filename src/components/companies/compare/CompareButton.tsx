"use client";
import { BarChart3 } from "lucide-react";
import { useCompare } from "./CompareContext";
import { Schedule } from "@/types/schedules";

interface Props { schedule: Schedule }

export function CompareButton({ schedule }: Props) {
    const ctx = useCompare();
    if (!ctx) return null;

    const { addToCompare, removeFromCompare, isInCompare, canAddMore } = ctx;
    const inCompare = isInCompare(schedule.id);

    return (
        <button
            onClick={e => { e.stopPropagation(); inCompare ? removeFromCompare(schedule.id) : canAddMore && addToCompare(schedule); }}
            disabled={!inCompare && !canAddMore}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border ${
                inCompare
                    ? "text-indigo-700 bg-indigo-50 border-indigo-200"
                    : "text-white bg-gradient-to-r from-indigo-600 to-violet-600 border-transparent shadow"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
            <BarChart3 className="w-3.5 h-3.5" />
            {inCompare ? "Added" : "Compare"}
        </button>
    );
}
