"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FooterColumn } from "@/types";

interface FooterLinksProps {
    columns?: FooterColumn[];
}

const FooterLinks = ({ columns = [] }: FooterLinksProps) => {
    const [openSection, setOpenSection] = useState<string>("Company");

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? "" : section);
    };

    // Filter columns that have links or content (exclude order 1 / about column if rendered on left)
    const linkColumns = columns.filter(
        (col) => (col.links && col.links.length > 0) || (col.order && col.order > 1)
    );

    const FooterSection = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
        <div className={className}>
            <button
                onClick={() => toggleSection(title)}
                aria-label={`Toggle ${title} section`}
                aria-expanded={openSection === title}
                className="w-full flex items-center justify-between md:cursor-default group py-2 md:py-0"
            >
                <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2 md:mb-4">{title}</h3>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-slate-400 mb-4 transition-transform duration-300 md:hidden",
                        openSection === title ? "rotate-180" : ""
                    )}
                />
            </button>
            <div className={cn(
                "space-y-2 transition-all duration-300 ease-in-out md:block overflow-hidden",
                openSection === title ? "max-h-96 opacity-100 mb-6 md:mb-0" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"
            )}>
                {children}
            </div>
        </div>
    );

    if (linkColumns.length === 0) {
        return null;
    }

    return (
        <div className={`lg:col-span-8 grid grid-cols-1 md:grid-cols-${Math.min(linkColumns.length, 3)} gap-0 md:gap-8`}>
            {linkColumns.map((col, idx) => (
                <FooterSection key={`${col.title}-${idx}`} title={col.title}>
                    {col.links && col.links.length > 0 && (
                        <ul className="space-y-1">
                            {col.links.map((link, linkIdx) => (
                                <li key={`${link.label}-${linkIdx}`}>
                                    <Link
                                        href={link.url || "#"}
                                        rel="nofollow"
                                        className="text-slate-300 text-sm hover:text-white transition-colors block py-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    {col.content && (
                        <p className="text-slate-400 text-sm py-1 leading-relaxed">
                            {col.content}
                        </p>
                    )}
                </FooterSection>
            ))}
        </div>
    );
};

export default FooterLinks;
