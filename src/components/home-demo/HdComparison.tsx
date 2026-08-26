import { Check, Sparkles, X } from "lucide-react";
import HdGradientText from "./HdGradientText";

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
                    <span className="badge-brand mb-5">Before & After</span>
                    <h2 className="heading-section mb-4">
                        No juggling tools. <HdGradientText>No operational nightmares.</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Just one system that runs your entire training business end-to-end — from website to LMS, CRM to
                        marketing, payments to analytics.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-[28px] overflow-hidden border border-slate-200 shadow-xl shadow-slate-900/5">
                    {/* Without */}
                    <div className="bg-white p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-red-500" />
                            </span>
                            <h3 className="text-lg font-bold text-brand-dark">Without Skilldeck</h3>
                        </div>
                        <ul className="space-y-3.5">
                            {withoutSkilldeck.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-brand-muted">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                                        <X className="w-3 h-3 text-red-400" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* With */}
                    <div className="relative bg-[#05060f] p-8 md:p-10 overflow-hidden">
                        <div aria-hidden="true" className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-brand-primary/25 blur-[100px]" />
                        <div className="relative z-10 flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]">
                                <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                            <h3 className="text-lg font-bold text-white">With Skilldeck</h3>
                        </div>
                        <ul className="relative z-10 space-y-3.5">
                            {withSkilldeck.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                                    <span className="shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                        <Check className="w-3 h-3 text-brand-primary" strokeWidth={3} />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Center VS badge */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-4 border-slate-50 shadow-lg items-center justify-center z-20">
                        <span className="text-xs font-black text-brand-dark tracking-tight">VS</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
