import Link from "next/link";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import OpenModalButton from "@/components/ui/OpenModalButton";

export default function TemplatesCta() {
    return (
        <section className="section-y bg-white">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="relative overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-12 md:px-12 md:py-16">
                    {/* Brand wash instead of a flat gradient slab */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-brand-primary/30 blur-[100px]" />
                        <div className="absolute -bottom-32 -right-10 w-96 h-96 rounded-full bg-brand-secondary/25 blur-[100px]" />
                    </div>

                    <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide mb-4">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Free consultation
                            </span>

                            <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
                                Not sure which template fits?
                            </h2>

                            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-xl">
                                Tell us about your institute or business. We will recommend a
                                template, show you a branded preview, and quote the setup in one
                                call — no obligation.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:justify-end items-stretch sm:items-center gap-3">
                            <OpenModalButton
                                variant="secondary"
                                size="lg"
                                className="rounded-xl font-bold bg-white hover:bg-white/90"
                                config={{
                                    source: "templates:footer-cta",
                                    formTitle: "Request a branded preview",
                                    formDescription:
                                        "Share your details and we will send a preview of your site on the template you like.",
                                }}
                            >
                                Request a preview
                                <ArrowRight className="w-4 h-4" />
                            </OpenModalButton>

                            <Button
                                as={Link}
                                href="/contact-us"
                                variant="outline"
                                size="lg"
                                className="rounded-xl font-bold border-white/40 text-white hover:bg-white hover:text-brand-dark"
                            >
                                <Phone className="w-4 h-4" />
                                Contact sales
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
