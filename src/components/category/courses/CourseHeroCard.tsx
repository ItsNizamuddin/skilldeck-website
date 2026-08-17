import { Button } from "@/components/ui/Button";
import { formatDate, formatPrice, getCurrencySymbol } from "@/lib/courseCardHelpers";
import type { CourseThumbnail, PlatformSchedule } from "@/types/hero";
import { Calendar, Clock, Flame, ShieldCheck, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CourseCardSkeleton from "./CourseCardSkeleton";

interface CourseHeroCardProps {
    schedule: PlatformSchedule;
    courseThumbnail?: CourseThumbnail;
    avgRating?: number;
    reviewCount?: number;
    onCallbackClick?: () => void;
}

// ─── Main card ────────────────────────────────────────────────────────────────

export default function CourseHeroCard({
    schedule,
    courseThumbnail,
    avgRating = 4.8,
    reviewCount = 1284,
    onCallbackClick,
}: CourseHeroCardProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!schedule) return null;

    // Pricing matching session storage currency
    const sessionCurrency = (isMounted && typeof window !== "undefined" ? sessionStorage.getItem("currency") : null) || "USD";

    // Find pricing matching sessionCurrency, or USD pricing, or first pricing
    const pricing = schedule.pricing?.find(
        (p) => p.currency?.code?.toUpperCase() === sessionCurrency.toUpperCase()
    ) || schedule.pricing?.find(
        (p) => p.currency?.code?.toUpperCase() === "USD"
    ) || schedule.pricing?.[0];

    const sellingPrice = pricing?.comparedPrice || 0;
    const marketPrice = pricing?.actualPrice || sellingPrice;
    const symbol = pricing?.currency?.symbol || getCurrencySymbol((schedule as any).currency || sessionCurrency);
    const hasDiscount = marketPrice > sellingPrice && sellingPrice > 0;
    const discountPct = hasDiscount
        ? Math.round(((marketPrice - sellingPrice) / marketPrice) * 100)
        : 0;

    if (!isMounted) {
        return <CourseCardSkeleton />;
    }

    return (
        <div className="bg-white rounded-2xl p-4 space-y-2">
            {/* ── Badges ── */}
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                    <Flame className="w-3 h-3" />
                    Fast filling
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    Recommended
                </span>
            </div>

            {/* ── Provider ── */}
            <div className="flex items-center gap-2">
                {schedule.tenant?.logo && (
                    <div className="w-16 h-12 rounded-lg bg-slate-50 flex items-center justify-center p-1 flex-shrink-0 border border-slate-100">
                        <Image
                            src={schedule.tenant.logo}
                            alt={`${schedule.tenant.name || "Provider"} logo`}
                            width={100}
                            height={100}
                            className="w-full h-full object-contain"
                            loading="lazy"
                        />
                    </div>
                )}
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#111827] flex items-center gap-1.5 truncate">
                        {schedule.tenant?.name || "Training Provider"}
                        {/* Verified badge */}
                        <BadgeCheck className="w-4.5 h-4.5 text-[#3b82f6] flex-shrink-0" />
                    </div>
                    <div className="text-[11px] text-gray-400">Reserve your seat for the upcoming batch</div>
                </div>
            </div>

            {/* ── Course banner image ── */}
            {schedule?.image && (
                <div className="overflow-hidden">
                    <Image
                        src={schedule?.image}
                        alt="Course banner"
                        width={352}
                        height={188}
                        className="w-full h-auto object-cover max-h-[188px] rounded-lg"
                        priority
                        fetchPriority="high"
                    />
                </div>
            )}

            {/* ── Start date + Programme fee ── */}
            <div className="flex justify-center items-center gap-6 pt-1">
                <div className="flex items-start gap-3 w-fit ">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 font-medium">Start date</div>
                        <div className="text-xs font-bold text-[#0F172A]">
                            {!isMounted ? (
                                <span className="h-3 w-16 bg-slate-100 rounded animate-pulse inline-block" />
                            ) : (
                                (schedule as any).isFlexibleSchedule ? (
                                    (schedule as any).commencementDate ? (
                                        formatDate((schedule as any).commencementDate)
                                    ) : (
                                        "Flexible Dates / Students Choice"
                                    )
                                ) : (
                                    formatDate(schedule.startsAt)
                                )
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-0.5 h-8 bg-slate-200" />
                <div>
                    {!isMounted ? (
                        <div className="space-y-1.5 pt-1.5">
                            <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
                            <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-[10px] text-gray-400 font-medium">Programme fee</span>
                                {hasDiscount && (
                                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                                        Save {discountPct}%
                                    </span>
                                )}
                            </div>
                            {sellingPrice > 0 ? (
                                <div className="flex items-baseline gap-1.5 flex-wrap">
                                    <span className="text-sm font-bold text-[#0F172A]">
                                        {formatPrice(sellingPrice, symbol)}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-xs text-gray-400 line-through">
                                            {formatPrice(marketPrice, symbol)}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <span className="text-sm font-bold text-gray-400">Contact for fee</span>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* ── Mode / Sessions / Days ── */}
            <div className="grid grid-cols-3 gap-2">
                {[
                    { icon: <Clock className="w-3 h-3" />, label: "Mode", value: schedule.deliveryType || "Online / Blend" },
                    { icon: null, label: "Sessions", value: String(schedule.totalSessions || "—") },
                    { icon: null, label: "Days", value: schedule.batchType || "Weekdays" },
                ].map(({ icon, label, value }) => (
                    <div key={label} className="flex flex-col items-center justify-center bg-gray-50 rounded-xl py-2 px-1 border border-gray-100 text-center">
                        <div className="flex items-center gap-0.5 text-gray-400 mb-0.5">
                            {icon}
                            <span className="text-[9px] uppercase tracking-wide font-semibold">{label}</span>
                        </div>
                        <span className="text-xs capitalize font-bold text-[#111827]">{value}</span>
                    </div>
                ))}
            </div>

            {/* ── Ratings ── */}
            <div className="grid grid-cols-2 gap-3 pt-3">
                {/* Google rating */}
                <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                        alt="Google"
                        className="w-5 h-5 flex-shrink-0"
                        loading="lazy"
                    />
                    <div>
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 12 12">
                                <path d="M6 1l1.5 3h3l-2.5 1.8 1 3L6 7.2 3 8.8l1-3L1.5 4h3z" />
                            </svg>
                            <span className="text-xs font-bold text-[#111827]">{avgRating}/5</span>
                        </div>
                        <div className="text-[10px] text-gray-400">{reviewCount.toLocaleString()}+ reviewed</div>
                    </div>
                </div>
                {/* Trustpilot-style rating */}
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 12 12">
                            <path d="M6 1l1.5 3h3l-2.5 1.8 1 3L6 7.2 3 8.8l1-3L1.5 4h3z" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 12 12">
                                <path d="M6 1l1.5 3h3l-2.5 1.8 1 3L6 7.2 3 8.8l1-3L1.5 4h3z" />
                            </svg>
                            <span className="text-xs font-bold text-[#111827]">{avgRating}/5</span>
                        </div>
                        <div className="text-[10px] text-gray-400">{reviewCount.toLocaleString()}+ reviewed</div>
                    </div>
                </div>
            </div>

            {/* ── Get a call back CTA ── */}
            <Button
                onClick={onCallbackClick}
                variant="primary"
                className="w-full h-11 text-sm font-semibold shadow-lg shadow-purple-600/10"
            >
                Get a call back
            </Button>
        </div>
    );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

export function CourseHeroCardSkeleton() {
    return <CourseCardSkeleton />;
}
