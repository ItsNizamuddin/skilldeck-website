import { Award, Building2, Sparkles, Users } from "lucide-react";

// CSS sprite classes mapped from the frontend's logo sprite sheet
const logos = [
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

const stats = [
    { icon: Users, value: "500+", label: "Companies Trust Us" },
    { icon: Building2, value: "30+", label: "Enterprise Clients" },
    { icon: Sparkles, value: "5+", label: "Years Experience" },
];

const ProvenExperience = () => {
    return (
        <section className="py-8 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-2 xl:px-0">

                {/* Header + Stats Row */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 md:mb-10">

                    {/* Left — Title */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-3">
                            <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                            <span className="text-amber-700 text-xs font-semibold uppercase tracking-wide">
                                Trusted Partners
                            </span>
                        </div>

                        <h2 className="heading-section mb-2">
                            Proven by{" "}
                            <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                Industry Experience
                            </span>
                        </h2>

                        <p className="body-small max-w-lg">
                            Skilldeck is the result of several years of hands-on experience working with
                            leading training brands, including:
                        </p>
                    </div>

                    {/* Right — Stats */}
                    <div className="flex items-center justify-center lg:justify-end gap-6 md:gap-10 flex-shrink-0">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="text-center">
                                    <div className="flex items-center justify-center gap-1.5 mb-1">
                                        <Icon className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                                        <span className="heading-section2 text-brand-dark">{stat.value}</span>
                                    </div>
                                    <span className="body-extrasmall capitalize tracking-wider">{stat.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Logo Carousel */}
                <div className="relative">
                    {/* Edge fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                    {/* Scrolling row */}
                    <div className="flex overflow-hidden py-2">
                        <div className="flex animate-scroll gap-4 md:gap-6" style={{ animationDuration: "60s" }}>
                            {[...logos, ...logos].map((logo, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-xl px-5 py-3 flex items-center justify-center h-14 md:h-16 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 flex-shrink-0"
                                    title={logo.alt}
                                    role="img"
                                    aria-label={logo.alt}
                                >
                                    <div className={`${logo.spriteClass} scale-75 md:scale-90`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom tagline */}
                <div className="text-center mt-6 md:mt-8 space-y-2">
                    <p className="body-medium">
                        And{" "}
                        <span className="text-brand-primary font-semibold">30+ other training companies</span>
                    </p>
                    <p className="body-small">
                        From technology to marketing to automation — Skilldeck is built on{" "}
                        <span className="text-brand-dark font-semibold">real-world challenges, not assumptions.</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProvenExperience;
