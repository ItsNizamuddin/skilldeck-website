import { Briefcase, CreditCard, Users, Wrench } from "lucide-react";
import Image from "next/image";
import HdGradientText from "./HdGradientText";
import disappointingResultsImage from "../../../public/home-demo/resultsremaindisappointing.png";
import wastedBudgetImage from "../../../public/home-demo/wastedbudget.png";
import risingCostsImage from "../../../public/home-demo/risingcosts.png";
import lostRevenueImage from "../../../public/home-demo/lostrevenue.png";

const costItems = [
    {
        icon: CreditCard,
        title: "Multiple software subscriptions",
        description: "LMS, CRM, email, website and analytics — each with its own recurring bill.",
        tint: "bg-violet-50 text-violet-600",
        num: "text-violet-500",
    },
    {
        icon: Users,
        title: "Large teams to manage simple tasks",
        description: "Headcount added just to keep disconnected tools and data in sync.",
        tint: "bg-blue-50 text-blue-600",
        num: "text-blue-500",
    },
    {
        icon: Briefcase,
        title: "Agencies to build & maintain systems",
        description: "External vendors billed for every change, fix and integration.",
        tint: "bg-indigo-50 text-indigo-600",
        num: "text-indigo-500",
    },
    {
        icon: Wrench,
        title: "Continuous development & maintenance",
        description: "Recurring development cycles that never quite reach done.",
        tint: "bg-amber-50 text-amber-600",
        num: "text-amber-500",
    },
];

const outcomes = [
    {
        label: "Wasted Budget",
        sub: "Money spent on tools that don't create impact.",
        image: wastedBudgetImage,
        // Soft blob behind the artwork + the accent bar, tuned per illustration.
        halo: "bg-violet-100/60",
        bar: "from-violet-500 to-purple-500",
    },
    {
        label: "Rising Costs",
        sub: "Costs keep going up, results stay flat.",
        image: risingCostsImage,
        halo: "bg-rose-100/50",
        bar: "from-rose-500 to-orange-400",
    },
    {
        label: "Lost Revenue",
        sub: "Leads slip through the cracks, opportunities missed.",
        image: lostRevenueImage,
        halo: "bg-blue-100/50",
        bar: "from-blue-500 to-indigo-500",
    },
];

export default function HdPayingFor() {
    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 lg:px-0">
                {/* Header — mirrors the Problem section's centred rhythm */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="badge-brand mb-5">The Hidden Cost</span>
                    <h2 className="heading-section mb-3">
                        You end up paying for <HdGradientText>everything except growth</HdGradientText>
                    </h2>
                    <p className="body-medium">
                        The spend stacks up long before any of it starts working together.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
                    {/* Left — numbered cost cards (layout flipped vs. the Problem section above,
                        so the two adjacent sections alternate instead of repeating) */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
                            {costItems.map((item, i) => (
                                <div
                                    key={item.title}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300"
                                >
                                    <span
                                        className={`absolute top-5 right-5 text-xs font-bold ${item.num}`}
                                        aria-hidden="true"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className={`w-12 h-12 rounded-2xl ${item.tint} flex items-center justify-center mb-4`}>
                                        <item.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="text-base font-bold text-brand-dark leading-snug mb-2 pr-8">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-brand-muted leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — the outcome of all that spend */}
                    <div className="lg:col-span-5">
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col justify-center">
                            <div className="rounded-2xl bg-slate-50/70 border border-slate-100 p-4 md:p-5">
                                <Image
                                    src={disappointingResultsImage}
                                    alt="Disconnected tools wired to a central dashboard, with several links broken"
                                    width={1254}
                                    height={723}
                                    className="object-contain w-full h-auto"
                                    sizes="(max-width: 1024px) 90vw, 33vw"
                                />
                            </div>
                            <p className="mt-6 text-center text-base md:text-lg font-bold text-brand-dark leading-snug">
                                And yet… <HdGradientText>results remain disappointing.</HdGradientText>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Outcome tiles — 3D illustration on a soft halo, centred copy, and a
                    gradient accent bar pinned to the bottom edge of the card. */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
                    {outcomes.map((outcome) => (
                        <div
                            key={outcome.label}
                            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white pt-8 px-4 md:px-6 pb-9 text-center flex flex-col items-center shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)] transition-all duration-300"
                        >
                            {/* Illustration on its halo. Sizes step down at sm — three
                                across on a small tablet leaves only ~190px per column. */}
                            <div className="relative w-full flex items-center justify-center mb-6">
                                <span
                                    aria-hidden="true"
                                    className={`absolute w-32 sm:w-28 md:w-36 lg:w-44 aspect-square rounded-full ${outcome.halo} blur-[2px]`}
                                />
                                <Image
                                    src={outcome.image}
                                    alt={outcome.label}
                                    width={260}
                                    height={260}
                                    className="relative w-36 sm:w-32 md:w-40 lg:w-48 aspect-square object-contain group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                                />
                            </div>

                            <h3 className="text-base md:text-xl font-extrabold text-brand-dark mb-2">{outcome.label}</h3>
                            <p className="text-xs md:text-sm text-brand-muted leading-relaxed max-w-[15rem]">
                                {outcome.sub}
                            </p>

                            {/* Accent bar */}
                            <span
                                aria-hidden="true"
                                className={`absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r ${outcome.bar}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
