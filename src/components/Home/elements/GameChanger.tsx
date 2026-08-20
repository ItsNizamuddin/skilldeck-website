import { Code, DollarSign, Puzzle, Rocket, UserMinus, Wrench } from "lucide-react";

const benefits = [
    {
        icon: DollarSign,
        title: "No Repetitive Development Costs",
        description: "Stop paying for the same features over and over. Everything is built-in.",
    },
    {
        icon: Wrench,
        title: "No Maintenance Headaches",
        description: "We handle all updates, security patches, and infrastructure.",
    },
    {
        icon: UserMinus,
        title: "No Product Managers Needed",
        description: "The platform is ready to use — no custom development required.",
    },
    {
        icon: Code,
        title: "No Tech Agencies",
        description: "Build and manage everything yourself with zero coding.",
    },
    {
        icon: Puzzle,
        title: "No Custom Integrations",
        description: "Everything works together out of the box — no integration overhead.",
    },
    {
        icon: Rocket,
        title: "Market-Ready in No Time",
        description: "Launch your training business faster than ever before.",
    },
];

// CSS sprite classes mapped from the logo sprite sheet
const clientLogos = [
    { spriteClass: "bg-kh", alt: "KnowledgeHut" },
    { spriteClass: "bg-il", alt: "Invensis Learning" },
    { spriteClass: "bg-sta", alt: "StarAgile" },
    { spriteClass: "bg-sax", alt: "Simpliaxis" },
    { spriteClass: "bg-pal", alt: "PremierAgile" },
    { spriteClass: "bg-aa", alt: "AA" },
    { spriteClass: "bg-bt", alt: "Bells" },
    { spriteClass: "bg-vf", alt: "VLSI First" },
    { spriteClass: "bg-lnt", alt: "LearnNthrive" },
    { spriteClass: "bg-eg", alt: "EG" },
    { spriteClass: "bg-sd", alt: "SD" },
    { spriteClass: "bg-sa", alt: "SA" },
    { spriteClass: "bg-agilespark", alt: "AgileSpark" },
    { spriteClass: "bg-skilldeck", alt: "Skilldeck" },
    { spriteClass: "bg-skilluped", alt: "SkillUped" },
    { spriteClass: "bg-vlsifirst", alt: "VLSIFirst" },
    { spriteClass: "bg-vlsiguru", alt: "VLSIGuru" },
];

import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";

const GameChanger = () => {
    return (
        <section className="pt-20 pb-16 sm:pt-32 sm:pb-20 lg:pt-20 lg:pb-24 bg-[#0a0f1d] relative overflow-hidden" id="why-skilldeck">
            {/* Interactive Dot Grid Background */}
            <InteractiveDotBackground />

            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container max-w-7xl mx-auto px-4 xl:px-0 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center justify-center mb-4">
                        <span className="inline-flex items-center bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium tracking-wide">
                            Why Skilldeck
                        </span>
                    </div>
                    <h2 className="heading-section text-white mb-6">
                        Why Skilldeck Is a{" "}
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                            Game Changer
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 font-medium mb-3">
                        Do More With Just 5–10% of the Resources
                    </p>
                    <p className="body-medium text-slate-400">
                        We built Skilldeck with a bold vision: What if a training company could run everything
                        with just 5–10% of the manpower, money, and time normally required?
                    </p>
                    <p className="text-base md:text-lg text-brand-primary font-semibold mt-4">
                        We&apos;re proud to say — we achieved it.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-transparent backdrop-blur-[1.5px] rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-slate-800/50"
                            >
                                {/* Icon and Title */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-brand-primary" aria-hidden="true" />
                                    </div>
                                    <h3 className="body-medium font-semibold text-white">
                                        {benefit.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="body-small text-slate-400">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Market-ready Badge */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-transparent backdrop-blur-[1.5px] border border-white/10 rounded-2xl px-8 py-6">
                        <p className="heading-section2 text-white">
                            You are{" "}
                            <span className="capitalize bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                market-ready
                            </span>{" "}
                            in no time.
                        </p>
                    </div>
                </div>

                {/* Experience section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="heading-section2 text-white mb-4">
                            Proven by Industry Experience
                        </h3>
                        <p className="body-medium text-slate-400">
                            Skilldeck is the result of several years of hands-on experience working with
                            leading training brands, including:
                        </p>
                    </div>

                    {/* Client logos - Auto-scrolling carousel */}
                    <div className="relative">
                        {/* Gradient Fades */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#0a0f1d] via-[#0a0f1d]/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#0a0f1d] via-[#0a0f1d]/80 to-transparent z-10 pointer-events-none" />

                        {/* Scrolling Logos */}
                        <div className="flex overflow-hidden py-4">
                            <div className="flex animate-scroll-dark gap-4 md:gap-6" style={{ animationDuration: "60s" }}>
                                {/* Double array for infinite scrolling */}
                                {[...clientLogos, ...clientLogos].map((client, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-xl px-5 py-3 flex items-center justify-center h-14 md:h-16 border border-white/10 hover:border-brand-primary/50 transition-all duration-300 flex-shrink-0"
                                        title={client.alt}
                                        role="img"
                                        aria-label={client.alt}
                                    >
                                        <div className={`${client.spriteClass} scale-75 md:scale-90`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <p className="body-medium text-slate-400">
                            And <span className="text-brand-primary font-semibold">30+ other training institutes</span>
                        </p>
                    </div>

                    {/* Bottom message */}
                    <div className="mt-8 text-center">
                        <p className="body-small text-slate-400 italic">
                            From technology to marketing to automation — Skilldeck is built on{" "}
                            <span className="text-white not-italic font-semibold">
                                real-world challenges, not assumptions.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GameChanger;
