"use client";

import { ArrowRight, Check, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const features = [
    {
        title: "Unified Dashboard",
        description: "Manage your entire training business from a single, intuitive interface.",
    },
    {
        title: "Real-Time Analytics",
        description: "Track student progress, course engagement, and revenue with live dashboards.",
    },
    {
        title: "Automated Workflows",
        description: "From lead capture to certification, automate every step of the learner journey.",
    },
];

import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";

const DemoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const videoId = "A-y-PXFigPI";
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <section className="py-16 md:py-24 bg-[#0a0f1d] relative overflow-hidden">
            {/* Interactive Dot Grid Background */}
            <InteractiveDotBackground />

            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),rgba(255,255,255,0))] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-2 l:px-0 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            See It In Action
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-4">
                        Experience the{" "}
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                            Power of Skilldeck
                        </span>
                    </h2>

                    <p className="body-large text-slate-400 max-w-2xl mx-auto">
                        Watch our platform in action and explore how it transforms training businesses worldwide.
                    </p>
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    {/* Main Display (Video) */}
                    <div className="lg:col-span-3 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-2xl blur-xl" />

                            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                                <div className="aspect-video relative group">
                                    {!isPlaying ? (
                                        <div
                                            className="absolute inset-0 cursor-pointer"
                                            onClick={() => setIsPlaying(true)}
                                        >
                                            <Image
                                                src={thumbnailUrl}
                                                alt="Skilldeck Platform Demo Thumbnail"
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 transform transition-transform group-hover:scale-110">
                                                    <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                                            title="Skilldeck Platform Demo"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="hidden md:block absolute -bottom-4 -right-4 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                Live Demo
                            </span>
                        </div>
                    </div>

                    {/* Features Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="heading-section2 text-white mb-6">
                            Smart Infrastructure for{" "}
                            <span className="text-brand-primary">Modern Trainers</span>
                        </h3>

                        <div className="space-y-2">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-brand-primary/50 transition-colors duration-300 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-7 h-7 bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-md flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="heading-card text-white mb-1 group-hover:text-brand-primary transition-colors">
                                                {feature.title}
                                            </h4>
                                            <p className="body-small text-slate-400">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-6 w-full">
                            <Link
                                href="/#plans"
                                className="w-full bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] text-white py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                            >
                                Explore Plans
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
