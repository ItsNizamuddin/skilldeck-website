"use client";

import CompanyContactButton from "@/components/companies/CompanyContactButton";
import { Button } from "@/components/ui/Button";
import { mapToInstitute } from "@/lib/scheduleMapper";
import { Schedule } from "@/types/schedules";
import { Calendar, Download, GitCompare, Phone, Share2, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import FeaturedProvidersList from "./FeaturedProvidersList";
import PartnerAdvertiseWidget from "./PartnerAdvertiseWidget";
import { usePathname } from "next/navigation";

import { useIpLocation } from "@/hooks/useIpLocation";
import { formatNumber, getCurrencySymbol } from "@/lib/courseCardHelpers";

interface CourseCheckoutCardProps {
    schedules: Schedule[];
    tenants: any[];
    courseSlug: string;
    selectedCompanyId: string | null;
    onCompanySelect: (id: string) => void;
    loading?: boolean;
}

export default function CourseCheckoutCard({
    schedules,
    tenants,
    courseSlug,
    selectedCompanyId,
    onCompanySelect,
    loading = false
}: CourseCheckoutCardProps) {
    const { data: locationData } = useIpLocation();
    const [isMounted, setIsMounted] = useState(false);
    const [showAd, setShowAd] = useState(false);
    const pathname = usePathname();
    const isPatternPage = pathname?.startsWith("/info/");

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            const isHidden = localStorage.getItem("hide-partner-ad");
            if (isHidden === "true" || isPatternPage) return;

            // Show widget after 30 seconds
            const timer = setTimeout(() => {
                setShowAd(true);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [isPatternPage]);

    const handleCloseAd = () => {
        setShowAd(false);
        if (typeof window !== "undefined") {
            localStorage.setItem("hide-partner-ad", "true");
        }
    };


    // Map tenants/institutes using mapToInstitute mapper
    const institutesList = useMemo(() => {
        if (!tenants || tenants.length === 0) return [];
        return tenants.map((t: any, index: number) => mapToInstitute(t, index));
    }, [tenants]);

    const verifiedCount = useMemo(() => {
        return institutesList.filter(inst => inst.isVerified).length;
    }, [institutesList]);

    // Map schedules to include resolved company details from tenants list
    const mappedSchedules = useMemo(() => {
        if (!schedules) return [];
        return schedules.map((sch) => {
            if (sch.company && sch.company.name && sch.company.logo) return sch;
            const tenant = tenants?.find((t) => (t.id === sch.tenantId || t._id === sch.tenantId));
            return {
                ...sch,
                company: {
                    id: tenant?.id || tenant?._id || sch.tenantId || "",
                    name: tenant?.legalName || tenant?.name || tenant?.companyName || sch.company?.name || "this company",
                    logo: tenant?.logo || sch.company?.logo || "",
                    isVerified: tenant?.isVerified || sch.company?.isVerified || false,
                    rating: tenant?.rating || sch.company?.rating || 0,
                    slug: tenant?.slug || sch.company?.slug || ""
                }
            };
        });
    }, [schedules, tenants]);

    // Active schedule calculations based on selected training provider
    const activeScheduleInfo = useMemo(() => {

        // Derive initial defaults dynamically from the first available schedule
        const currencyFromLocation = locationData?.currency;
        const defaultCurrency = currencyFromLocation || "USD";
        const sessionCurrency = (isMounted && typeof window !== "undefined" ? sessionStorage.getItem("currency") : null) || defaultCurrency;
        const firstSchedule = mappedSchedules[0];

        // Find pricing matching sessionCurrency, or USD pricing, or first pricing
        const firstPricing = firstSchedule?.pricing?.find(
            (p: any) => p.currency?.code?.toUpperCase() === sessionCurrency.toUpperCase()
        ) || firstSchedule?.pricing?.find(
            (p: any) => p.currency?.code?.toUpperCase() === "USD"
        ) || firstSchedule?.pricing?.[0];

        let sellingPrice = firstPricing?.comparedPrice || firstSchedule?.price || 0;
        let marketPrice = firstPricing?.actualPrice || sellingPrice;
        let currencySymbol = firstPricing?.currency?.symbol || getCurrencySymbol((firstSchedule as any)?.currency || sessionCurrency);
        let hasDiscount = marketPrice > sellingPrice;
        let discountPercent = hasDiscount ? Math.round(((marketPrice - sellingPrice) / marketPrice) * 100) : 0;

        let startText = "";
        let seatsText = "";
        let progressPercent = 0;

        if (firstSchedule) {
            if ((firstSchedule as any).isFlexibleSchedule) {
                if ((firstSchedule as any).commencementDate) {
                    const earliest = new Date((firstSchedule as any).commencementDate);
                    startText = "Starts " + earliest.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                } else {
                    startText = "Flexible Dates / Students Choice";
                }
            } else if (firstSchedule.startsAt) {
                const earliest = new Date(firstSchedule.startsAt);
                startText = "Starts " + earliest.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            }

            if (firstSchedule.seatsAvailable !== undefined && firstSchedule.totalSeats !== undefined) {
                seatsText = `${firstSchedule.seatsAvailable} of ${firstSchedule.totalSeats} seats left`;
                progressPercent = Math.round(((firstSchedule.totalSeats - firstSchedule.seatsAvailable) / firstSchedule.totalSeats) * 100);
            }
        }

        let matchedPricing: any = null;
        let matchedSchedule: any = null;

        const activeFilter = selectedCompanyId || "lowest";
        if (activeFilter) {
            const targetSchedules = activeFilter === "highest" || activeFilter === "lowest"
                ? mappedSchedules
                : mappedSchedules.filter((sch) => sch.company?.id === activeFilter);

            if (activeFilter === "highest") {
                // Find highest price schedule (highest selling price)
                let maxPrice = -Infinity;
                targetSchedules.forEach((sch: any) => {
                    if (sch.pricing && sch.pricing.length > 0) {
                        const matchedCurrencyPricing = sch.pricing.filter(
                            (p: any) => p.currency?.code?.toUpperCase() === sessionCurrency.toUpperCase()
                        );
                        const pricingToSearch = matchedCurrencyPricing.length > 0 ? matchedCurrencyPricing : sch.pricing;
                        pricingToSearch.forEach((p: any) => {
                            const sell = p.comparedPrice || sch.price || 0;
                            if (sell > maxPrice) {
                                maxPrice = sell;
                                matchedPricing = p;
                                matchedSchedule = sch;
                            }
                        });
                    }
                });
            } else {
                // Find lowest price schedule (lowest selling price)
                let minPrice = Infinity;
                targetSchedules.forEach((sch: any) => {
                    if (sch.pricing && sch.pricing.length > 0) {
                        const matchedCurrencyPricing = sch.pricing.filter(
                            (p: any) => p.currency?.code?.toUpperCase() === sessionCurrency.toUpperCase()
                        );
                        const pricingToSearch = matchedCurrencyPricing.length > 0 ? matchedCurrencyPricing : sch.pricing;
                        pricingToSearch.forEach((p: any) => {
                            const sell = p.comparedPrice || sch.price || 0;
                            if (sell < minPrice) {
                                minPrice = sell;
                                matchedPricing = p;
                                matchedSchedule = sch;
                            }
                        });
                    }
                });
            }

            if (matchedPricing) {
                sellingPrice = matchedPricing.comparedPrice || 0;
                marketPrice = matchedPricing.actualPrice || sellingPrice;
                currencySymbol = matchedPricing.currency?.symbol || "₹";
            } else if (matchedSchedule && (matchedSchedule as any).currency?.toUpperCase() === sessionCurrency.toUpperCase()) {
                sellingPrice = matchedSchedule.price || 0;
                marketPrice = matchedSchedule.price || 0;
                currencySymbol = getCurrencySymbol((matchedSchedule as any).currency);
            } else if (matchedSchedule) {
                const firstP = matchedSchedule.pricing?.[0];
                sellingPrice = firstP?.comparedPrice || matchedSchedule.price || 0;
                marketPrice = firstP?.actualPrice || sellingPrice;
                currencySymbol = firstP?.currency?.symbol || getCurrencySymbol((matchedSchedule as any).currency || sessionCurrency);
            }

            if (marketPrice > sellingPrice && sellingPrice > 0) {
                hasDiscount = true;
                discountPercent = Math.round(((marketPrice - sellingPrice) / marketPrice) * 100);
            } else {
                hasDiscount = false;
                discountPercent = 0;
            }

            // Find earliest date
            const validDates = targetSchedules.filter((s: any) => s.startsAt || s.commencementDate);
            if (validDates.length > 0) {
                validDates.sort((a: any, b: any) => {
                    const dateA = new Date(a.startsAt || a.commencementDate).getTime();
                    const dateB = new Date(b.startsAt || b.commencementDate).getTime();
                    return dateA - dateB;
                });
                const sch = validDates[0];
                if (sch.isFlexibleSchedule) {
                    if (sch.commencementDate) {
                        const earliest = new Date(sch.commencementDate);
                        startText = "Starts " + earliest.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                    } else {
                        startText = "Flexible Dates / Students Choice";
                    }
                } else {
                    const earliest = new Date(sch.startsAt);
                    startText = "Starts " + earliest.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                }

                if (sch.seatsAvailable !== undefined && sch.totalSeats !== undefined) {
                    seatsText = `${sch.seatsAvailable} of ${sch.totalSeats} seats left`;
                    progressPercent = Math.round(((sch.totalSeats - sch.seatsAvailable) / sch.totalSeats) * 100);
                }
            }
        }

        const formattedPrice = `${currencySymbol}${formatNumber(sellingPrice, currencySymbol)}`;
        const formattedCompared = `${currencySymbol}${formatNumber(marketPrice, currencySymbol)}`;
        const monthlyInstallment = `${currencySymbol}${formatNumber(Math.round(sellingPrice / 12), currencySymbol)}`;

        return {
            formattedPrice,
            formattedCompared,
            monthlyInstallment,
            hasDiscount,
            discountPercent,
            startText,
            seatsText,
            progressPercent,
            matchedSchedule: matchedSchedule || firstSchedule
        };
    }, [mappedSchedules, selectedCompanyId, isMounted, locationData]);

    const activeCompanyName = useMemo(() => {
        const tId = activeScheduleInfo.matchedSchedule?.tenantId || activeScheduleInfo.matchedSchedule?.company?.id;
        if (!tId) return "this company";
        const matchedTenant = tenants.find((t: any) => (t.id === tId || t._id === tId));
        return matchedTenant?.name || matchedTenant?.companyName || activeScheduleInfo.matchedSchedule?.company?.name || "this company";
    }, [activeScheduleInfo.matchedSchedule, tenants]);

    if (!isMounted) {
        return <div className="w-full max-w-[380px] bg-slate-50 h-[480px] rounded-2xl animate-pulse" />;
    }

    if (loading) {
        return (
            <>
                <div className="w-full max-w-[380px] bg-slate-50 h-[480px] rounded-2xl animate-pulse" />
                <PartnerAdvertiseWidget showAd={showAd} onClose={handleCloseAd} />
            </>
        );
    }

    if (mappedSchedules.length === 0) {
        return (
            <>
                <div className="relative w-full max-w-[380px] overflow-hidden rounded-2xl">
                    {/* ── Dummy card with real layout (non-interactive) ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-3 pointer-events-none select-none">
                        {/* Programme fee */}
                        <div>
                            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block mb-1">Programme fee</span>
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-2xl font-extrabold text-slate-900">$1,999</span>
                                <span className="text-sm text-slate-500 line-through font-medium">$2,499</span>
                                <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-0.5 rounded-md border border-green-100">Save 20%</span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium block mt-1">or $167/month · 12-month no-cost EMI</span>
                        </div>

                        {/* Start date block */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Start date</div>
                                <div className="text-sm font-bold text-slate-800">15 Sep 2025</div>
                            </div>
                        </div>

                        {/* Dummy buttons */}
                        <div className="flex flex-col gap-3">
                            <Button
                                variant="primary"
                                className="w-full h-10 text-sm font-bold text-white flex items-center justify-center gap-2"
                            >
                                <span>Request a callback</span>
                                <Phone className="w-4 h-4 fill-white/20" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full h-10 text-brand-secondary border-2 border-brand-secondary/30 text-sm font-bold gap-2"
                            >
                                <span>Download curriculum</span>
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Compare / Share */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="border border-slate-200 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                                <GitCompare className="w-4 h-4" />
                                <span>Compare</span>
                            </div>
                            <div className="border border-slate-200 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Glassy blur overlay with CTA ── */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1.4px] flex flex-col items-center justify-center gap-4 p-6 text-center rounded-2xl">
                        <div className="bg-white/70 backdrop-blur-xl border border-white/60 ring-1 ring-purple-100/60 rounded-2xl px-6 py-5 shadow-2xl shadow-purple-200/30 flex flex-col items-center gap-3 max-w-[240px]">
                            <span className="text-[10px] font-black text-purple-700 uppercase tracking-widest bg-purple-50/80 px-4 py-1.5 rounded-full border border-purple-200/60">
                                No Upcoming Batches
                            </span>
                            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                                Currently no schedules are listed. Be the first provider!
                            </p>
                            <a
                                href="/register"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:brightness-110 text-white font-bold py-2.5 px-5 rounded-full text-xs shadow-lg hover:scale-105 transition-all"
                            >
                                List your Institute now!
                            </a>
                        </div>
                    </div>
                </div>
                <PartnerAdvertiseWidget showAd={showAd} onClose={handleCloseAd} />
            </>
        );
    }



    return (
        <div className="w-full max-w-[380px] flex flex-col gap-4">
            {/* Top Selector dropdown */}
            {mappedSchedules.length > 0 && (
                <div className="relative w-full">
                    {/* Filter Icon - left side */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 z-10">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                    <select
                        value={selectedCompanyId || "lowest"}
                        onChange={(e) => onCompanySelect(e.target.value)}
                        aria-label="Select training provider or pricing option"
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-10 py-2 text-xs 2xl:text-sm font-semibold text-slate-700 outline-none shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="lowest">Top lowest price available</option>
                        <option value="highest">Top highest price available</option>
                    </select>
                    {/* Chevron - right side */}
                    {/* <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div> */}
                </div>
            )}

            {/* Main checkout card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] p-5 flex flex-col gap-3">
                <div>
                    <span className="text-[11px] 2xl:text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1">Programme fee</span>
                    {!isMounted ? (
                        <div className="space-y-2 pt-1">
                            <div className="h-7 w-32 bg-slate-100 rounded animate-pulse" />
                            <div className="h-3 w-48 bg-slate-50 rounded animate-pulse" />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-xl font-semibold text-[#0F172A]" suppressHydrationWarning>
                                    {activeScheduleInfo.formattedPrice}
                                </span>
                                {activeScheduleInfo.hasDiscount && (
                                    <>
                                        <span className="text-sm text-slate-600 line-through font-medium" suppressHydrationWarning>
                                            {activeScheduleInfo.formattedCompared}
                                        </span>
                                        <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-0.5 rounded-md border border-green-100">
                                            Save {activeScheduleInfo.discountPercent}%
                                        </span>
                                    </>
                                )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium block mt-1" suppressHydrationWarning>
                                or {activeScheduleInfo.monthlyInstallment}/month · 12-month no-cost EMI
                            </span>
                        </>
                    )}
                </div>

                {/* Partner Details Block */}
                {activeScheduleInfo.matchedSchedule?.company && (
                    <div className="flex items-center justify-between border border-slate-100 rounded-xl p-2 bg-slate-50/50 min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-14 h-10 flex items-center justify-center overflow-hidden shrink-0 relative">
                                {activeScheduleInfo.matchedSchedule.company.logo ? (
                                    <Image
                                        src={activeScheduleInfo.matchedSchedule.company.logo}
                                        alt={activeScheduleInfo.matchedSchedule.company.name}
                                        fill
                                        sizes="60px"
                                        className="object-contain p-1"
                                    />
                                ) : (
                                    <span className="text-sm font-bold text-brand-primary uppercase">
                                        {activeScheduleInfo.matchedSchedule.company.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h5 className="text-xs font-bold text-slate-800 truncate">{activeScheduleInfo.matchedSchedule.company.name}</h5>
                                <p className="text-[10px] text-slate-500 mt-0.5 capitalize truncate">
                                    {[
                                        activeScheduleInfo.matchedSchedule?.location || "Hybrid",
                                        activeScheduleInfo.matchedSchedule?.deliveryType
                                    ].filter(Boolean).join(" · ")}
                                </p>
                            </div>
                        </div>
                        {activeScheduleInfo.matchedSchedule.company.rating > 0 && (
                            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-md px-1.5 py-0.5 text-[10px] font-bold flex-shrink-0">
                                <span>★</span>
                                <span>{activeScheduleInfo.matchedSchedule.company.rating}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Start Date Block */}
                {activeScheduleInfo.startText && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Start date</div>
                            <div className="text-sm font-bold text-slate-800">
                                {activeScheduleInfo.startText.replace("Starts ", "")}
                            </div>
                        </div>
                    </div>
                )}

                {/* Primary Action Buttons */}
                <div className="flex flex-col gap-3">
                    <CompanyContactButton
                        tenantId={activeScheduleInfo.matchedSchedule?.tenantId || activeScheduleInfo.matchedSchedule?.company?.id}
                        companyName={activeCompanyName}
                        scheduleId={activeScheduleInfo.matchedSchedule?.id || activeScheduleInfo.matchedSchedule?._id}
                        courseId={courseSlug}
                        courseTitle={activeScheduleInfo.matchedSchedule?.course?.title || "Course"}
                        showPreferredDateTime={true}
                        renderButton={(onClick) => (
                            <Button
                                type="button"
                                onClick={onClick}
                                variant="primary"
                                className="w-full h-10 text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/10 transition-all cursor-pointer"
                            >
                                <span>Request a callback</span>
                                <Phone className="w-4 h-4 fill-white/20" />
                            </Button>
                        )}
                    />

                    {/* <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 text-brand-primary border-2 border-brand-primary/30 hover:border-none text-sm font-bold gap-2"
                    >
                        <span>Download curriculum</span>
                        <Download className="w-4 h-4" />
                    </Button> */}
                </div>
                {/* Auxiliary Share/Compare buttons */}
                {/* <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="border border-slate-200 hover:bg-slate-50 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 transition-all"
                    >
                        <GitCompare className="w-4 h-4" />
                        <span>Compare</span>
                    </button>

                    <button
                        type="button"
                        className="border border-slate-200 hover:bg-slate-50 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-600 transition-all"
                    >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                    </button>
                </div> */}

                {/* Featured Training Providers Section */}
                <FeaturedProvidersList
                    institutesList={institutesList}
                    verifiedCount={verifiedCount}
                    selectedCompanyId={selectedCompanyId}
                    onCompanySelect={onCompanySelect}
                />
            </div>

            {/* Partner & Advertise Widget */}
            {!isPatternPage && (
                <PartnerAdvertiseWidget
                    showAd={showAd}
                    onClose={handleCloseAd}
                />
            )}
        </div>
    );
}
