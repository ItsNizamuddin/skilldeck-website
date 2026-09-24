"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import type { WebsiteTemplate } from "@/lib/templates";
import TemplatePreviewModal from "./TemplatePreviewModal";

interface PreviewButtonProps {
    template: WebsiteTemplate;
    /** `chip` sits next to a card CTA, `link` sits inline under featured copy. */
    variant?: "chip" | "link";
    className?: string;
}

export default function PreviewButton({ template, variant = "chip", className = "" }: PreviewButtonProps) {
    const [open, setOpen] = useState(false);

    const styles =
        variant === "chip"
            ? "inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-brand-dark border border-slate-200 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-colors cursor-pointer"
            : "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-brand-primary transition-colors cursor-pointer";

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-label={`Preview the ${template.name} template`}
                className={`${styles} ${className}`}
            >
                <Eye className={variant === "chip" ? "w-3.5 h-3.5" : "w-4 h-4"} />
                Preview
            </button>

            {open && <TemplatePreviewModal template={template} onClose={() => setOpen(false)} />}
        </>
    );
}
