import Link from "next/link";
import type { PricingPlan } from "@/lib/plans";
import {
    Play,
    Check,
    X,
    ShieldCheck,
    Zap,
    ArrowRight,
    Sparkles,
    AlertTriangle,
    Trash2,
    History,
    MousePointerClick,
} from "lucide-react";
import HdGradientText from "./HdGradientText";

type Status = "good" | "warning" | "bad";

interface ComparisonCell {
    text: string;
    status: Status;
}

interface ComparisonRow {
    feature: string;
    description: string;
    googleDropbox: ComparisonCell;
    vimeo: ComparisonCell;
    aws: ComparisonCell;
    skilldeck: string;
}

// Competitor columns, in table order.
const COMPETITORS = [
    { key: "googleDropbox", label: "Google Drive / Dropbox" },
    { key: "vimeo", label: "Vimeo / Wistia" },
    { key: "aws", label: "AWS S3 + CloudFront" },
] as const;

// Example institute used for the cost row.
const SCENARIO = { seats: 5, storageGB: 500, streamedTB: 2 };

// Competitor prices are approximate public list prices - re-check before publishing.
const COMPARISON_DATA: ComparisonRow[] = [
    {
        feature: "Cost (Typical Institute)",
        description: `${SCENARIO.seats} team seats + ${SCENARIO.storageGB} GB storage + ${SCENARIO.streamedTB} TB streamed per month`,
        googleDropbox: { text: "~$75 – $90 / mo ($15–$18 per seat)", status: "warning" },
        vimeo: { text: "~$65 – $100 / mo (video only)", status: "warning" },
        aws: { text: "~$215+ / mo (mostly bandwidth fees)", status: "bad" },
        skilldeck: "Included in your plan (storage limit per plan)",
    },
    {
        feature: "Video Streaming (HLS, up to 1080p)",
        description: "Videos stream in small parts instead of one big download",
        googleDropbox: { text: "No (previews only, limited playback)", status: "bad" },
        vimeo: { text: "Yes (limits depend on plan)", status: "good" },
        aws: { text: "Complex (needs MediaConvert setup)", status: "warning" },
        skilldeck: "Automatic HLS conversion on upload",
    },
    {
        feature: "Bandwidth Fees",
        description: "Charges when students stream or download files",
        googleDropbox: { text: "Download limits on shared files", status: "bad" },
        vimeo: { text: "Bandwidth limits on some plans", status: "warning" },
        aws: { text: "~$0.09 / GB data transfer fee", status: "bad" },
        skilldeck: "Delivered through a CDN, usage shown in your dashboard",
    },
    {
        feature: "LMS & CMS Integration",
        description: "Pick files right inside courses, blogs, pages & the editor",
        googleDropbox: { text: "Manual link copy-pasting", status: "bad" },
        vimeo: { text: "Manual embed codes", status: "bad" },
        aws: { text: "No UI (needs custom code)", status: "bad" },
        skilldeck: "Built-in media picker",
    },
    {
        feature: "Image Thumbnails & Compression",
        description: "Small previews for fast grids, optional compress before upload",
        googleDropbox: { text: "Previews only, full files served", status: "warning" },
        vimeo: { text: "Not applicable (video only)", status: "bad" },
        aws: { text: "Needs custom code (e.g. Lambda)", status: "warning" },
        skilldeck: "400 px WebP thumbnails + WebP/JPEG/PNG compression",
    },
    {
        feature: "Accidental Deletion Protection",
        description: "Time to recover files before they are gone for good",
        googleDropbox: { text: "Trash (per user account)", status: "good" },
        vimeo: { text: "Limited, depends on plan", status: "warning" },
        aws: { text: "Delete is permanent by default", status: "bad" },
        skilldeck: "30-day Trash + file history",
    },
];

