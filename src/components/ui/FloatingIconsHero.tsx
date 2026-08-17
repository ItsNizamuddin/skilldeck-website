"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import dynamic from "next/dynamic";
const FloatingIconsWrapper = dynamic(() => import("./FloatingIconsWrapper"), {
    ssr: false,
    loading: () => null,
});

export interface FloatingIconsHeroProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    ctaText: string;
    ctaHref: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
    className?: string;
}

export default function FloatingIconsHero({
    className,
    title,
    subtitle,
    ctaText,
    ctaHref,
    secondaryCtaText,
    secondaryCtaHref,
}: FloatingIconsHeroProps) {
    return (
        <section
            className={cn(
                "relative w-full lg:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-10 md:py-24",
                className
            )}
        >
            {/* Background Blur Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl" />
            </div>

            {/* Desktop-only floating interactive icons layer — constrained to container */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden">
                <div className="relative max-w-7xl mx-auto h-full">
                    <React.Suspense fallback={null}>
                        <FloatingIconsWrapper />
                    </React.Suspense>
                </div>
            </div>

            {/* Content Container (Server-rendered for LCP optimizations) */}
            <div className="relative z-20 text-center container px-4 md:max-w-4xl mx-auto flex flex-col items-center">
                <div className="mb-4 lg:mb-6">
                    <h1 className="heading-hero">
                        {title}
                    </h1>
                </div>

                <p className="max-w-2xl body-large">
                    {subtitle}
                </p>

                <div className="mt-4 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    {secondaryCtaText && secondaryCtaHref && (
                        <Button
                            as="a"
                            href={secondaryCtaHref}
                            variant="outline"
                            size="md"
                            className="px-8 py-3.5 text-sm md:text-base font-semibold w-full sm:w-auto text-center"
                        >
                            {secondaryCtaText}
                        </Button>
                    )}
                    <Button
                        as="a"
                        href={ctaHref}
                        variant="primary"
                        size="md"
                        className="px-8 py-3.5 text-sm md:text-base font-semibold gap-2 w-full sm:w-auto justify-center flex items-center"
                    >
                        {ctaText}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
