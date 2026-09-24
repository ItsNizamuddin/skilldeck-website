import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Boxes,
    Figma,
    Gauge,
    PenTool,
    Plug,
    ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import OpenModalButton from "@/components/ui/OpenModalButton";
import HdGradientText from "@/components/home-demo/HdGradientText";

/** For buyers whose brief no template answers — the other half of the offer. */
const capabilities = [
    {
        icon: PenTool,
        title: "Custom design",
        body: "Wireframes and UI designed around your brand, not a theme you have to bend into shape.",
    },
    {
        icon: Boxes,
        title: "Sections built to spec",
        body: "Calculators, configurators, portals, dashboards — whatever the brief needs, built as components.",
    },
    {
        icon: Plug,
        title: "Third-party integrations",
        body: "Payment gateways, CRMs, ERPs, WhatsApp, analytics and any API your operation runs on.",
    },
    {
        icon: Figma,
        title: "Your design files, built",
        body: "Already have Figma files or a designer? We build it pixel-accurate on the SkillDeck backend.",
    },
    {
        icon: Gauge,
        title: "Performance and SEO",
        body: "Core Web Vitals, structured data and redirects handled as part of the build, not an afterthought.",
    },
    {
        icon: ShieldCheck,
        title: "Migration and support",
        body: "Content, URLs and rankings moved across, then ongoing support once you are live.",
    },
];

export default function CustomWebsiteSection() {
    return (
        <section className="section-y bg-slate-50" id="custom-website">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="badge-brand mb-5">Custom development</span>
                    <h2 className="heading-section mb-4">
                        Need something <HdGradientText>built from scratch?</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Templates cover most training and business sites. When your brief goes
                        further, our team designs and builds it on the same platform — so you still
                        get the dashboard, CRM and automation behind it.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
                    {/* Pitch panel */}
                    <div className="relative overflow-hidden rounded-3xl bg-brand-dark p-7 md:p-8 flex flex-col">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-brand-primary/30 blur-[90px]" />
                            <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-brand-secondary/20 blur-[90px]" />
                        </div>

                        <div className="relative flex flex-col h-full">
                            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-3">
                                A website built around your business
                            </h3>
                            <p className="text-sm text-white/70 leading-relaxed mb-6">
                                Discovery, design, build, launch. One team, fixed scope, and a quote
                                before any work starts.
                            </p>

                            <dl className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <dt className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                                        Typical build
                                    </dt>
                                    <dd className="text-base font-extrabold text-white">3–6 weeks</dd>
                                </div>
                                <div>
                                    <dt className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                                        Engagement
                                    </dt>
                                    <dd className="text-base font-extrabold text-white">Fixed scope</dd>
                                </div>
                            </dl>

                            {/* Fills the dead space under the stats; she points at the
                                capability grid sitting to the right of this panel. */}
                            <div className="relative mt-auto mb-6 rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                                <Image
                                    src="/templates/custom-build.webp"
                                    alt="Consultant pointing at what a custom build includes"
                                    width={800}
                                    height={476}
                                    sizes="(max-width: 1024px) 100vw, 30vw"
                                    className="w-full h-auto object-cover"
                                />

                            </div>

                            <div className="flex flex-col gap-3">
                                <OpenModalButton
                                    variant="secondary"
                                    size="md"
                                    className="w-full rounded-xl font-bold bg-white hover:bg-white/90"
                                    config={{
                                        source: "templates:custom-build",
                                        formTitle: "Tell us about your custom website",
                                        formDescription:
                                            "Share your requirement and our team will come back with scope, timeline and a quote.",
                                    }}
                                >
                                    Discuss your project
                                    <ArrowRight className="w-4 h-4" />
                                </OpenModalButton>

                                <Button
                                    as={Link}
                                    href="/services"
                                    variant="outline"
                                    size="md"
                                    className="w-full rounded-xl font-bold border-white/40 text-white hover:bg-white hover:text-brand-dark"
                                >
                                    See all services
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Capability grid */}
                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5 md:gap-6">
                        {capabilities.map(({ icon: Icon, title, body }) => (
                            <div
                                key={title}
                                className="flex flex-col gap-3 p-6 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="inline-flex w-11 h-11 rounded-2xl items-center justify-center bg-brand-primary/10">
                                    <Icon className="w-5 h-5 text-brand-primary" />
                                </span>
                                <h3 className="text-base font-bold text-brand-dark">{title}</h3>
                                <p className="text-xs text-brand-muted leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
