"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Schedule } from "@/types/schedules";

const MAX_COMPARE = 4;

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
            setCompareList([...compareList, s]);
        }
    };
    const removeFromCompare = (id: string) => setCompareList(compareList.filter(s => s.id !== id));
    const clearCompare = () => setCompareList([]);
    const isInCompare = (id: string) => compareList.some(s => s.id === id);

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare, canAddMore: compareList.length < MAX_COMPARE }}>
            {children}
        </CompareContext.Provider>
    );
}
