import ServiceItemIcon from "@/components/services/ServiceItemIcon";
import { DemoIconValue } from "./types";

function hexToRgba(hex: string, alpha: number) {
    const clean = hex.replace("#", "");
    const num = parseInt(clean, 16);
    if (isNaN(num) || clean.length !== 6) return `rgba(92, 63, 250, ${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const PALETTE = ["#5C3FFA", "#CB3B95", "#FE6A1B", "#2E7D32", "#0EA5E9", "#DB2777"];

interface DemoStatGridProps {
    stats?: DemoIconValue[];
    columns?: 2 | 3 | 4;
    variant?: "card" | "inline" | "list";
}

/**
 * Shared renderer for the icon + value + description + tagline stat shape
 * that repeats across servicestats / strategy.stats / whyopt.stats / business.stats.
 */
export default function DemoStatGrid({ stats, columns = 4, variant = "card" }: DemoStatGridProps) {
    const items = (stats || []).filter((s) => s?.value);
    if (items.length === 0) return null;

    const colClass =
        columns === 2
            ? "sm:grid-cols-2"
            : columns === 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2 lg:grid-cols-4";

    if (variant === "inline") {
        return (
            <div className={`grid grid-cols-2 ${colClass} gap-4`}>
                {items.map((stat, i) => {
                    const color = PALETTE[i % PALETTE.length];
                    return (
                        <div key={i} className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: hexToRgba(color, 0.12) }}
                            >
                                <ServiceItemIcon iconString={stat.icon} className="w-5 h-5" defaultIcon="Sparkles" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-lg font-extrabold text-brand-dark leading-none">{stat.value}</p>
                                <p className="text-[11px] md:text-xs font-medium text-brand-muted truncate">
                                    {stat.tagline || stat.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (variant === "list") {
        return (
            <div className="space-y-3">
                {items.map((stat, i) => {
                    const color = PALETTE[i % PALETTE.length];
                    return (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-2xl border p-4 bg-white transition-all duration-300 hover:shadow-md"
                            style={{ borderColor: hexToRgba(color, 0.16) }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: hexToRgba(color, 0.1) }}
                            >
                                <ServiceItemIcon iconString={stat.icon} className="w-5 h-5" defaultIcon="Sparkles" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-lg font-extrabold leading-none" style={{ color }}>
                                    {stat.value}
                                </p>
                                <p className="text-xs text-brand-muted font-medium truncate mt-0.5">
                                    {stat.description || stat.tagline}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 ${colClass} gap-4`}>
            {items.map((stat, i) => {
                const color = PALETTE[i % PALETTE.length];
                return (
                    <div
                        key={i}
                        className="rounded-2xl border p-5 space-y-3 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                        style={{ borderColor: hexToRgba(color, 0.16) }}
                    >
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: hexToRgba(color, 0.1) }}
                        >
                            <ServiceItemIcon iconString={stat.icon} className="w-5 h-5" defaultIcon="Sparkles" />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-2xl font-extrabold tracking-tight" style={{ color }}>
                                {stat.value}
                            </p>
                            {stat.description && (
                                <p className="text-sm font-bold text-brand-dark leading-snug">{stat.description}</p>
                            )}
                            {stat.tagline && <p className="text-xs text-brand-muted leading-relaxed">{stat.tagline}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
