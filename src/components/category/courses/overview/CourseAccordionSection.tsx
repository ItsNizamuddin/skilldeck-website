"use client";

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CourseAccordionSectionProps {
    title: string;
    value: string;
}

export default function CourseAccordionSection({ title, value }: CourseAccordionSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!value) return null;

    return (
        <div className="border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-sm transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-5 md:px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
            >
                <span className="text-sm font-bold text-[#1F2937] leading-snug group-hover:text-[#7C3AED] transition-colors">
                    {title}
                </span>
                <div className={`w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-purple-100" : ""
                    }`}>
                    <ChevronDown className="w-4 h-4 text-[#7C3AED] shrink-0" />
                </div>
            </button>

            {/* Content panel */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-5 md:px-6 pb-5 border-t border-gray-100 pt-4">
                    <div
                        className="text-gray-500 text-[13px] leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-a:text-[#7C3AED] prose-a:hover:underline"
                        dangerouslySetInnerHTML={{ __html: value }}
                    />
                </div>
            </div>
        </div>
    );
}
