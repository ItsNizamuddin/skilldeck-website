"use client";

import { useState } from 'react';
import FaqHero from '@/components/Faq/elements/FaqHero';
import FaqCategoryTabs from '@/components/Faq/elements/FaqCategoryTabs';
import FaqList from '@/components/Faq/elements/FaqList';
import FaqCta from '@/components/Faq/elements/FaqCta';

interface FaqItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FaqItem[] = [
    // Getting Started
    { category: 'Getting Started', question: 'How do I create an account?', answer: 'Creating an account is easy! Click the "Start Free Trial" button, fill in your basic information, and you\'ll be ready to go in seconds. No credit card required for the trial.' },
    { category: 'Getting Started', question: 'What is included in the free trial?', answer: 'Our 14-day free trial includes full access to all platform features. You can explore the LMS, CMS, CRM, marketing automation tools, and more without any limitations.' },
    { category: 'Getting Started', question: 'Do I need technical skills to use Skilldeck?', answer: 'Not at all! Skilldeck is designed for non-technical users. Our drag-and-drop builders, intuitive interfaces, and comprehensive tutorials make it easy for anyone to get started.' },
    // Pricing & Billing
    { category: 'Pricing & Billing', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. For enterprise customers, we also offer custom invoicing options.' },
    { category: 'Pricing & Billing', question: 'Can I cancel my subscription anytime?', answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll continue to have access until the end of your billing period. No hidden fees or cancellation charges.' },
    { category: 'Pricing & Billing', question: 'Do you offer discounts for annual billing?', answer: 'Yes! When you choose annual billing, you save up to 20% compared to monthly billing. We also offer special discounts for educational institutions and non-profits.' },
    // Features & Services
    { category: 'Features & Services', question: 'Can I integrate Skilldeck with other tools?', answer: 'Absolutely! Skilldeck integrates with popular tools like Zoom, Google Workspace, Zapier, Stripe, PayPal, and many more. You can also use our API for custom integrations.' },
    { category: 'Features & Services', question: 'Is my data secure on Skilldeck?', answer: 'Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with GDPR and other data protection regulations. Your data is backed up daily.' },
    { category: 'Features & Services', question: 'Can I use my own domain?', answer: 'Yes! You can connect your custom domain to your Skilldeck website. We provide free SSL certificates and full DNS management support.' },
    // Support
    { category: 'Support', question: 'How can I get help if I\'m stuck?', answer: 'We offer multiple support channels: 24/7 live chat, email support, comprehensive documentation, video tutorials, and a community forum. Premium plans also include phone support.' },
    { category: 'Support', question: 'Do you offer onboarding assistance?', answer: 'Yes! All plans include basic onboarding. Premium and Enterprise plans include dedicated onboarding specialists who will help you set up and configure everything.' },
];

const categories = ['All', 'Getting Started', 'Pricing & Billing', 'Features & Services', 'Support'];

export default function FaqClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <FaqHero searchQuery={searchQuery} onSearch={setSearchQuery} />
            <FaqCategoryTabs categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
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
