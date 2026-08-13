"use client";

import PricingSection from "@/components/Pricing/PricingSection";
import Footer from "@/components/shared/Footer";
import MainNavClient from "@/components/shared/Navbar/elements/MainNavClient";
import { PricingPlan } from '@/lib/plans';
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from "react";

interface PricingWrapperProps {
    plans: PricingPlan[];
    categories: any[];
    faqs: Array<{ question: string; answer: string }>;
}

export default function PricingWrapper({
    plans,
    categories,
    faqs
}: PricingWrapperProps) {
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            <MainNavClient isHidden={isNavbarHidden} categories={categories} />

            {/* Hero Section */}
            <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-3xl" />

                <div className="container mx-auto text-center relative z-10">
                    <div className="badge-brand mb-6">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Simple Pricing
                    </div>

                    <h1 className="heading-hero mb-4">
                        Choose the Perfect{' '}
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                            Plan for You
                        </span>
                    </h1>
                    <p className="body-large">
                        Start with a 14-day free trial. No credit card required.
                    </p>
                </div>
            </section>

            {/* Dynamic Pricing Section */}
            <PricingSection onToggleNavbar={setIsNavbarHidden} plans={plans} showHeading={false} />

            {/* FAQ Section */}
            {faqs && faqs.length > 0 && (
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pricing FAQs</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                                    <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                        <HelpCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-slate-600 pl-6 text-sm leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/faq" className="text-brand-600 font-medium hover:text-brand-700 transition-colors">
                                View all FAQs →
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Still have questions?
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-md mx-auto">
                                Our team is here to help you choose the right plan for your needs.
                            </p>
                            <Link
                                rel="nofollow"
                                href="/contact-us"
                                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                            >
                                Talk to Sales
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
