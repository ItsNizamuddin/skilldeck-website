"use client";

import { useLeadModal } from "@/components/Forms/LeadModalContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import image1 from "../../../../public/RecentProjects/ai.webp";
import image3 from "../../../../public/RecentProjects/lms_crm.webp";
import image4 from "../../../../public/RecentProjects/manageclass.webp";
import image6 from "../../../../public/RecentProjects/operations.webp";
import image5 from "../../../../public/RecentProjects/sellcourses.webp";
import image2 from "../../../../public/RecentProjects/seo.webp";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "blue" | "light";

interface Project {
    id: number;
    tags: string[];
    title: string;
    description: string;
    cta: string;
    variant: Variant;
    image: StaticImageData;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const projects: Project[] = [
    {
        id: 1,
        tags: ["SEO-optimized", "Automation", "Support"],
        title: "Launch a beautiful, SEO-optimized website in no time",
        description:
            "Enhance your customer experience with our AI-powered support chatbot. Automating customer service operations with intelligent chatbots that enhance every interaction.",
        cta: "Get In Touch",
        variant: "blue",
        image: image1,
    },
    {
        id: 2,
        tags: ["SEO", "Web", "Automation"],
        title: "Create Region-Wise SEO Pages Automatically",
        description:
            "Generate location-specific landing pages at scale. Improve search rankings, drive organic traffic, and capture leads from multiple regions effortlessly.",
        cta: "Get In Touch",
        variant: "light",
        image: image2,
    },
    {
        id: 3,
        tags: ["LMS", "CRM", "Marketing"],
        title: "Run LMS, CRM & Marketing from One Dashboard",
        description:
            "Manage learners, leads, campaigns, and sales from a single unified dashboard. Eliminate tool switching and gain complete business visibility.",
        cta: "Get In Touch",
        variant: "blue",
        image: image3,
    },
    {
        id: 4,
        tags: ["Events", "Training", "Global"],
        title: "Manage Classes, Events & Trainers Globally",
        description:
            "Schedule instructor-led classes, webinars, and events worldwide. Assign trainers, track attendance, and manage sessions with ease.",
        cta: "Get In Touch",
        variant: "light",
        image: image4,
    },
    {
        id: 5,
        tags: ["Sales", "Payments", "Courses"],
        title: "Sell Courses, Products & Services Effortlessly",
        description:
            "Launch paid courses, digital products, and services with built-in checkout, subscriptions, coupons, and payment automation.",
        cta: "Get In Touch",
        variant: "blue",
        image: image5,
    },
    {
        id: 6,
        tags: ["Automation", "Operations", "Workflow"],
        title: "Automate Operations Across Departments",
        description:
            "Automate workflows across sales, marketing, training, and support. Reduce manual work and scale operations with intelligent automation.",
        cta: "Get In Touch",
        variant: "light",
        image: image6,
    },
];

// ─── Draggable Slider Hook ────────────────────────────────────────────────────

const useDraggableSlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeftRef = useRef(0);

    const scrollToIndex = (index: number) => {
        if (!sliderRef.current) return;
        const clamped = Math.max(0, Math.min(index, projects.length - 1));
        const card = sliderRef.current.children[clamped] as HTMLElement;
        if (card) {
            sliderRef.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        }
    };

