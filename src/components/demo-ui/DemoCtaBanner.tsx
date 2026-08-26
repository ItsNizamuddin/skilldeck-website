"use client";

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/Forms/LeadModalContext";

interface DemoCtaBannerProps {
    title: string;
    description?: string;
    buttonLabel?: string;
    formTitle?: string;
    icon?: ReactNode;
    variant?: "light" | "dark";
}

/**
 * Reusable horizontal CTA banner — backs approach.tools.cta, addons.cta and
 * addons.highlight.cta, strategy.cta, all of which share the same
 * "title + optional description + single action" shape in the payload.
 */
export default function DemoCtaBanner({
    title,
    description,
    buttonLabel = "Talk To Our Team",
    formTitle,
    icon,
    variant = "light",
}: DemoCtaBannerProps) {
    const { openModal } = useLeadModal();

    const handleClick = () => {
        openModal({
            source: "service-cta-banner",
            formTitle: formTitle || title,
        });
    };

    if (variant === "dark") {
        return (
            <div
                className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl"
                style={{ background: "linear-gradient(135deg,rgba(36,23,100,1) 0%,rgba(1,11,48,1) 100%)" }}
            >
                <div className="space-y-1.5">
                    <h4 className="text-base md:text-lg font-extrabold text-white leading-snug">{title}</h4>
                    {description && <p className="text-xs md:text-sm text-white/70 max-w-xl">{description}</p>}
                </div>
                <Button onClick={handleClick} variant="primary" className="shrink-0 rounded-xl font-bold">
                    {buttonLabel}
                    {icon || <ArrowRight className="w-4 h-4" />}
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5">
                <h4 className="text-sm md:text-base font-bold text-brand-dark leading-snug">{title}</h4>
                {description && <p className="text-xs text-brand-muted max-w-xl">{description}</p>}
            </div>
            <Button onClick={handleClick} variant="primary" className="shrink-0 rounded-xl font-bold text-sm">
                {buttonLabel}
                {icon || <ArrowRight className="w-4 h-4" />}
            </Button>
        </div>
    );
}
