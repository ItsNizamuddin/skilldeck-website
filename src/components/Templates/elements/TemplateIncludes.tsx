import {
    BarChart3,
    CalendarClock,
    CreditCard,
    FileText,
    Globe2,
    Mails,
    Search,
    Smartphone,
} from "lucide-react";
import HdGradientText from "@/components/home-demo/HdGradientText";

const included = [
    { icon: Globe2, title: "Your own domain", body: "Connect your domain with SSL, or use a free skilldeck.net subdomain.", accent: "from-brand-primary to-indigo-500" },
    { icon: Smartphone, title: "Responsive by default", body: "Every layout is built mobile-first and tested across breakpoints.", accent: "from-sky-400 to-brand-primary" },
    { icon: Search, title: "SEO built in", body: "Sitemaps, structured data, canonical URLs and per-page metadata.", accent: "from-emerald-400 to-teal-500" },
    { icon: Mails, title: "Lead capture", body: "Enquiry forms and modals that drop straight into your CRM.", accent: "from-rose-400 to-brand-secondary" },
    { icon: CalendarClock, title: "Courses and batches", body: "Catalogue, schedules and seat tracking managed from the dashboard.", accent: "from-violet-500 to-fuchsia-500" },
    { icon: CreditCard, title: "Payments", body: "Collect fees online with your own payment gateway account.", accent: "from-amber-400 to-orange-500" },
    { icon: FileText, title: "Blog and pages", body: "Publish articles and landing pages without touching code.", accent: "from-cyan-400 to-sky-500" },
    { icon: BarChart3, title: "Analytics", body: "Traffic, enquiry and conversion reporting out of the box.", accent: "from-lime-400 to-emerald-500" },
];

export default function TemplateIncludes() {
    return (
        <section className="section-y bg-white" id="included">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="badge-brand mb-5">What you get</span>
                    <h2 className="heading-section mb-4">
                        Every template ships with the <HdGradientText>full platform</HdGradientText>
                    </h2>
                    <p className="body-large">
                        You are not buying a static theme. The template is the front end — the
                        SkillDeck dashboard behind it runs the rest of your business.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {included.map(({ icon: Icon, title, body, accent }) => (
                        <div
                            key={title}
                            className="group flex flex-col gap-3 p-6 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300"
                        >
                            <span
                                className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center bg-linear-to-br ${accent} shadow-lg`}
                            >
                                <Icon className="w-5 h-5 text-white" />
                            </span>
                            <h3 className="text-base font-bold text-brand-dark">{title}</h3>
                            <p className="text-xs text-brand-muted leading-relaxed">{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
