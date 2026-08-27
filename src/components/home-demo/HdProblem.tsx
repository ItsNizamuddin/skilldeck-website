import {
    DollarSign,
    FileSpreadsheet,
    Layers,
    Megaphone,
    Search,
    Settings,
    ShieldAlert,
    Target,
} from "lucide-react";
import HdGradientText from "./HdGradientText";

const problemCards = [
    {
        icon: Megaphone,
        title: "Expensive & Unreliable Ads",
        description: (
            <>
                Google Ads are expensive and unreliable. You spend thousands but{" "}
                <strong className="font-semibold text-brand-dark">results remain unpredictable</strong>.
            </>
        ),
        tint: "bg-violet-50 text-violet-600",
        num: "text-violet-500",
    },
    {
        icon: Search,
        title: "SEO Feels Impossible",
        description: (
            <>
                SEO feels impossible with poor websites &amp; weak CMS. You can&apos;t{" "}
                <strong className="font-semibold text-brand-dark">compete</strong> without proper technical
                foundation.
            </>
        ),
        tint: "bg-blue-50 text-blue-600",
        num: "text-blue-500",
    },
    {
        icon: FileSpreadsheet,
        title: "Leads in Spreadsheets",
        description: (
            <>
                Sales teams manage leads in spreadsheets. No{" "}
                <strong className="font-semibold text-brand-dark">automation</strong>, no{" "}
                <strong className="font-semibold text-brand-dark">tracking</strong>, no follow-up system.
            </>
        ),
        tint: "bg-indigo-50 text-indigo-600",
        num: "text-indigo-500",
    },
    {
        icon: Settings,
        title: "Manual, Broken Workflows",
        description: (
            <>
                Operations run on manual, broken workflows. Everything requires human intervention.
            </>
        ),
        tint: "bg-rose-50 text-rose-600",
        num: "text-rose-500",
    },
    {
        icon: Layers,
        title: "Scattered Tools",
        description: (
            <>
                LMS, CRM, marketing, events &amp; payments are all scattered across different platforms that{" "}
                <strong className="font-semibold text-brand-dark">don&apos;t talk to each other</strong>.
            </>
        ),
        tint: "bg-purple-50 text-purple-600",
        num: "text-purple-500",
    },
    {
        icon: DollarSign,
        title: "Thin Margins",
        description: (
            <>
                Margins are thin—or completely wiped out. The competition is brutal and costs keep rising.
            </>
        ),
        tint: "bg-amber-50 text-amber-600",
        num: "text-amber-500",
    },
];

/** The five stages of the "wrong cycle", ordered clockwise from the top. */
const cycleNodes = [
    { icon: Megaphone, label: "Expensive Ads", tint: "bg-violet-50 text-violet-600" },
    { icon: FileSpreadsheet, label: "Leads in Spreadsheets", tint: "bg-emerald-50 text-emerald-600" },
    { icon: Settings, label: "Manual Workflows", tint: "bg-rose-50 text-rose-600" },
    { icon: Layers, label: "Scattered Tools", tint: "bg-indigo-50 text-indigo-600" },
    { icon: DollarSign, label: "Thin Margins", tint: "bg-amber-50 text-amber-600" },
];

// Geometry for the ring. Nodes sit evenly around a circle starting at 12 o'clock;
// the connecting arcs stop short of each node so the arrowheads stay readable.
// RADIUS is 36 (not 39) so the widest nodes — the 3 and 9 o'clock ones — stay
// inside the panel at the narrowest width the ring is shown at.
const RADIUS = 36;
const CENTER = 50;
const STEP = 360 / cycleNodes.length;
const ARC_GAP = 20; // degrees of clearance either side of a node

const pointAt = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
        x: CENTER + RADIUS * Math.cos(rad),
        y: CENTER + RADIUS * Math.sin(rad),
    };
};

const arcs = cycleNodes.map((_, i) => {
    const from = pointAt(i * STEP + ARC_GAP);
    const to = pointAt((i + 1) * STEP - ARC_GAP);
    return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} A ${RADIUS} ${RADIUS} 0 0 1 ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
});

