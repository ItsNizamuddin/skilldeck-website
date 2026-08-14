"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const FooterLinks = () => {
    const [openSection, setOpenSection] = useState<string>("Services");

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? "" : section);
    };

    // const productLinks = [
    //     { label: "All Services", href: "/services" },
    //     { label: "LMS Platform", href: "/services/lms" },
    //     { label: "Website Builder", href: "/services/cms" },
    //     { label: "Web Chat", href: "/services/webchat" },
    //     { label: "CRM", href: "/services/crm" },
    //     { label: "Web Templates", href: "/web-templates" },
    // ];

    const companyLinks = [
        { label: "About Us", href: "/about-us" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Html Sitemap", href: "/sitemap-html" },
    ];

    const legalLinks = [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Cookie Policy", href: "/cookie-policy" },
    ];

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

    return (
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
            {/* Services Links */}
            {/* <FooterSection title="Services">
                <ul className="space-y-1">
                    {productLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} rel="nofollow" className="text-slate-300 text-sm hover:text-white transition-colors block py-1">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </FooterSection> */}

            {/* Company Links */}
            <FooterSection title="Company">
                <ul className="space-y-1">
                    {companyLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} rel="nofollow" className="text-slate-300 text-sm hover:text-white transition-colors block py-1">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </FooterSection>

            {/* Legal Links */}
            <FooterSection title="Legal" className="col-span-1 md:col-span-1">
                <ul className="space-y-1">
                    {legalLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} rel="nofollow" className="text-slate-300 text-sm hover:text-white transition-colors block py-1">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Contact */}
                <div className="mt-6 border-t border-slate-800 pt-6 md:border-0 md:pt-0">
                    <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Contact</h3>
                    <Link href="mailto:hello@skilldeck.net" rel="nofollow" className="flex items-center gap-2 text-slate-300 text-sm hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                        hello@skilldeck.net
                    </Link>
                </div>
            </FooterSection>
        </div>
    );
};

export default FooterLinks;
