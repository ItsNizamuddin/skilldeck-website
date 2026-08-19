"use client";

import { useSchedules } from "@/context/SchedulesContext";
import { getCurrencySymbol } from "@/lib/courseCardHelpers";
import { mapToInstitute } from "@/lib/scheduleMapper";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PartnerCompanyCard from "./PartnerCompanyCard";
import PartnerSchedulesList from "./PartnerSchedulesList";

interface TopPartnersSectionProps {
    courseSlug: string;
}

export default function TopPartnersSection({ courseSlug }: TopPartnersSectionProps) {
    const { schedules, loading, locationData } = useSchedules(courseSlug);
    const [compareList, setCompareList] = useState<string[]>([]);
    const [allTenants, setAllTenants] = useState<any[]>([]);
    const [mobileIndex, setMobileIndex] = useState(0);

    const activeCurrency = locationData?.currency || "USD";

    useEffect(() => {
        const doFetch = () => {
            fetch("/api/tenants?limit=100")
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.data) {
                        setAllTenants(data.data);
                    }
                })
                .catch((err) => console.error("Error fetching all tenants:", err));
        };

        // Defer until the browser is idle to avoid blocking the main thread on mount
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as any).requestIdleCallback(doFetch, { timeout: 2000 });
        } else {
            setTimeout(doFetch, 0);
        }
    }, []);

    // Map raw tenants to cleaner institute profiles
    const institutesList = useMemo(() => {
        if (!allTenants || allTenants.length === 0) return [];
        return allTenants.map((t: any, index: number) => mapToInstitute(t, index));
    }, [allTenants]);

    // Map each institute to its lowest price schedule for display in the grid
    const partnersData = useMemo(() => {
        if (!institutesList || institutesList.length === 0) return [];

        const mapped = institutesList.map((inst, index) => {
            const instSchedules = (schedules || []).filter((sch) => {
                const match = sch.tenantId === inst.id || sch.tenantId === (inst as any)._id;
                return match;
            });

            let lowestPrice = 0;
            let lowestCompared = 0;
            let symbol = getCurrencySymbol(activeCurrency);
            let duration = "—";

            let minScheduleRank: number | null = null;

            if (instSchedules.length > 0) {
                // Default duration from first schedule
                if (instSchedules[0].totalSessions) {
                    duration = `${instSchedules[0].totalSessions} Sessions`;
                } else if (instSchedules[0].duration) {
                    duration = `${instSchedules[0].duration} Mins`;
                }

                // Find minimum schedule rank
                instSchedules.forEach((sch: any) => {
                    if (sch.rank !== null && sch.rank !== undefined) {
                        const r = Number(sch.rank);
                        if (!isNaN(r) && r > 0) {
                            if (minScheduleRank === null || r < minScheduleRank) {
                                minScheduleRank = r;
                            }
                        }
                    }
                });

                // Find pricing matching activeCurrency
                instSchedules.forEach((sch: any) => {
                    const priceObj = sch.pricing?.find(
                        (p: any) => p.currency?.code?.toUpperCase() === activeCurrency.toUpperCase()
                    );
                    if (priceObj) {
                        const sell = priceObj.comparedPrice || 0;
                        if (lowestPrice === 0 || sell < lowestPrice) {
                            lowestPrice = sell;
                            lowestCompared = priceObj.actualPrice || sell;
                            symbol = priceObj.currency?.symbol || symbol;
                        }
                    } else if (sch.currency?.toUpperCase() === activeCurrency.toUpperCase()) {
                        const sell = sch.price || 0;
                        if (lowestPrice === 0 || sell < lowestPrice) {
                            lowestPrice = sell;
                            lowestCompared = sch.price || sell;
                            symbol = getCurrencySymbol(sch.currency);
                        }
                    }
                });

                // FALLBACK: If no active currency price was found, search for USD instead
                if (lowestPrice === 0 && activeCurrency.toUpperCase() !== "USD") {
                    instSchedules.forEach((sch: any) => {
                        const priceObj = sch.pricing?.find(
                            (p: any) => p.currency?.code?.toUpperCase() === "USD"
                        );
                        if (priceObj) {
                            const sell = priceObj.comparedPrice || 0;
                            if (lowestPrice === 0 || sell < lowestPrice) {
                                lowestPrice = sell;
                                lowestCompared = priceObj.actualPrice || sell;
                                symbol = priceObj.currency?.symbol || "$";
                            }
                        } else if (sch.currency?.toUpperCase() === "USD") {
                            const sell = sch.price || 0;
                            if (lowestPrice === 0 || sell < lowestPrice) {
                                lowestPrice = sell;
                                lowestCompared = sch.price || sell;
                                symbol = "$";
                            }
                        }
                    });
                }
            }

            return {
                ...inst,
                lowestPrice,
                lowestCompared,
                symbol,
                duration,
                schedulesCount: instSchedules.length,
                schedules: instSchedules,
                rank: minScheduleRank
            };
        });

        // Sort: Companies with schedules first, then rank
        return mapped.sort((a, b) => {
            const aHasSchedules = a.schedulesCount > 0 ? 1 : 0;
            const bHasSchedules = b.schedulesCount > 0 ? 1 : 0;
            if (aHasSchedules !== bHasSchedules) {
                return bHasSchedules - aHasSchedules;
            }
            return (a.rank || 999) - (b.rank || 999);
        });
    }, [institutesList, schedules, activeCurrency]);

    const handleCompareToggle = (id: string) => {
        setCompareList(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleScrollToSchedules = () => {
        const element = document.getElementById("detailed-schedules");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const getRankColorClass = (index: number) => {
        const colors = [
            "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
            "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
            "bg-gradient-to-br from-emerald-400 to-teal-600 text-white",
            "bg-gradient-to-br from-orange-400 to-red-500 text-white",
            "bg-gradient-to-br from-pink-500 to-rose-600 text-white",
        ];
        return colors[index % colors.length];
    };

    const getBorderHoverClass = (index: number) => {
        const classes = [
            "hover:border-purple-200",
            "hover:border-blue-200",
            "hover:border-emerald-200",
            "hover:border-orange-200",
            "hover:border-pink-200",
        ];
        return classes[index % classes.length];
    };

    if (loading && partnersData.length === 0) {
        return (
            <div className="w-full py-8 space-y-6">
                <div className="h-8 w-48 bg-slate-100 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-64 bg-slate-50 border border-slate-100 rounded-3xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 py-6" id="training-partners">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase bg-purple-50 border border-purple-100 text-[#5544CC]">
                        Training Partners
                    </span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                        Top Training Companies <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">Worldwide</span>
                    </h2>
                    <p className="text-sm text-slate-500 max-w-2xl font-medium">
                        Compare top training providers and choose the best one for your learning journey.
                    </p>
                </div>
                {/* {schedules && schedules.length > 0 && partnersData.length > 4 && (
                    <button
                        onClick={handleScrollToSchedules}
                        className="text-xs font-bold text-[#5544CC] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                        View All Batches <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                )} */}
            </div>

            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
                {partnersData.slice(0, 4).map((partner, index) => (
                    <PartnerCompanyCard
                        key={partner.id}
                        partner={partner}
                        index={index}
                        isCompared={compareList.includes(partner.id)}
                        onCompareToggle={handleCompareToggle}
                        onScrollToSchedules={handleScrollToSchedules}
                        rankColorClass={getRankColorClass(index)}
                        borderHoverClass={getBorderHoverClass(index)}
                    />
                ))}
            </div>

            {/* Mobile View: Single card with Next/Prev navigation */}
            {partnersData.length > 0 && (
                <div className="block md:hidden space-y-4">
                    <div className="transition-all duration-300">
                        {partnersData.slice(0, 4).map((partner, index) => {
                            if (index !== mobileIndex) return null;
                            return (
                                <PartnerCompanyCard
                                    key={partner.id}
                                    partner={partner}
                                    index={index}
                                    isCompared={compareList.includes(partner.id)}
                                    onCompareToggle={handleCompareToggle}
                                    onScrollToSchedules={handleScrollToSchedules}
                                    rankColorClass={getRankColorClass(index)}
                                    borderHoverClass={getBorderHoverClass(index)}
                                />
                            );
                        })}
                    </div>

                    {/* Carousel navigation controls */}
                    <div className="flex items-center justify-between px-2 pt-2 bg-slate-50/50 rounded-2xl border border-slate-100 p-3">
                        <button
                            type="button"
                            disabled={mobileIndex === 0}
                            onClick={() => setMobileIndex(prev => Math.max(0, prev - 1))}
                            className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                            aria-label="Previous provider"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Bullet indicators */}
                        <div className="flex items-center gap-1.5">
                            {partnersData.slice(0, 4).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMobileIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === mobileIndex ? "bg-[#5544CC] w-5" : "bg-slate-300"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            disabled={mobileIndex === Math.min(partnersData.length, 4) - 1}
                            onClick={() => setMobileIndex(prev => Math.min(Math.min(partnersData.length, 4) - 1, prev + 1))}
                            className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
                            aria-label="Next provider"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Detailed Schedules Section */}
            {schedules && schedules.length > 0 && (
                <PartnerSchedulesList
                    partnersData={partnersData}
                    activeCurrency={activeCurrency}
                    courseSlug={courseSlug}
                />
            )}
        </div>
    );
}
