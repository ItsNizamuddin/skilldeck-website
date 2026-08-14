"use client";

import {
    Briefcase,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
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
import { useRef, useState } from "react";
import MarketplacePromotion from "./MarketplacePromotion";

const features = [
    {
        icon: Globe,
        title: "Website & CMS",
        description: "SEO-optimized, performance-focused, world-class themes",
        points: ["Custom domains", "Blog engine", "Landing pages"],
        gradient: "from-blue-400 to-blue-600",
        checkColor: "text-blue-700",
        checkBgColor: "bg-blue-500"
    },
    {
        icon: GraduationCap,
        title: "LMS",
        description: "Courses, batches, quizzes, practice tests, certifications",
        points: ["Course builder", "Quizzes & exams", "Certificates"],
        gradient: "from-indigo-400 to-indigo-600",
        checkColor: "text-indigo-700",
        checkBgColor: "bg-indigo-500"
    },
    {
        icon: Users,
        title: "CRM",
        description: "Lead tracking, sales automation, follow-ups",
        points: ["Lead capture", "Pipeline management", "Follow-up automation"],
        gradient: "from-cyan-400 to-cyan-600",
        checkColor: "text-cyan-700",
        checkBgColor: "bg-cyan-500"
    },
    {
        icon: Sparkles,
        title: "AI + Automation",
        description: "Reduce manual work across departments",
        points: ["AI chat support", "Smart workflows", "Auto-reminders"],
        gradient: "from-violet-400 to-violet-600",
        checkColor: "text-violet-700",
        checkBgColor: "bg-violet-500",
        availableSoon: true
    },
    {
        icon: MessageSquare,
        title: "Webchat",
        description: "Convert visitors into leads instantly",
        points: ["Live chat widget", "Lead capture", "Auto responses"],
        gradient: "from-emerald-400 to-emerald-600",
        checkColor: "text-emerald-700",
        checkBgColor: "bg-emerald-500",
        availableSoon: false
    },
    {
        icon: Video,
        title: "Events & Webinar Management",
        description: "Global time zones & currencies",
        points: ["Webinar hosting", "Event scheduling", "Ticket sales"],
        gradient: "from-sky-400 to-sky-600",
        checkColor: "text-sky-700",
        checkBgColor: "bg-sky-500"
    },
    {
        icon: Calendar,
        title: "Class & Batch Management",
        description: "Fully automated workflows",
        points: ["Batch scheduling", "Attendance tracking", "Progress reports"],
        gradient: "from-orange-400 to-orange-600",
        checkColor: "text-orange-700",
        checkBgColor: "bg-orange-500"
    },
    {
        icon: UserCog,
        title: "Trainer Management",
        description: "Allocation, scheduling & tracking",
        points: ["Trainer profiles", "Schedule management", "Payroll tracking"],
        gradient: "from-purple-400 to-purple-600",
        checkColor: "text-purple-700",
        checkBgColor: "bg-purple-500"
    },
    {
        icon: ShoppingCart,
        title: "E-commerce Module",
        description: "Sell digital & physical products",
        points: ["Multi-gateway", "Invoicing", "Subscriptions"],
        gradient: "from-teal-400 to-teal-600",
        checkColor: "text-teal-700",
        checkBgColor: "bg-teal-500",
        availableSoon: true
    },
    {
        icon: Mail,
        title: "Marketing Automation",
        description: "Campaigns, email, workflows",
        points: ["Email marketing", "WhatsApp campaigns", "Drip sequences"],
        gradient: "from-rose-400 to-rose-600",
        checkColor: "text-rose-700",
        checkBgColor: "bg-rose-500",
        availableSoon: true
    },
    {
        icon: Share2,
        title: "Social Media Publishing",
        description: "From the same dashboard",
        points: ["Multi-platform posting", "Content calendar", "Analytics"],
        gradient: "from-pink-400 to-pink-600",
        checkColor: "text-pink-700",
        checkBgColor: "bg-pink-500",
        availableSoon: true
    },
    {
        icon: Briefcase,
        title: "Job Portal",
        description: "Career opportunities for learners",
        points: ["Job listings", "Recruiter access", "Resume builder"],
        gradient: "from-slate-400 to-slate-600",
        checkColor: "text-slate-700",
        checkBgColor: "bg-slate-500",
        availableSoon: true
    },
    {
        icon: Search,
        title: "SEO Automation",
        description: "Region-wise SEO pages at scale",
        points: ["Meta optimization", "Sitemap generation", "Schema markup"],
        gradient: "from-amber-400 to-amber-600",
        checkColor: "text-amber-700",
        checkBgColor: "bg-amber-500"
    },
    {
        icon: Upload,
        title: "Bulk Upload Tools",
        description: "Save hundreds of man-hours",
        points: ["CSV imports", "Batch processing", "Data validation"],
        gradient: "from-lime-400 to-lime-600",
        checkColor: "text-lime-700",
        checkBgColor: "bg-lime-500"
    },
    {
        icon: Database,
        title: "All Data in One Place",
        description: "Complete visibility & control",
        points: ["Real-time dashboard", "Custom reports", "Revenue analytics"],
        gradient: "from-fuchsia-400 to-fuchsia-600",
        checkColor: "text-fuchsia-700",
        checkBgColor: "bg-fuchsia-500"
    }
];

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => (
    <div className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-[280px] sm:w-auto snap-center relative">
        {feature.availableSoon && (
            <span className="absolute top-4 right-4 bg-green-150 border-green-500 border-dashed border text-green-700 text-[8px] px-2 py-1 rounded-full uppercase tracking-wide font-semibold">
                Available Soon
            </span>
        )}
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <feature.icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="heading-card mb-2">
            {feature.title}
        </h3>

        {/* Description */}
        <p className="body-small mb-2 line-clamp-2">
            {feature.description}
        </p>

        {/* Feature Points */}
        <ul className="space-y-2 mb-2">
            {feature.points.map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-center gap-2">
                    <div className={`rounded-full p-0.5 ${feature.checkBgColor}`}>
                        <Check className="w-3 h-3 flex-shrink-0 text-white" />
                    </div>
                    <span className="body-extrasmall">{point}</span>
                </li>
            ))}
        </ul>

        <span className={`text-xs font-semibold ${feature.checkColor}`}>& more</span>
    </div>
);