// The headline features - shown as big cards.
const HIGHLIGHT_CARDS = [
    {
        icon: Play,
        title: "Manage & Stream Your Videos",
        description: "Upload a lesson once. Videos that browsers already play are packaged for streaming without re-encoding; others (HEVC, VP9, AV1, ProRes) are converted once to H.264 up to 1080p, so they play on every student device.",
        badge: "No Vimeo Required",
        bgLight: "bg-blue-50 text-blue-600",
    },
    {
        icon: Zap,
        title: "Fast Thumbnails & Image Compression",
        description: "Images get a 400 px WebP thumbnail, so a 4.8 MB photo shows as a 13 KB preview and media grids load fast. You can also compress and convert images to WebP, JPEG or PNG before they upload.",
        badge: "4.8 MB → 13 KB Previews",
        bgLight: "bg-purple-50 text-purple-600",
    },
    {
        icon: ShieldCheck,
        title: "Safe, Checked Uploads",
        description: "Every upload is checked by its real content, not just its name, so programs, scripts and SVGs with hidden code are rejected. Each institute's files are kept separate, and private files stay private.",
        badge: "Blocks Disguised Files",
        bgLight: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: Trash2,
        title: "30-Day Trash & Restore",
        description: "Deleted files go to Trash. Restore them with one click within 30 days, or delete permanently when you really mean it.",
        badge: "30-Day Recovery",
        bgLight: "bg-rose-50 text-rose-600",
    },
    {
        icon: History,
        title: "Full File History",
        description: "See who uploaded, edited, moved to Trash, restored or changed the visibility of every file, and when. No more guessing who removed the course banner.",
        badge: "Who Did What",
        bgLight: "bg-amber-50 text-amber-600",
    },
    {
        icon: MousePointerClick,
        title: "Built into Courses, Blogs & Pages",
        description: "Pick files right inside the course builder, blog and page editor, with your Starred and Recently used files one click away. No copying links between tools.",
        badge: "Native Media Picker",
        bgLight: "bg-indigo-50 text-indigo-600",
    },
];

// The tools SkillDeck replaces - same as the comparison table columns.
const REPLACED_TOOLS = ["Google Drive / Dropbox", "Vimeo / Wistia", "AWS S3 + CloudFront"];

const STATUS_LABEL: Record<Status, string> = { good: "Yes", warning: "Limited", bad: "No" };

/** Icon for a competitor cell, with a text label for screen readers. */
function StatusIcon({ status }: { status: Status }) {
    const Icon = status === "good" ? Check : status === "warning" ? AlertTriangle : X;
    const color = status === "good" ? "text-emerald-500" : status === "warning" ? "text-amber-500" : "text-rose-500";
    return (
        <>
            <Icon className={`w-4 h-4 shrink-0 ${color}`} aria-hidden="true" />
            <span className="sr-only">{STATUS_LABEL[status]}:</span>
        </>
    );
}

