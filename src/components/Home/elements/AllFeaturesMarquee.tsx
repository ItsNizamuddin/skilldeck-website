"use client";

import React from "react";
import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";
import {
    Briefcase,
    Calendar,
    Database,
    Globe,
    GraduationCap,
    Mail,
    MessageSquare,
    Search,
    Share2,
    ShoppingCart,
    Sparkles,
    Upload,
    UserCog,
    Users,
    Video
} from "lucide-react";

interface FeatureItem {
    icon: any;
    title: string;
    description: string;
    gradient: string;
    availableSoon?: boolean;
}

const row1Features: FeatureItem[] = [
    {
        icon: Globe,
        title: "Website & CMS",
        description: "SEO-optimized, performance-focused themes",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        icon: GraduationCap,
        title: "LMS Engine",
        description: "Courses, quizzes, exams & certificates",
        gradient: "from-purple-500 to-indigo-600",
    },
    {
        icon: Users,
        title: "Integrated CRM",
        description: "Lead capture & sales pipeline management",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        icon: Sparkles,
        title: "AI + Automation",
        description: "Smart workflows & automated reminders",
        gradient: "from-violet-500 to-purple-600",
        availableSoon: true,
    },
    {
        icon: MessageSquare,
        title: "Webchat Widget",
        description: "Convert site visitors into leads instantly",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        icon: Video,
        title: "Events & Webinars",
        description: "Multi-currency event & ticket management",
        gradient: "from-sky-500 to-blue-600",
    },
    {
        icon: Calendar,
        title: "Class & Batches",
        description: "Batch scheduling & attendance tracking",
        gradient: "from-orange-500 to-amber-600",
    },
    {
        icon: UserCog,
        title: "Trainer Portal",
        description: "Trainer allocation & schedule tracking",
        gradient: "from-pink-500 to-rose-600",
    },
];

const row2Features: FeatureItem[] = [
    {
        icon: ShoppingCart,
        title: "E-commerce Module",
        description: "Sell digital & physical products seamlessly",
        gradient: "from-teal-500 to-emerald-600",
        availableSoon: true,
    },
    {
        icon: Mail,
        title: "Marketing Campaigns",
        description: "Automated email & WhatsApp drip sequences",
        gradient: "from-rose-500 to-pink-600",
        availableSoon: true,
    },
    {
        icon: Share2,
        title: "Social Media Publisher",
        description: "Cross-platform posting & content calendar",
        gradient: "from-fuchsia-500 to-pink-600",
        availableSoon: true,
    },
    {
        icon: Briefcase,
        title: "Job & Placement Portal",
        description: "Career opportunities & resume builder",
        gradient: "from-indigo-500 to-blue-600",
        availableSoon: true,
    },
    {
        icon: Search,
        title: "SEO Automation",
        description: "Region-wise SEO pages at scale",
        gradient: "from-amber-500 to-orange-600",
    },
    {
        icon: Upload,
        title: "Bulk Import Tools",
        description: "Batch CSV imports & data validation",
        gradient: "from-lime-500 to-emerald-600",
    },
    {
        icon: Database,
        title: "Unified Analytics",
        description: "Real-time dashboard & revenue reports",
        gradient: "from-violet-500 to-indigo-600",
    },
];

const MarqueeCard: React.FC<{ item: FeatureItem }> = ({ item }) => {
    const Icon = item.icon;
    return (
        <div className="group relative bg-transparent backdrop-blur-[1.5px] border border-white/15 hover:border-purple-400/50 hover:bg-white/5 rounded-2xl p-4 w-[280px] sm:w-[320px] flex items-center gap-3.5 transition-all duration-300 shrink-0 cursor-pointer">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate transition-colors">
                        {item.title}
                    </h3>
                    {item.availableSoon && (
                        <span className="shrink-0 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            Soon
                        </span>
                    )}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-300 leading-snug line-clamp-1">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

export default function AllFeaturesMarquee() {
    return (
        <section className="bg-slate-900 text-white relative overflow-hidden py-16 md:py-20 border-y border-slate-800">
            {/* Interactive Dot Grid Background */}
            <InteractiveDotBackground />

            {/* Ambient Glowing Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> All-In-One Platform Ecosystem
                </span>
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-extrabold text-white tracking-tight">
                    Every Feature Your Business Needs, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Automated</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Explore our complete suite of 15+ integrated modules designed to replace expensive single-purpose software.
                </p>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative space-y-4 z-10">
                {/* Edge Gradient Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent z-10 pointer-events-none" />

                {/* Top Row: Scrolls Left */}
                <div className="flex overflow-hidden py-1">
                    <div className="flex animate-scroll gap-4 items-center" style={{ animationDuration: "120s" }}>
                        {[...row1Features, ...row1Features, ...row1Features].map((item, index) => (
                            <MarqueeCard key={`row1-${index}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Bottom Row: Scrolls Right */}
                <div className="flex overflow-hidden py-1">
                    <div className="flex animate-scroll-reverse gap-4 items-center" style={{ animationDuration: "120s" }}>
                        {[...row2Features, ...row2Features, ...row2Features].map((item, index) => (
                            <MarqueeCard key={`row2-${index}`} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
