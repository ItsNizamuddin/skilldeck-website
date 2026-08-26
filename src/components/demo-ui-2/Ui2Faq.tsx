"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/Forms/LeadModalContext";
import Ui2SectionIntro from "./Ui2SectionIntro";
import { DemoFaqs } from "@/components/demo-ui/types";

interface Ui2FaqProps {
    data?: DemoFaqs;
}

/** Numbered, minimal-rule FAQ list with an upfront contact card — distinct from /demo-ui's boxed-card accordion. */
export default function Ui2Faq({ data }: Ui2FaqProps) {
    const { openModal } = useLeadModal();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const items = (data?.accordions || []).filter((f) => f?.title);

    if (items.length === 0) return null;

    return (
        <section id="faq" className="scroll-mt-24 py-16 md:py-24">
            <div className="container mx-auto px-2 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-4 space-y-6">
                        <Ui2SectionIntro numeral="07" kicker={data?.tagline || "Got Questions?"} title={data?.title} description={data?.description} />

                        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                                <MessageCircleQuestion className="w-5 h-5 text-brand-primary" />
                            </div>
                            <p className="text-sm font-bold text-brand-dark">Still not sure?</p>
                            <p className="text-xs text-brand-muted leading-relaxed">Talk to our team for a straight answer, not a sales pitch.</p>
                            <Button
                                onClick={() => openModal({ source: "ui2-faq", formTitle: "Ask Our Team" })}
                                variant="outline-primary"
                                size="sm"
                                className="font-bold"
                            >
                                Ask a question
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 divide-y divide-slate-200">
                        {items.map((item, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div key={index} className="py-5">
                                    <button
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-start gap-4 text-left group"
                                    >
                                        <span className="text-xs font-black text-brand-primary/40 pt-0.5 w-6 shrink-0">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex-1 text-sm md:text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                                            {item.title}
                                        </span>
                                        <span className="shrink-0 text-brand-primary">
                                            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                        </span>
                                    </button>
                                    {isOpen && item.description && (
                                        <div
                                            className="pl-10 pt-3 text-sm text-brand-muted leading-relaxed prose prose-sm max-w-none prose-p:my-1"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
