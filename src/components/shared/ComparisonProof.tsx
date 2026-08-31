"use client";

import { COMPARISON_PROOF } from "@/lib/comparisonProof";
import { motion, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ComparisonProofProps {
    /**
     * `list` — compact two-column grid with cards for hero body.
     * `cards` — bordered vertical stack for side columns.
     */
    variant?: "list" | "cards";
    /** Option to show or hide the live header title badge. Defaults to true for list variant. */
    showTitle?: boolean;
    className?: string;
}

// Visual themes for each proof point to make them visually distinctive & eye-catching
const THEMES = [
    {
        // Green theme (Savings / Money)
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-600",
        badgeBg: "bg-emerald-50 text-emerald-700",
        badgeBorder: "border-emerald-200/80",
        glow: "hover:shadow-emerald-500/10 hover:border-emerald-300",
    },
    {
        // Blue theme (Learners / Community)
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-600",
        badgeBg: "bg-blue-50 text-blue-700",
        badgeBorder: "border-blue-200/80",
        glow: "hover:shadow-blue-500/10 hover:border-blue-300",
    },
    {
        // Purple theme (Security / Verification)
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-600",
        badgeBg: "bg-purple-50 text-purple-700",
        badgeBorder: "border-purple-200/80",
        glow: "hover:shadow-purple-500/10 hover:border-purple-300",
    },
    {
        // Amber theme (Best quote / Quality)
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-600",
        badgeBg: "bg-amber-50 text-amber-700",
        badgeBorder: "border-amber-200/80",
        glow: "hover:shadow-amber-500/10 hover:border-amber-300",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
        },
    },
};

export default function ComparisonProof({
    variant = "list",
    showTitle = true,
    className = "",
}: ComparisonProofProps) {
    if (variant === "cards") {
        return (
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                className={`space-y-3 ${className}`}
            >
                {COMPARISON_PROOF.map((item, index) => {
                    const theme = THEMES[index % THEMES.length];
                    return (
                        <motion.li
                            key={item.text}
                            variants={itemVariants}
                            whileHover={{ y: -3, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`group relative flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white/95 p-3.5 shadow-sm backdrop-blur-md transition-all duration-300 ${theme.glow}`}
                        >
                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.bg} ${theme.border} border ${theme.text} group-hover:scale-110 transition-transform duration-200`}
                            >
                                <item.icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span
                                        className={`inline-block font-extrabold text-[13px] px-2 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeBorder} border`}
                                    >
                                        {item.highlight}
                                    </span>
                                </div>
                                <p className="text-[12.5px] leading-snug text-slate-600 font-medium mt-1 group-hover:text-slate-900 transition-colors">
                                    {item.text}
                                </p>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>
        );
    }

    return (
        <div className={className}>
            {showTitle && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 mb-3.5"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-purple-700/90 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />
                        Why Compare Before Enrolling?
                    </span>
                </motion.div>
            )}

            <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
                {COMPARISON_PROOF.map((item, index) => {
                    const theme = THEMES[index % THEMES.length];
                    return (
                        <motion.li
                            key={item.text}
                            variants={itemVariants}
                            whileHover={{ y: -3, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`group relative flex items-start gap-3 rounded-xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-purple-50/20 p-3 shadow-xs transition-all duration-300 ${theme.glow}`}
                        >
                            {/* Subtle shimmering highlight line on card top */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

                            <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${theme.bg} ${theme.border} border ${theme.text} shadow-2xs group-hover:scale-110 transition-transform duration-200`}
                            >
                                <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    <span
                                        className={`inline-block font-extrabold text-[13px] px-2 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeBorder} border shadow-2xs`}
                                    >
                                        {item.highlight}
                                    </span>
                                </div>
                                <p className="text-[12px] leading-tight text-slate-600 font-medium mt-1 group-hover:text-slate-900 transition-colors">
                                    {item.text}
                                </p>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>
        </div>
    );
}

