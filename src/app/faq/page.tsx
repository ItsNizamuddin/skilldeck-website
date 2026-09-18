import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FaqClient from "@/components/Faq/FaqClient";
import { FAQS } from "@/components/Faq/faqData";
import { env } from "@/lib/env";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Frequently Asked Questions | SkillDeck",
    description: "Get answers to your questions about SkillDeck products and services.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/faq",
    },
};

export default function FaqPage() {
    const siteUrl = (env.NEXT_PUBLIC_SITE_URL || "https://skilldeck.net").replace(/\/$/, "");

    // The list is filtered client-side by search and category, but the schema
    // describes the page's full set — that is what FaqClient starts with and
    // what stays in the DOM once a filter is cleared.
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteUrl}/faq#faq`,
        "url": `${siteUrl}/faq`,
        "name": "Frequently Asked Questions | SkillDeck",
        "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/10 to-white flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <MainNav />
            <main className="flex-1">
                <FaqClient />
            </main>
            <Footer />
        </div>
    );
}
