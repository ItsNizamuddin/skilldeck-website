"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star, Users } from "lucide-react";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import type { ServiceItem } from "@/lib/services";

interface ServicesGridProps {
    services: ServiceItem[];
    badge?: string;
    title?: React.ReactNode;
    subtitle?: string;
    /** Cap the grid; omit to show everything. */
    limit?: number;
    id?: string;
}

/** CMS icon specs ("LucideTable,currentColor") are not valid image sources. */
const isImageSrc = (src?: string): src is string =>
    Boolean(src && (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")));

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
    const card = service.servicecard || {};
    const name = card.title || service.service_name || service.name || "Service";
    const href = `/services/${service.slug}`;
    const tags = (card.points || []).filter(Boolean).slice(0, 3);
    const rating = Number(card.ratings) || 0;
    const thumbnail = isImageSrc(card.thumbnail) ? card.thumbnail : undefined;

    return (
        <li className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-brand-primary/40">
            {/* The whole card is the link, so every part of it is clickable. */}
            <Link
                href={href}
                aria-label={`${name} — view service details`}
                className="flex h-full flex-col outline-none"
            >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        // No CMS thumbnail: a soft branded panel rather than a hard
                        // gradient slab, so the card still reads as designed.
                        <div className="absolute inset-0 bg-[linear-gradient(140deg,#f6f4ff_0%,#ffffff_70%)]">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-[radial-gradient(rgba(92,63,250,0.14)_1px,transparent_1px)] [background-size:14px_14px]"
                            />
                            <div className="relative flex h-full items-center justify-center">
                                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/15 bg-white/80 text-brand-primary shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                                    <ServiceItemIcon iconString={card.icon} className="h-7 w-7" defaultIcon="Sparkles" />
                                </span>
                            </div>
                        </div>
                    )}

                    <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[11px] font-black text-brand-dark backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                    {tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-brand-primary/10 px-2 py-1 text-[9px] 2xl:text-[10px] font-bold uppercase tracking-wide text-brand-primary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h3 className="mb-2 text-sm font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-primary">
                        {name}
                    </h3>

                    {card.content && (
                        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-brand-muted">{card.content}</p>
                    )}

                    {(rating > 0 || card.clients) && (
                        <div className="mb-4 flex items-center gap-4 text-[11px] font-medium text-brand-muted">
                            {rating > 0 && (
                                <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                                    <span className="font-bold text-brand-dark">{rating.toFixed(1)}</span>
                                </span>
                            )}
                            {card.clients && (
                                <span className="inline-flex items-center gap-1">
                                    <Users className="h-3 w-3" aria-hidden="true" />
                                    {card.clients} clients
                                </span>
                            )}
                        </div>
                    )}

                    <span
                        aria-hidden="true"
                        className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark transition-colors group-hover:text-brand-primary"
                    >
                        Learn More
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </div>
            </Link>
        </li>
    );
}

export default function ServicesGrid({
    services,
    badge = "Our Services",
    title,
    subtitle = "Everything a training business needs to grow — built, run and supported by one team.",
    limit,
    id = "services",
}: ServicesGridProps) {
    const list = limit ? services.slice(0, limit) : services;
    const [mobileIndex, setMobileIndex] = useState(0);
    const [desktopPage, setDesktopPage] = useState(0);

    if (list.length === 0) return null;

    // Mobile navigation (1 card per slide)
    const handleMobilePrev = () => {
        setMobileIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
    };

    const handleMobileNext = () => {
        setMobileIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
    };

    // Desktop/Tablet navigation (3 cards per page)
    const DESKTOP_PAGE_SIZE = 3;
    const totalDesktopPages = Math.ceil(list.length / DESKTOP_PAGE_SIZE);

    const handleDesktopPrev = () => {
        setDesktopPage((prev) => (prev === 0 ? totalDesktopPages - 1 : prev - 1));
    };

    const handleDesktopNext = () => {
        setDesktopPage((prev) => (prev === totalDesktopPages - 1 ? 0 : prev + 1));
    };

    const desktopVisibleCards = list.slice(
        desktopPage * DESKTOP_PAGE_SIZE,
        (desktopPage + 1) * DESKTOP_PAGE_SIZE
    );

    return (
        <section id={id} className="scroll-mt-24 section-y bg-slate-50">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="badge-brand mb-5">{badge}</span>
                    <h2 className="heading-section mb-4">
                        {title ?? (
                            <>
                                Services that move your{" "}
                                <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                    training business
                                </span>
                            </>
                        )}
                    </h2>
                    {subtitle && <p className="body-medium">{subtitle}</p>}
                </div>

                {/* Mobile View: Single card carousel with Next / Previous navigation */}
                <div className="block sm:hidden max-w-sm mx-auto space-y-4">
                    <ul className="w-full">
                        {list.map((service, i) => {
                            if (i !== mobileIndex) return null;
                            return <ServiceCard key={service.slug} service={service} index={i} />;
                        })}
                    </ul>

                    {list.length > 1 && (
                        <div className="flex items-center justify-between px-2 pt-2 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm">
                            <button
                                type="button"
                                onClick={handleMobilePrev}
                                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 active:scale-95 transition-all cursor-pointer hover:border-brand-primary hover:text-brand-primary"
                                aria-label="Previous service"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Indicator dots */}
                            <div className="flex items-center gap-1.5">
                                {list.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMobileIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${i === mobileIndex ? "bg-brand-primary w-5" : "bg-slate-300 w-2"
                                            }`}
                                        aria-label={`Go to service ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleMobileNext}
                                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 active:scale-95 transition-all cursor-pointer hover:border-brand-primary hover:text-brand-primary"
                                aria-label="Next service"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Tablet / Desktop View: max 3 cards per page + Next/Prev controls if > 3 */}
                <div className="hidden sm:block space-y-6">
                    <ul className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {desktopVisibleCards.map((service, i) => (
                            <ServiceCard
                                key={service.slug}
                                service={service}
                                index={desktopPage * DESKTOP_PAGE_SIZE + i}
                            />
                        ))}
                    </ul>

                    {totalDesktopPages > 1 && (
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleDesktopPrev}
                                className="flex items-center justify-center w-11 h-11 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-brand-primary hover:text-brand-primary active:scale-95 transition-all shadow-sm cursor-pointer"
                                aria-label="Previous page of services"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Desktop page indicator dots */}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalDesktopPages }).map((_, pageIdx) => (
                                    <button
                                        key={pageIdx}
                                        onClick={() => setDesktopPage(pageIdx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${pageIdx === desktopPage ? "bg-brand-primary w-7" : "bg-slate-300 w-2.5 hover:bg-slate-400"
                                            }`}
                                        aria-label={`Go to page ${pageIdx + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleDesktopNext}
                                className="flex items-center justify-center w-11 h-11 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:border-brand-primary hover:text-brand-primary active:scale-95 transition-all shadow-sm cursor-pointer"
                                aria-label="Next page of services"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {limit && services.length > limit && (
                    <p className="mt-8 text-center text-sm font-semibold text-brand-muted">
                        {services.length - limit} more services available
                    </p>
                )}
            </div>
        </section>
    );
}
