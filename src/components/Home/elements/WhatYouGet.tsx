import MarketplacePromotion from "./MarketplacePromotion";
import AllFeaturesMarquee from "./AllFeaturesMarquee";
import PricingSection from "@/components/Pricing/PricingSection";
import { PricingPlan } from "@/lib/plans";

interface WhatYouGetProps {
    plans?: PricingPlan[];
}

const WhatYouGet = ({ plans = [] }: WhatYouGetProps) => {

    return (
        <section id="features" className="scroll-mt-28 pb-12 pt-6 md:py-20 bg-gradient-to-b from-slate-50 to-white">
            {/* Auto-scrolling Features Marquee */}
            <div className="mt-12">
                <AllFeaturesMarquee />
            </div>

            {/* Pricing Plans Section */}
            <PricingSection plans={plans} />

            <div className="container mx-auto px-2 xl:px-0">
                {/* Marketplace Promotion Section */}
                <MarketplacePromotion />
            </div>
        </section>
    );
};

export default WhatYouGet;
