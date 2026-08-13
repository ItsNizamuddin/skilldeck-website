"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { useIpLocation } from "@/hooks/useIpLocation";
import { getSchedules } from "@/lib/platformService";

interface SchedulesState {
    schedules: any[] | null;
    tenants: any[] | null;
    loading: boolean;
    error: string | null;
    timezone?: string;
    currency?: string;
}

interface SchedulesContextType {
    results: Record<string, SchedulesState>;
    locationData: any | null;
    locationLoading: boolean;
    fetchForSlug: (slug: string) => Promise<void>;
    defaultSlug?: string;
}

const SchedulesContext = createContext<SchedulesContextType | undefined>(undefined);

export function SchedulesProvider({ slug: defaultSlug, children }: { slug?: string; children: ReactNode }) {
    const [results, setResults] = useState<Record<string, SchedulesState>>({});
    const fetchingRef = useRef<Set<string>>(new Set());
    const fetchedQueriesRef = useRef<Record<string, { timezone: string; currency: string }>>({});
    const { data: locationData, loading: locationLoading } = useIpLocation();

    const fetchForSlug = useCallback(async (slug: string) => {
        if (!slug) return;
        
        let timezone = "Asia/Kolkata";
        let currency = "INR";
        if (typeof window !== "undefined") {
            timezone = sessionStorage.getItem("timezone") || locationData?.timezone || "Asia/Kolkata";
            currency = sessionStorage.getItem("currency") || locationData?.currency || "INR";
        } else {
            timezone = locationData?.timezone || "Asia/Kolkata";
            currency = locationData?.currency || "INR";
        }

        // Check if we already have this exact query fetched successfully
        const cached = fetchedQueriesRef.current[slug];
        if (cached && cached.timezone === timezone && cached.currency === currency) {
            return;
        }

        const queryKey = `${slug}-${timezone}-${currency}`;
        if (fetchingRef.current.has(queryKey)) return;
        fetchingRef.current.add(queryKey);

        try {
            setResults(prev => ({
                ...prev,
                [slug]: { 
                    ...(prev[slug] || {}), 
                    loading: true, 
                    error: null, 
                    schedules: prev[slug]?.schedules || null, 
                    tenants: prev[slug]?.tenants || null 
                }
            }));

            let pageUrl: string | undefined = undefined;
            if (typeof window !== "undefined") {
                pageUrl = window.location.origin + window.location.pathname;
            }


            const schedulesRes = await getSchedules({
                slug,
                timezone,
                currency,
                limit: 100
            }, pageUrl);

            setResults(prev => ({
                ...prev,
                [slug]: {
                    schedules: schedulesRes.data || [],
                    tenants: schedulesRes.tenants || [],
                    loading: false,
                    error: null,
                    timezone,
                    currency
                }
            }));

            // Mark query cache successful
            fetchedQueriesRef.current[slug] = { timezone, currency };
        } catch (err: any) {
            console.error(`Error fetching schedules for ${slug}:`, err);
            setResults(prev => ({
                ...prev,
                [slug]: {
                    schedules: [],
                    tenants: [],
                    loading: false,
                    error: err.message || "Failed to load schedules"
                }
            }));
        } finally {
            fetchingRef.current.delete(queryKey);
        }
    }, [locationData?.timezone, locationData?.currency]);

    useEffect(() => {
        if (!defaultSlug) return;
        // Defer the initial fetch until the browser is idle to reduce TBT
        const run = () => fetchForSlug(defaultSlug);
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as any).requestIdleCallback(run, { timeout: 2000 });
        } else {
            setTimeout(run, 0);
        }
    }, [defaultSlug, fetchForSlug]);

    return (
        <SchedulesContext.Provider value={{
            results,
            locationData,
            locationLoading,
            fetchForSlug,
            defaultSlug
        }}>
            {children}
        </SchedulesContext.Provider>
    );
}

export function useSchedules(slug?: string) {
    const context = useContext(SchedulesContext);
    if (context === undefined) {
        throw new Error("useSchedules must be used within a SchedulesProvider");
    }

    const targetSlug = slug || context.defaultSlug;

    useEffect(() => {
        if (targetSlug) {
            context.fetchForSlug(targetSlug);
        }
    }, [targetSlug, context.fetchForSlug]);

    const result = (targetSlug && context.results[targetSlug]) || {
        schedules: null,
        tenants: null,
        loading: true,
        error: null
    };

    return {
        ...result,
        locationData: context.locationData,
        locationLoading: context.locationLoading
    };
}
