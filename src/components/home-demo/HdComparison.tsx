import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Rocket, Sparkles, X } from "lucide-react";
import HdGradientText from "./HdGradientText";
import withoutImage from "../../../public/home-demo/without-skilldeck.png";
import withImage from "../../../public/home-demo/with-skilldeck.png";

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

export default function HdComparison() {
    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="badge-brand mb-5">Before &amp; After</span>
                    <h2 className="heading-section mb-4">
                        No juggling tools. <HdGradientText>No operational nightmares.</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Just one system that runs your entire training business end-to-end — from website to LMS, CRM to
                        marketing, payments to analytics.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-xl shadow-slate-900/5">
                    {/* Without */}
                    <div className="p-6 md:p-8 lg:p-10 bg-[linear-gradient(150deg,#fdf2f3_0%,#ffffff_62%)] border-b md:border-b-0 md:border-r border-slate-200">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                                <X className="w-5 h-5 text-red-500" strokeWidth={3} aria-hidden="true" />
                            </span>
                            <h3 className="heading-card">Without Skilldeck</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-5 lg:gap-4 items-center">
                            <Image
                                src={withoutImage}
                                alt="Overwhelmed training business owner juggling disconnected LMS, CRM, email, analytics and support tools"
                                className="w-full max-w-[260px] sm:max-w-none mx-auto h-auto mix-blend-multiply"
                                sizes="(max-width: 640px) 260px, (max-width: 1024px) 30vw, 280px"
                                placeholder="blur"
                            />
                            <ul className="space-y-2.5">
                                {withoutSkilldeck.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl bg-white border border-red-100 px-3.5 py-2.5 text-sm 2xl:text-base text-brand-muted shadow-sm shadow-red-500/5"
                                    >
                                        <X className="w-4 h-4 text-red-400 shrink-0" strokeWidth={3} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* With */}
                    <div className="p-6 md:p-8 lg:p-10 bg-[linear-gradient(210deg,#f6f4ff_0%,#ffffff_62%)]">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]">
                                <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                            <h3 className="heading-card">With Skilldeck</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-5 lg:gap-4 items-center">
                            <ul className="space-y-2.5">
                                {withSkilldeck.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl bg-white border border-brand-primary/15 px-3.5 py-2.5 text-sm 2xl:text-base text-brand-muted shadow-sm shadow-brand-primary/5"
                                    >
                                        <span className="shrink-0 w-4.5 h-4.5 rounded-full bg-brand-primary flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3.5} aria-hidden="true" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Image
                                src={withImage}
                                alt="Training business owner running everything from a single Skilldeck dashboard"
                                className="w-full max-w-[260px] sm:max-w-none mx-auto h-auto mix-blend-multiply"
                                sizes="(max-width: 640px) 260px, (max-width: 1024px) 30vw, 280px"
                                placeholder="blur"
                            />
                        </div>
                    </div>

                    {/* Center VS badge */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-4 border-slate-50 shadow-lg items-center justify-center z-20">
                        <span className="text-xs font-black text-brand-dark tracking-tight">VS</span>
                    </div>
                </div>

                {/* Closing CTA bar */}
                <div className="max-w-5xl mx-auto mt-6 md:mt-8 rounded-[22px] border border-brand-primary/15 bg-[#faf9ff] px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row items-center gap-5 md:gap-8">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]">
                        <Rocket className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                    <div className="flex-1 text-center md:text-left">
                        <p className="heading-card">Skilldeck helps you run smarter, grow faster, and scale sustainably.</p>
                        <p className="body-small mt-1">One platform. Total clarity. Better results.</p>
                    </div>
                    <Link
                        href="#pricing"
                        className="w-full md:w-auto shrink-0 rounded-xl px-6 py-3.5 font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/35 hover:-translate-y-0.5 transition-all duration-300 group bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]"
                    >
                        Explore Plans
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
