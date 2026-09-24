import type { Metadata } from "next";
import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import TemplatesWrapper from "@/components/Templates/TemplatesWrapper";
import { websiteTemplates } from "@/lib/templates";
import { env } from "@/lib/env";

export const metadata: Metadata = {
    title: "Website Templates for Institutes & Businesses | SkillDeck",
    description:
        "Browse live SkillDeck website templates — coaching, training, agency and retail layouts, plus the ThemePulse dynamic theme. Pick one, we brand it, you go live.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/web-templates",
    },
    openGraph: {
        title: "Website Templates | SkillDeck",
        description:
            "Ready-to-launch website templates, each one a site we already shipped. Pick a layout and go live on the SkillDeck platform.",
        url: "/web-templates",
        type: "website",
    },
};

const faqs = [
    {
        question: "Can I customise a template after it goes live?",
        answer:
            "Yes. Colours, logo, sections, pages and content are all editable from your dashboard. Layout changes beyond that are handled by our team as a design request.",
    },
    {
        question: "Do I own the website?",
        answer:
            "The site runs on your own domain and your content is yours. The template and platform are licensed to you for as long as your SkillDeck subscription is active.",
    },
    {
        question: "How long does setup take?",
        answer:
            "Most templates go live within a few working days once we have your logo, colours and content. Content migration from an existing site can add a few days.",
    },
    {
        question: "What is the difference between ThemePulse and the other templates?",
        answer:
            "ThemePulse is a dynamic theme: you switch colour schemes, reorder sections and change layouts yourself from the dashboard. The other templates are fixed layouts we brand for you.",
    },
    {
        question: "Can I buy just the Figma design?",
        answer:
            "Yes. Every design in the Figma section can be bought as a file on its own and handed to your own developer, or you can have us build it on the SkillDeck platform.",
    },
    {
        question: "Can you migrate my existing website?",
        answer:
            "Yes. We move your pages, blog posts, course catalogue and SEO redirects across so you do not lose rankings.",
    },
    {
        question: "Is the template included in my plan?",
        answer:
            "Every account ships with the default template. Premium and custom templates are quoted separately — talk to sales and we will confirm before you commit.",
    },
];

// Pure On-Demand ISR: the catalogue is static, so cache until a deploy replaces it.
export const revalidate = false;

export default function TemplatesPage() {
    const siteUrl = (env.NEXT_PUBLIC_SITE_URL || "https://skilldeck.net").replace(/\/$/, "");

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${siteUrl}/web-templates#templates`,
        "url": `${siteUrl}/web-templates`,
        "name": "SkillDeck website templates",
        "itemListElement": websiteTemplates.map((template, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": template.name,
            "description": template.tagline,
            "url": template.demoUrl,
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteUrl}/web-templates#faq`,
        "url": `${siteUrl}/web-templates`,
        "name": "Website templates FAQ | SkillDeck",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <MainNav />
            <TemplatesWrapper faqs={faqs} />
            <Footer />
        </>
    );
}
