"use client";

import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/courseCardHelpers";
import { ArrowRight, MapPin, Star, Trophy } from "lucide-react";
import Image from "next/image";

interface PartnerCompanyCardProps {
    partner: any;
    index: number;
    isCompared: boolean;
    onCompareToggle: (id: string) => void;
    onScrollToSchedules: () => void;
    rankColorClass: string;
    borderHoverClass: string;
}

export default function PartnerCompanyCard({
    partner,
    index,
    isCompared,
    onCompareToggle,
    onScrollToSchedules,
    rankColorClass,
    borderHoverClass,
}: PartnerCompanyCardProps) {
    const hasRank = typeof partner.rank === "number" && partner.rank > 0;

    return (
        <div
            className={`relative bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_-6px_rgba(0,0,0,0.06)] hover:scale-[1.01] max-w-[320px] w-full mx-auto ${borderHoverClass}`}
        >
            {hasRank && (
                <div className="absolute top-0 left-0 bg-linear-to-r from-purple-700 to-pink-500 text-white text-[9px] font-black tracking-wider uppercase px-3 py-1.5 rounded-tl-3xl rounded-br-2xl flex items-center gap-1 shadow-sm">
                    <Trophy className="w-2.5 h-2.5 text-white" />
                    <span>Rank {partner.rank}</span>
                </div>
            )}
            {/* <div className="flex items-center justify-between gap-4 mb-4">
                <div />
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={isCompared}
                        onChange={() => onCompareToggle(partner.id)}
                        className="w-3.5 h-3.5 border-slate-300 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Compare</span>
                </label>
            </div> */}

            {/* Partner Info */}
            <div className="flex flex-col items-center text-center space-y-3 pb-3">
                <div className="w-24 h-12 relative flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                        <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            sizes="96px"
                            className="object-contain"
                        />
                    ) : (
                        <span className="text-lg font-black text-purple-600 uppercase">
                            {partner.name?.charAt(0)}
                        </span>
                    )}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{partner.name}</h4>
                    {partner.rating && partner.rating > 0 && (
                        <div className="flex items-center justify-center gap-1 mt-1 text-xs">
                            <span className="font-bold text-slate-700">{partner.rating}</span>
                            <div className="flex text-amber-400">
                                {[...Array(Math.floor(partner.rating))].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                        {partner.industry && (
                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md capitalize">
                                {partner.industry}
                            </span>
                        )}
                        {partner.companySize && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                                {partner.companySize}
                            </span>
                        )}
                        {partner.established && (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded-md">
                                Est. {partner.established}
                            </span>
                        )}
                    </div>
                    {partner?.address && (
                        <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium mt-1.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="line-clamp-1">{partner?.address}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Price and Details row */}
            <div className="grid grid-cols-2 gap-4 py-3.5 my-1 border-t border-slate-100 px-2">
                <div className="text-center space-y-0.5 border-r border-slate-100 pr-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Course Fee</span>
                    <span className="text-xs font-black text-slate-800 block">
                        {partner.lowestPrice > 0 ? formatPrice(partner.lowestPrice, partner.symbol) : "—"}
                    </span>
                </div>
                <div className="text-center space-y-0.5 pl-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Sessions</span>
                    <span className="text-xs font-black text-slate-800 block">{partner.duration || "N/A"}</span>
                </div>
            </div>

            {/* CTA Link to schedules below */}
            <Button
                onClick={onScrollToSchedules}
                variant={index === 0 ? "primary" : "outline"}
                className={`w-full h-10 px-4 rounded-xl text-xs gap-2 ${index === 0
                        ? "shadow-md shadow-purple-600/10 hover:brightness-105"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
            >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </Button>
        </div>
    );
}
