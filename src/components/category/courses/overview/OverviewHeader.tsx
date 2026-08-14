import SectionTag from "@/components/ui/SectionTag";
import TruncatedContent from "@/components/ui/TruncatedContent";
import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Stat icons are stored as a "IconName,colorHex" string
function resolveStatIcon(icon?: string, index: number = 0): { Icon: LucideIcon; color: string } {
    const fallbacks = [
        { Icon: LucideIcons.Award || LucideIcons.Sparkles, color: "#5544CC" }, // Indigo Award
        { Icon: LucideIcons.BookOpen || LucideIcons.Sparkles, color: "#CB3B95" }, // Rose BookOpen
        { Icon: LucideIcons.Users || LucideIcons.Sparkles, color: "#FE6A1B" }, // Orange Users
    ];
    const defaultFallback = fallbacks[index % fallbacks.length];

    if (!icon) return defaultFallback;

    const [name, color] = icon.split(",");
    const trimmedName = name?.trim();
    const resolvedColor = color?.trim() || defaultFallback.color;

    if (!trimmedName) return { Icon: defaultFallback.Icon, color: resolvedColor };

    const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[trimmedName];
    if (!Icon) return { Icon: defaultFallback.Icon, color: resolvedColor };

    return { Icon, color: resolvedColor };
}

function hexToRgba(hex: string, alpha: number) {
    if (!hex) return `rgba(124, 58, 237, ${alpha})`;
    const cleanHex = hex.replace("#", "");
    const num = parseInt(cleanHex, 16);
    if (isNaN(num)) return `rgba(124, 58, 237, ${alpha})`;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const OverviewHeader = ({ title = "", description = "", stats = [] }: { title?: string, description?: string, stats?: any[] }) => {
    return (
        <div className="space-y-2 lg:space-y-4 ">
            <SectionTag text="Overview" />
            <h2 className="text-2xl md:text-3xl font-bold heading-Color tracking-tight leading-tight">{title}</h2>
            <TruncatedContent maxLines={5} content={description} className="text-gray-600" />

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-8">
                {stats.map((stat, idx) => {
                    const resolved = resolveStatIcon(stat?.icon, idx);
                    const themeColor = resolved?.color || "#000000";
                    const cardBg = hexToRgba(themeColor, 0.04);
                    const iconBg = hexToRgba(themeColor, 0.1);
                    const borderColor = hexToRgba(themeColor, 0.12);
                    const hoverBorderColor = hexToRgba(themeColor, 0.3);

                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-4 p-3 rounded-2xl border transition-all duration-200"
                            style={{
                                backgroundColor: cardBg,
                                borderColor: borderColor,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = hoverBorderColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = borderColor;
                            }}
                        >
                            {/* Icon container */}
                            {resolved && (
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: iconBg }}
                                >
                                    <resolved.Icon
                                        className="w-5 h-5"
                                        style={{ color: themeColor }}
                                    />
                                </div>
                            )}

                            {/* Text content */}
                            <div className="min-w-0 space-y-0.5">
                                <p
                                    className="text-base lg:text-lg font-bold leading-none"
                                    style={{ color: themeColor }}
                                >
                                    {stat?.value}
                                </p>
                                <p className="text-xs 2xl:text-sm font-medium text-slate-500/90 truncate">
                                    {stat?.title}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default OverviewHeader;
