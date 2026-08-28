"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Schedule } from "@/types/schedules";

const MAX_COMPARE = 4;
const STORAGE_KEY = "skilldeck:compare";

/** /compare re-fetches the full payload by course slug, so only ids are stored. */
function persist(list: Schedule[]) {
    if (typeof window === "undefined") return;
    try {
        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(list.map((s) => ({ id: s.id, slug: s.course?.slug })))
        );
    } catch {
        /* storage disabled — comparison just will not survive navigation */
    }
}

interface CompareContextType {
    compareList: Schedule[];
    addToCompare: (schedule: Schedule) => void;
    removeFromCompare: (id: string) => void;
    clearCompare: () => void;
    isInCompare: (id: string) => boolean;
    canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function useCompare() {
    return useContext(CompareContext);
}

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<Schedule[]>([]);

    const addToCompare = (s: Schedule) => {
        if (compareList.length < MAX_COMPARE && !compareList.find(x => x.id === s.id)) {
            const next = [...compareList, s];
            persist(next);
            setCompareList(next);
        }
    };
    const removeFromCompare = (id: string) => {
        const next = compareList.filter(s => s.id !== id);
        persist(next);
        setCompareList(next);
    };
    const clearCompare = () => {
        persist([]);
        setCompareList([]);
    };
    const isInCompare = (id: string) => compareList.some(s => s.id === id);

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare, canAddMore: compareList.length < MAX_COMPARE }}>
            {children}
        </CompareContext.Provider>
    );
}
