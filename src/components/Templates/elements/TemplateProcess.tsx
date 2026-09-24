import HdGradientText from "@/components/home-demo/HdGradientText";

const steps = [
    {
        title: "Pick a template",
        body: "Browse the live sites above and shortlist the layout that fits your business.",
    },
    {
        title: "Share your content",
        body: "Send us your logo, colours, courses and copy — or let us migrate them from your current site.",
    },
    {
        title: "We brand and configure",
        body: "We apply your identity, wire up forms, payments and analytics, and stage the site for review.",
    },
    {
        title: "Go live",
        body: "Point your domain at SkillDeck. From then on you edit everything from the dashboard.",
    },
];

export default function TemplateProcess() {
    return (
        <section className="section-y bg-white" id="process">
            <div className="container mx-auto px-4 lg:px-0">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="badge-brand mb-5">How it works</span>
                    <h2 className="heading-section mb-4">
                        From template to <HdGradientText>live site in four steps</HdGradientText>
                    </h2>
                </div>

                <div className="relative">
                    {/* Rail behind the numbers, desktop only */}
                    <span
                        aria-hidden="true"
                        className="hidden lg:block absolute left-0 right-0 top-6 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent"
                    />

                    <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {steps.map((step, index) => (
                            <li key={step.title} className="flex flex-col gap-3">
                                <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center bg-white border border-slate-200 shadow-sm text-lg font-extrabold">
                                    <HdGradientText>{String(index + 1).padStart(2, "0")}</HdGradientText>
                                </span>
                                <h3 className="text-base md:text-lg font-bold text-brand-dark leading-snug">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-brand-muted leading-relaxed">{step.body}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
