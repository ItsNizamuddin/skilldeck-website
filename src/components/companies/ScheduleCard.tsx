"use client";

import { Schedule } from "@/types/schedules";
import { ArrowUpRight, BadgeCheck, Calendar, Clock, Flame, Image as ImageIcon, MapPin, Users, Wifi, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CompanyContactButton from "./CompanyContactButton";
import { CompareButton } from "./compare/CompareButton";

interface Props {
    schedule: Schedule;
    showCompany?: boolean;
    index?: number;
}

function formatDate(d?: string) {
    if (!d || d.trim() === "") return "Flexible Start";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const deliveryIcon: Record<string, React.ReactNode> = {
    online: <Wifi className="w-3.5 h-3.5" />,
    offline: <MapPin className="w-3.5 h-3.5" />,
    blended: <Users className="w-3.5 h-3.5" />,
    classroom: <MapPin className="w-3.5 h-3.5" />,
};

export default function ScheduleCard({ schedule, showCompany = true, index = 0 }: Props) {
    const s = schedule;
    const p = s.pricing?.[0];
    const symbol = p?.currency?.symbol || "₹";
    const sellingPrice = p?.comparedPrice ?? p?.price;
    const originalPrice = p?.actualPrice;
    const discount = typeof originalPrice === "number" && typeof sellingPrice === "number" && originalPrice > sellingPrice
        ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
        : 0;
    const type = (s.deliveryType || "").toLowerCase();

    // Determine badge
    const isTrending = s.enableFastfilling;
    const isEditorsPick = s.isFeatured || s.enableRecommend;

    return (
        <div
            className={`bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 ${s.isFeatured ? "ring-1 ring-indigo-500/20 border-indigo-200" : ""}`}
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {/* ── Image Header / Placeholder ── */}
            <div className="relative w-full h-44 bg-slate-50 overflow-hidden flex-shrink-0">
                {s.image ? (
                    <Image
                        src={s.image}
                        alt={s.course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 gap-1.5">
                        <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            No Preview
                        </span>
                    </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 z-10 flex flex-row flex-wrap gap-1.5">
                    {isTrending && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm uppercase tracking-wider">
                            <Flame className="w-3 h-3 text-white fill-white" /> Trending
                        </span>
                    )}
                    {isEditorsPick && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm uppercase tracking-wider">
                            <Zap className="w-3 h-3 text-white fill-white" /> Editors' pick
                        </span>
                    )}
                </div>

                {/* Session Count Overlay */}
                {s.totalSessions ? (
                    <span className="absolute bottom-3 right-3 z-10 text-[10px] font-bold text-white bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {s.totalSessions} sessions
                    </span>
                ) : null}
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Optional Company Details row */}
                    {showCompany && (
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                {s.company.logo ? (
                                    <Image
                                        src={s.company.logo}
                                        alt={s.company.name}
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                    />
                                ) : (
                                    <span className="text-[10px] font-bold text-slate-500">{s.company.name.charAt(0)}</span>
                                )}
                            </div>
                            <span className="text-xs font-semibold text-slate-600 truncate">{s.company.name}</span>
                            {s.company.isVerified && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
                        </div>
                    )}

                    {/* Course Title */}
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 mb-4">
                        {s.course.title}
                    </h3>

                    {/* Meta Row: Mode, Batch, Date */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {/* Delivery mode */}
                        {type && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50/50 border border-indigo-100/50 px-2 py-0.5 rounded-lg capitalize">
                                {deliveryIcon[type] || <Wifi className="w-3 h-3" />}
                                {s.deliveryType}
                            </span>
                        )}
                        {/* Batch type */}
                        {s.batchType && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-violet-700 bg-violet-50/50 border border-violet-100/50 px-2 py-0.5 rounded-lg capitalize">
                                <Clock className="w-3 h-3 text-violet-400" />
                                {s.batchType}
                            </span>
                        )}
                        {/* Starts At */}
                        <span className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {formatDate(s.startsAt)}
                        </span>
                    </div>
                </div>

                <div>
                    {/* Pricing Row */}
                    {typeof sellingPrice === "number" && (
                        <div className="flex items-baseline gap-2 mb-4 pt-3 border-t border-slate-100">
                            <span className="text-xl font-black text-slate-900">
                                {symbol}{sellingPrice.toLocaleString()}
                            </span>
                            {typeof originalPrice === "number" && originalPrice > sellingPrice ? (
                                <>
                                    <span className="text-xs text-slate-400 line-through">
                                        {symbol}{originalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-xs font-bold text-emerald-600">
                                        {discount}% off
                                    </span>
                                </>
                            ) : null}
                        </div>
                    )}

                    {/* Actions Row */}
                    <div className="flex items-center gap-2 mt-auto">
                        <CompanyContactButton
                            tenantId={s.company.id}
                            companyName={s.company.name}
                            scheduleId={s.id}
                            courseTitle={s.course.title}
                            showPreferredDateTime
                            className="flex-1 py-2 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white text-xs font-bold rounded-lg hover:shadow-md hover:shadow-indigo-500/20 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                        >
                            Enquire Now <ArrowUpRight className="w-3.5 h-3.5" />
                        </CompanyContactButton>
                        {showCompany && (
                            <>
                                {/* <CompareButton schedule={s} /> */}
                                {s.company.slug && (
                                    <Link
                                        href={`/companies/${s.company.slug}?id=${s.company.id}`}
                                        className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition whitespace-nowrap cursor-pointer"
                                    >
                                        View Profile
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
