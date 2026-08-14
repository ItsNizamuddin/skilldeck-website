"use client";

import CompanyContactButton from "@/components/companies/CompanyContactButton";
import { Button } from "@/components/ui/Button";
import { formatDate, formatPrice, getCurrencySymbol } from "@/lib/courseCardHelpers";
import { Calendar, ChevronLeft, ChevronRight, Clock, Phone, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface PartnerSchedulesListProps {
    partnersData: any[];
    activeCurrency: string;
    courseSlug: string;
}

export default function PartnerSchedulesList({
    partnersData,
    activeCurrency,
    courseSlug,
}: PartnerSchedulesListProps) {
    const sortedPartners = useMemo(() => {
        return [...partnersData]
            .filter((p) => p.schedulesCount > 0)
            .sort((a, b) => {
                const aRankVal = a.rank !== null && a.rank !== undefined ? Number(a.rank) : null;
                const bRankVal = b.rank !== null && b.rank !== undefined ? Number(b.rank) : null;
                const aHasRank = aRankVal !== null && !isNaN(aRankVal) && aRankVal > 0;
                const bHasRank = bRankVal !== null && !isNaN(bRankVal) && bRankVal > 0;

                if (aHasRank && bHasRank) {
                    return (aRankVal as number) - (bRankVal as number);
                }
                if (aHasRank && !bHasRank) {
                    return -1;
                }
                if (!aHasRank && bHasRank) {
                    return 1;
                }
                return b.schedulesCount - a.schedulesCount;
            });
    }, [partnersData]);

    const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
    const [activeBatchIndex, setActiveBatchIndex] = useState(0);
    const batchContainerRef = useRef<HTMLDivElement>(null);

    // Reset active batch index when switching companies
    useEffect(() => {
        setActiveBatchIndex(0);
        if (batchContainerRef.current) {
            batchContainerRef.current.scrollTo({ left: 0 });
        }
    }, [activeCompanyId]);

    // Default to first sorted partner when partners list changes
    useEffect(() => {
        if (sortedPartners.length > 0 && !activeCompanyId) {
            setActiveCompanyId(sortedPartners[0].id);
        }
    }, [sortedPartners, activeCompanyId]);

    const activePartner = useMemo(() => {
        return sortedPartners.find((p) => p.id === activeCompanyId) || sortedPartners[0];
    }, [sortedPartners, activeCompanyId]);

    const handleBatchScroll = (index: number) => {
        if (!activePartner?.schedules) return;
        const total = Math.min(activePartner.schedules.length, 3);
        if (total <= 1) return;
        
        let nextIndex = index;
        if (nextIndex < 0) nextIndex = total - 1;
        if (nextIndex >= total) nextIndex = 0;
        
        setActiveBatchIndex(nextIndex);
        if (batchContainerRef.current) {
            const cardEl = batchContainerRef.current.children[nextIndex] as HTMLElement;
            if (cardEl) {
                batchContainerRef.current.scrollTo({
                    left: cardEl.offsetLeft - 16,
                    behavior: "smooth"
                });
            }
        }
    };

    if (sortedPartners.length === 0) return null;

    return (
        <div id="detailed-schedules" className="pt-10 space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-100/60">
                <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Upcoming Batches & Schedules</h3>
                <p className="text-xs text-slate-500 font-medium">Select your preferred training provider on the left to view their batches.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
                {/* Left Side: Clickable Sidebar Tabs */}
                <div className="lg:col-span-3 flex flex-row lg:flex-col gap-3 lg:space-y-3 lg:max-h-[500px] lg:overflow-y-auto pr-1 overflow-x-auto pb-3 lg:pb-0 scrollbar-none flex-nowrap shrink-0 snap-x snap-mandatory">
                    {sortedPartners.map((partner) => {
                        const isActive = activeCompanyId === partner.id;
                        return (
                            <button
                                key={partner.id}
                                onClick={() => setActiveCompanyId(partner.id)}
                                className={`relative w-[260px] md:w-[280px] lg:w-full text-left p-2 pt-5 rounded-2xl border transition-colors duration-150 flex items-center gap-3 cursor-pointer flex-shrink-0 snap-start ${isActive
                                    ? "bg-[#5544CC]/5 border-[#5544CC]/20 shadow-sm"
                                    : "bg-white border-slate-100 hover:bg-slate-50/50"
                                    }`}
                            >
                                {partner.rank && partner.rank > 0 && (
                                    <div className="absolute top-0 left-0 bg-brand-gradient text-white text-[8px] font-black tracking-wider uppercase px-2 py-1 rounded-tl-2xl rounded-br-xl flex items-center gap-0.5 shadow-sm">
                                        <Trophy className="w-2 h-2 text-white" />
                                        <span>Rank {partner.rank}</span>
                                    </div>
                                )}
                                <div className="w-16 h-8 relative flex-shrink-0 flex items-center justify-center overflow-hidden p-1 rounded-lg">
                                    {partner.logo ? (
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            sizes="48px"
                                            className="object-contain p-0.5"
                                        />
                                    ) : (
                                        <span className="text-[10px] font-black text-[#5544CC] uppercase">
                                            {partner.name?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1 space-y-0.5">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">{partner.name}</h4>
                                    </div>
                                    <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium">
                                        <span className="truncate">{partner.address || "Online / Hybrid"}</span>
                                        <span className="flex-shrink-0 bg-white border border-slate-200 px-1.5 py-0.5 rounded-full text-slate-500 font-bold ml-1">
                                            {partner.schedulesCount} Batches
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Right Side: Active Company Schedules Grid */}
                <div className="relative lg:col-span-7 bg-slate-50/40 border border-slate-100 rounded-2xl p-3 lg:p-5 min-h-[300px]">
                    {activePartner && (
                        <div className="space-y-6">
                            {/* Active Company Name Header inside the right panel */}
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-10 relative flex-shrink-0 flex items-center justify-center overflow-hidden ">
                                    {activePartner.logo ? (
                                        <Image
                                            src={activePartner.logo}
                                            alt={activePartner.name}
                                            fill
                                            sizes="80px"
                                            className="object-contain p-0.5"
                                        />
                                    ) : (
                                        <span className="text-xs font-black text-[#5544CC] uppercase">
                                            {activePartner.name?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="text-left space-y-1">
                                    <h4 className="text-base font-extrabold text-slate-800 tracking-tight leading-snug">{activePartner.name}</h4>
                                    <p className="text-[11px] text-slate-400 font-medium">{activePartner.address || "Online / Hybrid"}</p>
                                </div>
                            </div>

                            {/* Grid of Schedules */}
                            <div ref={batchContainerRef} className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-none flex-nowrap md:flex-wrap snap-x snap-mandatory">
                                {activePartner.schedules.slice(0, 3).map((sch: any) => {
                                    const schPriceObj = sch.pricing?.find(
                                        (p: any) => p.currency?.code?.toUpperCase() === activeCurrency.toUpperCase()
                                    );
                                    let schSell = schPriceObj?.comparedPrice || sch.price || 0;
                                    let schActual = schPriceObj?.actualPrice || schSell;
                                    let schSymbol = schPriceObj?.currency?.symbol || getCurrencySymbol(activeCurrency);
                                    let hasDiscount = schActual > schSell && schSell > 0;

                                    return (
                                        <div key={sch._id || sch.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between gap-4 shadow-sm hover:border-[#5544CC]/20 transition-all w-[280px] md:w-auto flex-shrink-0 snap-start">
                                            <div className="space-y-3">
                                                {/* Header Badges */}
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-100 text-slate-600">
                                                        {sch.deliveryType || "Online"}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#5544CC]/10 border border-[#5544CC]/15 text-[#5544CC]">
                                                        {sch.batchType || "Weekday"}
                                                    </span>
                                                </div>

                                                {/* Date & Time info */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Calendar className="w-3.5 h-3.5 text-[#5544CC] flex-shrink-0" />
                                                        <div>
                                                            <span className="text-slate-400 font-medium block text-[9px] uppercase tracking-wider leading-none mb-0.5">Start date</span>
                                                            <span className="font-bold text-slate-700">
                                                                {sch.isFlexibleSchedule ? (
                                                                    sch.commencementDate ? formatDate(sch.commencementDate) : "Flexible Dates"
                                                                ) : (
                                                                    formatDate(sch.startsAt)
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <Clock className="w-3.5 h-3.5 text-[#5544CC] flex-shrink-0" />
                                                        <div>
                                                            <span className="text-slate-400 font-medium block text-[9px] uppercase tracking-wider leading-none mb-0.5">Duration</span>
                                                            <span className="font-bold text-slate-700">
                                                                {sch.totalSessions ? `${sch.totalSessions} Sessions` : ""}
                                                                {sch.duration ? ` (${sch.duration} Mins)` : ""}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Pricing & CTA */}
                                            <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                                                <div>
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none block mb-0.5">Fee</span>
                                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                                        <span className="text-sm font-black text-slate-800">
                                                            {schSell > 0 ? formatPrice(schSell, schSymbol) : "—"}
                                                        </span>
                                                        {hasDiscount && (
                                                            <span className="text-[10px] text-slate-400 line-through font-medium">
                                                                {formatPrice(schActual, schSymbol)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <CompanyContactButton
                                                    tenantId={activePartner.id || (activePartner as any)._id}
                                                    companyName={activePartner.name}
                                                    scheduleId={sch.id || sch._id}
                                                    courseId={courseSlug}
                                                    courseTitle={sch.course?.title || "Course"}
                                                    showPreferredDateTime={true}
                                                    renderButton={(onClick) => (
                                                        <Button
                                                            onClick={onClick}
                                                            variant="primary"
                                                            size="sm"
                                                            className="text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-md shadow-purple-600/10 flex items-center gap-1.5 transition-all cursor-pointer"
                                                        >
                                                            <Phone className="w-3 h-3 fill-white/20" />
                                                            <span>Request Call</span>
                                                        </Button>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mobile Slider Controls */}
                            {activePartner.schedules.slice(0, 3).length > 1 && (
                                <div className="flex md:hidden items-center justify-between mt-4 px-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        aria-label="Previous batch"
                                        onClick={() => handleBatchScroll(activeBatchIndex - 1)}
                                        className="p-1 h-8 w-8 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-center"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>

                                    <div className="flex items-center gap-1.5">
                                        {activePartner.schedules.slice(0, 3).map((_: any, idx: number) => (
                                            <button
                                                key={idx}
                                                aria-label={`Go to batch ${idx + 1}`}
                                                onClick={() => handleBatchScroll(idx)}
                                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                    idx === activeBatchIndex
                                                        ? "w-4 bg-[#5544CC]"
                                                        : "bg-slate-300 hover:bg-slate-400"
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        aria-label="Next batch"
                                        onClick={() => handleBatchScroll(activeBatchIndex + 1)}
                                        className="p-1 h-8 w-8 rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-center"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
