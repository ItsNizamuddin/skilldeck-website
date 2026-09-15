"use client";

import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { Button } from "@/components/ui/Button";
import { ArrowUp, Check, HeadphonesIcon, Cloud, Zap } from "lucide-react";
import Link from "next/link";

/** Reassurances shown under the buttons, each with its own accent tile. */
const features = [
    { label: "No setup fees", icon: Zap, tile: "bg-brand-primary/10 text-brand-primary" },
    { label: "Free migration", icon: Cloud, tile: "bg-rose-500/10 text-rose-500" },
    { label: "24/7 support", icon: HeadphonesIcon, tile: "bg-emerald-500/10 text-emerald-600" },
];

const promises = [
    "Stop managing tools.",
    "Stop wasting money.",
    "Start scaling with Skilldeck.",
];

const FooterCTA = () => {
    const { openModal } = useLeadModal();

    return (
        <div className="relative z-10 pt-12 md:pt-16">
            <div className="container mx-auto px-4 sm:px-2 xl:px-0">
                {/* A single raised card, so the CTA reads as its own panel rather than
                    as the first row of the link grid below it. */}
                <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-violet-50/50 p-6 md:p-10 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-5">
                            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                                <span aria-hidden="true" className="w-8 h-px bg-brand-primary/60" />
                                Ready to Transform Your Business?
                            </span>

                            <h2 className="text-2xl md:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
                                Stay Ahead.{" "}
                                <span className="bg-gradient-brand bg-clip-text text-transparent">Stay Focused.</span>
                            </h2>

                            <p className="text-sm md:text-base text-brand-muted leading-relaxed max-w-xl">
                                Skilldeck is built for trainers &amp; training institutes who want to focus on what truly
                                matters — <span className="text-brand-dark font-semibold">delivering great training and growing their business.</span>
                            </p>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                {promises.map((promise) => (
                                    <span key={promise} className="flex items-center gap-2 text-xs md:text-sm text-brand-muted">
                                        <Check className="w-4 h-4 text-brand-primary shrink-0" />
                                        {promise}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-5 pt-2">
                                {features.map(({ label, icon: Icon, tile }) => (
                                    <span key={label} className="flex items-center gap-2.5 text-sm font-semibold text-brand-dark">
                                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${tile}`}>
                                            <Icon className="w-4 h-4" />
                                        </span>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-3 lg:text-center">
                            <div className="flex flex-col sm:flex-row lg:justify-center gap-3">
                                <Button
                                    as={Link}
                                    href="/register"
                                    variant="primary"
                                    className="inline-flex items-center justify-center gap-2 text-sm md:text-base text-white px-8 py-3 h-12 font-semibold rounded-xl"
                                    rel="nofollow"
                                >
                                    Get Started Today
                                    <ArrowUp className="w-4 h-4 rotate-45" />
                                </Button>
                                <Button
                                    onClick={() => openModal({
                                        formTitle: "Talk to our Sales Team",
                                        formDescription: "Tell us about your training business goals and we will customize a plan for you.",
                                        source: "enquiry",
                                        formId: 1
                                    })}
                                    variant="outline"
                                    className="inline-flex items-center justify-center gap-2 text-sm md:text-base px-8 py-3 h-12 font-semibold rounded-xl"
                                >
                                    Talk to Sales
                                </Button>
                            </div>

                            <p className="text-xs text-brand-muted">
                                Trusted by 500+ training institutes worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterCTA;
