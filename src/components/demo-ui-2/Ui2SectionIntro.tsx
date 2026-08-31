interface Ui2SectionIntroProps {
    numeral: string;
    kicker?: string;
    title?: string;
    description?: string;
    align?: "left" | "center";
    dark?: boolean;
}

/** Editorial "chapter" header — ghost numeral + kicker + bold title. Demo-ui-2's own signature, distinct from /demo-ui's tag+heading style. */
export default function Ui2SectionIntro({ numeral, kicker, title, description, align = "left", dark }: Ui2SectionIntroProps) {
    if (!title) return null;

    return (
        <div className={`space-y-4 ${align === "center" ? "text-center mx-auto" : ""}`}>
            <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
                <span className={`text-5xl md:text-6xl font-black leading-none select-none ${dark ? "text-white/10" : "text-brand-primary/10"}`}>
                    {numeral}
                </span>
                <div className={`h-8 w-px ${dark ? "bg-white/20" : "bg-brand-primary/20"}`} />
                {kicker && (
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-brand-secondary">
                        {kicker}
                    </span>
                )}
            </div>
            <h2 className={`text-2xl lg:text-3xl font-extrabold tracking-tight leading-[1.1] ${dark ? "text-white" : "text-brand-dark"}`}>
                {title}
            </h2>
            {description && (
                <div
                    className={`max-w-2xl ${dark ? "text-white/60 text-sm md:text-base leading-relaxed" : "body-medium"} ${align === "center" ? "mx-auto" : ""}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
        </div>
    );
}