export default function HdProblem() {
    return (
        <section className="section-y bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4 lg:px-0">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="badge-brand mb-5">The Problem</span>
                    <h2 className="heading-section mb-3">
                        The Problem with the <HdGradientText>Training Industry</HdGradientText> Today
                    </h2>
                    <p className="body-medium">The training industry is massive—but brutally competitive.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* ── Left: the wrong cycle ── */}
                    <div className="lg:col-span-5">
                        <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/60 p-6 md:p-8 flex flex-col">
                            <div className="text-center mb-2">
                                <p className="text-base md:text-lg font-semibold text-brand-dark leading-snug">
                                    Most institutes are stuck in the
                                </p>
                                <p className="text-xl md:text-2xl font-extrabold leading-tight">
                                    <HdGradientText>Wrong Cycle</HdGradientText>
                                </p>
                            </div>

                            {/* Cycle diagram — ring on sm+, vertical flow on phones where
                                the radial labels would be too cramped to read. */}
                            <div className="relative hidden sm:block w-full max-w-sm mx-auto aspect-square my-4 flex-1">
                                {/* Arrow ring */}
                                <svg
                                    viewBox="0 0 100 100"
                                    className="absolute inset-0 w-full h-full"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <defs>
                                        <marker
                                            id="hd-cycle-arrow"
                                            viewBox="0 0 10 10"
                                            refX="8"
                                            refY="5"
                                            markerWidth="5"
                                            markerHeight="5"
                                            orient="auto-start-reverse"
                                        >
                                            <path d="M 0 1 L 9 5 L 0 9 z" fill="#a78bfa" />
                                        </marker>
                                    </defs>
                                    {arcs.map((d, i) => (
                                        <path
                                            key={i}
                                            d={d}
                                            fill="none"
                                            stroke="#c4b5fd"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            markerEnd="url(#hd-cycle-arrow)"
                                        />
                                    ))}
                                </svg>

                                {/* Centre medallion */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center px-2">
                                    <ShieldAlert className="w-6 h-6 text-brand-primary mb-1" aria-hidden="true" />
                                    <span className="text-[10px] md:text-[11px] font-bold text-brand-dark leading-tight">
                                        Your
                                        <br />
                                        Institute
                                    </span>
                                </div>

                                {/* Nodes */}
                                {cycleNodes.map((node, i) => {
                                    const { x, y } = pointAt(i * STEP);
                                    return (
                                        <div
                                            key={node.label}
                                            className="absolute w-[28%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 text-center"
                                            style={{ left: `${x}%`, top: `${y}%` }}
                                        >
                                            <span
                                                className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${node.tint} bg-white border border-slate-200 shadow-sm flex items-center justify-center`}
                                            >
                                                <node.icon className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                                            </span>
                                            <span className="text-[10px] md:text-[11px] font-semibold text-brand-muted leading-tight">
                                                {node.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Phone fallback — same five stages as a vertical loop */}
                            <ol className="sm:hidden my-5 space-y-3">
                                {cycleNodes.map((node, i) => (
                                    <li key={node.label} className="relative flex items-center gap-3">
                                        {/* connector to the next stage */}
                                        {i < cycleNodes.length - 1 && (
                                            <span
                                                aria-hidden="true"
                                                className="absolute left-5 top-11 h-3 w-px bg-violet-200"
                                            />
                                        )}
                                        <span
                                            className={`w-10 h-10 rounded-xl ${node.tint} bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0`}
                                        >
                                            <node.icon className="w-4 h-4" aria-hidden="true" />
                                        </span>
                                        <span className="text-sm font-semibold text-brand-dark">{node.label}</span>
                                    </li>
                                ))}
                                <li className="flex items-center gap-3 pt-1">
                                    <span className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                                        <ShieldAlert className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                                    </span>
                                    <span className="text-sm font-semibold text-brand-muted">…and back to the start.</span>
                                </li>
                            </ol>

                            {/* Footnote */}
                            <div className="mt-4 rounded-2xl bg-white border border-slate-200 px-4 py-3.5 flex items-center gap-3">
                                <span className="w-9 h-9 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                                    <ShieldAlert className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                                </span>
                                <p className="text-sm font-medium text-brand-dark leading-snug">
                                    These challenges make growth harder than it should be.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: numbered problem cards + closing banner ── */}
                    <div className="lg:col-span-7 flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {problemCards.map((card, i) => (
                                <div
                                    key={card.title}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300"
                                >
                                    <span
                                        className={`absolute top-5 right-5 text-xs font-bold ${card.num}`}
                                        aria-hidden="true"
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={`w-12 h-12 rounded-2xl ${card.tint} flex items-center justify-center mb-4`}
                                    >
                                        <card.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="text-base font-bold text-brand-dark leading-snug mb-2 pr-8">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-brand-muted leading-relaxed">{card.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Closing banner */}
                        <div className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-fuchsia-50/60 to-orange-50 px-6 py-5 flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm">
                                <Target className="w-6 h-6 text-brand-primary" aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-sm md:text-base font-bold text-brand-dark leading-snug">
                                    You deserve a better way to run, grow and scale your institute.
                                </p>
                                <p className="text-sm md:text-base font-bold leading-snug">
                                    <HdGradientText>SkillDeck is built to solve these problems.</HdGradientText>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
