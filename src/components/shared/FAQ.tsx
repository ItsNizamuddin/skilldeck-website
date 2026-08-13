"use client";

import { HelpCircle, MessageCircleQuestion, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    title: string;
    value: string;
}

interface FAQProps {
    items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Split items into two columns for desktop
    const midpoint = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, midpoint);
    const rightItems = items.slice(midpoint);

    const renderItem = (item: FAQItem, index: number) => {
        const isOpen = openIndex === index;

        return (
            <div
                key={index}
                className={`group rounded-xl transition-all duration-300 border ${isOpen
                    ? 'bg-white shadow-md border-brand-primary/20'
                    : 'bg-white/60 border-transparent hover:bg-white hover:border-gray-100 hover:shadow-sm'
                    }`}
            >
                <button
                    onClick={() => toggle(index)}
                    className="w-full text-left px-4 md:px-5 py-4 flex items-start gap-3 cursor-pointer"
                >
                    {/* Number badge */}
                    <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black mt-0.5 transition-all duration-300 ${isOpen
                        ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/20'
                        : 'bg-gray-100 text-gray-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                        }`}>
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                        <span className={`text-sm font-bold leading-snug block transition-colors duration-200 ${isOpen ? 'text-[#171717]' : 'text-[#171717]/85 group-hover:text-[#171717]'
                            }`}>
                            {item.title}
                        </span>

                        {/* Answer with smooth expand */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="border-t border-gray-100 pt-3">
                                <div
                                    className="text-[#171717]/90 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-1"
                                    dangerouslySetInnerHTML={{ __html: item.value }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Toggle icon */}
                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${isOpen
                        ? 'bg-brand-primary text-white'
                        : 'bg-gray-100 text-gray-700 group-hover:bg-brand-primary/10 group-hover:text-brand-primary'
                        }`}>
                        {isOpen ? <Minus className="w-3.5 h-3.5" strokeWidth={2.5} /> : <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />}
                    </div>
                </button>
            </div>
        );
    };

    return (
        <section className="py-8 md:py-16 bg-[#FAFAFA] text-[#171717] rounded-3xl border border-gray-100">
            <div className="container mx-auto px-2 md:px-0">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-brand-primary/10 shadow-sm mb-4">
                        <MessageCircleQuestion className="w-4 h-4 text-brand-primary" />
                        <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">FAQ</span>
                    </div>
                    <h2 className="heading-section font-black tracking-tight leading-tight mb-2 font-sans">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[#171717]/85 text-sm max-w-lg mx-auto">
                        Everything you need to know. Can&apos;t find the answer? Reach out to us.
                    </p>
                </div>

                {/* FAQ Grid — 2 columns on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    {/* Left column */}
                    <div className="space-y-3 md:space-y-3">
                        {leftItems.map((item, i) => renderItem(item, i))}
                    </div>

                    {/* Right column */}
                    <div className="space-y-3 md:space-y-3">
                        {rightItems.map((item, i) => renderItem(item, i + midpoint))}
                    </div>
                </div>

                {/* Bottom help nudge */}
                <div className="mt-8 md:mt-12 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-[#171717]/85">
                        <HelpCircle className="w-4 h-4 text-brand-primary" />
                        <span>Still have questions? <a href="/contact-us" className="text-brand-primary font-semibold hover:underline underline-offset-2">Contact us</a></span>
                    </div>
                </div>
            </div>
        </section>
    );
}
