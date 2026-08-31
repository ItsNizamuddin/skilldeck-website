import { BadgeCheck, PiggyBank, ShieldCheck, Users, type LucideIcon } from "lucide-react";

export interface ComparisonProofItem {
    icon: LucideIcon;
    /** The figure, rendered in bold. */
    highlight: string;
    /** Sentence completing the claim. */
    text: string;
}

/**
 * Outcomes of comparing providers, shown on the course hero and the compare
 * page. Kept in one place so the two surfaces cannot drift apart.
 */
export const COMPARISON_PROOF: ComparisonProofItem[] = [
    { icon: PiggyBank, highlight: "₹3.4 Cr+", text: "saved on course fees through comparison" },
    { icon: Users, highlight: "47 Lac+", text: "learners have benefited so far" },
    { icon: ShieldCheck, highlight: "6,000+", text: "providers cross-checked for fraud" },
    { icon: BadgeCheck, highlight: "100%", text: "best quote assured by training providers" },
];
