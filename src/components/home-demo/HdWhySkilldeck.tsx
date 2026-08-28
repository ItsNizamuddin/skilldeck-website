import { Code, DollarSign, Puzzle, Rocket, UserMinus, Wrench, Building2, Sparkles, Users } from "lucide-react";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";
import HdGradientText from "./HdGradientText";

const benefits = [
    { icon: DollarSign, title: "No Repetitive Development Costs", description: "Stop paying for the same features over and over. Everything is built-in." },
    { icon: Wrench, title: "No Maintenance Headaches", description: "We handle all updates, security patches, and infrastructure." },
    { icon: UserMinus, title: "No Product Managers Needed", description: "The platform is ready to use — no custom development required." },
    { icon: Code, title: "No Tech Agencies", description: "Build and manage everything yourself with zero coding." },
    { icon: Puzzle, title: "No Custom Integrations", description: "Everything works together out of the box — no integration overhead." },
    { icon: Rocket, title: "Market-Ready in No Time", description: "Launch your training business faster than ever before." },
];

const clientLogos = [
    { spriteClass: "bg-kh", alt: "KnowledgeHut" },
    { spriteClass: "bg-il", alt: "Invensis Learning" },
    { spriteClass: "bg-sta", alt: "StarAgile" },
    { spriteClass: "bg-sax", alt: "Simpliaxis" },
    { spriteClass: "bg-pal", alt: "PremierAgile" },
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

const stats = [
    { icon: Users, value: "500+", label: "Institutes Trust Us" },
    { icon: Building2, value: "30+", label: "Enterprise Clients" },
    { icon: Sparkles, value: "5+", label: "Years Experience" },
];

export default function HdWhySkilldeck() {
    return (
        <section id="why-skilldeck" className="scroll-mt-24 relative overflow-hidden bg-[#05060f] section-y">
            <InteractiveDotBackground dotColor="#2a2f45" gap={20} />
            <div aria-hidden="true" className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 lg:px-0 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <span className="inline-flex items-center bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                        Why Skilldeck
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                        Do more with just <HdGradientText>5–10% of the resources</HdGradientText>
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        We built Skilldeck with a bold vision: what if a training company could run everything with
                        just 5–10% of the manpower, money, and time normally required?{" "}
                        <span className="text-white font-semibold">We&apos;re proud to say — we achieved it.</span>
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                    {benefits.map((b) => (
                        <div
                            key={b.title}
                            className="group rounded-2xl p-5 border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0">
                                    <b.icon className="w-5 h-5 text-brand-primary" />
                                </span>
                                <h3 className="text-sm font-bold text-white leading-snug">{b.title}</h3>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">{b.description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-14 pb-14 border-b border-white/10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <stat.icon className="w-4 h-4 text-brand-secondary" />
                                <span className="text-2xl font-extrabold text-white">{stat.value}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Logo marquee */}
                <div>
                    <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                        Proven by industry experience — including
                    </p>
                    <p className="text-center text-sm text-slate-400 max-w-xl mx-auto mb-6">
                        Skilldeck is the result of several years of hands-on experience working with leading
                        training brands.
                    </p>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#05060f] via-[#05060f]/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#05060f] via-[#05060f]/80 to-transparent z-10 pointer-events-none" />
                        <div className="flex overflow-hidden py-2">
                            <div className="flex animate-scroll-dark gap-4 md:gap-6" style={{ animationDuration: "60s" }}>
                                {[...clientLogos, ...clientLogos].map((client, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl px-5 py-3 flex items-center justify-center h-14 md:h-16 border border-white/10 flex-shrink-0"
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
                    <p className="text-center text-sm text-slate-500 mt-4">
                        And <span className="text-brand-secondary font-semibold">30+ other training institutes</span>
                    </p>
                    <p className="text-center text-sm text-slate-500 mt-2">
                        From technology to marketing to automation — Skilldeck is built on{" "}
                        <span className="text-white font-semibold">real-world challenges, not assumptions.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
