"use client";

import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { Button } from "@/components/ui/Button";
import { ArrowUp, Check, Sparkles } from "lucide-react";
import Link from "next/link";

const features = [
    "No setup fees",
    "Free migration",
    "24/7 support",
];

const FooterCTA = () => {
    const { openModal } = useLeadModal();
    return (
        <div className="relative z-10 pt-12  pb-12 ">
            <div className="container mx-auto px-2 xl:px-0">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-transparent backdrop-blur-[1.5px] border border-white/20 rounded-full px-4 py-2 mb-4">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-200 text-xs">Ready to Transform Your Business?</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        Stay Ahead. Stay Focused.
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base mb-6 max-w-2xl mx-auto">
                        Skilldeck is built for trainers & training institutes who want to focus on what truly matters — <span className="text-white font-semibold">delivering great training and growing their business.</span>
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8 text-slate-300 text-sm">
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-slate-400" />
                            Stop managing tools.
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-slate-400" />
                            Stop wasting money.
                        </span>
                        <span className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-slate-400" />
                            Start scaling with Skilldeck.
                        </span>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-4 mb-6">
                        <Button
                            as={Link}
                            href="/register"
                            variant="primary"
                            className="inline-flex items-center gap-2 text-sm md:text-base text-white px-8 py-3 h-12 font-medium"
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
                            className="inline-flex bg-transparent backdrop-blur-[1.5px] items-center gap-2 border-slate-700 text-white hover:text-white hover:backdrop-blur-[1px] text-sm md:text-base px-8 py-3 h-12 font-medium"
                        >
                            Talk to Sales
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {features.map((feature, index) => (
                            <span key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                                </div>
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterCTA;
