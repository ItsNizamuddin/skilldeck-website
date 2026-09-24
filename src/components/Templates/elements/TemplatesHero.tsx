import Link from "next/link";
import { ArrowRight, Layers, Rocket, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import OpenModalButton from "@/components/ui/OpenModalButton";
import HdGradientText from "@/components/home-demo/HdGradientText";
import type { WebsiteTemplate } from "@/lib/templates";
import TemplatesHeroCollage from "./TemplatesHeroCollage";

interface TemplatesHeroProps {
    templates: WebsiteTemplate[];
}

export default function TemplatesHero({ templates }: TemplatesHeroProps) {
    const stats = [
        { icon: Layers, value: `${templates.length}`, label: "Live templates" },
        { icon: Timer, value: "Days", label: "Not months to launch" },
        { icon: Rocket, value: "1", label: "Dashboard runs it all" },
    ];

    return (
        <section className="relative overflow-hidden bg-white pt-24 lg:pt-28 pb-10 md:pb-14">
            {/* Soft brand wash, matching the home hero rather than a hard slab */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-32 w-[30rem] h-[30rem] rounded-full bg-brand-primary/[0.07] blur-[110px]" />
                <div className="absolute top-10 -right-32 w-[26rem] h-[26rem] rounded-full bg-brand-secondary/[0.07] blur-[110px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-0 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
                        <span className="badge-brand mb-4">Websites for training &amp; business</span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] text-brand-dark text-center lg:text-left mb-4">
                            Pick a template.{" "}
                            <HdGradientText>Launch your website.</HdGradientText>
                        </h1>

                        <p className="text-base 2xl:text-lg text-brand-muted leading-relaxed text-center lg:text-left max-w-xl mb-4">
                            Every template here is a site we have already built and shipped for a
                            client. Choose the one closest to your business — we rebrand it with
                            your identity and content.
                        </p>

                        <p className="text-base 2xl:text-lg text-brand-muted leading-relaxed text-center lg:text-left max-w-xl mb-6">
                            <span className="text-brand-dark font-semibold">Courses, batches, enquiries, payments and blog</span>{" "}
                            all run from the same SkillDeck dashboard from day one.
                        </p>

                        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-6">
                            <OpenModalButton
                                variant="primary"
                                size="md"
                                className="rounded-xl font-bold text-xs sm:text-sm px-3.5 sm:px-5 h-11"
                                config={{
                                    source: "templates:hero",
                                    formTitle: "Talk to us about templates",
                                    formDescription:
                                        "Tell us what you need and we will recommend the right template for your business.",
                                }}
                            >
                                Book a walkthrough
                                <ArrowRight className="w-4 h-4" />
                            </OpenModalButton>

                            <Button
                                as="a"
                                href="#gallery"
                                variant="outline-primary"
                                size="md"
                                className="rounded-xl text-xs sm:text-sm px-3.5 sm:px-5 h-11"
                            >
                                Browse templates
                            </Button>

                            <Button
                                as={Link}
                                href="/pricing"
                                variant="secondary"
                                size="md"
                                className="rounded-xl text-xs sm:text-sm px-3.5 sm:px-5 h-11 bg-transparent hover:bg-slate-100"
                            >
                                See plans
                            </Button>
                        </div>

                        <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 xl:flex xl:flex-wrap xl:items-center xl:gap-x-10 pt-5 lg:pt-7 border-t border-slate-200">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center text-center gap-1 sm:flex-row sm:items-center sm:text-left sm:gap-2.5"
                                >
                                    <stat.icon className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                                    <div className="leading-tight">
                                        <div className="text-base font-extrabold text-brand-dark">{stat.value}</div>
                                        <div className="text-[11px] text-brand-muted font-medium">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <TemplatesHeroCollage templates={templates.slice(0, 3)} />
                    </div>
                </div>
            </div>
        </section>
    );
}
