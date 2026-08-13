import { Building2, Globe, User } from "lucide-react";

const audiences = [
    {
        icon: User,
        title: "Solo Trainer",
        subtitle: "Individual experts & consultants",
        description:
            "Launch your training business without a tech team. Get a professional website, LMS, and marketing tools — all in one place.",
        gradient: "from-orange-400 to-amber-500",
        bgGradient: "from-orange-50 to-amber-50",
    },
    {
        icon: Building2,
        title: "Growing Training Institute",
        subtitle: "Small to mid-size training firms",
        description:
            "Scale your operations without scaling your costs. Manage trainers, students, and revenue from a single dashboard.",
        gradient: "from-brand-primary to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
    },
    {
        icon: Globe,
        title: "Global Training Company",
        subtitle: "Enterprise training organizations",
        description:
            "Expand globally with multi-currency, multi-timezone, and multi-language support. Enterprise-grade security included.",
        gradient: "from-rose-400 to-brand-secondary",
        bgGradient: "from-rose-50 to-purple-50",
    },
];

const BuiltForTrainers = () => {
    return (
        <section className="py-12 md:py-20 bg-white" id="platform">
            <div className="container mx-auto px-2 xl:px-0">

                {/* Header */}
                <div className="text-center mb-12 md:mb-6">
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="badge-brand">
                            Skilldeck is not a generic SaaS.
                        </span>
                    </div>

                    <h2 className="heading-section mb-4">
                        Built Specifically for{" "}
                        <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent">
                            Trainers &{" "}
                            <br className="sm:hidden" />
                            Training Companies
                        </span>
                    </h2>

                    <p className="body-large max-w-2xl mx-auto mb-4">
                        Designed only for the training industry — unlike platforms such as Shopify or
                        WooCommerce that are built for e-commerce, not education.
                    </p>

                    <p className="body-medium font-medium">Whether you are:</p>
                </div>

                {/* Audience Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {audiences.map((audience) => {
                        const Icon = audience.icon;
                        return (
                            <div
                                key={audience.title}
                                className="group bg-white rounded-3xl p-6 md:p-4 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${audience.bgGradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <div
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center shadow-lg`}
                                        >
                                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>

                                <h3 className="heading-card mb-2">{audience.title}</h3>
                                <p className="body-small mb-4">{audience.subtitle}</p>
                                <p className="body-small">{audience.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BuiltForTrainers;
