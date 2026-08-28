import dynamic from "next/dynamic";
import { PricingPlan } from "@/lib/plans";
import FAQ from "../shared/FAQ";
import PartnerLogos from "../shared/PartnerLogos";

import HdHero from "../home-demo/HdHero";
import HdProblem from "../home-demo/HdProblem";
import HdPayingFor from "../home-demo/HdPayingFor";
import HdComparison from "../home-demo/HdComparison";
import HdBentoFeatures from "../home-demo/HdBentoFeatures";

import AllFeaturesMarquee from "./elements/AllFeaturesMarquee";
import MarketplacePromotion from "./elements/MarketplacePromotion";

// Lazy-load heavy components below the fold for mobile performance (maintains SSR for SEO)
const HdDemo = dynamic(() => import("../home-demo/HdDemo"), {
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-50" />,
    ssr: true,
});

const HdWhySkilldeck = dynamic(() => import("../home-demo/HdWhySkilldeck"), {
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-900" />,
    ssr: true,
});

const HdAudiences = dynamic(() => import("../home-demo/HdAudiences"), {
    loading: () => <div className="h-96 w-full animate-pulse bg-white" />,
    ssr: true,
});

const HdShowcase = dynamic(() => import("../home-demo/HdShowcase"), {
    loading: () => <div className="h-96 w-full animate-pulse bg-slate-50" />,
    ssr: true,
});

const HdPricing = dynamic(() => import("../home-demo/HdPricing"), {
    loading: () => <div className="h-96 w-full animate-pulse bg-white" />,
    ssr: true,
});

const HdCta = dynamic(() => import("../home-demo/HdCta"), {
    loading: () => <div className="h-96 w-full animate-pulse bg-white" />,
    ssr: true,
});

interface HomeProps {
    plans?: PricingPlan[];
    faqs?: { title: string; value: string }[];
    partnerLogos?: { src: string; alt: string }[];
}

const Home = ({ plans = [], faqs = [], partnerLogos = [] }: HomeProps) => {
    return (
        <div className="flex flex-col overflow-hidden w-full">
            {/* 1 — Hook */}
            <HdHero />

            {/* 2 — Social proof immediately under the fold */}
            <div className="bg-white pb-10">
                <div className="container mx-auto px-4 lg:px-0">
                    <PartnerLogos showBorder={false} initialLogos={partnerLogos} />
                </div>
            </div>

            {/* 3 — Problem, then the cost breakdown it leads into */}
            <HdProblem />
            <HdPayingFor />

            {/* 4 — Solution framing: without vs. with */}
            <HdComparison />

            {/* 5 — The full feature surface, then the module breakdown */}
            <AllFeaturesMarquee />
            <HdBentoFeatures />

            {/* 6 — See it working */}
            <HdDemo />

            {/* 7 — Why us, with the track record folded in */}
            <HdWhySkilldeck />

            {/* 8 — Who it's for */}
            <HdAudiences />

            {/* 9 — What you can build */}
            <HdShowcase />

            {/* 10 — Marketplace */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 lg:px-0">
                    <MarketplacePromotion />
                </div>
            </section>

            {/* 11 — Offer */}
            <HdPricing plans={plans} />

            {/* 12 — Convert */}
            <HdCta />

            {/* 13 — Objection handling */}
            {faqs.length > 0 && (
                <div className="py-16 md:py-24 bg-slate-50" id="faqs">
                    <div className="container mx-auto px-2 lg:px-0">
                        <FAQ items={faqs} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