export default function HdMediaStorageComparison({
    plans = [],
}: {
    plans?: PricingPlan[];
} = {}) {
    return (
        <section id="media-storage" className="scroll-mt-24 section-y bg-slate-50 relative overflow-hidden">
            {/* Ambient background decoration */}
            <div
                aria-hidden="true"
                className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-brand-secondary/5 blur-3xl pointer-events-none"
            />

            <div className="container mx-auto px-4 lg:px-0 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="badge-brand mb-4 inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        New Feature: Cloud Media Storage
                    </span>
                    <h2 className="heading-section mb-4">
                        One Place to Store &amp; Manage All Your{" "}
                        <HdGradientText>Files &amp; Digital Assets</HdGradientText>
                    </h2>
                    <p className="body-large text-brand-muted">
                        Centralize all your training lecture videos, course PDFs, marketing photos, and student assets
                        in one place — built into your LMS and website, delivered fast through a global CDN.
                    </p>
                </div>

                {/* Headline feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    {HIGHLIGHT_CARDS.map((card) => (
                        <div
                            key={card.title}
                            className="group relative rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-5">
                                    <span className={`w-12 h-12 rounded-2xl ${card.bgLight} flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                                        <card.icon className="w-6 h-6" aria-hidden="true" />
                                    </span>
                                    <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full">
                                        {card.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-brand-dark mb-2.5 leading-snug">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mb-12 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                    All included in SkillDeck, no extra add-on license needed
                </p>

                {/* Main Comparison Container */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden mb-10">
                    {/* Comparison Top Banner */}
                    <div className="p-6 md:p-8 bg-[#0a0f1d] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <span className="text-xs font-bold tracking-wider uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full inline-block mb-3">
                                Storage &amp; Video Hosting
                            </span>
                            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1.5">
                                How SkillDeck Storage Compares to Other Services
                            </h3>
                            <p className="text-sm text-slate-400 max-w-2xl">
                                Organize your marketing content and course material in one shared library before it goes live. Your team can collect, review and finalize every file in private, then publish it to your LMS, your website or social media when it&apos;s ready. Competitor prices are approximate list prices.
                            </p>
                        </div>

                        {/* What one SkillDeck plan replaces */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:px-6 md:py-4 shrink-0 text-left md:text-right">
                            <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                                One Platform Replaces
                            </span>
                            <span className="text-2xl md:text-3xl font-black bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                {REPLACED_TOOLS.length} Separate Tools
                            </span>
                            <ul className="mt-2 space-y-1">
                                {REPLACED_TOOLS.map((tool) => (
                                    <li key={tool} className="flex items-center gap-1.5 md:justify-end text-xs text-slate-400">
                                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                                        <span className="line-through decoration-slate-500">{tool}</span>
                                    </li>
                                ))}
                            </ul>
                            <span className="block text-[11px] text-emerald-400 font-semibold mt-2">
                                ✓ Included in your SkillDeck plan
                            </span>
                        </div>
                    </div>

                    {/* Desktop / tablet: comparison table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    <th scope="col" className="py-4 px-6 w-1/3">Feature &amp; Metric</th>
                                    {COMPETITORS.map((c) => (
                                        <th key={c.key} scope="col" className="py-4 px-4 text-slate-600">{c.label}</th>
                                    ))}
                                    <th scope="col" className="py-4 px-6 bg-brand-primary/5 text-brand-primary font-black">
                                        SkillDeck Media Service
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {COMPARISON_DATA.map((row, idx) => (
                                    <tr
                                        key={row.feature}
                                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40 hover:bg-slate-50/80 transition-colors"}
                                    >
                                        <th scope="row" className="py-4 px-6 font-normal">
                                            <div className="font-bold text-brand-dark leading-snug">{row.feature}</div>
                                            <div className="text-xs text-brand-muted mt-0.5">{row.description}</div>
                                        </th>
                                        {COMPETITORS.map((c) => (
                                            <td key={c.key} className="py-4 px-4 text-slate-700">
                                                <div className="flex items-center gap-1.5">
                                                    <StatusIcon status={row[c.key].status} />
                                                    <span className="text-xs md:text-sm">{row[c.key].text}</span>
                                                </div>
                                            </td>
                                        ))}
                                        <td className="py-4 px-6 bg-brand-primary/5 font-semibold text-brand-dark border-l border-brand-primary/10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                    <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />
                                                </div>
                                                <span className="text-xs md:text-sm font-bold text-brand-primary">
                                                    {row.skilldeck}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Phone: one card per feature, SkillDeck first, competitors below */}
                    <div className="md:hidden divide-y divide-slate-100">
                        {COMPARISON_DATA.map((row) => (
                            <div key={row.feature} className="p-5">
                                <h4 className="font-bold text-brand-dark leading-snug">{row.feature}</h4>
                                <p className="text-xs text-brand-muted mt-0.5 mb-3">{row.description}</p>
                                <div className="flex items-start gap-2 rounded-xl bg-brand-primary/5 border border-brand-primary/10 px-3 py-2 mb-2">
                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                                    <span className="text-sm font-bold text-brand-primary">
                                        <span className="sr-only">SkillDeck: </span>
                                        {row.skilldeck}
                                    </span>
                                </div>
                                <dl className="space-y-1.5">
                                    {COMPETITORS.map((c) => (
                                        <div key={c.key} className="flex items-start justify-between gap-3 text-xs">
                                            <dt className="text-slate-500 shrink-0">{c.label}</dt>
                                            <dd className="flex items-center gap-1.5 text-right text-slate-700">
                                                <StatusIcon status={row[c.key].status} />
                                                <span>{row[c.key].text}</span>
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-brand-muted">
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500" /> Cloud Storage with CDN Delivery
                            </span>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500" /> Built-in Video Streaming
                            </span>
                            <span className="hidden sm:inline text-slate-300">•</span>
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500" /> Built-in Media Picker
                            </span>
                        </div>

                        <Link
                            href="#pricing"
                            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors group"
                        >
                            <span>See storage included in each plan</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
