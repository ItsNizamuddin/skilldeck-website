import { Check, Palette, Sparkles } from "lucide-react";
import OpenModalButton from "@/components/ui/OpenModalButton";
import HdGradientText from "@/components/home-demo/HdGradientText";
import type { WebsiteTemplate } from "@/lib/templates";
import PreviewButton from "./PreviewButton";
import TemplatePreview from "./TemplatePreview";

interface FeaturedTemplateProps {
    template: WebsiteTemplate;
}

/** Swatches stand in for the theme switcher the dynamic template ships with. */
const themeSwatches = [
    "bg-brand-primary",
    "bg-brand-secondary",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-slate-900",
];

export default function FeaturedTemplate({ template }: FeaturedTemplateProps) {
    return (
        <section className="section-y bg-white">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 md:p-10">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl"
                    />

                    <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="order-2 lg:order-1 flex flex-col">
                            <span className="badge-brand mb-4 self-start gap-2">
                                <Sparkles className="w-3.5 h-3.5" />
                                Featured template
                            </span>

                            <h2 className="heading-section mb-3">
                                {template.name} — <HdGradientText>one theme, every look</HdGradientText>
                            </h2>

                            <p className="body-medium mb-5">{template.tagline}</p>

                            <ul className="flex flex-col gap-3 mb-6">
                                {template.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-3 text-sm text-brand-muted leading-relaxed">
                                        <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-brand-primary" />
                                        </span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-3 mb-6 py-3 px-4 rounded-2xl bg-white border border-slate-200">
                                <Palette className="w-4 h-4 text-brand-primary shrink-0" />
                                <span className="text-xs font-semibold text-brand-dark">Theme colours</span>
                                <span className="flex items-center gap-1.5 ml-auto">
                                    {themeSwatches.map((swatch) => (
                                        <span
                                            key={swatch}
                                            className={`w-5 h-5 rounded-full ring-2 ring-white shadow-sm ${swatch}`}
                                        />
                                    ))}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <OpenModalButton
                                    variant="primary"
                                    size="md"
                                    className="rounded-xl font-bold"
                                    config={{
                                        source: `templates:featured:${template.slug}`,
                                        formTitle: `Get ${template.name}`,
                                        formDescription:
                                            "Share your details and we will walk you through the dynamic theme.",
                                    }}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Get {template.name}
                                </OpenModalButton>

                                <PreviewButton template={template} variant="link" />
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 group">
                            <TemplatePreview template={template} priority />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
