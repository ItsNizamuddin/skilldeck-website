"use client";

import { CheckCircle2, MessageCircleMore, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { DemoServiceData } from "./types";

interface DemoSidebarCtaProps {
    data: DemoServiceData;
}

export default function DemoSidebarCta({ data }: DemoSidebarCtaProps) {
    const { openModal } = useLeadModal();
    const { name, servicecard, servicestats, banner } = data;

    const rating = servicecard?.ratings;
    const reviewCount = banner?.reviews?.[0]?.count || servicecard?.clients;
    const highlightStats = (servicestats || []).slice(0, 3);
    const points = (servicecard?.points || []).slice(0, 4);

    const handleRequestQuote = () => {
        openModal({
            source: "service-sidebar",
            formTitle: `Request a Proposal for ${name}`,
            defaultValues: { subject: `Proposal request for ${name}` },
        });
    };

    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60 overflow-hidden">
            {/* Header */}
            <div className="p-5 pb-4 space-y-3" style={{ background: "var(--gradient-brand)" }}>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">Free Consultation</span>
                </div>
                <h3 className="text-lg font-extrabold text-white leading-snug">
                    Talk to a {name.replace(/ Service$/i, "")} specialist
                </h3>
                {(rating || reviewCount) && (
                    <div className="flex items-center gap-2">
                        {rating && (
                            <span className="inline-flex items-center gap-1 bg-white/15 rounded-full px-2.5 py-1 text-white text-xs font-bold">
                                <Star className="w-3.5 h-3.5 fill-white text-white" />
                                {rating}
                            </span>
                        )}
                        {reviewCount && (
                            <span className="text-white/85 text-xs font-medium">{reviewCount} businesses served</span>
                        )}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
                {points.length > 0 && (
                    <ul className="space-y-2.5">
                        {points.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                                <CheckCircle2 className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {highlightStats.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                        {highlightStats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="mx-auto mb-1 w-8 h-8 rounded-lg bg-brand-primary/8 flex items-center justify-center">
                                    <ServiceItemIcon iconString={stat.icon} className="w-4 h-4 text-brand-primary" defaultIcon="Sparkles" />
                                </div>
                                <div className="text-xs font-extrabold text-brand-dark leading-none">{stat.value}</div>
                                <div className="text-[9px] text-brand-muted font-medium leading-tight mt-0.5 truncate">
                                    {stat.description}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Button
                    onClick={handleRequestQuote}
                    variant="primary"
                    className="w-full h-12 text-sm font-bold rounded-xl"
                >
                    Request a Free Proposal
                </Button>

                <button
                    type="button"
                    onClick={() =>
                        openModal({
                            source: "service-sidebar-chat",
                            formTitle: `Ask a Question about ${name}`,
                        })
                    }
                    className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-brand-muted hover:text-brand-primary transition-colors"
                >
                    <MessageCircleMore className="w-4 h-4" />
                    Have a question first? Chat with us
                </button>
            </div>
        </div>
    );
}
