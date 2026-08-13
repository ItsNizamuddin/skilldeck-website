"use client";

import { useEffect, useState } from "react";

interface PartnerLogosProps {
    showBorder?: boolean;
    className?: string;
    title?: string;
}

export default function PartnerLogos({ 
    showBorder = true, 
    className = "", 
    title = "Top Training Providers on Skilldeck" 
}: PartnerLogosProps) {
    const [partnerLogos, setPartnerLogos] = useState<{ src: string; alt: string }[]>([]);

    useEffect(() => {
        const getFallbackLogos = () => [
            { src: "/logos/mainlogo.svg", alt: "SkillDeck" }
        ];

        const fetchPartners = async () => {
            try {
                const res = await fetch("/api/tenants?fields=logo,legalName&limit=15");
                const result = await res.json();
                if (result.data) {
                    const logos = result.data
                        .filter((t: any) => t.logo)
                        .map((t: any) => ({
                            src: t.logo,
                            alt: t.legalName || t.name || "Training Partner"
                        }));
                    setPartnerLogos(logos.length > 0 ? logos : getFallbackLogos());
                } else {
                    setPartnerLogos(getFallbackLogos());
                }
            } catch (error) {
                console.error("Error fetching partner logos:", error);
                setPartnerLogos(getFallbackLogos());
            }
        };
        fetchPartners();
    }, []);

    if (partnerLogos.length === 0) return null;

    return (
        <div className={`w-full ${showBorder ? "mt-12 pt-10 border-t border-indigo-50/50" : ""} ${className}`}>
            <p className="text-center text-sm font-semibold text-brand-muted uppercase tracking-widest mb-8">
                {title}
            </p>

            <div className="relative overflow-hidden">
                {/* Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden py-2">
                    <div className="flex animate-scroll gap-12 items-center">
                        {/* Duplicate the logos for seamless scrolling */}
                        {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 transition-all duration-300 transform hover:scale-110 cursor-pointer w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                                title={logo.alt}
                            >
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="max-w-full max-h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