const WhatYouGet = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            const scrollPercent = scrollLeft / (scrollWidth - clientWidth || 1);
            const totalDots = Math.ceil(features.length / 3);
            const newIndex = Math.min(
                Math.max(0, Math.round(scrollPercent * (totalDots - 1))),
                totalDots - 1
            );
            setActiveIndex(newIndex);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    const scrollToPage = (pageIndex: number) => {
        if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth } = scrollContainerRef.current;
            const totalScrollableWidth = scrollWidth - clientWidth;
            const totalDots = Math.ceil(features.length / 3);
            const scrollTarget = (pageIndex / (totalDots - 1)) * totalScrollableWidth;

            scrollContainerRef.current.scrollTo({
                left: scrollTarget,
                behavior: "smooth"
            });
        }
    };

    return (
        <section id="features" className="scroll-mt-28 pb-12 pt-6 md:py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-2 xl:px-0">
                {/* Header Section */}
                <div className="text-center mb-4 md:mb-10">
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="badge-brand">
                            Features
                        </span>
                    </div>

                    <h2 className="heading-section">
                        What You Get with{" "}
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                            Skilldeck
                        </span>
                    </h2>

                    <p className="body-medium max-w-2xl mx-auto">
                        Skilldeck replaces your entire tech stack with one powerful platform. No more juggling tools—everything works together seamlessly.
                    </p>
                </div>

                {/* Mobile Swipe View */}
                <div className="sm:hidden">
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {features.map((feature, index) => (
                            <div key={index} className="snap-start">
                                <FeatureCard feature={feature} />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center border transition-all ${canScrollLeft
                                ? "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                                : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-1.5">
                            {Array.from({ length: Math.ceil(features.length / 3) }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToPage(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i
                                        ? "bg-blue-600 w-4"
                                        : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center border transition-all ${canScrollRight
                                ? "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
                                : "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Desktop/Tablet Grid View */}
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>

                {/* Marketplace Promotion Section */}
                <MarketplacePromotion />
            </div>
        </section>
    );
};

export default WhatYouGet;
