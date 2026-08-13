"use client";

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SectionTag from '../../../ui/SectionTag';

interface FAQItem {
    title: string;
    value: string;
}

interface CourseFAQProps {
    items: FAQItem[];
    tagline?: string;
    title?: string;
}

export default function CourseFAQ({
    items,
    tagline = "QUESTIONS",
    title = "The things people ask before enrolling"
}: CourseFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!items || items.length === 0) return null;

    return (
        <section className="py-6 md:py-10 bg-transparent text-[#1F2937]">
            <div className="container mx-auto ">
                {/* Header */}
                <div className="mb-6 space-y-2">
                    <SectionTag text={tagline} />
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#111827] leading-tight font-sans">
                        {title}
                    </h2>
                </div>

                {/* Accordion container */}
                <div className="border border-gray-200 rounded-3xl bg-white divide-y divide-gray-100 overflow-hidden shadow-sm">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={index} className="transition-colors duration-200">
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full text-left px-5 md:px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                                >
                                    <span className="text-sm font-bold text-[#1F2937] leading-snug group-hover:text-[#7C3AED] transition-colors">
                                        {item.title}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#7C3AED]" : ""
                                            }`}
                                    />
                                </button>

                                {/* Answer container */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="px-5 md:px-6 pb-5">
                                        <div
                                            className="text-gray-500 text-[13px] leading-relaxed prose prose-sm max-w-none prose-p:my-1"
                                            dangerouslySetInnerHTML={{ __html: item.value }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