    const handleScroll = useCallback(() => {
        if (!sliderRef.current) return;
        const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;

        // Reached the end
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
            setActiveIndex(projects.length - 1);
            return;
        }

        // Find the card closest to the left edge
        let closestIndex = 0;
        let minDiff = Number.MAX_VALUE;
        Array.from(sliderRef.current.children).forEach((child, i) => {
            const diff = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
            if (diff < minDiff) { minDiff = diff; closestIndex = i; }
        });
        setActiveIndex(closestIndex);
    }, []);

    const handleMouseDown = (e: MouseEvent) => {
        if (!sliderRef.current) return;
        isDown.current = true;
        sliderRef.current.classList.add("cursor-grabbing");
        sliderRef.current.classList.remove("cursor-grab", "snap-x");
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeftRef.current = sliderRef.current.scrollLeft;
    };

    const resetDrag = () => {
        if (!sliderRef.current) return;
        isDown.current = false;
        sliderRef.current.classList.remove("cursor-grabbing");
        sliderRef.current.classList.add("cursor-grab", "snap-x");
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDown.current || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        sliderRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current);
    };

    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => el.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return {
        sliderRef,
        activeIndex,
        scrollToIndex,
        handlers: {
            onMouseDown: handleMouseDown,
            onMouseLeave: resetDrag,
            onMouseUp: resetDrag,
            onMouseMove: handleMouseMove,
        },
    };
};

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCard = ({ project }: { project: Project }) => {
    const isBlue = project.variant === "blue";
    const { openModal } = useLeadModal();

    return (
        <div
            className={[
                "min-w-[280px] w-[280px]",
                "sm:min-w-[500px] sm:w-[500px]",
                "md:min-w-[700px] md:w-[700px]",
                "lg:min-w-[900px] lg:w-[900px]",
                "h-[400px] sm:h-[420px] md:h-[430px]",
                "rounded-2xl sm:rounded-3xl overflow-hidden",
                "flex flex-col md:flex-row p-1.5 sm:p-2",
                "transition-transform duration-300",
                isBlue
                    ? "bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white"
                    : "bg-blue-50 text-brand-dark",
            ].join(" ")}
        >
            {/* Mobile image */}
            <div className="relative w-full md:hidden h-40 sm:h-48">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    draggable={false}
                    className="object-cover rounded-xl sm:rounded-2xl pointer-events-none"
                    placeholder="blur"
                />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-4 sm:p-5 md:p-6 flex flex-col justify-center relative z-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className={[
                                "px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold",
                                isBlue ? "bg-white/20 text-white" : "bg-white border text-brand-muted",
                            ].join(" ")}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 leading-snug">
                    {project.title}
                </h3>

                <p
                    className={[
                        "mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none",
                        isBlue ? "text-white/80" : "text-brand-muted",
                    ].join(" ")}
                >
                    {project.description}
                </p>

                <button
                    onClick={() => openModal({
                        formTitle: `Explore ${project.title}`,
                        formDescription: `Interested in our ${project.title} solution? Complete the form below to see it in action.`,
                        source: 'enquiry',
                        formId: 1,
                        defaultValues: {
                            subject: project.title
                        }
                    })}
                    className={[
                        "w-fit px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all hover:scale-105 cursor-pointer text-center",
                        isBlue
                            ? "bg-white text-brand-primary hover:shadow-lg"
                            : "bg-white border text-brand-dark shadow-sm hover:shadow-md",
                    ].join(" ")}
                >
                    {project.cta}
                </button>
            </div>

            {/* Desktop image */}
            <div className="hidden md:block relative w-1/2 h-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    draggable={false}
                    className="object-cover rounded-2xl lg:rounded-3xl pointer-events-none"
                    placeholder="blur"
                />
            </div>
        </div>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const RecentProjects = () => {
    const { sliderRef, activeIndex, scrollToIndex, handlers } = useDraggableSlider();

    return (
        <section
            className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden"
            aria-labelledby="features-heading"
        >
            <div className="container mx-auto px-2 xl:px-0 space-y-4 sm:space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="space-y-3 max-w-3xl">
                        <div className="inline-flex items-center justify-center">
                            <span className="badge-brand">Our Features</span>
                        </div>

                        <h2
                            id="features-heading"
                            className="heading-section"
                        >
                            Launch Faster.{" "}
                            <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                                Scale Smarter.
                            </span>
                        </h2>

                        <p className="body-medium">With Skilldeck, you can:</p>
                    </div>

                    {/* Navigation buttons */}
                    <div className="hidden sm:flex gap-3 flex-shrink-0">
                        <button
                            onClick={() => scrollToIndex(activeIndex - 1)}
                            disabled={activeIndex === 0}
                            aria-label="Previous feature"
                            className={[
                                "p-2.5 sm:p-3 rounded-full border-2 transition-all duration-200",
                                activeIndex === 0
                                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                                    : "border-brand-primary text-brand-primary hover:bg-gradient-to-br hover:from-brand-primary hover:to-brand-secondary hover:border-transparent hover:text-white",
                            ].join(" ")}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={() => scrollToIndex(activeIndex + 1)}
                            disabled={activeIndex === projects.length - 1}
                            aria-label="Next feature"
                            className={[
                                "p-2.5 sm:p-3 rounded-full border-2 transition-all duration-200",
                                activeIndex === projects.length - 1
                                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                                    : "border-brand-primary text-brand-primary hover:bg-gradient-to-br hover:from-brand-primary hover:to-brand-secondary hover:border-transparent hover:text-white",
                            ].join(" ")}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div
                    ref={sliderRef}
                    {...handlers}
                    role="region"
                    aria-label="Feature slider"
                    className="flex gap-4 sm:gap-6 lg:gap-8 w-full overflow-x-auto snap-x snap-mandatory pb-8 cursor-grab"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="snap-start flex-shrink-0">
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center mt-2 sm:mt-4" role="tablist">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            role="tab"
                            aria-selected={activeIndex === index}
                            aria-label={`Go to feature ${index + 1}`}
                            className="flex items-center justify-center w-10 h-10"
                        >
                            <span
                                className={[
                                    "h-2 sm:h-2.5 rounded-full transition-all duration-300 pointer-events-none",
                                    activeIndex === index
                                        ? "bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] w-6 sm:w-[30px]"
                                        : "bg-slate-300 w-2 sm:w-2.5",
                                ].join(" ")}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentProjects;
