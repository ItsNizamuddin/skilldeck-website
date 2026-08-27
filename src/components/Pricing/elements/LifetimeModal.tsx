"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Zap, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, Building2, Globe, GraduationCap, Users } from "lucide-react";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";
import GenericForm from "@/components/Forms/GenericForm";
import Image from "next/image";
import img from "../../../../public/heroSection/woman_laptop.webp";

interface LifetimeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LifetimeModal({ isOpen, onClose }: LifetimeModalProps) {
    const [step, setStep] = useState<"overview" | "form">("overview");

    // Reset step when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setStep("overview");
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const lifetimeBenefits = [
        {
            icon: Globe,
            title: "Website & Course CMS",
            desc: "Custom domains, fast SEO-optimized landing pages, and automated course catalogs."
        },
        {
            icon: GraduationCap,
            title: "LMS & Certifications",
            desc: "Interactive video lessons, quizzes, practice tests, and auto-generated certificates."
        },
        {
            icon: Users,
            title: "Integrated CRM & Leads",
            desc: "Capture website leads, track pipelines, automated follow-ups & student analytics."
        },
        {
            icon: Zap,
            title: "All Future Updates Included",
            desc: "Never pay for version upgrades or new features. Everything released is yours forever."
        },
        {
            icon: ShieldCheck,
            title: "VIP 1-on-1 Onboarding",
            desc: "Dedicated account manager, seamless data migration, and priority priority support."
        },
        {
            icon: Building2,
            title: "Massive Cost Savings",
            desc: "Eliminates monthly and annual recurring software bills forever with one single payment."
        }
    ];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-lg lg:max-w-2xl z-10 animate-fade-in-up bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center lg:flex-row max-h-[85vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 border border-gray-200 rounded-full p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors z-30 bg-white/90 shadow-sm"
                    aria-label="Close modal"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Step 1: Lifetime Overview Popup */}
                {step === "overview" && (
                    <div className="w-full p-4 lg:p-5 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
                        {/* Header */}
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/70 rounded-full px-3.5 py-1.5 shadow-xs">
                                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                    Exclusive Lifetime Deal
                                </span>
                            </div>

                            <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                                Pay Once. Own Skilldeck{" "}
                                <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                    Forever.
                                </span>
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                                Get complete, unrestricted access to the entire Skilldeck suite for your institute with zero recurring subscription fees.
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 my-2">
                            {lifetimeBenefits.map((b, i) => {
                                const IconComponent = b.icon;
                                return (
                                    <div
                                        key={i}
                                        className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-purple-200 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-start text-left group"
                                    >
                                        <div className="flex items-center gap-2">

                                            <div className="w-8 h-8 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                                        </div>
                                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">{b.desc}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA Area */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>Custom license pricing tailored to your team size & branches</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep("form")}
                                className="w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-xs  text-white bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] hover:brightness-110 shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Contact Sales Team</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Contact Sales Form View */}
                {step === "form" && (
                    <div className="w-full flex flex-col lg:flex-row max-h-[92vh]">
                        {/* Left Visual Panel */}
                        <div className="hidden lg:flex relative w-[36%] self-stretch bg-gradient-to-br from-brand-dark to-slate-900 text-white overflow-hidden p-6 flex-col justify-between">
                            {/* Interactive Dot Grid Background */}
                            <InteractiveDotBackground dotColor="rgba(255, 255, 255, 0.12)" radius={1.2} gap={16} />

                            {/* Decorative Ambient Glow Orbs */}
                            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

                            {/* Text & Features Content */}
                            <div className="relative z-10 space-y-3">
                                <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm w-fit border border-white/10">
                                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                                    <span className="text-[11px] font-bold tracking-wide text-white">Lifetime Deal</span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold tracking-tight">Claim Your Deal</h3>
                                    <p className="text-[11px] text-white/70 leading-relaxed">
                                        Lock in permanent lifetime access with no monthly fees. Our team will contact you within 2 hours.
                                    </p>
                                </div>

                                <div className="space-y-2 pt-1 text-[11px] text-white/85">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>Full feature unlocks across all modules</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>Free lifetime platform upgrades</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        <span>Dedicated onboarding specialist</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Half Image - Big and cropped from laptop up */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-center z-10 pointer-events-none translate-y-[22%]">
                                <Image
                                    src={img}
                                    alt="Illustration"
                                    className="w-[70%] max-w-[260px] h-auto object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Form Area */}
                        <div className="p-5 relative flex-1 bg-white overflow-y-auto flex flex-col w-full max-h-[85vh] lg:max-h-[80vh]">
                            <div className="text-center mb-4">
                                <h2 className="text-xl 2xl:text-2xl font-bold text-gray-900">
                                    Get Lifetime{" "}
                                    <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                        Access Deal
                                    </span>
                                </h2>
                                <p className="text-gray-500 text-xs 2xl:text-sm mt-1.5">
                                    Fill out your details below and our sales team will reach out with customized lifetime plan pricing.
                                </p>
                            </div>

                            <GenericForm
                                formtype="enquiry"
                                onClose={onClose}
                                selectedCourse="Lifetime Access Plan"
                                formId="lifetime-deal-form"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
