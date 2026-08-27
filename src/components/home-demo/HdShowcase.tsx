"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import HdGradientText from "./HdGradientText";
import image1 from "../../../public/RecentProjects/ai.webp";
import image2 from "../../../public/RecentProjects/seo.webp";
import image3 from "../../../public/RecentProjects/lms_crm.webp";
import image4 from "../../../public/RecentProjects/manageclass.webp";
import image5 from "../../../public/RecentProjects/sellcourses.webp";
import image6 from "../../../public/RecentProjects/operations.webp";

interface Project {
    tags: string[];
    title: string;
    description: string;
    image: StaticImageData;
}

const projects: Project[] = [
    {
        tags: ["SEO-optimized", "Automation", "Support"],
        title: "Launch a beautiful, SEO-optimized website in no time",
        description:
            "Enhance your customer experience with our AI-powered support chatbot, automating service operations with intelligent responses.",
        image: image1,
    },
    {
        tags: ["SEO", "Web", "Automation"],
        title: "Create region-wise SEO pages automatically",
        description:
            "Generate location-specific landing pages at scale. Improve search rankings, drive organic traffic, and capture leads from multiple regions.",
        image: image2,
    },
    {
        tags: ["LMS", "CRM", "Marketing"],
        title: "Run LMS, CRM & marketing from one dashboard",
        description:
            "Manage learners, leads, campaigns, and sales from a single unified dashboard. Eliminate tool switching and gain complete visibility.",
        image: image3,
    },
    {
        tags: ["Events", "Training", "Global"],
        title: "Manage classes, events & trainers globally",
        description:
            "Schedule instructor-led classes, webinars, and events worldwide. Assign trainers, track attendance, and manage sessions with ease.",
        image: image4,
    },
    {
        tags: ["Sales", "Payments", "Courses"],
        title: "Sell courses, products & services effortlessly",
        description:
            "Launch paid courses, digital products, and services with built-in checkout, subscriptions, coupons, and payment automation.",
        image: image5,
    },
    {
        tags: ["Automation", "Operations", "Workflow"],
        title: "Automate operations across departments",
        description:
            "Automate workflows across sales, marketing, training, and support. Reduce manual work and scale operations intelligently.",
        image: image6,
    },
];

export default function HdShowcase() {
    const { openModal } = useLeadModal();
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: -1 | 1) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.children[0] as HTMLElement | undefined;
        const step = card ? card.offsetWidth + 20 : 360;
        track.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    return (
        <section className="section-y bg-slate-50">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                    <div className="max-w-xl">
                        <span className="badge-brand mb-5">In Action</span>
                        <h2 className="heading-section mb-3">
                            What you can build <HdGradientText>with Skilldeck</HdGradientText>
                        </h2>
                        <p className="body-medium">A few of the workflows training institutes run on the platform every day.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => scroll(-1)}
                            aria-label="Previous"
                            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll(1)}
                            aria-label="Next"
                            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-colors"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {projects.map((project, i) => (
                        <article
                            key={project.title}
                            style={{ scrollSnapAlign: "start" }}
                            className="group relative flex-shrink-0 w-[300px] sm:w-[360px] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="360px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[11px] font-black text-brand-dark">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <div className="p-5">
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-bold uppercase tracking-wide text-brand-primary bg-brand-primary/10 rounded-full px-2 py-1"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-sm font-bold text-brand-dark leading-snug mb-2">{project.title}</h3>
                                <p className="text-xs text-brand-muted leading-relaxed mb-4">{project.description}</p>
                                <button
                                    type="button"
                                    onClick={() =>
                                        openModal({
                                            source: "home-showcase",
                                            formTitle: `Get In Touch — ${project.title}`,
                                        })
                                    }
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark group-hover:text-brand-primary transition-colors"
                                >
                                    Get In Touch
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
