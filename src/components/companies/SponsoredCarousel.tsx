"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    ChevronLeft, 
    ChevronRight, 
    Pause, 
    Play, 
    Megaphone, 
    ArrowRight, 
    ArrowUpRight, 
    Info,
    Building2,
    BadgeCheck
} from "lucide-react";
import { Company } from "@/types";
import { useLeadModal } from "@/components/Forms/LeadModalContext";

interface SponsoredCarouselProps {
    companies: Company[];
}

// ── Shared Image Component for Spotlight Cards ──
const CardImage = ({ company, className = "h-full" }: { company: Company; className?: string }) => {
    return (
        <div className={`relative w-full overflow-hidden bg-slate-50 flex items-center justify-center ${className}`}>
            {company.logo ? (
                <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    priority
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 gap-2 p-6">
                    <Building2 className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center px-4 truncate max-w-full">
                        {company.name}
                    </span>
                </div>
            )}
            <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-sm text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider z-10">
                Ad
            </div>
        </div>
    );
};

// ── Shared Image Component for Smaller Column Cards ──
const SmallCardImage = ({ company }: { company: Company }) => {
    return (
        <div className="relative h-[96px] w-full overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0">
            {company.logo ? (
                <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 gap-1 p-2">
                    <Building2 className="w-8 h-8 stroke-[1.5]" />
                </div>
            )}
            <div className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-sm text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider z-10">
                Ad
            </div>
        </div>
    );
};

