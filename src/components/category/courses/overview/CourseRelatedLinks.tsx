"use client";

import SectionTag from "@/components/ui/SectionTag";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CourseRelatedLinksProps {
    title: string;
    value: string;
}

export default function CourseRelatedLinks({ title, value }: CourseRelatedLinksProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!value) return null;

    // Split HTML string by pipe characters (|) to isolate anchor links
    const linkItems = value.split("|").map(item => item.trim()).filter(Boolean);

    return (
        <div className="border border-gray-200 rounded-3xl bg-white overflow-hidden shadow-sm transition-all duration-300">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-5 md:px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
            >
                <SectionTag text={title || "RELATED LINKS"} />
                <div className={`w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-purple-100" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-[#7C3AED] shrink-0" />
                </div>
            </button>

            {/* Content panel */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-5 md:px-6 pb-5 border-t border-gray-100 pt-4">
                    <div className="flex flex-wrap gap-2.5 related-links-pills">
                        {linkItems.map((htmlString, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-gray-200 rounded-full text-[11px] capitalize font-bold text-gray-700 hover:text-[#7C3AED] transition-all duration-200"
                                dangerouslySetInnerHTML={{ __html: htmlString }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .related-links-pills a {
                    color: inherit !important;
                    text-decoration: none !important;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
}
