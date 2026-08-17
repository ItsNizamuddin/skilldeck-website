"use client";

import { Check, Clock, Copy, ExternalLink, Globe, Mail, Phone, MapPin, GitCompare } from "lucide-react";
import { useState } from "react";
import CompanyContactButton from "./CompanyContactButton";

interface Props {
    companyName: string;
    tenantId?: string;
    contact: { website?: string; email?: string; phone?: string };
    address?: { city?: string; state?: string; country?: string };
}



export default function CompanyContactCard({ companyName, tenantId, contact, address }: Props) {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const items = [
        contact.email && { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}`, copyable: true, external: false },
        contact.website && { icon: Globe, label: "Website", value: contact.website.replace(/^https?:\/\//, ""), href: contact.website, copyable: false, external: true },
    ].filter(Boolean) as { icon: any; label: string; value: string; href: string; copyable: boolean; external: boolean }[];

    const campuses = address?.city ? `${address.city}, Online` : "Online";

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24">
            {/* Header */}
            <h3 className="text-base font-bold text-slate-900 mb-1">Talk to {companyName}</h3>
            <p className="text-xs text-slate-500 mb-5">
                Ask about batch timings, fee structure or a campus visit. They typically reply within 4 hours.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
                {/* Primary: Send enquiry */}
                <CompanyContactButton
                    tenantId={tenantId}
                    companyName={companyName}
                    className="w-full py-3 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
                >
                    <Phone className="w-4 h-4" /> Send an enquiry
                </CompanyContactButton>

                {/* Secondary: Book campus visit */}
                <CompanyContactButton
                    tenantId={tenantId}
                    companyName={companyName}
                    className="w-full py-3 bg-white border border-slate-200 text-indigo-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                >
                    Book a campus visit
                </CompanyContactButton>

                {/* Tertiary: Add to comparison */}
                <button
                    onClick={() => {
                        const el = document.getElementById("schedules");
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                        } else {
                            window.location.href = "#schedules";
                        }
                    }}
                    className="w-full py-3 bg-white border border-slate-200 text-indigo-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                >
                    <GitCompare className="w-4 h-4" /> Add to comparison
                </button>
            </div>

            {/* Contact info list */}
            {items.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-slate-100 mt-4">
                    {items.map((item, i) => (
                        <div key={i} className="relative group flex items-center gap-3 pt-1 rounded-lg hover:bg-slate-50 transition-colors">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <item.icon className="w-4 h-4 text-slate-500" />
                            </span>
                            <a
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "nofollow noreferrer" : undefined}
                                className="flex-1 min-w-0"
                            >
                                <div className="text-[10px] text-slate-400 uppercase tracking-wide">{item.label}</div>
                                <div className="text-sm text-slate-700 font-medium truncate">{item.value}</div>
                            </a>
                            {item.external && <ExternalLink className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
                            {item.copyable && (
                                <button
                                    onClick={() => copy(item.value, item.label)}
                                    className="absolute right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-slate-200 transition-all"
                                >
                                    {copied === item.label
                                        ? <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Metadata Rows — Campuses, Delivery, Response time */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Campuses</div>
                        <div className="text-sm font-semibold text-slate-800">{campuses}</div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Delivery</div>
                        <div className="text-sm font-semibold text-slate-800">Online, Classroom, Hybrid</div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">Response time</div>
                        <div className="text-sm font-semibold text-slate-800">Within 4 hours</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
