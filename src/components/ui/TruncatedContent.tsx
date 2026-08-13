"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ButtonVariant = 'underline' | 'bordered';

interface TruncatedContentProps {
    content: string;
    maxLines?: number;
    className?: string;
    fadeColor?: string;
    buttonClassName?: string;
    expandText?: string;
    collapseText?: string;
    buttonVariant?: ButtonVariant;
}

export const TruncatedContent = ({
    content,
    maxLines = 5,
    className = "",
    fadeColor = "white",
    buttonClassName = "",
    expandText = "Read More",
    collapseText = "Read Less",
    buttonVariant = "underline",
}: TruncatedContentProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [needsTruncation, setNeedsTruncation] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState<number>(0);
    const [expandedHeight, setExpandedHeight] = useState<number>(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const observer = new ResizeObserver(() => {
            if (contentRef.current) {
                const element = contentRef.current;
                const actualHeight = element.scrollHeight;
                const style = getComputedStyle(element);
                const lineHeight = parseFloat(style.lineHeight) || 24;
                const maxHeight = lineHeight * maxLines;

                setCollapsedHeight(maxHeight);
                setExpandedHeight(actualHeight);
                setNeedsTruncation(actualHeight > maxHeight);
            }
        });

        observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, [content, maxLines]);

    if (!content) return null;

    const buttonVariantStyles = {
        underline: "underline underline-offset-4 decoration-1",
        bordered: "border border-gray-200 rounded-md px-3 py-1.5",
    };

    const currentHeight = isExpanded ? expandedHeight : collapsedHeight;

    return (
        <div className="space-y-1">
            <div className="relative">
                <div
                    ref={contentRef}
                    className={cn(
                        "max-w-none overflow-hidden transition-all duration-300 ease-in-out leading-relaxed text-sm 2xl:text-base",
                        className
                    )}
                    style={{
                        maxHeight: needsTruncation ? `${currentHeight}px` : 'none',
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0 h-10 pointer-events-none transition-opacity duration-300",
                        !isExpanded && needsTruncation ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                        background: `linear-gradient(to top, ${fadeColor}, transparent)`
                    }}
                />
            </div>

            {needsTruncation && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "flex items-center gap-1.5 text-blue-600/80 text-xs 2xl:text-sm font-medium transition-colors",
                        buttonVariantStyles[buttonVariant],
                        buttonClassName
                    )}
                >
                    {isExpanded ? (
                        <>
                            {collapseText}
                            <ChevronUp className="w-3 h-3 transition-transform duration-300" />
                        </>
                    ) : (
                        <>
                            {expandText}
                            <ChevronDown className="w-3 h-3 transition-transform duration-300" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default TruncatedContent;
