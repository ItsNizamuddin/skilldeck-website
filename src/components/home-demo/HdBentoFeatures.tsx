import {
    LayoutDashboard,
    Users,
    Megaphone,
    Globe,
    CalendarClock,
    BarChart3,
    CreditCard,
    Store,
    GraduationCap,
} from "lucide-react";
import HdGradientText from "./HdGradientText";

const modules = [
    {
        icon: Globe,
        title: "Websites & SEO",
        description: "High-converting, SEO-ready websites and region-wise landing pages without a dev team.",
        accent: "from-cyan-500 to-blue-600",
    },
    {
        icon: GraduationCap,
        title: "LMS Engine",
        description: "Deliver courses, track progress, run quizzes, and issue certifications end to end.",
        accent: "from-brand-primary to-indigo-600",
    },
    {
        icon: Users,
        title: "CRM & Lead Management",
        description: "Automated pipelines, follow-ups, and tracking — no more leads lost in spreadsheets.",
        accent: "from-violet-500 to-purple-600",
    },
    {
        icon: Megaphone,
        title: "Marketing Automation",
        description: "Campaigns, nurture flows, and SEO automation that run without a large marketing team.",
        accent: "from-orange-500 to-brand-secondary",
    },
    {
        icon: CalendarClock,
        title: "Classes & Events",
        description: "Schedule instructor-led classes and webinars across time zones, and assign trainers.",
        accent: "from-fuchsia-500 to-pink-600",
    },
    {
        icon: CreditCard,
        title: "Payments & Checkout",
        description: "Subscriptions, coupons, and payment automation built in — no third-party stitching.",
        accent: "from-emerald-500 to-teal-600",
    },
    {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description: "Track revenue, engagement, and student progress from one reporting layer.",
        accent: "from-rose-500 to-red-600",
    },
    {
        icon: Store,
        title: "Training Marketplace",
        description: "Get discovered by high-intent learners already searching for courses like yours.",
        accent: "from-amber-500 to-orange-600",
    },
];

export default function HdBentoFeatures() {
    return (
        <section id="features" className="scroll-mt-24 py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 lg:px-0">
                {/* Centered header — matches the rest of the site's section rhythm */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="badge-brand mb-5">Everything You Need</span>
                    <h2 className="heading-section mb-4">
                        One Dashboard. <HdGradientText>One Cost.</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Skilldeck eliminates up to{" "}
                        <span className="font-bold text-brand-dark">90% of unnecessary expenses</span> by replacing
                        multiple tools, teams, and manual processes with a single, AI-enabled platform.
                    </p>
                </div>

                {/* Spotlight banner — full width, so it never leaves a ragged hole in the grid */}
                <div className="relative overflow-hidden rounded-3xl bg-[#0a0f1d] p-8 md:p-10 mb-6">
                    <div
                        aria-hidden="true"
                        className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-brand-primary/25 blur-[90px]"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-brand-secondary/20 blur-[90px]"
                    />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                        <span className="inline-flex w-14 h-14 rounded-2xl items-center justify-center shrink-0 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)]">
                            <LayoutDashboard className="w-7 h-7 text-white" aria-hidden="true" />
                        </span>
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">One Unified Dashboard</h3>
                            <p className="text-slate-400 leading-relaxed max-w-2xl">
                                Manage your entire training business — learners, leads, campaigns, classes, and revenue
                                — from a single intuitive interface. No more switching between ten different tabs.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:flex-col md:shrink-0">
                            {["Zero setup fees", "Real-time sync", "Role-based access"].map((chip) => (
                                <span
                                    key={chip}
                                    className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 whitespace-nowrap"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Even 4-up module grid — equal heights, no orphan cells */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {modules.map((m) => (
                        <div
                            key={m.title}
                            className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-300"
                        >
                            <span
                                className={`inline-flex w-11 h-11 rounded-xl items-center justify-center mb-4 bg-gradient-to-br ${m.accent} shadow-md group-hover:scale-105 transition-transform duration-300`}
                            >
                                <m.icon className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                            <h3 className="text-base font-bold text-brand-dark mb-2 leading-snug">{m.title}</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">{m.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
