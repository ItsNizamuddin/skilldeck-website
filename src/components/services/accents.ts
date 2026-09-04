/**
 * Rotating icon accents for service tiles and stat bands.
 *
 * The CMS only sends an optional `"IconName,#hex"` colour, and most entries
 * leave the hex off — everything then renders in one flat violet. These cycle
 * per index so a row of tiles reads as distinct items. An explicit hex from the
 * CMS still wins, since `ServiceIconWrapper` only applies the fallback classes
 * when no colour was parsed.
 *
 * Classes are written as literals so Tailwind's scanner keeps them.
 */
export interface ServiceAccent {
    /** Tint + text colour pair, ready for `fallbackBgClass`. */
    chip: string;
    /** Text colour alone, for bare icons with no chip behind them. */
    text: string;
    /** Raw value, for inline styles Tailwind cannot express (hover rules, CSS vars). */
    hex: string;
}

/** Feature tiles: violet → orange → blue → emerald. */
export const TILE_ACCENTS: ServiceAccent[] = [
    { chip: "bg-[#5C3FFA]/10 text-[#5C3FFA]", text: "text-[#5C3FFA]", hex: "#5C3FFA" },
    { chip: "bg-[#FE6A1B]/10 text-[#FE6A1B]", text: "text-[#FE6A1B]", hex: "#FE6A1B" },
    { chip: "bg-[#2563EB]/10 text-[#2563EB]", text: "text-[#2563EB]", hex: "#2563EB" },
    { chip: "bg-[#10B981]/10 text-[#10B981]", text: "text-[#10B981]", hex: "#10B981" },
    { chip: "bg-[#CB3B95]/10 text-[#CB3B95]", text: "text-[#CB3B95]", hex: "#CB3B95" },
];

/** Stat band: orange → violet → pink → emerald, matching the reference layout. */
export const STAT_ACCENTS: ServiceAccent[] = [
    { chip: "bg-[#FE6A1B]/10 text-[#FE6A1B]", text: "text-[#FE6A1B]", hex: "#FE6A1B" },
    { chip: "bg-[#5C3FFA]/10 text-[#5C3FFA]", text: "text-[#5C3FFA]", hex: "#5C3FFA" },
    { chip: "bg-[#CB3B95]/10 text-[#CB3B95]", text: "text-[#CB3B95]", hex: "#CB3B95" },
    { chip: "bg-[#10B981]/10 text-[#10B981]", text: "text-[#10B981]", hex: "#10B981" },
    { chip: "bg-[#2563EB]/10 text-[#2563EB]", text: "text-[#2563EB]", hex: "#2563EB" },
];

/**
 * Dark-panel variant: the light palette's mid-tones muddy against `bg-brand-dark`,
 * so these run lighter and the chips tint at /15 instead of /10.
 */
export const DARK_ACCENTS: ServiceAccent[] = [
    { chip: "bg-[#A78BFA]/15 text-[#A78BFA]", text: "text-[#A78BFA]", hex: "#A78BFA" },
    { chip: "bg-[#FB923C]/15 text-[#FB923C]", text: "text-[#FB923C]", hex: "#FB923C" },
    { chip: "bg-[#38BDF8]/15 text-[#38BDF8]", text: "text-[#38BDF8]", hex: "#38BDF8" },
    { chip: "bg-[#34D399]/15 text-[#34D399]", text: "text-[#34D399]", hex: "#34D399" },
    { chip: "bg-[#F472B6]/15 text-[#F472B6]", text: "text-[#F472B6]", hex: "#F472B6" },
    { chip: "bg-[#FBBF24]/15 text-[#FBBF24]", text: "text-[#FBBF24]", hex: "#FBBF24" },
];

export function accentAt(palette: ServiceAccent[], index: number): ServiceAccent {
    return palette[index % palette.length];
}
