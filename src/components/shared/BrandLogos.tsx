import React from "react";

interface LogoItem {
    spriteClass: string;
    alt: string;
}

const logos: LogoItem[] = [
    { spriteClass: "bg-kh", alt: "KnowledgeHut" },
    { spriteClass: "bg-il", alt: "Invensis Learning" },
    { spriteClass: "bg-sta", alt: "StarAgile" },
    { spriteClass: "bg-sax", alt: "Simpliaxis" },
    { spriteClass: "bg-pal", alt: "PremierAgile" },
    { spriteClass: "bg-bt", alt: "Bells" },
    { spriteClass: "bg-vf", alt: "VLSI First" },
    { spriteClass: "bg-lnt", alt: "LearnNthrive" },
    { spriteClass: "bg-aa", alt: "AA" },
    { spriteClass: "bg-eg", alt: "EG" },
    { spriteClass: "bg-sd", alt: "SD" },
    { spriteClass: "bg-sa", alt: "SA" },
    { spriteClass: "bg-agilespark", alt: "AgileSpark" },
    { spriteClass: "bg-skilldeck", alt: "Skilldeck" },
    { spriteClass: "bg-skilluped", alt: "SkillUped" },
    { spriteClass: "bg-vlsifirst", alt: "VLSIFirst" },
    { spriteClass: "bg-vlsiguru", alt: "VLSIGuru" },
];

interface BrandLogosProps {
    title?: string;
    className?: string;
}

export default function BrandLogos({
    title = "Top Verified Partners on Skilldeck",
    className = "",
}: BrandLogosProps) {
    return (
        <div className={`w-full ${className}`}>
            {title && (
                <div className="text-center mb-8">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                        {title}
                    </p>
                </div>
            )}

            <div className="relative overflow-hidden">
                {/* Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                {/* Scrolling Logos */}
                <div className="flex overflow-hidden py-2">
                    <div className="flex animate-scroll gap-4 md:gap-6" style={{ animationDuration: "60s" }}>
                        {/* First set */}
                        {logos.map((logo, index) => (
                            <div
                                key={`first-${index}`}
                                className="group bg-white rounded-xl px-5 py-3 flex items-center justify-center h-14 md:h-16 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex-shrink-0"
                                title={logo.alt}
                            >
                                <div className={`${logo.spriteClass} scale-75 md:scale-90`} />
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {logos.map((logo, index) => (
                            <div
                                key={`second-${index}`}
                                className="group bg-white rounded-xl px-5 py-3 flex items-center justify-center h-14 md:h-16 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex-shrink-0"
                                title={logo.alt}
                            >
                                <div className={`${logo.spriteClass} scale-75 md:scale-90`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
