import { COMPARISON_PROOF } from "@/lib/comparisonProof";

interface ComparisonProofProps {
    /**
     * `list` — compact two-column rows for a hero body.
     * `cards` — bordered stack for a side column.
     */
    variant?: "list" | "cards";
    className?: string;
}

export default function ComparisonProof({ variant = "list", className = "" }: ComparisonProofProps) {
    if (variant === "cards") {
        return (
            <ul className={`space-y-2.5 ${className}`}>
                {COMPARISON_PROOF.map((item) => (
                    <li
                        key={item.text}
                        className="flex items-start gap-3 rounded-2xl border border-brand-primary/15 bg-white/80 px-4 py-3 backdrop-blur-sm"
                    >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                            <item.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="text-[13px] leading-snug text-brand-muted">
                            <span className="font-black text-brand-dark">{item.highlight}</span> {item.text}
                        </span>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul className={`grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 ${className}`}>
            {COMPARISON_PROOF.map((item) => (
                <li key={item.text} className="flex items-start gap-2">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                    <span className="text-[13px] leading-snug text-gray-700">
                        <span className="font-bold text-brand-dark">{item.highlight}</span> {item.text}
                    </span>
                </li>
            ))}
        </ul>
    );
}
