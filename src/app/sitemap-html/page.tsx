import Link from "next/link";
import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "HTML Sitemap",
    robots: { index: true, follow: true },
};

const categories = [
    {
        title: "GENERAL",
        links: [
            { name: "home", href: "/" },
            { name: "blog", href: "/blog" },
            { name: "careers", href: "/careers" },
            { name: "contact us", href: "/contact-us" },
            { name: "companies", href: "/companies" },
            { name: "faq", href: "/faq" },
            { name: "pricing", href: "/pricing" },
            { name: "platform", href: "/platform" },
        ]
    },
    {
        title: "SOFTWARE SOLUTIONS",
        links: [
            { name: "attendance management software", href: "/attendance-management-software" },
            { name: "class management software", href: "/class-management-software" },
            { name: "project management software", href: "/project-management-software" },
            { name: "task management software", href: "/task-management-software" },
            { name: "team management software", href: "/team-management-software" },
            { name: "web hosting for training companies", href: "/web-hosting-for-training-companies" },
            { name: "web templates", href: "/web-templates" },
        ]
    },
    {
        title: "SERVICES",
        links: [
            { name: "all services", href: "/services" },
            { name: "bulk tools", href: "/services/bulk-tools" },
            { name: "cms", href: "/services/cms" },
            { name: "crm", href: "/services/crm" },
            { name: "ecommerce", href: "/services/ecommerce" },
            { name: "education website cms", href: "/services/education-website-cms" },
            { name: "enterprise lms", href: "/services/enterprise-lms" },
            { name: "events", href: "/services/events" },
            { name: "free trial lms", href: "/services/free-trial-lms" },
            { name: "global lms", href: "/services/global-lms" },
            { name: "jobs", href: "/services/jobs" },
            { name: "lms", href: "/services/lms" },
            { name: "marketing automation", href: "/services/marketing-automation" },
            { name: "seo", href: "/services/seo" },
            { name: "social", href: "/services/social" },
            { name: "trainers", href: "/services/trainers" },
            { name: "training", href: "/services/training" },
            { name: "webchat", href: "/services/webchat" },
            { name: "white label lms", href: "/services/white-label-lms" },
        ]
    },
    {
        title: "SPECIALIZED CRM",
        links: [
            { name: "crm for coaching institutes", href: "/services/crm-for-coaching-institutes" },
            { name: "crm for education & edtech", href: "/services/crm-for-education-edtech" },
            { name: "crm for lead management", href: "/services/crm-for-lead-management" },
            { name: "crm for sales follow ups", href: "/services/crm-for-sales-follow-ups" },
            { name: "crm for student enrollment", href: "/services/crm-for-student-enrollment" },
            { name: "crm for training institutes", href: "/services/crm-for-training-institutes" },
            { name: "crm with lms integration", href: "/services/crm-with-lms-integration" },
            { name: "crm with webchat automation", href: "/services/crm-with-webchat-automation" },
        ]
    },
    {
        title: "SPECIALIZED LMS",
        links: [
            { name: "lms for compliance training", href: "/services/lms-for-compliance-training" },
            { name: "lms for corporate training", href: "/services/lms-for-corporate-training" },
            { name: "lms for employee onboarding", href: "/services/lms-for-employee-onboarding" },
            { name: "lms for online courses", href: "/services/lms-for-online-courses" },
            { name: "lms for training companies", href: "/services/lms-for-training-companies" },
            { name: "lms request demo", href: "/services/lms-request-demo" },
        ]
    },
    {
        title: "SOCIAL & MARKETING",
        links: [
            { name: "social media automation tool", href: "/services/social-media-automation-tool" },
            { name: "social media content calendar", href: "/services/social-media-content-calendar" },
            { name: "social media management software", href: "/services/social-media-management-software" },
            { name: "social media scheduling tool", href: "/services/social-media-scheduling-tool" },
            { name: "webinar management software", href: "/services/webinar-management-software" },
        ]
    },
    {
        title: "TRAINING & MARKETING",
        links: [
            { name: "training company advertising", href: "/training-company-advertising" },
            { name: "training company content marketing", href: "/training-company-content-marketing" },
            { name: "training company directory", href: "/training-company-directory" },
            { name: "training company marketing", href: "/training-company-marketing" },
            { name: "training company seo backlinks", href: "/training-company-seo-backlinks" },
            { name: "training marketplace", href: "/training-marketplace" },
        ]
    },
    {
        title: "LEGAL",
        links: [
            { name: "privacy policy", href: "/privacy-policy" },
            { name: "terms of service", href: "/terms-of-service" },
            { name: "cookie policy", href: "/cookie-policy" },
        ]
    }
];

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <MainNav />
            <main className="flex-1 py-20 lg:py-32 px-4 lg:px-0">
                <div className="container mx-auto">
                    <h1 className="heading-section mb-8">HTML Sitemap</h1>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-10">
                        <div className="space-y-10">
                            {categories.map((category, idx) => (
                                <div key={idx}>
                                    <div className="bg-gray-100 border-l-4 border-brand-primary py-2 px-4 mb-4 rounded-r-lg">
                                        <h2 className="body-small font-bold text-brand-dark tracking-wider uppercase">
                                            {category.title}
                                        </h2>
                                    </div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 list-disc list-inside px-4">
                                        {category.links.map((link, lidx) => (
                                            <li key={lidx} className="text-gray-600 marker:text-gray-400">
                                                <Link
                                                    href={link.href}
                                                    className="body-small hover:text-brand-primary hover:underline transition-colors capitalize decoration-1 underline-offset-4"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <Link href="/" className="text-brand-primary font-medium hover:underline flex items-center gap-2 body-small">
                            ← Back to homepage
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
