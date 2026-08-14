import { ChartColumn, Check, CheckCircle2, Sparkles, X } from "lucide-react";
import Image from "next/image";
import skilldeckLogo from "../../../../public/logos/mainlogo.svg";
import withoutSkilldeckImage from "../../../../public/theProblem/withandwithout.webp";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";

const withoutSkilldeck = [
    "10+ different software subscriptions",
    "Large team to manage operations",
    "High development costs",
    "Constant maintenance issues",
    "Disconnected data & workflows",
    "Thin or negative margins",
];

const withSkilldeck = [
    "One unified platform",
    "Lean team (5–10% of typical size)",
    "Zero development costs",
    "No maintenance headaches",
    "All data in one place",
    "Healthy, sustainable margins",
];

const featurePills = [
    "No juggling tools.",
    "No heavy tech investments.",
    "No operational nightmares.",
];

const SkilldSolution = () => {
    return (
        <section className="bg-white py-10 md:py-16 ">
            <div className="container mx-auto px-2 xl:px-0">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-medium">
                            <Sparkles className="w-4 h-4" aria-hidden="true" />
                            The Skilldeck Solution
                        </span>
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-bold text-brand-dark mb-2">
                        Everything You Need.
                    </h2>
                    <h2 className="heading-section2 font-bold mb-4">
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                            One Dashboard. One Cost.
                        </span>
                    </h2>

                    <p className="body-medium max-w-3xl mx-auto">
                        Skilldeck eliminates up to{" "}
                        <span className="font-bold text-brand-dark">90% of unnecessary expenses</span>{" "}
                        by replacing multiple tools, teams, and manual processes with a single, powerful, AI-enabled platform.
                    </p>
                </div>

                {/* Blue Banner */}
                <div className="bg-[#0a0f1d] rounded-2xl p-4 md:p-10 mb-10 md:mb-14">

                    <div className="text-center">
                        <h3 className="heading-section2 text-white mb-3">
                            Just one system that runs your entire training business end-to-end.
                        </h3>
                        <p className="body-medium text-blue-100 mb-6">
                            From website to LMS, CRM to marketing, payments to analytics.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            {featurePills.map((pill) => (
                                <div
                                    key={pill}
                                    className="bg-white rounded-md px-2 md:px-6 py-2 flex items-center gap-2"
                                >
                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
                                    <span className="body-small text-brand-dark font-medium">{pill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-0">

                    {/* Without Skilldeck */}
                    <div className="col-span-2 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm md:mr-10">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-2/5 hidden md:block flex-shrink-0">
                                <Image
                                    src={withoutSkilldeckImage}
                                    alt="Fragmented tech stack without Skilldeck"
                                    width={400}
                                    height={400}
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                                        <ChartColumn className="w-5 h-5 text-white" aria-hidden="true" />
                                    </div>
                                    <h4 className="heading-section2">Without Skilldeck</h4>
                                </div>
                                <ul className="space-y-2">
                                    {withoutSkilldeck.map((item) => (
                                        <li key={item} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                                <X className="w-3 h-3 text-red-500" aria-hidden="true" />
                                            </div>
                                            <span className="body-small">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* With Skilldeck */}
                    <div className="bg-[#0a0f1d] rounded-2xl p-5 md:p-6 shadow-lg relative overflow-hidden">
                        <InteractiveDotBackground />

                        {/* Background elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] pointer-events-none" />
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="space-y-4 mb-5">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                                    <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <h4 className="heading-section2 text-white">With</h4>
                                <div className="bg-white py-1 px-3 rounded-xl">
                                    <Image
                                        src={skilldeckLogo}
                                        alt="Skilldeck"
                                        className="h-8 w-auto"
                                        height={20}
                                        width={100}
                                        style={{ width: 'auto', height: 'auto' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-2">
                            {withSkilldeck.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5">
                                        <Check className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                                    </div>
                                    <span className="body-small text-white/90">{item}</span>
                                </li>
                            ))}
                        </ul>
                        {/* Decorative circle */}
                        <div className="hidden md:block bg-white/10 h-40 w-40 rounded-full absolute -right-12 -top-12 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkilldSolution;
