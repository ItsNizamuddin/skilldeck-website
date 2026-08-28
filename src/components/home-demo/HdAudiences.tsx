import { Building2, Globe, User, ArrowUpRight } from "lucide-react";
import HdGradientText from "./HdGradientText";

const audiences = [
    {
        icon: User,
        title: "Solo Trainer",
        subtitle: "Individual experts & consultants",
        description:
            "Launch your training business without a tech team. Get a professional website, LMS, and marketing tools — all in one place.",
        accent: "from-orange-400 to-amber-500",
    },
    {
        icon: Building2,
        title: "Growing Training Institute",
        subtitle: "Small to mid-size training firms",
        description:
            "Scale your operations without scaling your costs. Manage trainers, students, and revenue from a single dashboard.",
        accent: "from-brand-primary to-indigo-500",
    },
    {
        icon: Globe,
        title: "Global Training Company",
        subtitle: "Enterprise training organizations",
        description:
            "Expand globally with multi-currency, multi-timezone, and multi-language support. Enterprise-grade security included.",
        accent: "from-rose-400 to-brand-secondary",
    },
];

export default function HdAudiences() {
    return (
        <section className="section-y bg-white" id="platform">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="badge-brand mb-5">Not a Generic SaaS</span>
                    <h2 className="heading-section mb-4">
                        Built specifically for <HdGradientText>trainers &amp; training institutes</HdGradientText>
                    </h2>
                    <p className="body-large">
                        Designed only for the training industry — unlike platforms such as Shopify or WooCommerce that
                        are built for e-commerce, not education.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {audiences.map((a, i) => (
                        <div
                            key={a.title}
                            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-1.5 transition-all duration-300"
                        >
                            <span className="absolute top-6 right-6 text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                                0{i + 1}
                            </span>
                            <span
                                className={`relative inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 bg-gradient-to-br ${a.accent} shadow-lg`}
                            >
                                <a.icon className="w-6 h-6 text-white" />
                            </span>
                            <h3 className="text-lg font-bold text-brand-dark mb-1">{a.title}</h3>
                            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide mb-3">{a.subtitle}</p>
                            <p className="text-sm text-brand-muted leading-relaxed mb-5">{a.description}</p>
                            {/* <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                                Learn more
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
