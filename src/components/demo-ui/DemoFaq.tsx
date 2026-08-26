"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DemoSectionHeader from "./DemoSectionHeader";
import { DemoFaqs } from "./types";

interface DemoFaqProps {
    data?: DemoFaqs;
}

export default function DemoFaq({ data }: DemoFaqProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const items = (data?.accordions || []).filter((f) => f?.title);

    if (items.length === 0) return null;

    return (
        <div id="faqs" className="scroll-mt-24 space-y-6">
            <DemoSectionHeader
                tagline={data?.tagline || "Got Questions?"}
                title={data?.title || "Frequently Asked Questions"}
                description={data?.description}
            />

            <div className="border border-gray-200 rounded-3xl bg-white divide-y divide-gray-100 overflow-hidden shadow-sm">
                {items.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div key={index}>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                aria-expanded={isOpen}
                                className="w-full text-left px-5 md:px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                            >
                                <span className="text-sm font-bold text-[#1F2937] leading-snug group-hover:text-brand-primary transition-colors">
                                    {item.title}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-primary" : ""}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                            >
                                {item.description && (
                                    <div className="px-5 md:px-6 pb-5">
                                        <div
                                            className="text-gray-500 text-[13px] leading-relaxed prose prose-sm max-w-none prose-p:my-1"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
