import { BadgeCheck, Check } from "lucide-react";
import OpenModalButton from "@/components/ui/OpenModalButton";
import type { WebsiteTemplate } from "@/lib/templates";
import PreviewButton from "./PreviewButton";
import TemplatePreview from "./TemplatePreview";

const statusStyles: Record<WebsiteTemplate["status"], string> = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-100",
    default: "bg-brand-primary/10 text-brand-primary border-brand-primary/15",
    sold: "bg-slate-100 text-brand-muted border-slate-200",
};

interface TemplateCardProps {
    template: WebsiteTemplate;
    priority?: boolean;
}

export default function TemplateCard({ template, priority = false }: TemplateCardProps) {
    return (
        <article className="group relative flex flex-col h-full rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1.5 transition-all duration-300">
            <div className="relative p-3 pb-0">
                <TemplatePreview template={template} priority={priority} />

                {/* Sold templates carry a corner tag so the proof reads at a glance,
                    without hiding that they can still be rebranded for a new buyer. */}
                {template.status === "sold" && (
                    <span className="absolute top-14 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-dark/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                        <BadgeCheck className="w-3 h-3" />
                        Sold
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-3 flex-1 p-5 pt-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-lg font-bold text-brand-dark leading-snug truncate">
                            {template.name}
                        </h3>
                        <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide mt-0.5">
                            {template.category}
                        </p>
                    </div>
                    <span
                        className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusStyles[template.status]}`}
                    >
                        {template.statusLabel}
                    </span>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed">{template.tagline}</p>

                <ul className="flex flex-col gap-2 pt-1">
                    {template.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-xs text-brand-muted leading-relaxed">
                            <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 text-brand-primary" />
                            </span>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                    <OpenModalButton
                        variant="primary"
                        size="sm"
                        className="flex-1 rounded-xl font-bold"
                        config={{
                            source: `templates:${template.slug}`,
                            formTitle: `Liked ${template.name}?`,
                            formDescription:
                                "Tell us what you need and we will build you a site along these lines.",
                        }}
                    >
                        Liked it? Need similar
                    </OpenModalButton>

                    <PreviewButton template={template} />
                </div>
            </div>
        </article>
    );
}
