import ServiceIconWrapper from "@/components/services/ServiceIconWrapper";
import { DemoPoint } from "./types";

interface DemoPointGridProps {
    points?: DemoPoint[];
    columns?: 2 | 3 | 4;
    variant?: "card" | "tile" | "row";
}

/**
 * Shared renderer for the icon + title + description "point" shape that
 * repeats across whyservice / benefits / strategy / whyopt / business.
 * Three variants keep those sections visually distinct while sharing markup.
 */
export default function DemoPointGrid({ points, columns = 3, variant = "card" }: DemoPointGridProps) {
    const items = (points || []).filter((p) => p?.title);
    if (items.length === 0) return null;

    const colClass =
        columns === 2
            ? "sm:grid-cols-2"
            : columns === 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "sm:grid-cols-2 lg:grid-cols-3";

    if (variant === "row") {
        return (
            <div className="space-y-3">
                {items.map((point, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 hover:border-brand-primary/20 hover:shadow-sm transition-all duration-300"
                    >
                        <ServiceIconWrapper
                            iconString={point.icon}
                            className="w-10 h-10 rounded-xl"
                            iconClassName="w-5 h-5"
                        />
                        <div className="min-w-0 space-y-1">
                            <h4 className="text-sm font-bold text-brand-dark">{point.title}</h4>
                            {point.description && (
                                <p className="text-xs md:text-[13px] text-brand-muted leading-relaxed">
                                    {point.description}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (variant === "tile") {
        return (
            <div className={`grid grid-cols-1 ${colClass} gap-4`}>
                {items.map((point, i) => (
                    <div
                        key={i}
                        className="rounded-2xl bg-slate-50/80 border border-slate-100 p-5 space-y-3 hover:bg-white hover:shadow-md hover:border-brand-primary/15 transition-all duration-300"
                    >
                        <ServiceIconWrapper iconString={point.icon} className="w-10 h-10 rounded-xl" iconClassName="w-5 h-5" />
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-brand-dark leading-snug">{point.title}</h4>
                            {point.description && (
                                <p className="text-xs text-brand-muted leading-relaxed">{point.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // "card" — default, elevated with border-top accent
    return (
        <div className={`grid grid-cols-1 ${colClass} gap-5`}>
            {items.map((point, i) => (
                <div
                    key={i}
                    className="group rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                    <ServiceIconWrapper
                        iconString={point.icon}
                        className="w-11 h-11 rounded-xl group-hover:scale-105 transition-transform duration-300"
                        iconClassName="w-5 h-5"
                    />
                    <div className="space-y-1.5">
                        <h4 className="text-sm font-bold text-brand-dark leading-snug">{point.title}</h4>
                        {point.description && (
                            <p className="text-xs md:text-[13px] text-brand-muted leading-relaxed">{point.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
