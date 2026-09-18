"use client";

import { useState } from 'react';
import FaqHero from '@/components/Faq/elements/FaqHero';
import FaqCategoryTabs from '@/components/Faq/elements/FaqCategoryTabs';
import FaqList from '@/components/Faq/elements/FaqList';
import FaqCta from '@/components/Faq/elements/FaqCta';

import { FAQS, FAQ_CATEGORIES } from '@/components/Faq/faqData';

export default function FaqClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const filteredFaqs = FAQS.filter(faq => {
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <FaqHero searchQuery={searchQuery} onSearch={setSearchQuery} />
            <FaqCategoryTabs categories={FAQ_CATEGORIES} activeCategory={activeCategory} onSelect={setActiveCategory} />
            <section className="px-4 lg:px-0 pb-16">
                <div className="container mx-auto max-w-4xl">
                    <FaqList
                        faqs={filteredFaqs}
                        openIndex={openFaq}
                        onToggle={(i) => setOpenFaq(openFaq === i ? null : i)}
                    />
                </div>
            </section>
            <FaqCta />
        </>
    );
}
