"use client";

import Link from "next/link";
import { ArrowRight, Building2, Gauge, Users2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import HdGradientText from "./HdGradientText";
import HdToolsConverge from "./HdToolsConverge";

const trustStats = [
    { icon: Users2, value: "500+", label: "Institutes trust us" },
    { icon: Building2, value: "30+", label: "Enterprise clients" },
    { icon: Gauge, value: "90%", label: "Lower operating cost" },
];

export default function HdHero() {
    return (
        <section className="relative overflow-hidden bg-white pt-28 md:pt-36 pb-12 md:pb-16 2xl:pb-20">
            {/* Soft brand wash — light, not a dark slab */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-32 w-[30rem] h-[30rem] rounded-full bg-brand-primary/[0.07] blur-[110px]" />
                <div className="absolute top-10 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-secondary/[0.07] blur-[110px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-0 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                    {/* Left — narrative */}
                    <div className="lg:col-span-6">
                        <span className="badge-brand mb-6">The Operating System for Training Institutes</span>

                        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-brand-dark mb-5">
                            One Platform.
                            <br />
                            <HdGradientText>Zero Chaos.</HdGradientText>
                        </h1>

                        <p className="text-base md:text-lg text-brand-muted max-w-xl leading-relaxed mb-4">
                            90% of training institutes overspend on the wrong technology, bloated marketing teams,
                            and fragmented tools.
                        </p>

                        <p className="text-base md:text-lg text-brand-muted max-w-xl leading-relaxed mb-8">
                            <span className="text-brand-dark font-semibold">Skilldeck replaces 10+ tools</span> with
                            one powerful platform — and runs your business at up to{" "}
                            <span className="text-brand-dark font-semibold">90% lower cost</span>.
                        </p>

                        {/* Full-width stacked on phones, side by side from sm up */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-10">
                            <Button
                                as={Link}
                                href="/register"
                                variant="primary"
                                size="lg"
                                className="rounded-xl font-bold w-full sm:w-auto"
                            >
                                Experience the Platform Free
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button
                                as="a"
                                href="#features"
                                variant="outline-primary"
                                size="lg"
                                className="rounded-xl w-full sm:w-auto"
                            >
                                Explore Features
                            </Button>
                        </div>

                        {/* Trust stats */}
                        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4 pt-7 border-t border-slate-200">
                            {trustStats.map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center text-center gap-1 sm:flex-row sm:items-center sm:text-left sm:gap-2.5">
                                    <stat.icon className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                                    <div className="leading-tight">
                                        <div className="text-base font-extrabold text-brand-dark">{stat.value}</div>
                                        <div className="text-[11px] text-brand-muted font-medium">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — animated "10+ tools become one" visual, cycling through the
                        full platform feature set rather than a fixed handful. */}
                    <div className="lg:col-span-6">
                        <div className="relative mx-auto max-w-lg">
                            <HdToolsConverge />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
