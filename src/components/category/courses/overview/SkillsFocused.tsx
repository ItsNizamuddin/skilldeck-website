"use client";

import { useMemo, useState } from "react";
import SectionTag from "../../../ui/SectionTag";

interface OutcomesProps {
    skills: string;
}

export const SkillsFocused = ({ skills }: OutcomesProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const outcomesList = useMemo(() => {
        if (!skills) return [];

        const processed = skills
            .replace(/<\/li>/gi, "|||")
            .replace(/<br\s*\/?>/gi, "|||")
            .replace(/<\/p>/gi, "|||")
            .replace(/<\/div>/gi, "|||")
            .replace(/\n/g, "|||");

        const plainText = processed.replace(/<[^>]*>/g, " ").trim();
        if (!plainText) return [];

        const decodeEntities = (str: string) => {
            const entities: Record<string, string> = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&#39;': "'",
                '&nbsp;': ' '
            };
            return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, (match) => entities[match]);
        };

        return plainText
            .split(/\|\|\|/)
            .map(item => decodeEntities(item.trim()))
            .filter(Boolean);
    }, [skills]);

    if (outcomesList.length === 0) return null;

    const visibleOutcomes = isExpanded ? outcomesList : outcomesList.slice(0, 6);
    const hiddenCount = outcomesList.length - 4;

    return (
        <div className="space-y-2">
            <SectionTag text=" What you walk away with" />
            <div className="space-y-1">
                <h3 className="text-xl md:text-2xl font-extrabold heading-Color tracking-tight">
                    Outcomes, stated plainly
                </h3>
                <p className="text-sm body-small">
                    If a programme cannot state these clearly, that tells you something.
                </p>
            </div>

            {/* Grid of Outcome cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {visibleOutcomes.map((outcome, idx) => {
                    const num = String(idx + 1).padStart(2, "0");
                    // Alternate background shades
                    const isEven = idx % 2 === 1;
                    return (
                        <div
                            key={idx}
                            className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all hover:scale-[1.01] ${isEven
                                ? "bg-amber-50/20 border-amber-100/50"
                                : "bg-purple-50/20 border-purple-100/50"
                                }`}
                        >
                            <span
                                className={`text-[11px] font-extrabold p-2 rounded-full flex-shrink-0 ${isEven
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-purple-50 text-brand-primary"
                                    }`}
                            >
                                {num}
                            </span>
                            <span className="text-[13px] 2xl:text-sm font-bold text-gray-700 leading-snug">
                                {outcome}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Load more button */}
            {outcomesList.length > 4 && (
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
                    >
                        {isExpanded ? (
                            <span>Show less</span>
                        ) : (
                            <span>+ {hiddenCount} more outcomes</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};


export default SkillsFocused;