export default function SponsoredCarousel({ companies }: SponsoredCarouselProps) {
    const { openModal } = useLeadModal();

    // If no companies data is provided, completely hide the section
    if (!companies || companies.length === 0) {
        return null;
    }

    const list = companies;
    const totalItems = list.length;

    // Carousel logic
    const batchSize = 3;
    const totalPages = Math.ceil(totalItems / batchSize);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showTooltip, setShowTooltip] = useState(false);
    
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Auto play effect (only if we have more than one page of batches)
    useEffect(() => {
        if (isPlaying && totalPages > 1) {
            timerRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % totalPages);
            }, 6000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, totalPages]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % totalPages);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Helper: extract initials for circular fallbacks
    const getCompanyInitials = (name: string) => {
        if (!name) return "SP";
        return name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();
    };

    const handleAdvertiseClick = () => {
        openModal({
            formTitle: "Advertise on Skilldeck",
            formDescription: "Tell us about your training business goals and we will customize an ad/promotional package for you.",
            source: "enquiry",
            formId: 1
        });
    };

    // ── CASE 1: Exactly 1 Sponsored Company ──
    if (totalItems === 1) {
        const company = list[0];
        return (
            <div className="w-full mb-16">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center gap-2 relative">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                            Sponsored
                        </span>
                        <button 
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            <Info className="w-3.5 h-3.5" />
                        </button>
                        {showTooltip && (
                            <div className="absolute left-0 bottom-6 bg-slate-900 text-white text-[10px] rounded p-2 shadow-lg z-30 max-w-[200px] leading-relaxed">
                                These are spotlight ad placements by our verified training partners.
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleAdvertiseClick}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:bg-slate-50 transition shadow-sm"
                    >
                        <Megaphone className="w-3.5 h-3.5" />
                        Advertise with us
                    </button>
                </div>

                {/* Main Card occupying 100% width */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group">
                    <CardImage company={company} className="h-[140px] lg:h-[160px]" />

                    <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-50 gap-4">
                        <div className="flex items-center gap-3.5">
                            {company.logo ? (
                                <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center p-1 relative overflow-hidden flex-shrink-0">
                                    <Image
                                        src={company.logo}
                                        alt={`${company.name} logo`}
                                        fill
                                        sizes="48px"
                                        className="object-contain p-1"
                                    />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 text-sm font-bold flex items-center justify-center flex-shrink-0 uppercase">
                                    {getCompanyInitials(company.name)}
                                </div>
                            )}
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-base md:text-lg flex items-center gap-1.5 leading-tight">
                                    {company.name}
                                    {company.isVerified && (
                                        <BadgeCheck className="w-4.5 h-4.5 text-[#3b82f6] flex-shrink-0" />
                                    )}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <p className="text-xs text-slate-400 font-medium">
                                        {company.location || "Global"}
                                    </p>
                                    {company.industry && (
                                        <span className="bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize">
                                            {company.industry}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/companies/${company.slug}?id=${company.id}`}
                            className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-primary group/link hover:underline whitespace-nowrap"
                        >
                            Book a seat
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ── CASE 2: Exactly 2 Sponsored Companies ──
    if (totalItems === 2) {
        const comp1 = list[0];
        const comp2 = list[1];
        return (
            <div className="w-full mb-16">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center gap-2 relative">
                        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                            Sponsored
                        </span>
                        <button
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => setShowTooltip(!showTooltip)}
                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            <Info className="w-3.5 h-3.5" />
                        </button>
                        {showTooltip && (
                            <div className="absolute left-0 bottom-6 bg-slate-900 text-white text-[10px] rounded p-2 shadow-lg z-30 max-w-[200px] leading-relaxed">
                                These are spotlight ad placements by our verified training partners.
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleAdvertiseClick}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:bg-slate-50 transition shadow-sm"
                    >
                        <Megaphone className="w-3.5 h-3.5" />
                        Advertise with us
                    </button>
                </div>

                {/* 2 Cards side-by-side grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left: Main Spotlight (Comp 1) */}
                    <div className="lg:col-span-8 flex flex-col h-full">
                        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group">
                            <CardImage company={comp1} className="min-h-[140px] lg:min-h-[180px] flex-1" />

                            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-50 gap-4 flex-shrink-0">
                                <div className="flex items-center gap-3.5">
                                    {comp1.logo ? (
                                        <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center p-1 relative overflow-hidden flex-shrink-0">
                                            <Image
                                                src={comp1.logo}
                                                alt={`${comp1.name} logo`}
                                                fill
                                                sizes="48px"
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 text-sm font-bold flex items-center justify-center flex-shrink-0 uppercase">
                                            {getCompanyInitials(comp1.name)}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 text-base md:text-lg flex items-center gap-1.5 leading-tight">
                                            {comp1.name}
                                            {comp1.isVerified && (
                                                <BadgeCheck className="w-4.5 h-4.5 text-[#3b82f6] flex-shrink-0" />
                                            )}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <p className="text-xs text-slate-400 font-medium">
                                                {comp1.location || "Global"}
                                            </p>
                                            {comp1.industry && (
                                                <span className="bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize">
                                                    {comp1.industry}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/companies/${comp1.slug}?id=${comp1.id}`}
                                    className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-primary group/link hover:underline whitespace-nowrap"
                                >
                                    Book a seat
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Partner Spotlight (Comp 2) */}
                    <div className="lg:col-span-4 flex flex-col items-stretch h-full">
                        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group h-full justify-between min-h-[300px]">
                            <CardImage company={comp2} className="flex-1 min-h-[200px]" />

                            <div className="p-4 flex items-center justify-between border-t border-slate-50 gap-2 flex-shrink-0">
                                <div className="min-w-0">
                                    <p className="text-[9px] font-extrabold text-brand-primary uppercase tracking-widest">
                                        Partner Spotlight
                                    </p>
                                    <h4 className="text-sm font-bold text-slate-800 truncate mt-0.5 leading-snug flex items-center gap-1">
                                        {comp2.name}
                                        {comp2.isVerified && (
                                            <BadgeCheck className="w-3.5 h-3.5 text-[#3b82f6] flex-shrink-0" />
                                        )}
                                    </h4>
                                </div>
                                <Link
                                    href={`/companies/${comp2.slug}?id=${comp2.id}`}
                                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center justify-center transition group-hover:translate-x-0.5 text-slate-400 shrink-0"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── CASE 3: 3 or More Sponsored Companies (Paging Enabled) ──
    const start = activeIndex * batchSize;
    const mainCompany = list[start];
    const topSpotlight = list[(start + 1) % totalItems];
    const bottomFeatured = list[(start + 2) % totalItems];

    return (
        <div className=" w-full mb-16">
            {/* Header / Navigation Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-2 relative">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                        Sponsored
                    </span>
                    <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        onClick={() => setShowTooltip(!showTooltip)}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                        <Info className="w-3.5 h-3.5" />
                    </button>
                    {showTooltip && (
                        <div className="absolute left-0 bottom-6 bg-slate-900 text-white text-[10px] rounded p-2 shadow-lg z-30 max-w-[200px] leading-relaxed">
                            These are spotlight ad placements by our verified training partners.
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* Carousel navigation controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full p-1 mr-1">
                            <button
                                onClick={togglePlay}
                                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-slate-500 hover:text-slate-800 transition"
                            >
                                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            </button>
                            <button
                                onClick={handlePrev}
                                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-slate-500 hover:text-slate-800 transition border border-transparent hover:border-slate-100 shadow-sm"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white text-slate-500 hover:text-slate-800 transition border border-transparent hover:border-slate-100 shadow-sm"
                            >
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                    {/* Advertise Button */}
                    <button
                        onClick={handleAdvertiseClick}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5 hover:bg-slate-50 transition shadow-sm"
                    >
                        <Megaphone className="w-3.5 h-3.5" />
                        Advertise with us
                    </button>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* ── LEFT: Main Spotlight Banner ── */}
                <div className="lg:col-span-8 flex flex-col h-full">
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full group">
                        <CardImage company={mainCompany} className="min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] flex-1" />

                        {/* Card Info footer */}
                        <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-50 gap-4">
                            <div className="flex items-center gap-3.5">
                                {/* Company Logo / Avatar */}
                                {mainCompany.logo ? (
                                    <div className="w-12 h-12 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center p-1 relative overflow-hidden flex-shrink-0">
                                        <Image
                                            src={mainCompany.logo}
                                            alt={`${mainCompany.name} logo`}
                                            fill
                                            sizes="48px"
                                            className="object-contain p-1"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 text-sm font-bold flex items-center justify-center flex-shrink-0 uppercase">
                                        {getCompanyInitials(mainCompany.name)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-extrabold text-slate-800 text-base md:text-lg flex items-center gap-1.5 leading-tight">
                                        {mainCompany.name}
                                        {mainCompany.isVerified && (
                                            <BadgeCheck className="w-4.5 h-4.5 text-[#3b82f6] flex-shrink-0" />
                                        )}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <p className="text-xs text-slate-400 font-medium">
                                            {mainCompany.location || "Global"}
                                        </p>
                                        {mainCompany.industry && (
                                            <span className="bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize">
                                                {mainCompany.industry}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/companies/${mainCompany.slug}?id=${mainCompany.id}`}
                                className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-primary group/link hover:underline whitespace-nowrap"
                            >
                                Book a seat
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Secondary spotlight column ── */}
                <div className="lg:col-span-4 flex flex-col gap-6 items-stretch justify-between">
                    {/* Card 1: Partner Spotlight */}
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group flex-1 justify-between min-h-[188px]">
                        <SmallCardImage company={topSpotlight} />

                        <div className="p-4 flex items-center justify-between border-t border-slate-50 gap-2">
                            <div className="min-w-0">
                                <p className="text-[9px] font-extrabold text-brand-primary uppercase tracking-widest">
                                    Partner Spotlight
                                </p>
                                <h4 className="text-sm font-bold text-slate-800 truncate mt-0.5 leading-snug flex items-center gap-1">
                                    {topSpotlight.name}
                                    {topSpotlight.isVerified && (
                                        <BadgeCheck className="w-3.5 h-3.5 text-[#3b82f6] flex-shrink-0" />
                                    )}
                                </h4>
                            </div>
                            <Link
                                href={`/companies/${topSpotlight.slug}?id=${topSpotlight.id}`}
                                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center justify-center transition group-hover:translate-x-0.5 text-slate-400 shrink-0"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Featured */}
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group flex-1 justify-between min-h-[188px]">
                        <SmallCardImage company={bottomFeatured} />

                        <div className="p-4 flex items-center justify-between border-t border-slate-50 gap-2">
                            <div className="min-w-0">
                                <p className="text-[9px] font-extrabold text-brand-primary uppercase tracking-widest">
                                    Featured
                                </p>
                                <h4 className="text-sm font-bold text-slate-800 truncate mt-0.5 leading-snug flex items-center gap-1">
                                    {bottomFeatured.name}
                                    {bottomFeatured.isVerified && (
                                        <BadgeCheck className="w-3.5 h-3.5 text-[#3b82f6] flex-shrink-0" />
                                    )}
                                </h4>
                            </div>
                            <Link
                                href={`/companies/${bottomFeatured.slug}?id=${bottomFeatured.id}`}
                                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary flex items-center justify-center transition group-hover:translate-x-0.5 text-slate-400 shrink-0"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Carousel Indicator dots */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-5 px-1">
                    {/* Indicators */}
                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-slate-800" : "w-2 bg-slate-200 hover:bg-slate-300"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Page counter label */}
                    <span className="text-[11px] font-extrabold text-slate-400">
                        {activeIndex + 1} / {totalPages}
                    </span>
                </div>
            )}
        </div>
    );
}
